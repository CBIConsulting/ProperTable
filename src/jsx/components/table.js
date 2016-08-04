import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell, ColumnGroup} from 'fixed-data-table';
import Immutable from 'immutable';
import _ from 'underscore';
import messages from "../lang/messages";
import Selector from './selector';
import CellRenderer from './cellRenderer';
import HeaderCell from './headerCell';
import bs from 'binarysearch';
import clone from 'clone';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';
import cache from '../lib/rowcache';
import moment from "moment";
import normalizer from '../lib/normalizer';
import comparators from "../filterComparators/comparators";

//Const
const SELECTOR_COL_NAME = 'selector-multiple-column'; // Name of the selector column
const DEFAULT_SORT_DIRECTION = 'DEF';
const ASCENDING_SORT_DIRECTION = 'ASC';
const DESCENDING_SORT_DIRECTION = 'DESC';
const SELECTED_FIELD = '_selected';
const ROW_INDEX_FIELD = '_rowIndex';
const RAWDATA_INDEX_FIELD = '_rawDataIndex';
const MULTIPLE_SELECTION = 'multiple';
const CLEAR_FILTERS = 'clear_filters';
const CLEAR_SORT = 'clear_sort';
const CLEAR_BOTH = 'clear_both';
const FILTERTYPE_SELECTION = 'selection';
const FILTERTYPE_CUSTOM = 'operation';
const NOTEQUALS = 'notequals';
const EQUALS = "equals";
const BIGGERTHAN = 'bigger';
const LOWERTHAN = 'lower';
const AFTERDATE = 'after';
const BEFOREDATE = 'before';
const BETWEENDATES = 'between';
const ONDATE = 'on';
const NOTONDATE = 'noton';
const STARTSWITH = 'start';
const FINISHWITH = 'finish';
const CONTAINS = 'contains';
const NOTCONTAINS = 'notcontains';
const EMPTY = 'empty';
const CACHE_NAME = 'formatted';
const Set = require('es6-set');
const DATE_TYPES = new Set([AFTERDATE, BEFOREDATE, ONDATE, NOTONDATE]);
const CLEAR_OPTIONS = {
	[CLEAR_BOTH]: {sort: true, filters: true},
	[CLEAR_FILTERS]: {sort: false, filters: true},
	[CLEAR_SORT]: {sort: true, filters: false},
}

/**
 * A proper table component based on react Fixed-DataTables with an amount of new functionalities.
 * Rows selection with callback, sorting (single, multisorting), cell formating, fixed columns when scrolling, etc...
 * See Examples folder for more detail.
 *
 * Simple example usage:
 *
 * let cols = [
 *		{
 *			name: 'col1',
 *			label: <span>A number</span>,
 *			field: 'number',
 *			fixed: true
 *		},{
 *			name: 'col2',
 *			label: 'col2',
 *			field: 'col2'
 *		}
 *	]
 *
 * let data = [];
 *	  data.push({
 *		  col1: 5,
 *		  col2: 'abcde'
 *	  });
 *
 * 	<ProperTable.Table
 *		key='TableKey'
 *		uniqueId={1}
 *		rowHeight={40}
 *		cols={cols}
 *		data={data}
 *		afterSelect={
 *			function(rows) {
 *				console.log('selected', rows);
 *			}
 *		}
 *	/>
 * ```
 */
class ProperTable extends React.Component {

	constructor(props) {
		super(props);

		// Get initial data
		let initialData = this.prepareData();
		// Get initial columns sort
		let initialColSettings = this.prepareColSettings(this.props, initialData.rawdata);
		// Sort cols by position if exist
		let cols = this.sortTableCols(Immutable.fromJS(this.props.cols));

		this.state = {
			cols: cols,
			colSettings: initialColSettings.colSettings,
			colSortParsers: initialColSettings.colSortParsers,
			data: initialData.data,
			initialData: initialData.initialData,
			indexed: initialData.indexed,
			initialIndexed: initialData.initialIndexed,
			rawdata: initialData.rawdata,
			sizes: Immutable.fromJS({}),
			selection:initialData.defSelection,
			sortCache: initialData.defSortCache,
			allSelected: false,
			sendSorted: false,
			hasSortedColumns: false
		};
	}

	componentWillMount() {
		this.uniqueId = this.props.uniqueId || _.uniqueId('propertable-');

		// Sort the table and apply filters if exist in props
		this.applySettings();

		// Add new click listener if exist
		if (this.props.restartOnClick) {
			this.addClickListener(this.props.restartOnClick);
		}
	}

	componentDidMount() {
		// In some cases the callback of setState it's called before the new state is set up so we use a flag to prevent this.
		if (this.state.sendSorted) {
			this.setState({
				sendSorted: false
			}, this.sendSortedAndSettings(this.state.data, this.state.colSettings));
		} else {
			this.sendColSettings(this.state.colSettings);
		}
	}

