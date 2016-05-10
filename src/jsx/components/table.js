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

//Const
const SELECTOR_COL_NAME = 'selector-multiple-column'; // Name of the selector column
const Set = require('es6-set');

/**
 * Component properties.
 *
 * cols: Describe columns data [name: colName, field: colField, formated: valFormater(), sortable: false ...]
 * data: Data of the table
 * afterSort: Function called after the data has been sorted. Return the rawdata sorted.
 * afterSelect: Function called after select a row. Return the seleted rows.
 * selectable: If the rows can be selected or not, and if that selection is multiple. Values: true || 'Multiple' || false
 * rowHeight: Height of each row in numerical value.
 * msgs: Get the translated messages of the current lang.
 * selectorWidth: Width of the selector column, checkboxes.
 * colSortDirs: To sort by default, direction (ASC, DESC, DEF(default)) of the columns. [{name: fieldName,  direction: 'DEF'},{},{}]
 * multisort: Multisort allowed or not. True || False
 * selected: Rows selected by default. Get an array of ids or an id
 * idField: Field that can be used as an id for the default selected rows.
 * columnFilterComponent: A react component to be rendered under the header icon. Must have afterSelect(selection) (selection is an array of column selected values (col.field)) and afterSort(sortDir) sort direction DEF | ASC | DESC
 * sortIcons: An array like the const SortIcons in HeaderCell file to use instead
 * iconColor: Color of the icon when the column filter is displayed or the column is filtered or ordered
 * iconDefColor: Color of the icon when the column filter isn't displayed and the column isn't filtered or ordered
 * restartOnClick: Restart the sort and filter of each column. It should be either a React Element (in this case it has to have id (best) or className (add event to all elements with same class aswell)) or a Js object (JS element document.getElementById('btn')).
 */
function defaultProps() {
	return {
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
		colSortDirs: null,
		multisort: false,
		columnFilterComponent: null,
		sortIcons: null,
		iconColor: '#5E78D3',
		iconDefColor: '#D6D6D6',
		restartOnClick: null
	};
}

/**
 * Check if the table has nested columns. Columns inside other columns. In that case this component will render the single columns as a
 * column inside a ColumnGroup even if the column has not childrens.
 *
 * @param (array)		cols  	Describe columns
 * @return (boolean)	result	True if has nested columns or false otherwhise
 */