	componentWillUnmount() {
		cache.flush([CACHE_NAME, 'tb_' + this.uniqueId]);

		// Remove listener if exist
		if (this.props.restartOnClick) {
			this.removeClickListener(this.props.restartOnClick);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let propschanged = !shallowEqualImmutable(this.props, nextProps);
		let statechanged = !shallowEqualImmutable(this.state, nextState);
		let somethingchanged = propschanged || statechanged;

		if (propschanged) {
			let colsDeepCompare = this.deepColsCompare(nextProps.cols, this.props.cols);
			let colsChanged = colsDeepCompare.hasChangedDeeply || colsDeepCompare.hasSmallChanges || colsDeepCompare.hasChangedPosition;
			let dataChanged = !shallowEqualImmutable(nextProps.data, this.props.data);
			let colSortDirsChanged = nextProps.colSortDirs ? !shallowEqualImmutable(nextProps.colSortDirs, this.props.colSortDirs) : false;
			let colFiltersChanged = nextProps.colFilters ? !shallowEqualImmutable(nextProps.colFilters, this.props.colFilters) : false;
			let colData = null, preparedData = null, cols = null, newCol;

			// If data and columns change the colSettings and all data states must be updated. Then apply default (sort table
			// and set selection if it has been received). If both change It's almost the same as rebuild the component. Almost everything changes
			if (colsChanged || dataChanged) {
				if (dataChanged) {
					cache.flush([CACHE_NAME, 'tb_' + this.uniqueId]);

					preparedData = this.prepareData(nextProps, nextState);
					colData =  this.prepareColSettings(nextProps, preparedData.rawdata);
					cols = this.sortTableCols(Immutable.fromJS(nextProps.cols));

					this.setState({
						colSettings: colData.colSettings,
						colSortParsers: colData.colSortParsers,
						cols: cols,
						data: preparedData.data,
						initialData: preparedData.initialData,
						indexed: preparedData.indexed,
						initialIndexed: preparedData.initialIndexed,
						rawdata: preparedData.rawdata,
						sortCache: preparedData.defSortCache,
						selection: preparedData.defSelection,
					}, this.applySettings(colData.colSettings, nextProps, true, true, true));

				} else if (colsChanged) {
					if (colsDeepCompare.hasChangedDeeply || (colsDeepCompare.hasSmallChanges && colsDeepCompare.hasChangedPosition)) {
						let sortCache = [];

						cache.flush([CACHE_NAME, 'tb_' + this.uniqueId]);
						colData =  this.prepareColSettings(nextProps, this.state.rawdata);
						cols = this.sortTableCols(Immutable.fromJS(nextProps.cols));

						// Restart cache
						nextState.data.forEach(row => {
							sortCache[row.get(this.props.idField)] = {};
						});

						this.setState({
							colSettings: colData.colSettings,
							colSortParsers: colData.colSortParsers,
							cols: cols,
							sortCache: sortCache
						}, this.applySettings(colData.colSettings, nextProps)); // apply selection and sort

					} else if (colsDeepCompare.hasSmallChanges) {
						cols = this.state.cols.map(col => {
							newCol = colsDeepCompare.changedCols[col.get('name')];

							if (newCol) {
								_.each(newCol, (value, key) => {
									col = col.set(key, value);
								});
							}

							return col;
						});

						this.setState({
							cols: cols
						});
					} else {
						cols = this.sortTableCols(Immutable.fromJS(nextProps.cols));

						this.setState({
							cols: cols
						});
					}
				}

				return false;

			} else if (colSortDirsChanged || colFiltersChanged) {
				this.applySettings(nextState.colSettings, nextProps, colSortDirsChanged, colFiltersChanged);

			} else if (nextProps.selected) {
				this.setDefaultSelection(nextProps);

				return false;
			}
		}

		return somethingchanged;
	}

	componentWillUpdate(nextProps, nextState) {
		this.checkSelectionChange(nextProps, nextState);

		if (nextState.sendSorted) {
			this.sendSortedAndSettings(nextState.data, nextState.colSettings);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.sendSorted) this.setState({sendSorted: false});
	}

	componentWillReceiveProps(newProps) {
		if (newProps.restartOnClick || this.props.restartOnClick) {
			let restartOnClickChanged = !shallowEqualImmutable(this.props.restartOnClick, newProps.restartOnClick);

			if (restartOnClickChanged) {
				// Remove old listener if exist
				if (this.props.restartOnClick) {
					this.removeClickListener(this.props.restartOnClick)
				}

				// Add new listener if exist
				if (newProps.restartOnClick) {
					this.addClickListener(newProps.restartOnClick);
				}
			}
		}
	}

/**
 * Check if cols has changed deeply. This function is made to optimize shouldComponentUpdate when the visibility or something
 * like that has changed but it's not a big change, so colSettings still been the same. If has changed deeply then re-build the
 * colSettings and restart sortCache, if it's just a small change like in class, label, isVisible, etc, then update the changed
 * columns only.
 *
 * @param (array) 	nextCols		Next columns received by the table
 * @param (array)	currentCols		The current columns of the table
 *
 * @return (object) result
 *						- (boolean) hasChangedDeeply  	If has changed deeply
 *						- (boolean) hasSmallChanges 	If the properties which could be updated in hot has changed. Class, fixed, isVisible...
 *						- (boolean) hasChangedPosition 	If the position of the cols has changed
 * 						- (object)  changedCols 		Object with the changed cols indexed by the index (when it has just small changes)
 */
	deepColsCompare(nextCols, currentCols) {
		let nextLength = nextCols.length, currentLength = currentCols.length, hasChangedDeeply = false, hasSmallChanges = false, changedCols = {};
		let fixedChanged, classNameChanged, isVisibleChanged, labelChanged, somethingchanged, curCol, hasChangedPosition = false;

		if (currentCols.length !== nextCols.length) {
			hasChangedDeeply = true;
		} else {
			_.every(nextCols, (col, index) => {
				curCol = currentCols[index];

				if (col.name !== curCol.name || col.field !== curCol.field || col.sortable !== curCol.sortable ||  col.uniqueId !== curCol.uniqueId
					|| !shallowEqualImmutable(col.formatter, curCol.formatter) || !shallowEqualImmutable(col.sortVal, curCol.sortVal)
					|| !shallowEqualImmutable(col.children, curCol.children)) {

					hasChangedDeeply = true;
					return false; // Break
				}

				fixedChanged = col.fixed !== curCol.fixed;
				classNameChanged = col.className !== curCol.className;
				isVisibleChanged = col.isVisible !== curCol.isVisible;
				labelChanged = !shallowEqualImmutable(col.label, curCol.label);
				somethingchanged = fixedChanged || classNameChanged || isVisibleChanged || labelChanged;

				if (somethingchanged) {
					changedCols[col.name] = _.clone(col);
					hasSmallChanges = true;
				}

				if (!hasChangedPosition) {
					hasChangedPosition = col.position !== curCol.position;
				}

				return true; // Next
			});
		}

		return {
			hasChangedDeeply: hasChangedDeeply,
			hasSmallChanges: hasSmallChanges,
			hasChangedPosition: hasChangedPosition,
			changedCols: changedCols
		}
	}

/**
 * Sort the columns by its position and return the cols sorted.
 *
 * @param (array) 	columns Property cols.
 * @return (object)	cols 	Sorted cols by its position as an Immutable
 */
	sortTableCols(cols) {
		if (cols.size > 0) {
			cols = cols.sortBy((col, colIndex, allCols) => {
  				return col.get('position', 1);
			},
			(val1, val2) => {
				if (val1 === val2) {
					return 0;
				} else  {
					return val1 > val2 ? 1 : -1;
				}
			});
		}

		return cols;
	}

/**
 * Add a click listener to the props.restartOnClick element. The function clearFilterAndSort will be called when this elemente get clicked.
 *
 * @param {Js Element || React Element} restartOnClick 	Element which will have a new on click listener
 */
	addClickListener(restartOnClick) {
		if (!React.isValidElement(restartOnClick)) { // Not React element
			restartOnClick.addEventListener('click', this.clearFilterAndSort.bind(this));
		} else {
			let btn = null;

			if (restartOnClick.props.id)	{
				btn = document.getElementById(restartOnClick.props.id);
				btn.addEventListener('click', this.clearFilterAndSort.bind(this));

			} else if (this.props.restartOnClick.props.className){
				btn = document.getElementsByClassName(restartOnClick.props.className);
				for (let i = btn.length - 1; i >= 0; i--) {
					btn[i].addEventListener('click', this.clearFilterAndSort.bind(this));
				}
			}
		}
	}

/**
 * Remove listener to the props.restartOnClick element.
 *
 * @param {Js Element || React Element} restartOnClick 	Element which have the on click listener
 */
	removeClickListener(restartOnClick) {
		if (!React.isValidElement(restartOnClick)) { // Not React element
			this.props.restartOnClick.removeEventListener('click', this.clearFilterAndSort.bind(this));
		} else {
			let btn = null;

			if (restartOnClick.props.id)	{
				btn = document.getElementById(restartOnClick.props.id);
				btn.removeEventListener('click', this.clearFilterAndSort.bind(this));

			} else if (restartOnClick.props.className){
				btn = document.getElementsByClassName(restartOnClick.props.className);
				for (let i = btn.length - 1; i >= 0; i--) {
					btn[i].removeEventListener('click', this.clearFilterAndSort.bind(this));
				}
			}
		}
	}

/**
 * Apply the columns sort and filters over table data and update state.
 *
 * @param (array)	colSettings 	Sort / Filter settings of each column. From current or next state (case the props data/cols change)
 * @param (object) 	props 			Component props or new props on update
 * @param (boolean) updateSort 		If this parameter is true then chech props colSortDirs for default sort settings
 * @param (boolean) updateFilters 	If this parameter is true then chech props colFilters for default filter settings
 * @param (boolean) forceApply		If it's true then when update sort or update Filters is not allowed it will apply the colSettings anyway.
 */
	applySettings(colSettings = this.state.colSettings, props = this.props, updateSort = true, updateFilters = true, forceSendSettings = false, forceApply = false) {
		let selectionSet = {}, columnKeysFiltered = [], fields = [], formatters = [], newData = null, hasFilter = false, hasSort = false, newDirection;
		let updateSortAllowed = updateSort && props.colSortDirs && _.size(props.colSortDirs) > 0;
		let updateFiltersAllowed = updateFilters && props.colFilters, hasSelectionFilter, hasCustomFilter, operations = {};
		let sortedData = [], filterValue, newFilter; // Date filters

		// Update settings
		colSettings = _.map(colSettings, col => {
			hasSelectionFilter = false;
			hasCustomFilter = false;

			if (updateSortAllowed) {
				newDirection = props.colSortDirs[col.column];
				if (newDirection && col.direction !== newDirection) {
					sortedData.push({name: col.column, direction: newDirection}); // To be applied after
					hasSort = true;
				}
			} else if (forceApply && col.direction !== DEFAULT_SORT_DIRECTION) {
				hasSort = true;
			}

			if (updateFiltersAllowed) {
				newFilter = props.colFilters[col.column];

				if (newFilter) {
					if (!newFilter.type || newFilter.type === FILTERTYPE_SELECTION) {
						if (!hasFilter) {
							if (col.filterType !== FILTERTYPE_SELECTION) { // Has changed Type
								hasFilter = true;
							} else {
							 	hasFilter = !shallowEqualImmutable(col.selection, newFilter.selection);
							}
						}

						col.filterType = FILTERTYPE_SELECTION;
						col.selection = newFilter.selection;

					} else if (newFilter.type === FILTERTYPE_CUSTOM) {
						if (!hasFilter && (col.filterType !== FILTERTYPE_CUSTOM || col.operationFilterType !== newFilter.operationType
							|| col.operationFilterValue !== newFilter.operationValue)) {
							hasFilter = true;
						}

						col.filterType = FILTERTYPE_CUSTOM;
						col.operationFilterType = newFilter.operationType;
						col.operationFilterValue = newFilter.operationValue;
					}
				}
			} else if (forceApply && ((col.filterType === FILTERTYPE_SELECTION && col.selection.length > 0)
				|| (col.filterType === FILTERTYPE_CUSTOM && col.operationFilterValue.length > 0))) {
				hasFilter = true;
			}

			hasSelectionFilter = (col.selection.length > 0) && col.filterType === FILTERTYPE_SELECTION;
			if (!hasSelectionFilter) hasCustomFilter =  (col.operationFilterValue.length > 0) && col.filterType === FILTERTYPE_CUSTOM;

			// Build all selection || operation filter in case it has filter
			if (hasSelectionFilter || hasCustomFilter) {
				formatters[col.column] = col.formatter;
				columnKeysFiltered.push(col.column); // Columns filtered

				// You send a column and get the asociated field, needed because more than 1 col can use data from same field. Name is the id key of column but
				// field refer to data field.
				fields[col.column] = col.field;

				if (hasSelectionFilter) {
					selectionSet[col.column] = new Set(col.selection);
					operations[col.column] = null;

				} else {
					selectionSet[col.column] = null;
					operations[col.column] = {type: col.operationFilterType, value: col.operationFilterValue};

					if (DATE_TYPES.has(col.operationFilterType) && col.operationFilterValue.length > 0) {
						if (!moment(col.operationFilterValue).isValid()) console.warn('Invalid date format: ' + operations[col.column].value);
					}
				}
			}

			return col;
		});

		// Update sort on settings
		if (hasSort && sortedData.length > 0) {
			sortedData.forEach(sortObj => {
				colSettings = this.updateSortDir(sortObj.name, sortObj.direction, colSettings);
			});
		}

		// In case has sort and filter the sortTable() function gets the filtered data.
		newData = hasFilter ? this.applyFilters(columnKeysFiltered, formatters, selectionSet, fields, operations) : null;

		if (hasSort) {
			this.sortTable(colSettings, true, newData); // This method set state and send the cols settings
		} else if (hasFilter) {
			this.setState(newData, this.sendColSettings(colSettings));
		} else if (forceSendSettings) {
			this.sendColSettings(colSettings);
		}
	}

/**
 * Apply filters to the table data.
 *
 * @param (array) 	columns 	Names of the filtered columns
 * @param (array)	formatters	Formatters asociated with each column, by its name, to parse the data
 * @param (array)	filters 	Contains Set objects of selected values asociated with each column.
 * @param (array)	fields 		Fields asociated with each column name. More than 1 col can use data from same field. This array is key value, where the key is the col name and
 *								the value is the asociated field.
 * @param (array)	operations 	In case has some custom filters in a column or more. This parameter contains a object of objects indexed by column name, has the type of the
 *								filter and the value.
 *
 * @return (object)	-data 		Filtered data.
 *					-indexed 	Indexed data updated.
 */
	applyFilters(columns, formatters, filters, fields, operations = []) {
		let {initialData, indexed, selection} = this.state;
		let filteredData = initialData, idField = this.props.idField, formatterAllowed, applyFormatter;
		let notAllowedTypes = new Set([BETWEENDATES, AFTERDATE, BEFOREDATE, ONDATE, NOTONDATE]); // Date filters

		// Get the data that match with the selection (of all column filters)
		if (_.size(filters) > 0) {
			let result, field, formatter, val;

			filteredData = initialData.filter(element => {
				// If value has been found (result = true) then leave loop and return true
				columns.every(column => {
					field = fields[column];
					formatter = formatters[column];
					val = element.get(field);
					result = false;
					applyFormatter = true;

					// Skip unvalid values
					if (_.isNull(val)) val = '';

					if (this.isValidType(val)) {
						if (formatter) {
							if (operations[column] && operations[column].type) {
							 	if (notAllowedTypes.has(operations[column].type)) {
							 		applyFormatter = false;
								}
							}

							if (applyFormatter) {
								val = formatter(val, null, null);
								if (_.isNull(val) || _.isUndefined(val)) val = '';
							}
						}

						if (filters[column]) {
					 		result = filters[column].has(val.toString());
					 	} else if (operations[column]) {
					 		result = this.customFilter(operations[column].type, operations[column].value, val, notAllowedTypes.has(operations[column].type));
					 	}
					}

					return result;
				});

				return result;
			});
		}

		// Apply selection and update index of each element in indexed data
		filteredData = filteredData.map((element, index) => {
			if (selection.has(element.get(idField))) {
				element = element.set(SELECTED_FIELD, true);
			}
			indexed[element.get(idField)]._rowIndex = index; // Update index into indexed data.

			return element;
		});

		return {
			data: filteredData,
			indexed: indexed,
		}
	}

/**
 * Prepare the data received by the component for the internal working.
 * @param  (array)	props 	Component props (or nextProps)
 * @param  (array)	state 	Component state (or nextState)
 * @return (object)	-rawdata: The same data as the props.
 *					-indexed: Same as rawdata but indexed by the properId
 *					-data: Parsed data to add some fields necesary to internal working.
 */
	prepareData(props = this.props, state = this.state) {
		// The data will be immutable inside the component
		let data = Immutable.fromJS(props.data), index = 0, id, sortCache = [];
		let indexed = {}, initialData = null, parsed = [], defSelection = new Set();
		let keyField = this.props.idField;

		if (props.selected) {
			defSelection = this.parseSelected(props);
		} else {
			if (state && state.selection) {
				defSelection = state.selection;
			}
		}

		// Parsing data to add new fields (selected or not, properId, rowIndex)
		parsed = data.map(row => {
			id = row.get(keyField, false);

			if (!id) id = _.uniqueId();
			else id = id.toString();

			row = row.set(keyField, id);

			if (defSelection.has(id)) {
				row = row.set(SELECTED_FIELD, true);
			} else {
				row = row.set(SELECTED_FIELD, false);
			}

			row = row.set(ROW_INDEX_FIELD, index++);
			sortCache[id] = {};

			return row;
		});

		// Prepare indexed data.
		indexed = _.indexBy(parsed.toJSON(), keyField);

		return {
			rawdata: data,
			data: parsed,
			initialData: parsed,
			indexed: indexed,
			initialIndexed: clone(indexed),
			defSortCache: sortCache,
			defSelection: defSelection
		};
	}

/**
 *	Set the default selection if that exist in props
 *
 * @param (array)	props 	Component props (or nextProps)
 */
	setDefaultSelection(props = this.props) {
		if (props.selected) {
			let selection = this.parseSelected(props);
			this.triggerSelection(selection, false); // false -> don't send the selection
		}
	}

/**
 * Parse the property selected that could be a string, number, array of strings / numbers or a Set into a Set.
 *
 * @param (array)	props 		Component props (or nextProps)
 * @return (Set)	selection 	The default selected rows.
 */
	parseSelected(props = this.props) {
		let selection, isArray = _.isArray(props.selected), isObject = typeof props.selected === 'object';

		if (!isArray && isObject) return props.selected; // Is Set

		if (!isArray) { // Is String or number
			selection = [props.selected.toString()];
		} else if (props.selected.length > 0) { // Is Array
			selection = props.selectable === MULTIPLE_SELECTION ? props.selected.toString().split(',') : [props.selected[0].toString()];
		} else {
			selection = [];
		}

		selection = new Set(selection);
		return selection;
	}

/**
 * If the value is string, number or boolean
 *
 * @param 	(string) 	value 	Value to parse
 * @return 	(boolean)	If value is of valid type
 */
	isValidType(value) {
		return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
	}

/**
 * Prepare the columns sort / filtering data to all columns and the array of functions to parse the data of each column before sorting.
 *
 * @param (array)	props 			Component props (or nextProps)
 * @param (object)	rawdata			Initial data to build the indexed and Immutable data (no duplicates) for every column if the component has complex column filter
 *
 * @return (array)	-colSettings: 	Sort / filter settings of each column.
 *					-colSortParsers: 	Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
 */
	prepareColSettings(props = this.props, rawdata = null) {
        let cols = props.cols, colSettings = [];
        let sortData = this.buildColSortDirs(cols); // Build the initial colsortdirs using the cols array.
        let multisort = props.multisort, direction = null, sortable = null, colData = null, indexed = null, parsedData = null;

		// The default sort dirs (in case that's exist) will be applied in applyColSettings

        // Through each element, of the colSortDirs built data, build the colSortDirs with the default directions received,
        // setting a position (position of priority to sort (it will be modified after click on the diferent columns)), if
        // the column is sortable or not and if the Table has multisort or just only single.
        for (let i = 0; i <= sortData.colSortDirs.length - 1; i++) {
        	colData = sortData.colSortDirs[i];
        	sortable = !_.isNull(colData.sortable) ? colData.sortable : true;

         	// If has filter build a list without duplicates and it indexed
         	if (this.props.columnFilterComponent && sortable) {
         		let idSet = new Set(), index = 0, rawdataIndex = 0, hasNulls = false, val, valid;

				// Parsing data for filter
				parsedData = rawdata.map(row => {
					val = row.get(colData.field);

					// Only string or number values then formated (Dates, etc...) Not objects allowed
					valid = this.isValidType(val);

					if (valid && !_.isNull(val) && val !== '') {
						if (colData.formatter) {
							val = colData.formatter(val, null, null);
							valid = this.isValidType(val);
						}

						if (valid && !idSet.has(val) && !_.isNull(val) && !_.isUndefined(val)){ // No repeat
							idSet.add(val);

							row = row.set(colData.field, val.toString());
							row = row.set(SELECTED_FIELD, false);
							row = row.set(ROW_INDEX_FIELD, index++); // data row index
							row = row.set(RAWDATA_INDEX_FIELD, rawdataIndex++); // rawData row index
							return row; // RETURN
						}
					}

					rawdataIndex++; // add 1 to jump over duplicate values
					hasNulls = true;
					return null;
				});

				// Clear null values if exist
				if (hasNulls) {
					parsedData = parsedData.filter(element => !_.isNull(element));
				}

				// Prepare indexed data.
				indexed = _.indexBy(parsedData.toJSON(), colData.field);
			}

         	colSettings.push({
         		column: colData.column, // Column name
         		field: colData.field,
         		direction: colData.direction,
         		position: i + 1,
         		sorted: false,
         		multisort: multisort, // single (false) (in this case only one at a time can be sorted) or multisort (true - all true)
         		sortable: sortable,
         		filterType: FILTERTYPE_SELECTION,
         		selection: [], // Selected values of this column (to filter when has a complex filter)
         		operationFilterType: CONTAINS,
         		operationFilterValue: '',
         		indexedData: indexed, // Indexed by this column (just if has complex filter)
         		data: parsedData,
         		formatter: colData.formatter
         	});
        }

        // Ordering by selected rows. Virtual column
        if (props.selectable == MULTIPLE_SELECTION) {
        	colSettings.push({
         		column: SELECTOR_COL_NAME, // Column name
         		field: SELECTED_FIELD,
         		direction: DEFAULT_SORT_DIRECTION,
         		position: sortData.colSortDirs.length + 1, // Last
         		sorted: false,
         		multisort: multisort,
         		sortable: true,
         		filterType: FILTERTYPE_SELECTION,
         		selection: [],
         		operationFilterType: CONTAINS,
         		operationFilterValue: '',
         		indexedData: [],
         		data: [],
         		formatter: null,
         	});
        }

        return {
            colSettings: colSettings,
            colSortParsers: sortData.sortVals
        }
    }

/**
 * Build the structure of the colSortDirs array and the sortVals array with the functions received in cols or a default function to parse.
 * In fact this method look through all the columns in props.cols recursively and add all that aren't a ColumnGroup,
 * the columns that may be sorted.
 *
 * @param 	(array)	cols Describe each column data. (name, sortable, fixed...)
 *
 * @return 	(array)	-colSortDirs: Sort settings of each column.
 *					-sortValues: Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
 */
	buildColSortDirs(cols, colSortDirs = [], sortVals = {}) {
		cols.forEach( element => {
			if (!element.children) {
				let sortable = _.isUndefined(element.sortable) ? null : element.sortable;
				let formatter = _.isUndefined(element.formatter) ? null : element.formatter;
				sortVals[element.name] = element.sortVal || function(val) {return val}; // Function to iterate

				colSortDirs.push({
					column: element.name,
					field: element.field,
					direction: DEFAULT_SORT_DIRECTION,
					sortable: sortable,
					formatter: formatter
				});
			} else {
				this.buildColSortDirs(element.children, colSortDirs, sortVals);
			}
		});

		if (this.props.selectable == MULTIPLE_SELECTION) {
		  	sortVals[SELECTOR_COL_NAME] = function(val) {return val};
		}

		return {
			colSortDirs: colSortDirs,
			sortVals: sortVals
		}
	}

/**
 * Return if the value is valid with the type in comparison with compareTo string.
 *
 * @param (string) 		type 		Type of the filter. Must be Equals, Starts With...
 * @param (string) 		value 		Value of the filter
 * @param (string) 		compareTo 	Value of the field to be checked
 * @param (boolean) 	escapeLess 	If it's a date type then use escape less to don't normalize some characters like -/.
 *
 * @return (boolean) 	result
 */
	customFilter(type, value, compareTo, escapeLess = false) {
		return comparators[type](normalizer.normalize(value, escapeLess), normalizer.normalize(compareTo, escapeLess));
	}

/**
 * Clear all column filters and sort directions
 */
	clearFilterAndSort(e) {
		e.preventDefault();
		let colSettings = this.state.colSettings, data, indexed = this.state.indexed;
		let clear = CLEAR_OPTIONS[this.props.restartOnClickType], hasSortedColumns = this.state.hasSortedColumns;

		colSettings = _.map(colSettings, element => {
			if (clear.filters) {
				element.selection = [];
				element.operationFilterValue = '';
			}

			if (clear.sort) {
				element.direction = DEFAULT_SORT_DIRECTION;
			}

			return element;
		});

		// Apply default
		data = this.state.initialData.map((element, index) => {
			if (this.state.selection.has(element.get(this.props.idField))) {
				element = element.set(SELECTED_FIELD, true);
			}
			indexed[element.get(this.props.idField)]._rowIndex = index; // Update index into indexed data.

			return element;
		});

		if (clear.sort) hasSortedColumns = false;

		this.setState({
			data: data,
			indexed: indexed,
			colSettings: colSettings,
			hasSortedColumns: hasSortedColumns
		}, this.sendSortedAndSettings(data, colSettings));
	}

/**
 * Check if the table has nested columns. Columns inside other columns. In that case this component will render the single columns as a
 * column inside a ColumnGroup even if the column has not childrens.
 *
 * @param (array)		cols  	Describe columns
 * @return (boolean)	result	True if has nested columns or false otherwhise
 */
	hasNested(cols) {
		let result = false;

		if (cols.size) {
			cols.forEach((c) => {
				if (c.get('children') && c.get('children').size) {
					result = true;
					return false;
				}
			});
		}

		return result;
	}

/**
 * Function called each time the user click on the header of a column, then apply a sortBy function in that column.
 * After that, update the state of the component
 *
 * @param {String} 		columnKey 	The name of the column which will be resort.
 * @param {String} 		sortDir 	The new direction of the sort. ASC || DESC || DEF(AULT)
 * @param {object}		newData 	In case this method is called after filtering data (don't update state twice for the same)
 */
	onSortChange(columnKey, sortDir, newData = null) {
  		let colSettings = newData ? newData.colSettings : this.state.colSettings;

  		colSettings = this.updateSortDir(columnKey, sortDir, colSettings);
  		this.sortTable(colSettings, true, newData);
	}

/**
 * Function called (just when a component has been sent in props columnFilterComponent) each time the user click on the header of a column,
 * then apply's an filter over the initial data using the current selected values, also update the selection in the colSettings state
 *
 * @param {String} 		columnKey 	The name of the column which will get a new selection filter from the complex filter.
 * @param {object}		selection 	The values selected to filter this column (values from all the values of this column)
 * @param {String} 		sortDir 	(Just on clear filter) The direction of the sort. DEF
 */
	onColumnGetFiltered(columnKey, selection, sortDir = null, colSettings = this.state.colSettings) {
		let selectionSet = {}, columnKeysFiltered = [], fields = [], formatters = []; // new Set(selection)
		let newData = [], hasSort = false;

		// Update selection of this column in the colSettings and add this values to the selection set array if the selection has more than 0
		// elements.
		colSettings = _.map(colSettings, col => {
			if (col.column !== SELECTOR_COL_NAME) {
				if (col.column === columnKey) { // Update
					col.selection = selection;
					col.filterType = FILTERTYPE_SELECTION;
				}

				if (!hasSort && col.direction !== DEFAULT_SORT_DIRECTION) hasSort = true;

				if (col.selection.length > 0) { // Build all selection
					selectionSet[col.column] = new Set(col.selection);
					formatters[col.column] = col.formatter;
					columnKeysFiltered.push(col.column);

					// You send a column and get the asociated field, needed because more than 1 col can use data from same field. Name is the id key of column but
					// field refer to data field.
					fields[col.column] = col.field;
				}
			}

			return col;
		});

		// Apply selections
		newData = this.applyFilters(columnKeysFiltered, formatters, selectionSet, fields);
		newData.colSettings = colSettings;

  		// In case we didn't get a sort direction then only sort the filtered data (if sort different than default) applying colSettings and update state.
		if (_.isNull(sortDir)) {
			if (hasSort) {
				this.sortTable(colSettings, true, newData);
			} else {
				this.setState(newData, this.sendColSettings(colSettings)); // All columns have sort to default
			}
		} else {
			// Update col Settings with new sort direction for this column, then sort the data and update the component's state.
			this.onSortChange(columnKey, sortDir, newData);
		}
	}

/**
 * Receive the column name and a sort direction and change the direction of that column, then set the proper position
 * of all the columns (just if the Table have multisorting allowed). The position will be used to set which columns
 * will be sorted first. If there are some columns with sortDir ASC or DESC the data will be sorted in function of
 * what element was clicked before.
 *
 * @param {String} 		columnKey 	The name of the column which will be resort.
 * @param {String} 		sortDir 	The direction of the sort. ASC || DESC || DEF(AULT)
 * @param {array}		colSettings ColSettings to update
 * @return {array}		colSettings Updated colSettings array.
 */
	updateSortDir(columnKey, sortDir, colSettings = this.state.colSettings) {
		let position = 1;

		// Single sorting.
		if (!this.props.multisort) {
			for (let i = 0; i <= colSettings.length - 1; i++) {
				if (colSettings[i].column === columnKey) {
					colSettings[i].direction = sortDir;
					colSettings[i].multisort = true;
				} else {
					colSettings[i].direction = DEFAULT_SORT_DIRECTION;
					colSettings[i].multisort = false;
				}
			}
		} else {
			// Multisort
			let initialPos = 0, index = 0;

			for (let i = 0; i <= colSettings.length - 1; i++) {
				// If some columns were sorted before then the position of the sorted columns wont be changed, so the initial
				// position will be the next. If 2 columns are already sorted and we sort by a new one then the position of this
				// last column will be 3 and will change to 2 or 1 if the sorted columns back to default.
				if (colSettings[i].sorted) initialPos++;

				if (colSettings[i].column === columnKey) {
					colSettings[i].direction = sortDir; // Set the new direction
					position = colSettings[i].position; // Save the current position
					index = i;

					// If the sort direction is not default and the column isn't already sorted then add one to the initial position
					// and set the column to sorted. Otherwise if the sort direction is default set it to unsorted.
					if (sortDir !== DEFAULT_SORT_DIRECTION && !colSettings[i].sorted) {
						initialPos++;
						colSettings[i].sorted = true;
					} else if (sortDir == DEFAULT_SORT_DIRECTION) {
					 	colSettings[i].sorted = false;
					}
				}
			}

			// Change the priority position to sort of the elements.
			for (let i = 0; i <= colSettings.length - 1; i++) {

				// When the position of the current element is lower than the position of the changed element and bigger or equals to the
				// initial position to change.
				if (colSettings[i].position < position && colSettings[i].position >= initialPos) {
					// Move element to the next position only if the new sort direction wasn't default, in that case keep the element in the same
					// sorting priority position.
					if (colSettings[i].direction === DEFAULT_SORT_DIRECTION) colSettings[i].position = colSettings[i].position + 1;
				}
			}

			// After change the sort position priority of the other elements if the new position is lower than the current position set new position.
			if (initialPos < colSettings[index].position) colSettings[index].position = initialPos;
		}

		return colSettings;
	}

/**
 * Get the current colSettings state, sort by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
 *
 * @param 	{array}		colSettings Sort settings of each column
 * @param 	{boolean}	sendSorted 	If the sorted data must be sent or not
 * @param 	{object}	newData 	In case this method is called after filtering data (don't update state twice for the same)
 * @return 	{array}		-colSettings: Sorted column in colSettings
 *						-data: Sorted data to be updated in the component state.
 */
	sortTable(colSettings, sendSorted = true, newData = null) {
		let data = newData ? newData.data : this.state.data, indexedData = newData ? newData.indexed : this.state.indexed;
		let sendSortedAllowed = sendSorted, hasSortedColumns = false;

		colSettings = _.sortBy(colSettings, (element) => {
			if (!hasSortedColumns && element.direction !== DEFAULT_SORT_DIRECTION) {
				hasSortedColumns = true;
			}

			return element.position;
		}).reverse();

		data = this.sortColumns(data, indexedData, colSettings);

		if (sendSortedAllowed && typeof this.props.afterSort !== 'function' && typeof this.props.getColSettings !== 'function') {
			sendSortedAllowed = false;
		}

		this.setState({
  			data: data.data,
  			indexed: data.indexed,
	      	colSettings: colSettings,
	      	sortCache: data.sortCache,
	      	sendSorted: sendSortedAllowed,
	      	hasSortedColumns: hasSortedColumns
	    });
	}

/**
 * Get the current colSettings state, sort it by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
 *
 * @param 	{array}		data 		Data to be render in the Table
 * @param 	{array}		indexed 	Indexed data to be updated (its row index)
 * @param 	{array}		colSettings Sort / filter settings of each column. Sorted by its .position
 * @return 	{array}		sortedData 	Sorted data to be updated in the component state.
 */
	sortColumns(data, indexed, colSettings) {
		let sortedData = data, indexedData = indexed;
		let colSortParsers = this.state.colSortParsers, sortParser = null, sortCache = this.state.sortCache;
		let defaultSort = true, element = null, position = null, rowId, val;

		colSettings.forEach((element) => {
			// The colums could be all true (multisort) or just one of them at a time (all false but the column that must be sorted)
			if (element.direction !== DEFAULT_SORT_DIRECTION && element.multisort && element.sortable) {
				sortParser = colSortParsers[element.column];

				sortedData = sortedData.sortBy((row, rowIndex, allData) => {
					rowId = row.get(this.props.idField);
					// sortCache [row-id] [column-id] = procesed value.
					if (_.isUndefined(sortCache[rowId][element.field]) || element.column === SELECTOR_COL_NAME) {
						val = sortParser(row.get(element.field));
						sortCache[rowId][element.field] = val || ''; // Turn null's into empty values
					}

	  				return sortCache[rowId][element.field];
				}, (val1, val2) => {
					if (val1 == val2) {
						return 0;
					} else if (element.direction == ASCENDING_SORT_DIRECTION) {
						return val1 > val2? 1 : -1;
					} else if (element.direction == DESCENDING_SORT_DIRECTION) {
					 	return val1 > val2? -1 : 1;
					}
				});
				defaultSort = false;
			}
		});

		// If all the cols are default then sort the data by the rowIndex (virtual field added on componnent's create.)
		if (defaultSort) {
			//  Set to default
			sortedData = data.sortBy((row, rowIndex, allData) => {
	  			return row.get(ROW_INDEX_FIELD);
			}, (val1, val2) => {
				return val1 > val2? 1 : (val1 == val2 ? 0:-1);
			});
		}

		// Update index into indexed data.
		sortedData.map((element, index) => {
			indexedData[element.get(this.props.idField)]._rowIndex = index;
		});

		return {
			data: sortedData,
			indexed: indexedData,
			sortCache: sortCache
		}
	}

/**
 *	Get the current data rendered in component using a HOC
 *
 * @param (boolean)			getAsRaw 	Get the data as inmutable or parse to raw data
 * @return (array...object)	data
 */
	getCurrentData(getAsRaw = false) {
		let data = this.state.data;

		if (getAsRaw) {
			let properId, rowIndex, rawdata = this.state.rawdata;
			data = data.map(row => {
				properId = row.get(this.props.idField);
				rowIndex = this.state.initialIndexed[properId]._rowIndex;

				return rawdata.get(rowIndex);
			});
		}

		return data;
	}

/**
 * Recursive function that build the nested columns. If the column has childrens then call itself and put the column into
 * a ColumnGroup.
 *
 * @param 	(array)		colData 	Data to be parsed
 * @param 	(boolean)	isChildren	Is a children of another column or not
 * @param 	(boolean)	hasNested	The whole table has nested columns or not
 * @return 	(object)	col 		The builded column or tree of columns
 */
	parseColumn(colData, isChildren = false, hasNested = false) {
		let col = null, colname = null, sortDir = DEFAULT_SORT_DIRECTION, sortable = null, selection = [], columnFilter = null, hasComplexFilter = false;
		let indexed = null, headerData = null, className = null, settings = null, isSortedOrFiltered = false, align = 'center', filterExtraProps = {};
		let extraProps = {
			width: 100,
			fixed: false,
			isResizable: true
		};

		colname = colData.name || _.uniqueId('col-');
		className = colData.className || null;

		if (this.state.sizes.get(colname)) {
			colData.width = this.state.sizes.get(colname);
			colData.flex = 0;
		}

		if (colData.width) {
			extraProps.width = colData.width;
		}

		if (!colData.width && !colData.maxWidth) {
			extraProps.flexGrow = 1;

			if (colData.flex !== undefined) {
				extraProps.flexGrow = colData.flex;
			}
		}

		if (colData.fixed !== undefined) {
			extraProps.fixed = colData.fixed;
		}

		if (colData.isResizable !== undefined) {
			extraProps.isResizable = colData.isResizable;
		}

		if (colData.align !== undefined) {
			align = colData.align;
		}

		// If this column doesn't have childrens then build a column, otherwise build a ColumnGroup and call the method recursively
		// setting the result inside this columns group.
		if (colData.children === undefined || !colData.children.length) {
			// Get column settings
			settings = _.findWhere(this.state.colSettings, {column: colname}) || {};

			// If this column can be sort or not.
			sortable = _.isUndefined(colData.sortable) ? true : colData.sortable;

			// Check for a complex filter component. In that case use onColumnFilter instead of onSortChange. That method render the received component
			// just beside the icon of the column header. If the filter type isn't selection then selection must be an empty array
			if (this.props.columnFilterComponent) { // react component
				hasComplexFilter = true;
				columnFilter = this.onColumnGetFiltered.bind(this);

			  	if (settings.filterType === FILTERTYPE_SELECTION) {
			    	isSortedOrFiltered = settings.selection.length > 0;
			    	selection = settings.selection;
			  	} else if (settings.filterType === FILTERTYPE_CUSTOM) {
			    	isSortedOrFiltered = settings.operationFilterValue.length > 0;
			  	}

			  	if (!isSortedOrFiltered && settings.direction !== DEFAULT_SORT_DIRECTION) {
			  		isSortedOrFiltered = true;
			  	}

			  	if (_.isObject(colData.filterProps) && !_.isArray(colData.filterProps)) {
			  		filterExtraProps = colData.filterProps;
			  	}
			}

			col = <Column
				columnKey={colname}
				key={colname+'-column'}
				header={
					<HeaderCell
						key={this.uniqueId + '-sort-header'}
						uniqueId={this.uniqueId}
						onSortChange={this.onSortChange.bind(this)}
						columnFilter={columnFilter} // function || null
						filterComponent={this.props.columnFilterComponent} // react component
						data={settings.data} // data for columnFilter
						rawdata={this.state.rawdata} // data for columnFilter
						indexed={settings.indexedData}
						selection={selection} // selection for complex filter
						iconColor={this.props.iconColor} // icon color when column filter displayed
						iconDefColor={this.props.iconDefColor} // icon color when column filter closed
						col={colData.field}
						lang={this.props.lang}
						sortDir={settings.direction}
						children={colData.label}
						colName={colData.name}
						filterWidth={this.props.filterWidth}
						sortable={sortable}
						userClassName={className}
						columnFormater={null} // Formatter function that get the value to be render and return it parsed settings.formatter
						isSortedOrFiltered={isSortedOrFiltered}
						extraProps={filterExtraProps}
					/>
				}
				cell={<CellRenderer tableId={this.uniqueId} idField={this.props.idField} indexed={this.state.indexed} data={this.state.data} colData={colData} col={colData.field}/>}
				allowCellsRecycling={!hasComplexFilter}
				align={align}
				{...extraProps}
			/>;

			// If isn't a children but the table has nested columns set the column into a group.
			if (!isChildren && hasNested) {
				col = <ColumnGroup key={colname+'-group'} fixed={extraProps.fixed}>{col}</ColumnGroup>
			}
		} else {
			// Call the method recursively to all the childrens of this column.
			let hasFalsy = false, inner = colData.children.map((c) => {
				if (c.isVisible === undefined || c.isVisible) return this.parseColumn(c, true);
				else hasFalsy = true;
			});

			if (hasFalsy) inner = _.compact(inner);

			col = <ColumnGroup
				columnKey={colname}
				key={colname+'-group'}
				header={<Cell>{colData.label}</Cell>}
				{...extraProps}
			>
				{inner}
			</ColumnGroup>;
		}

		return col;
	}

/**
 * Build the table calling the parsecolumn() method for each column in props.cols and saving it to an array to be render into
 * a react fixed-datatable Table. If multiple rows can be selected then build a column with checkboxes to show which rows are seleted.
 *
 * @return (array) 	columns 	Array with all the columns to be rendered.
 */
	buildTable() {
		let columns = [], isNested = this.hasNested(this.state.cols), selColumn = null;

		if (this.props.selectable == MULTIPLE_SELECTION) {
			let somethingSelected = this.state.selection.size > 0;
			let allSelected = this.props.columnFilterComponent ? this.isAllSelected(this.state.data, this.state.selection) : this.state.allSelected;
			let settings = _.findWhere(this.state.colSettings, {column: SELECTOR_COL_NAME}) || null;
			let sortDir = settings ? settings.direction : DEFAULT_SORT_DIRECTION;

			selColumn = <Column
				columnKey={SELECTOR_COL_NAME}
				key={_.uniqueId('selector-')}
				header={
					<HeaderCell
						className={'selector-column-header'}
						onSortChange={this.onSortChange.bind(this)}
						sortDir={sortDir}
						sortable={true}
					>
						<Selector
							onClick={this.handleSelectAll.bind(this)}
							somethingSelected={somethingSelected}
							allSelected={allSelected}
							indexed={this.state.indexed}
							isHeader={true}
						/>
					</HeaderCell>
				}
				cell={<Selector
					indexed={this.state.indexed}
					data={this.state.data}
					selected={this.state.selection}
					idField={this.props.idField}
				/>}
				allowCellsRecycling
				width={this.props.selectorWidth}
				fixed
			/>

			if (isNested) {
				selColumn = <ColumnGroup fixed key={_.uniqueId('selector-group-')}>{selColumn}</ColumnGroup>;
			}

			columns.push(selColumn);
		}

		this.state.cols.forEach((col) => {
			if (col.get('isVisible', true)) {
				columns.push(this.parseColumn(col.toJSON(), false, isNested));
			}
		});

		return columns;
	}

/*
 * Build the table footer with info about sort and filters.
 */
	buildFooter() {
		let footer = null;

		if (this.props.displayFooter) {
			let messages = this.props.msgs[this.props.lang];
			let msgFilters, msgSort = null, isFirstFilter = true, isFirstColumn = true, column;
			let hasSort = this.state.hasSortedColumns;

			if (this.state.data.size < this.state.initialData.size) {
				msgFilters = messages.filtered;
				if (hasSort) msgSort = messages.sorted + ' ';

				for (let i = this.state.colSettings.length - 1; i >= 0; i--) {
					column = this.state.colSettings[i];

					if (column.selection.length > 0 && column.filterType === FILTERTYPE_SELECTION
						|| column.operationFilterValue. length > 0 && column.filterType === FILTERTYPE_CUSTOM) {
						if (!isFirstFilter) msgFilters += ' > ';
						msgFilters += ' ' + column.column;
						isFirstFilter = false;
					}

					if (hasSort) {
						if (column.direction !== DEFAULT_SORT_DIRECTION) {
							if (!isFirstColumn) msgSort += ' > ';
							msgSort += ' ' + column.column + ' - ' + column.direction;
							isFirstColumn = false;
						}
					}
				}
				msgFilters += '. ' + messages.there + ' ' + this.state.data.size + ' ' + messages.filtering + ' ' + this.state.initialData.size;
				if (hasSort) hasSort = false; // It's already parsed.

			} else {
				msgFilters = messages.allData + ' ' + this.state.data.size + ' ' + messages.rows;
			}

			if (hasSort) {
				msgSort = messages.sorted + ' ';

				for (let i = this.state.colSettings.length - 1; i >= 0; i--) {
					column = this.state.colSettings[i];

					if (column.direction !== DEFAULT_SORT_DIRECTION) {
						if (!isFirstColumn) msgSort += ' > ';
						msgSort += ' ' + column.column + ' - ' + column.direction;
						isFirstColumn = false;
					}
				}
			}

			footer = (
				<div className="propertable-footer-info" style={{height: this.props.footerInfoHeight}}>
					<div className="footer-left-info">{msgSort}</div>
					<div className="footer-right-info">{msgFilters}</div>
				</div>
			);
		}

		return footer;
	}

/**
 * Set all columns to selected or to not selected. Callback for the onclick of the Selector component, in the top of the table, in
 * the case that the Table allows multiple selection.
 *
 * @param {object}	e  	Event which call the function.
 */
	handleSelectAll(e) {
		e.preventDefault();

		if (this.props.selectable) {
			let idField = this.props.idField, value, selection = new Set(this.state.selection);
			let {allSelected, data, indexed, rawdata} = this.state;

 			// Select all
			if (!allSelected) {
 				if (data.size < rawdata.size) { // Filtered
 					data.forEach(element => {
						value = element.get(idField);
						if (!selection.has(value.toString())) selection.add(value.toString());
					});
				} else {
					selection = new Set(_.keys(indexed));
				}
			} else if (selection.size > 0) { // Unselect all
				// Filtered data
 				if (data.size < rawdata.size) {
 					// Remove elements from selection
 					data.forEach(element => {
						value = element.get(idField);
						if (selection.has(value.toString())) selection.delete(value.toString());
					});

 				} else {
 					selection = new Set();
 				}
			}

			this.triggerSelection(selection);
		}
	}

/**
 * Toogle the selected state of a column. Callback for the onRowClick of the react fixed-dataTable.
 *
 * @param {object}	e  			Event which call the function
 * @param {integer}	rowIndex  	Index of the clicked row.
 */
	handleRowClick(e, rowIndex) {
		e.preventDefault();
		let clickedRow = this.state.data.get(rowIndex);
		let clickedId = clickedRow.get(this.props.idField);

		if (this.props.selectable) {
			this.toggleSelected(clickedId.toString());
		}
	}

/**
 * Check if all the current data are selected.
 *
 * @param {array}	data		The data to compare with selection
 * @param {object}	selection	The current selection Set of values (idField)
 */
	isAllSelected(data, selection) {
		let result = true;

		if (data.size === 0) return false;
		else if (data.size === this.state.rawdata.size) return selection.size >= this.state.data.size // Not filtered data

		// Filtered data
		data.forEach(element => {
			if (!selection.has(element.get(this.props.idField).toString())) { // Some data not in selection
				result = false;
				return false;
			}
		});

		return result;
	}

/**
 * Toogle the selected state of the column that has the same properId as in the parameters.
 *
 * @param {integet}	id  	Virtual field added to each row data on componnent's create
 */
	toggleSelected(id) {
		let selection = new Set(this.state.selection);

		if (selection.has(id)) {
			selection.delete(id);  // Returns a copy of the array with the instance with that properId deleted.
		} else {
			if (this.props.selectable == MULTIPLE_SELECTION) {
				selection.add(id);
			} else {
				selection = new Set([id]);
			}
		}

		this.triggerSelection(selection); // Set the new selection to the components state.
	}

/**
 * Before the components update set the updated selection data to the components state.
 *
 * @param {object}	nextProps	The props that will be set for the updated component
 * @param {object}	nextState	The state that will be set for the updated component
 */
	checkSelectionChange(nextProps, nextState) {
		if (nextProps.selectable == MULTIPLE_SELECTION) {
			if (nextState.selection.size !== this.state.selection.size){
				this.updateSelectionData(nextState.selection, nextState.allSelected);
			}
		} else if (nextProps.selectable == true) {
			let next = nextState.selection.values().next().value || null;
			let old = this.state.selection.values().next().value || null;

			if (next !== old){
				this.updateSelectionData(next);
			}
		}
	}

/**
 * Method called before the components update to set the new selection to states component and update the data
 *
 * @param {array}	newSelection	The new selected rows (Set object)
 * @param {array}	newAllSelected	If the new state has all the rows selected
 */
	updateSelectionData(newSelection, newAllSelected = false) {
		let newIndexed = this.state.indexed;
		let oldSelection = this.state.selection;
		let rowid = null, selected = null, rdata = null, curIndex = null, newData = this.state.data, rowIndex = null;

		if (this.props.selectable != MULTIPLE_SELECTION) {
			let oldId = oldSelection.values().next().value || null;

			if (!_.isNull(oldId)) {
				newIndexed[oldId]._selected = false; // Update indexed data
				rowIndex =  newIndexed[oldId]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set(SELECTED_FIELD, false); // Change the row in that index
				newData = newData.set(rowIndex, rdata); // Set that row in the data object
			}

			if (!_.isNull(newSelection)) {
				newIndexed[newSelection]._selected = true; // Update indexed data
				rowIndex =  newIndexed[newSelection]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set(SELECTED_FIELD, true); // Change the row in that index
				newData = newData.set(rowIndex, rdata); // Set that row in the data object
			}

		} else if (!newAllSelected && newSelection.size > 0 && newData.size === this.state.rawdata.size) { // Change one row data at a time
			let changedId = null, selected = null;

			// If the new selection hasn't an id of the old selection that means an selected element has been unselected.
			oldSelection.forEach(id => {
				if (!newSelection.has(id)) { // has not id
					changedId = id;
					selected = false;
					return false;
				}
			});

			// Otherwise a new row has been selected. Look through the new selection for the new element.
			if (!changedId) {
				newSelection.forEach(id => {
					if (!oldSelection.has(id)) {
						changedId = id;
						selected = true;
						return false;
					}
				});
			}

			if (changedId && newIndexed[changedId]) {
				newIndexed[changedId]._selected = selected; // Update indexed data
				rowIndex =  newIndexed[changedId]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set(SELECTED_FIELD, selected); // Change the row in that index
				newData = newData.set(rowIndex, rdata); // Set that row in the data object
			}
		} else { // Change all data
			newData = newData.map((row) => {
				rowid = row.get(this.props.idField);
				selected = newSelection.has(rowid.toString());
				rdata = row.set(SELECTED_FIELD, selected);
				curIndex = newIndexed[rowid];

				if (curIndex && curIndex._selected != selected) { // update indexed data
					curIndex._selected = selected;
					newIndexed[rowid] = curIndex;
				}

				return rdata;
			});
		}

		this.setState({
			data: newData,
			indexed: newIndexed
		});
	}

/**
 * In case that the new selection array be different than the selection array in the components state, then update
 * the components state with the new data.
 *
 * @param {array}	newSelection	The selected rows
 * @param {boolean}	sendSelection 	If the selection must be sent or not
 */
	triggerSelection(newSelection = new Set(), sendSelection = true) {
		if (sendSelection) {
			this.setState({
				selection: newSelection,
				allSelected: this.isAllSelected(this.state.data, newSelection)
			}, this.sendSelection);
		} else {
			this.setState({
				selection: newSelection,
				allSelected: this.isAllSelected(this.state.data, newSelection)
			});
		}
	}

/**
 * If the method afterSelect in the components props has a function then call it sending the selected rows in rawdata.
 */
	sendSelection(newSelection = null) {
		if (typeof this.props.afterSelect == 'function') {
			let {selection, initialIndexed, rawdata} = this.state;
			let output = [];
			let selectionArray = [];

			if (newSelection) {
				newSelection.forEach( element => {
					selectionArray.push(element);
				});
			} else {
				selection.forEach( element => {
					selectionArray.push(element);
				});
			}

			output = _.map(selectionArray, (pId) => {
				if (typeof initialIndexed[pId] == 'undefined') {
					return null;
				}

				let rowIndex = initialIndexed[pId]._rowIndex;

				return rawdata.get(rowIndex).toJSON();
			});

			output = _.compact(output);

			if (this.props.selectable === true && !_.isUndefined(output[0])) {
				output = output[0];
			}

			this.props.afterSelect(output, selectionArray);
		}
	}

/**
 * Send sorted data and column settings to the props getColSettings and afterSort
 *
 * @param (object)	data 			Component's data
 * @param (array)	colSettings 	Column settings of the table
 */
	sendSortedAndSettings(data, colSettings) {
		this.sendSortedData(data);
		this.sendColSettings(colSettings);
	}

/**
 * If the method afterSort in the components props has a function then call it sending the sorted data in the rawdata.
 *
 * @param (object)	data 			Component's data
 */
	sendSortedData(data) {
		if (typeof this.props.afterSort === 'function') {
			let {initialIndexed, rawdata} = this.state;
			let output = [];

			output = data.map( row => {
				let rowIndex = initialIndexed[row.get(this.props.idField)]._rowIndex;
				return rawdata.get(rowIndex);
			});

			this.props.afterSort(output.toJSON());
		}
	}

/**
 * Send the colSettings if the prop getColSettings is a function.
 *
 * @param (array)	colSettings 	Column settings of the table
 */
	sendColSettings(colSettings) {
		if (typeof this.props.getColSettings === 'function' && colSettings) {
  			this.props.getColSettings(colSettings);
  		}
	}

/**
 * Add a custom class to each row of the table. If that row is selected then add one more class to apply different css to seleted
 * rows.
 *
 * @param {integer}	index	Index of the row which will get the new classes.
 */
	getRowClassName(index) {
		let addClass = 'propertable-row', row = this.state.data.get(index);
		let selected = row.get(SELECTED_FIELD), enabled;

		if (this.props.hasDisableRows) {
			enabled = row.get('Enabled');

			if (!enabled) {
				addClass += ' disabled-row';
			}
		}

		if (selected) addClass += ' selected';

		return addClass;
	}

	onResize(width, column) {
		let sizes = this.state.sizes;
		let newsizes = sizes.set(column, width);

		this.setState({sizes: newsizes});
	}

	render() {
		// let content = <div className="propertable-empty">{this.props.msgs[this.props.lang].empty}</div>;
		let content = null, tableHeight = this.props.containerHeight || 400;
		let tableContent = this.buildTable();
		let footer = this.buildFooter();

		if (this.props.containerHeight && this.props.displayFooter) {
			tableHeight -= this.props.footerInfoHeight;
		}

		content = <Table
			ref="fixeddatatable"
			key={this.uniqueId+'-table'}
			width={this.props.containerWidth || 400}
			height={tableHeight}
			headerHeight={this.props.headerHeight || this.props.rowHeight}
			groupHeaderHeight={this.props.rowHeight}
			rowHeight={this.props.rowHeight}
			rowsCount={this.state.data.size}
			isColumnResizing={false}
			onRowClick={this.handleRowClick.bind(this)}
			rowClassNameGetter={this.getRowClassName.bind(this)}
			onColumnResizeEndCallback={this.onResize.bind(this)}
			className="propertable-table"
			{...this.props}
		>
			{tableContent}
		</Table>;

		return (
			<div key={this.uniqueId} id={this.uniqueId} className={'propertable '+this.props.className}>
				{content}
				{footer}
			</div>
		);
	}
}

ProperTable.propTypes = {
	className: React.PropTypes.string,
	data: React.PropTypes.array,
	cols: React.PropTypes.array.isRequired,
	uniqueId: React.PropTypes.oneOfType([
      	React.PropTypes.string,
      	React.PropTypes.number
    ]),
	afterSort: React.PropTypes.func,
	afterSelect: React.PropTypes.func,
	selectable: React.PropTypes.oneOf([true, MULTIPLE_SELECTION, false]),
	selected: React.PropTypes.oneOfType([
      	React.PropTypes.string,
      	React.PropTypes.number,
      	React.PropTypes.array,
      	React.PropTypes.object,
    ]),
    rowHeight: React.PropTypes.number,
    idField: React.PropTypes.string,
    msgs: React.PropTypes.objectOf(React.PropTypes.object),
    lang: React.PropTypes.string,
    selectorWidth: React.PropTypes.number,
    multisort: React.PropTypes.bool,
    sortIcons: React.PropTypes.object,
    iconColor: React.PropTypes.string,
    iconDefColor: React.PropTypes.string,
  	columnFilterComponent: React.PropTypes.oneOfType([
  		React.PropTypes.object,
      	React.PropTypes.func
    ]),
  	restartOnClick: React.PropTypes.oneOfType([
      	React.PropTypes.element,
      	React.PropTypes.object // Js element but not React element
    ]),
    restartOnClickType: React.PropTypes.oneOf([CLEAR_FILTERS, CLEAR_SORT, CLEAR_BOTH]),
    getColSettings: React.PropTypes.func,
    colSortDirs: React.PropTypes.objectOf(React.PropTypes.string),
    colFilters: React.PropTypes.objectOf(React.PropTypes.object),
    filterWidth: React.PropTypes.number,
    onScrollStart: React.PropTypes.func,
    onScrollEnd: React.PropTypes.func,
    hasDisableRows: React.PropTypes.bool,
    displayFooter: React.PropTypes.bool,
    footerInfoHeight: React.PropTypes.oneOfType([
    	React.PropTypes.number,
    	React.PropTypes.string
    ])
}

ProperTable.defaultProps = {
	className: '',
	cols: [],
	data: [],
	uniqueId: null,
	afterSort: null,
	afterSelect: null,
	selectable: true,
	selected: null,
	rowHeight: 50,
	idField: '_properId',
	msgs: messages,
	lang: 'ENG',
	selectorWidth: 27,
	multisort: false,
	columnFilterComponent: null,
	sortIcons: null,
	iconColor: '#5E78D3',
	iconDefColor: '#D6D6D6',
	restartOnClick: null,
	restartOnClickType: CLEAR_BOTH,
	getColSettings: null,
	colSortDirs: null,
	colFilters: null,
	filterWidth: null,
	onScrollStart: null,
	onScrollEnd: null,
	hasDisableRows: false,
	displayFooter: false,
	footerInfoHeight: 30
}

export default ProperTable;