function hasNested(cols) {
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

		this.state = {
			cols: Immutable.fromJS(this.props.cols),
			colSettings: initialColSettings.colSettings,
			colSortParsers: initialColSettings.colSortParsers,
			data: initialData.data,
			initialData: initialData.initialData,
			indexed: initialData.indexed,
			initialIndexed: initialData.initialIndexed,
			rawdata: initialData.rawdata,
			sizes: Immutable.fromJS({}),
			allSelected: false,
			selection: new Set(),
			selectionApplied: false,
			sortCache: initialData.defSortCache
		};
	}

	componentWillMount() {
		// Sort the table if the sort direction of one or more columns are diferent than default and set the selection
		this.applyDefault();

		// Add new click listener if exist
		if (this.props.restartOnClick) {
			this.addClickListener(this.props.restartOnClick);
		}
	}

	componentWillUnmount() {
		cache.flush('formatted');

		// Remove listener if exist
		if (this.props.restartOnClick) {
			this.removeClickListener(this.props.restartOnClick)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let propschanged = !shallowEqualImmutable(this.props, nextProps);
		let statechanged = !shallowEqualImmutable(this.state, nextState);
		let somethingchanged = propschanged || statechanged;

		if (propschanged) {
			let colsChanged = nextProps.cols.length != this.props.cols.length || !_.isEqual(nextProps.cols, this.props.cols);
			let dataChanged = nextProps.data.length != this.props.data.length || !_.isEqual(nextProps.data, this.props.data);
			let colData = null, preparedData = null;

			// If data and columns change the colSettings and all data states must be updated. Then apply default (sort table
			// and set selection if it has been received). If both change It's almost the same as rebuild the component. Almost everything changes
			if (colsChanged || dataChanged) {
				cache.flush('formatted');

				if (dataChanged) { // The most probably case
					preparedData = this.prepareData(nextProps, nextState);

					this.setState({
						data: preparedData.data,
						initialData: preparedData.initialData,
						indexed: preparedData.indexed,
						initialIndexed: preparedData.initialIndexed,
						rawdata: preparedData.rawdata,
						sortCache: preparedData.defSortCache,
						selectionApplied: false
					}, this.sortTable(nextState.colSettings, false));

				} else if (colsChanged && dataChanged) {
					preparedData = this.prepareData(nextProps, nextState);
					colData =  this.prepareColSettings(nextProps, preparedData.rawdata);

					this.setState({
						colSettings: colData.colSettings,
						colSortParsers: colData.colSortParsers,
						cols: Immutable.fromJS(nextProps.cols),
						data: preparedData.data,
						initialData: preparedData.initialData,
						indexed: preparedData.indexed,
						initialIndexed: preparedData.initialIndexed,
						rawdata: preparedData.rawdata,
						sortCache: preparedData.defSortCache,
						selectionApplied: false
					}, this.sortTable(colSortData.colSettings, false));

				} else if (colsChanged) {
					let sortCache = [];
					colData =  this.prepareColSettings(nextProps, this.state.rawdata);

					// Restart cache
					nextState.data.forEach(row => {
						sortCache[row.get(this.props.idField)] = {};
					});

					this.setState({
						colSettings: colData.colSettings,
						colSortParsers: colData.colSortParsers,
						cols: Immutable.fromJS(nextProps.cols),
						sortCache: sortCache
					}, this.applyDefault(nextState.colSettings, nextProps)); // apply selection and sort
				}

				return false;

			} else if (nextProps.selected) {
				this.setDefaultSelection(nextProps);

				return false;
			}
		}

		return somethingchanged;
	}

	componentWillUpdate(nextProps, nextState) {
		this.checkSelectionChange(nextProps, nextState);
	}

	componentWillReceiveProps(newProps) {
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
 * Apply default selection and sort table.
 *
 * @param (array)	colSettings Sort / Filter settings of each column. From current or next state (case the props data/cols change)
 * @param (array)	props 		Component props (or nextProps)
 */
	applyDefault(colSettings = this.state.colSettings, props = this.props) {
		this.uniqueId = props.uniqueId || _.uniqueId('propertable-');
		this.sortTable(colSettings, false);
		this.setDefaultSelection(props);
	}

/**
 * Prepare the data received by the component for the internal working.
 * @param  (array)	props 	Component props (or nextProps)
 * @param  (array)	state 	Component state (or nextState)
 * @return (array)	-rawdata: The same data as the props.
 *					-indexed: Same as rawdata but indexed by the properId
 *					-data: Parsed data to add some fields necesary to internal working.
 */
	prepareData(props = this.props, state = this.state) {
		// The data will be inmutable inside the component
		let data = Immutable.fromJS(props.data), index = 0, id, sortCache = [];
		let indexed = {}, initialData = null, parsed = [], selectedarr = [];
		let keyField = this.props.idField;

		if (props.selected) {
			if (!_.isArray(props.selected)) {
				selectedarr = [props.selected];
			} else {
				if (props.selectable == 'multiple') selectedarr = props.selected;
				else selectedarr = [props.selected[0]];
			}
		} else {
			if (state && state.selection) {
				state.selection.forEach(id => {
					selectedarr.push(id);
				});
			}
		}

		selectedarr = new Set(selectedarr);

		// Parsing data to add new fields (selected or not, properId, rowIndex)
		parsed = data.map(row => {
			id = row.get(keyField, false);

			if (!id) {
				id = _.uniqueId();
				row = row.set(keyField, id);
			}

			if (selectedarr.has(id)) {
				row = row.set('_selected', true);
			} else {
				row = row.set('_selected', false);
			}

			row = row.set('_rowIndex', index++);

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
			defSortCache: sortCache
		};
	}

/**
 *	Set the default selection if that exist in props
 *
 * @param (array)	props 	Component props (or nextProps)
 */
	setDefaultSelection(props = this.props) {
		if (props.selected) {
			let selected = props.selected, selection;

			if (selected.length == 0) {
				selection = new Set();
			} else {
				if (!_.isArray(selected)) {
					selection = new Set([selected.toString()]);
				} else {
					if (props.selectable == 'multiple') selection = new Set(selected.toString().split(','));
					else selection = new Set([selected[0].toString()]);
				}
			}

			this.triggerSelection(selection, false); // false -> don't send the selection
		}
	}

/**
 * Prepare the columns sort / filtering data to all columns and the array of functions to parse the data of each column before sorting.
 *
 * @param (array)	props 			Component props (or nextProps)
 * @param (object)	rawdata			Initial data to build the indexed and Inmutable data (no duplicates) for every column if the component has complex column filter
 *
 * @return (array)	-colSettings: 	Sort / filter settings of each column.
 *					-colSortParsers: 	Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
 */
	prepareColSettings(props = this.props, rawdata = null) {
        let colSortDirs = props.colSortDirs, cols = props.cols, colSettings = [];
        let sortData = this.buildColSortDirs(cols); // Build the initial colsortdirs using the cols array.
        let multisort = props.multisort, direction = null, sortable = null, colData = null, indexed = null, parsedData = null;

		// If the component doesn't receive the colSortDirs array with a diferent direction than default then set to
		// colSortDirs the default values.
        if (_.isNull(colSortDirs)) {
            colSortDirs = sortData.colSortDirs;
        }

        // Through each element, of the colSortDirs built data, build the colSortDirs with the default directions received,
        // setting a position (position of priority to sort (it will be modified after click on the diferent columns)), if
        // the column is sortable or not and if the Table has multisort or just only single.
        for (let i = 0; i <= sortData.colSortDirs.length - 1; i++) {
        	colData = sortData.colSortDirs[i];
        	direction = colData.direction;
        	sortable = colData.sortable !== null ? colData.sortable : true;

        	// Find the current column sort data and set direction (if the component got default sort direction for this column
        	// then it will get the direction otherwise direction will be always DEF)
         	colSortDirs.forEach(element => {
         		if (element.column ==  colData.column) direction = element.direction;
         	});

         	// If has filter build a list without duplicates and it indexed
         	if (this.props.columnFilterComponent) {
         		let idSet = new Set(), index = 0, rawdataIndex = 0, hasNulls = false, val, valid;

				// Parsing data for filter
				parsedData = rawdata.map(row => {
					val = row.get(colData.field);
					valid = false

					if (!_.isNull(val)){
						if (colData.formatter) {
							val = colData.formatter(val);
 						}

						if (typeof val == 'string' && val.length > 0) valid = true;
						else if (typeof val == 'number' && val > 0) valid = true;

						if (!idSet.has(val) && valid) {
							idSet.add(val);
							row = row.set(colData.field, val.toString());
							row = row.set('_selected', false);
							row = row.set('_rowIndex', index++); // data row index
							row = row.set('_rawDataIndex', rawdataIndex++); // rawData row index
							return row;
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
         		direction: direction,
         		position: i + 1,
         		sorted: false,
         		multisort: multisort, // single (false) (in this case only one at a time can be sorted) or multisort (true - all true)
         		sortable: sortable,
         		selection: [], // Selected values of this column (to filter when has a complex filter)
         		indexedData: indexed, // Indexed by this column (just if has complex filter)
         		data: parsedData,
         		formatter: colData.formatter
         	});
        }

        // Ordering by selected rows. Virtual column
        if (props.selectable == 'multiple') {
        	colSettings.push({
         		column: SELECTOR_COL_NAME, // Column name
         		field: '_selected',
         		direction: 'DEF',
         		position: sortData.colSortDirs.length + 1, // Last
         		sorted: false,
         		multisort: multisort,
         		sortable: true,
         		selection: [],
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
					direction: 'DEF',
					sortable: sortable,
					formatter: formatter
				});
			} else {
				this.buildColSortDirs(element.children, colSortDirs, sortVals);
			}
		});

		if (this.props.selectable == 'multiple') {
		  	sortVals[SELECTOR_COL_NAME] = function(val) {return val};
		}

		return {
			colSortDirs: colSortDirs,
			sortVals: sortVals
		}
	}

/**
 * Clear all column filters and sort directions
 */
	clearFilterAndSort(e) {
		e.preventDefault();
		let colSettings = this.state.colSettings, data, indexed = this.state.indexed;

		colSettings = _.map(colSettings, element => {
			element.selection = [];
			element.direction = 'DEF';

			return element;
		});

		// Apply default
		data = this.state.initialData.map((element, index) => {
			if (this.state.selection.has(element.get(this.props.idField))) {
				element = element.set('_selected', true);
			}
			indexed[element.get(this.props.idField)]._rowIndex = index; // Update index into indexed data.

			return element;
		});

		this.setState({
			data: data,
			indexed: indexed,
			colSettings: colSettings
		});
	}

/**
 * Function called each time the user click on the header of a column, then apply a sortBy function in that column.
 * After that, update the state of the component
 *
 * @param {String} 		columnKey 	The name of the column which will be resort.
 * @param {String} 		sortDir 	The new direction of the sort. ASC || DESC || DEF(AULT)
 */
	onSortChange(columnKey, sortDir) {
  		let colSettings = this.updateSortDir(columnKey, sortDir);
  		this.sortTable(colSettings);
	}

/**
 * Function called (just when a component has been sent in props columnFilterComponent) each time the user click on the header of a column,
 * then apply's an filter over the initial data using the current selected values, also update the selection in the colSettings state
 *
 * @param {String} 		columnKey 	The name of the column which will get a new selection filter from the complex filter.
 * @param {object}		selection 	The values selected to filter this column (values from all the values of this column)
 * @param {String} 		sortDir 	(Just on clear filter) The direction of the sort.
 */
	onColumnGetFiltered(columnKey, selection, sortDir = null) {
		let colSettings = _.clone(this.state.colSettings), filter = '', selectionSet = {}, columnKeysFiltered = [], fields = [], formatters = []; // new Set(selection)
		let {data, initialData, indexed} = this.state;
		let filteredData = initialData, idField = this.props.idField;

		// Update selection of this column in the colSettings and add this values to the selection set array if the selection has more than 0
		// elements.
		colSettings = _.map(colSettings, col => {
			if (col.column !== SELECTOR_COL_NAME) {
				if (col.column === columnKey) { // Update
					col.selection = selection;
				}

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

		// Get the data that match with the selection (of all column filters)
		if (_.size(selectionSet) > 0) {
			let result = false, field, formatter, val;

			filteredData = initialData.filter(element => {
				columnKeysFiltered.every(column => {
					field = fields[column];
					formatter = formatters[column];
					val = element.get(field);

					if (formatter) {
						val = formatter(val);
					}

					if (!_.isNull(val)) result = selectionSet[column].has(val.toString());
					return result;
				});

				return result;
			});
		}

		// Apply selection and update index of each element in indexed data
		filteredData = filteredData.map((element, index) => {
			if (this.state.selection.has(element.get(idField))) {
				element = element.set('_selected', true);
			}
			indexed[element.get(idField)]._rowIndex = index; // Update index into indexed data.

			return element;
		});

		if (_.isNull(sortDir)) {
			this.setState({
				data: filteredData,
				indexed: indexed,
				colSettings: colSettings
			});
		} else {
			this.setState({
				data: filteredData,
				indexed: indexed,
				colSettings: colSettings
			}, this.onSortChange(columnKey, sortDir));
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
 * @return {array}		colSettings Updated colSettings array.
 */
	updateSortDir(columnKey, sortDir) {
		let colSettings = this.state.colSettings || [], position = 1;

		// Single sorting.
		if (!this.props.multisort) {
			for (let i = 0; i <= colSettings.length - 1; i++) {
				if (colSettings[i].column == columnKey) {
					colSettings[i].direction = sortDir;
					colSettings[i].multisort = true;
				} else {
					colSettings[i].direction = 'DEF';
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

				if (colSettings[i].column == columnKey) {
					colSettings[i].direction = sortDir; // Set the new direction
					position = colSettings[i].position; // Save the current position
					index = i;

					// If the sort direction is not default and the column isn't already sorted then add one to the initial position
					// and set the column to sorted. Otherwise if the sort direction is default set it to unsorted.
					if (sortDir != 'DEF' && !colSettings[i].sorted) {
						initialPos++;
						colSettings[i].sorted = true;
					} else if (sortDir == 'DEF') {
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
					if (colSettings[i].direction == 'DEF') colSettings[i].position = colSettings[i].position + 1;
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
 * @param 	{array}		data 		Data to be sorted

 * @return 	{array}		-colSettings: Sorted column in colSettings
 *						-data: Sorted data to be updated in the component state.
 */
	sortTable(colSettings, sendSorted = true) {
		let data = this.state.data;

		colSettings = _.sortBy(colSettings, (element) => {
			return element.position;
		}).reverse();

		data = this.sortColumns(data, colSettings);

		if (sendSorted) {
			this.setState({
	  			data: data.data,
	  			indexed: data.indexed,
		      	colSettings: colSettings,
		      	sortCache: data.sortCache
		    }, this.sendSortedData(data.data));
		} else {
			this.setState({
	  			data: data.data,
	  			indexed: data.indexed,
		      	colSettings: colSettings,
		      	sortCache: data.sortCache
		    });
		}
	}

/**
 * Get the current colSettings state, sort it by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
 *
 * @param 	{array}		data 		Data to be render in the Table
 * @param 	{array}		colSettings Sort / filter settings of each column. Sorted by its .position
 * @return 	{array}		sortedData 	Sorted data to be updated in the component state.
 */
	sortColumns(data, colSettings) {
		let sortedData = data, indexed = _.clone(this.state.indexed);
		let colSortParsers = this.state.colSortParsers, sortParser = null, sortCache = this.state.sortCache;
		let defaultSort = true, element = null, position = null, rowId;

		colSettings.forEach((element) => {
			// The colums could be all true (multisort) or just one of them at a time (all false but the column that must be sorted)
			if (element.direction != 'DEF' && element.multisort && element.sortable) {
				sortParser = colSortParsers[element.column];

				sortedData = sortedData.sortBy((row, rowIndex, allData) => {
					rowId = row.get(this.props.idField);

					// sortCache [row-id] [column-id] = procesed value.
					if (_.isUndefined(sortCache[rowId][element.field])) {
						sortCache[rowId][element.field] = sortParser(row.get(element.field));
					}

	  				return sortCache[rowId][element.field];
				}, (val1, val2) => {
					if (val1 == val2) {
						return 0;
					} else if (element.direction == 'ASC') {
						return val1 > val2? 1 : -1;
					} else if (element.direction == 'DESC') {
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
	  			return row.get('_rowIndex');
			}, (val1, val2) => {
				return val1 > val2? 1 : (val1 == val2 ? 0:-1);
			});
		}

		// Update index into indexed data.
		sortedData.map((element, index) => {
			indexed[element.get(this.props.idField)]._rowIndex = index;
		});

		return {
			data: sortedData,
			indexed: indexed,
			sortCache: sortCache
		}
	}


/**
 * Recursive function that build the nested columns. If the column has childrens then call itself and put the column into
 * a ColumnGroup.
 *
 * @param 	{array}		colData 	Data to be parsed
 * @param 	{boolean}	isChildren	Is a children of another column or not
 * @param 	{boolean}	hasNested	The whole table has nested columns or not
 * @return 	{object}	col 		The builded column or tree of columns
 */
	parseColumn(colData, isChildren = false, hasNested = false) {
		let col = null, colname = null, sortDir = 'DEF', sortable = null, selection = null, columnFilter = null, hasComplexFilter = false;
		let indexed = null, headerData = null, className = null, settings = null, extraProps = {
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

			if (typeof colData.flex != 'undefined') {
				extraProps.flexGrow = colData.flex;
			}
		}

		if (typeof colData.fixed !== 'undefined') {
			extraProps.fixed = colData.fixed;
		}

		if (typeof colData.isResizable !== 'undefined') {
			extraProps.isResizable = colData.isResizable;
		}

		// If this column doesn't have childrens then build a column, otherwise build a ColumnGroup and call the method recursively
		// setting the result inside this columns group.
		if (typeof colData.children == 'undefined' || !colData.children.length) {
			// Get column settings
			settings = _.findWhere(this.state.colSettings, {column: colname});

			// If this column can be sort or not.
			sortable = _.isUndefined(colData.sortable) ? true : colData.sortable;

			// Check for a complex filter component. In that case use onColumnFilter instead of onSortChange. That method render the received component
			// just beside the icon of the column header
			if (this.props.columnFilterComponent) { // react component
				hasComplexFilter = true;
				columnFilter = this.onColumnGetFiltered.bind(this);
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
						selection={settings.selection} // selection for complex filter
						iconColor={this.props.iconColor} // icon color when column filter displayed
						iconDefColor={this.props.iconDefColor} // icon color when column filter closed
						col={colData.field}
						lang={this.props.lang}
						sortDir={settings.direction}
						children={colData.label}
						colName={colData.name}
						sortable={sortable}
						userClassName={className}
						columnFormater={null} // Formatter function that get the value to be render and return it parsed settings.formatter
					/>
				}
				cell={<CellRenderer tableId={this.uniqueId} idField={this.props.idField} indexed={this.state.indexed} data={this.state.data} colData={colData} col={colData.field}/>}
				allowCellsRecycling={!hasComplexFilter}
				align='center'
				{...extraProps}
			/>;

			// If isn't a children but the table has nested columns set the column into a group.
			if (!isChildren && hasNested) {
				col = <ColumnGroup key={colname+'-group'} fixed={extraProps.fixed}>{col}</ColumnGroup>
			}
		} else {
			// Call the method recursively to all the childrens of this column.
			let inner = colData.children.map((c) => this.parseColumn(c, true));

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
 * @return {array} 	columns 	Array with all the columns to be rendered.
 */
	buildTable() {
		let columns = [], isNested = hasNested(this.state.cols), selColumn = null;

		if (this.props.selectable == 'multiple') {
			let somethingSelected = this.state.selection.size > 0, allSelected = this.props.columnFilterComponent ? this.isAllSelected(this.state.data, this.state.selection) : this.state.allSelected;
			let settings = null, sortDir = 'DEF', selectedSet = null;

			if (this.props.selected) {
				if (!_.isArray(this.props.selected)) {
					selectedSet = new Set([this.props.selected]);
				} else {
					selectedSet = new Set(this.props.selected);
				}
			} else {
				selectedSet = this.state.selection;
			}

			settings = _.findWhere(this.state.colSettings, {column: SELECTOR_COL_NAME})
			sortDir = settings.direction;

			selColumn = <Column
				columnKey={SELECTOR_COL_NAME}
				key={_.uniqueId('selector-')}
				header={
					<HeaderCell
						className={''}
						onSortChange={this.onSortChange.bind(this)}
						sortDir={sortDir}
						sortable={true}
					>
						<Selector
							onClick={this.handleSelectAll.bind(this)}
							somethingSelected={somethingSelected}
							allSelected={allSelected}
							isHeader={true}
						/>
					</HeaderCell>
				}
				cell={<Selector
					data={this.state.data}
					selected={selectedSet}
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
			columns.push(this.parseColumn(col.toJSON(), false, isNested));
		});

		return columns;
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

		let clickedId = this.state.data.get(rowIndex).get(this.props.idField);

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
		if (data.size === this.state.rawdata.size) return selection.size >= this.state.data.size // Not filtered data

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
			if (this.props.selectable == 'multiple') {
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
		if (nextProps.selectable == 'multiple') {
			if (nextState.selection.size !== this.state.selection.size || (!nextState.selectionApplied && nextState.selection.size > 0)){
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

		if (this.props.selectable != 'multiple') {
			let oldId = oldSelection.values().next().value || null;

			if (!_.isNull(oldId)) {
				newIndexed[oldId]._selected = false; // Update indexed data
				rowIndex =  newIndexed[oldId]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set('_selected', false); // Change the row in that index
				newData = newData.set(rowIndex, rdata); // Set that row in the data object
			}

			if (!_.isNull(newSelection)) {
				newIndexed[newSelection]._selected = true; // Update indexed data
				rowIndex =  newIndexed[newSelection]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set('_selected', true); // Change the row in that index
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

			newIndexed[changedId]._selected = selected; // Update indexed data
			rowIndex =  newIndexed[changedId]._rowIndex; // Get data index
			rdata = newData.get(rowIndex).set('_selected', selected); // Change the row in that index
			newData = newData.set(rowIndex, rdata); // Set that row in the data object

		} else { // Change all data
			newData = newData.map((row) => {
				rowid = row.get(this.props.idField);
				selected = newSelection.has(rowid.toString());
				rdata = row.set('_selected', selected);
				curIndex = newIndexed[rowid];

				if (curIndex._selected != selected) { // update indexed data
					curIndex._selected = selected;
					newIndexed[rowid] = curIndex;
				}

				return rdata;
			});
		}

		this.setState({
			data: newData,
			indexed: newIndexed,
			selectionApplied: true
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
 * If the method afterSort in the components props has a function then call it sending the sorted data in the rawdata.
 */
	sendSortedData(data) {
		if (typeof this.props.afterSort == 'function') {
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
 * Add a custom class to each row of the table. If that row is selected then add one more class to apply different css to seleted
 * rows.
 *
 * @param {integer}	index	Index of the row which will get the new classes.
 */
	getRowClassName(index) {
		let addClass = 'propertable-row', selected = this.state.data.get(index).get('_selected');

		if (selected) addClass += ' selected';

		return addClass;
	}

	onResize(width, column) {
		let sizes = this.state.sizes;
		let newsizes = sizes.set(column, width);

		this.setState({sizes: newsizes});
	}

	render() {
		let content = <div className="propertable-empty">{this.props.msgs[this.props.lang].empty}</div>;
		let tableContent = this.buildTable();

		content = <Table
			ref="fixeddatatable"
			key={this.uniqueId+'-table'}
			width={this.props.containerWidth || 100}
			height={this.props.containerHeight || 100}
			headerHeight={this.props.rowHeight}
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

		return <div key={this.uniqueId} id={this.uniqueId} className={'propertable '+this.props.className}> {content} </div>;
	}
}

ProperTable.defaultProps = defaultProps();
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
	selectable: React.PropTypes.oneOf([true, 'multiple', false]),
	selected: React.PropTypes.oneOfType([
      	React.PropTypes.string,
      	React.PropTypes.array
    ]),
    rowHeight: React.PropTypes.number,
    idField: React.PropTypes.string,
    msgs: React.PropTypes.objectOf(React.PropTypes.object),
    lang: React.PropTypes.string,
    selectorWidth: React.PropTypes.number,
    colSortDirs: React.PropTypes.array,
    multisort: React.PropTypes.bool,
    sortIcons: React.PropTypes.object,
    iconColor: React.PropTypes.string,
    iconDefColor: React.PropTypes.string,
  	columnFilterComponent: React.PropTypes.oneOfType([
      	React.PropTypes.element,
      	React.PropTypes.func
    ]),
  	restartOnClick: React.PropTypes.oneOfType([
      	React.PropTypes.element,
      	React.PropTypes.object // Js element but not React element
    ]),
}

export default ProperTable;