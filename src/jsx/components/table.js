import React from 'react';
import {Table, Column, Cell, ColumnGroup} from 'fixed-data-table';
import Immutable from 'immutable';
import _ from 'underscore';
import messages from "../lang/messages";
import Selector from './selector';
import CellRenderer from './cellRenderer';
import SortHeaderCell from './sortHeaderCell';
import bs from 'binarysearch';
import clone from 'clone';
const Set = require('es6-set');

/**
 * Component properties.
 *
 * cols: Describe columns data [name: colName, field: colField, formated: valFormater(), sortable: false ...]
 * data: Data of the table
 * afterSort: Function called after the data has been sorted. Return the rawdata sorted.
 * afterSelect: Function called after select a row. Return the seleted rows.
 * selectable: If the rows can be selected or not, and if that selection is multiple. Values: True || 'Multiple' || False
 * rowHeight: Height of each row in numerical value.
 * msgs: Get the translated messages of the current lang.
 * selectorWidth: Width of the selector column, checkboxes.
 * colSortDirs: To sort by default, direction (ASC, DESC, DEF(default)) of the columns. [{name: fieldName,  direction: 'DEF'},{},{}]
 * multisort: Multisort allowed or not. True || False
 * selected: Rows selected by default. Get an array of ids or an id
 * idField: Field that can be used as an id for the default selected rows.
 */
function defaultProps() {
	return {
		className: '',
		cols: [],
		data: [],
		uniqueId: _.uniqueId('propertable-'),
		afterSort: null,
		afterSelect: null,
		selectable: true,
		selected: null,
		rowHeight: 50,
		idField: '_properId',
		msgs: messages,
		selectorWidth: 27,
		colSortDirs: null,
		multisort: false
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
		let initialColSort = this.prepareColSort();

		this.hasFixedColumns = false;

		this.state = {
			cols: Immutable.fromJS(this.props.cols),
			colSortDirs: initialColSort.colSortDirs,
			colSortVals: initialColSort.sortValues,
			data: initialData.data,
			indexed: initialData.indexed,
			rawdata: initialData.rawdata,
			sizes: Immutable.fromJS({}),
			allSelected: false,
			selection: new Set()
		};
	}

	componentDidMount() {
		// Sort the table if the sort direction of one or more columns are diferent than default.
		this.sortTable(this.state.colSortDirs);
		this.setDefaultSelection();
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.cols.length != this.props.cols.length || !_.isEqual(nextProps.cols, this.props.cols)) {
			this.setState({
				cols: Immutable.fromJS(nextProps.cols)
			});
			this.sortTable(nextState.colSortDirs);
		}

		if (nextProps.data.length != this.props.data.length || !_.isEqual(nextProps.data, this.props.data)) {
			let prepared = this.prepareData(nextProps.data);

			this.setState(prepared, () => {
				this.setDefaultSelection(nextProps);
				this.sortTable(nextState.colSortDirs);
			});
		}

		return true;
	}

/**
 * Prepare the data received by the component for the internal working.
 *
 * @return (array)	-rawdata: The same data as the props.
 *					-indexed: Same as rawdata but indexed by the properId
 *					-data: Parsed data to add some fields necesary to internal working.
 */
	prepareData(newdata = this.props.data) {
		// The data will be inmutable inside the component
		let data = Immutable.fromJS(newdata), index = 0;
		let indexed = [], parsed = [];
		let keyField = this.props.idField;

		// Parsing data to add new fields (selected or not, properId, rowIndex)
		parsed = data.map(row => {
			if (!row.get(keyField, false)) {
				row = row.set(keyField, _.uniqueId());
			}
			if (!row.get('_selected', false)) {
				row = row.set('_selected', false);
			}

			row = row.set('_rowIndex', index++);

			return row;
		});

		// Prepare indexed data.
		indexed = _.indexBy(parsed.toJSON(), keyField);

		return {
			rawdata: data,
			data: parsed,
			indexed: indexed
		};
	}

/**
 * Prepare data or restart the data to default.
 */
	initData(data = this.props.data) {
		let newdata = this.prepareData(data);

		this.setState(newdata);
	}

	setDefaultSelection(props = this.props) {
		if (props.selected) {
			let selected = props.selected;
			let selection = new Set();

			if (!_.isArray(selected)) {
				selection.add(selected.toString());
			} else {
				selected.forEach( element => {
					selection.add(element.toString());
				});
			}

			this.triggerSelection(selection);
		}
	}

/**
 * Prepare the columns sort data to all columns and the array of functions to parse the data of each column before sorting.
 *
 * @return (array)	-colSortDirs: Sort settings of each column.
 *					-sortValues: Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
 */
	prepareColSort() {
        let colSortDirs = this.props.colSortDirs, cols = this.props.cols;
        let sort = [], multisort = this.props.multisort;
		let direction = null, sortable = null, colData = null;
		let sortData = this.buildColSortDirs(cols); // Build the initial colsortdirs using the cols array.

		// If the component doesn't receive the colSortDirs array with a diferent direction than default then set to
		// colSortDirs the default values.
        if (_.isNull(colSortDirs)) {
            colSortDirs = sortData.colSortDirs;
        }

        // Through each element of the colSortDirs builded data build the colSortDirs with the default directions received,
        // setting a position (position of priority to sort (it will be modified after click on the diferent columns)), if
        // the column is sortable or not and if the Table has multisort or just only single.
        for (let i = 0; i <= sortData.colSortDirs.length - 1; i++) {
        	colData = sortData.colSortDirs[i];
        	direction = colData.direction;
        	sortable = colData.sortable !== null ? colData.sortable : true;

         	colSortDirs.forEach(element => {
         		if (element.column ==  colData.column) direction = element.direction;
         	});

         	sort.push({
         		column: colData.column, // Column name
         		field: colData.field,
         		direction: direction,
         		position: i + 1,
         		sorted: false,
         		multisort: multisort, // single (false) (in this case only one at a time can be sorted) or multisort (true - all true)
         		sortable: sortable
         	});
        }

        // Ordering by selected rows. Virtual column
        if (this.props.selectable == 'multiple') {
        	sort.push({
         		column: 'selector-multiple-column', // Column name
         		field: '_selected',
         		direction: 'DEF',
         		position: sortData.colSortDirs.length + 1, // Last
         		sorted: false,
         		multisort: multisort,
         		sortable: true
         	});
        }

        return {
            colSortDirs: sort,
            sortValues: sortData.sortVals
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

				sortVals[element.name] = element.sortVal || function(val) {return val}; // Function to iterate

				colSortDirs.push({
					column: element.name,
					field: element.field,
					direction: 'DEF',
					sortable: sortable
				});
			} else {
				this.buildColSortDirs(element.children, colSortDirs, sortVals);
			}
		});

		if (this.props.selectable == 'multiple') {
		  	sortVals['selector-multiple-column'] = function(val) {return val};
		}

		return {
			colSortDirs: colSortDirs,
			sortVals: sortVals
		}
	}

/**
 * Function called each time the user click on the header of a column, then apply a sortBy function in that column.
 * After that, update the state of the component
 *
 * @param {String} 		columnKey 	The name of the column which will be resort.
 * @param {String} 		sortDir 	The direction of the sort. ASC || DESC || DEF(AULT)
 */
	onSortChange(columnKey, sortDir) {
  		let newData = null;
  		let colSortDirs = this.updateSortDir(columnKey, sortDir);
  		newData = this.sortTable(colSortDirs);

  		this.setState({
  			data: newData.data,
	      	colSortDirs: newData.colSortDirs
	    }, this.sendSortedData());
	}

/**
 * Receive the column name and a sort direction and change the direction of that column, then set the proper position
 * of all the columns (just if the Table have multisorting allowed). The position will be used to set which columns
 * will be sorted first. If there are some columns with sortDir ASC or DESC the data will be sorted in function of
 * what element was clicked before.
 *
 * @param {String} 		columnKey 	The name of the column which will be resort.
 * @param {String} 		sortDir 	The direction of the sort. ASC || DESC || DEF(AULT)
 * @return {array}		colSortDirs Updated colSortDirs array.
 */
	updateSortDir(columnKey, sortDir) {
		let colSortDirs = this.state.colSortDirs || [], position = 1;

		// Single sorting.
		if (!this.props.multisort) {
			for (let i = 0; i <= colSortDirs.length - 1; i++) {
				if (colSortDirs[i].column == columnKey) {
					colSortDirs[i].direction = sortDir;
					colSortDirs[i].multisort = true;
				} else {
					colSortDirs[i].direction = 'DEF';
					colSortDirs[i].multisort = false;
				}
			}
		} else {
			// Multisort
			let initialPos = 0, index = 0;

			for (let i = 0; i <= colSortDirs.length - 1; i++) {
				// If some columns were sorted before then the position of the sorted columns wont be changed, so the initial
				// position will be the next. If 2 columns are already sorted and we sort by a new one then the position of this
				// last column will be 3 and will change to 2 or 1 if the sorted columns back to default.
				if (colSortDirs[i].sorted) initialPos++;

				if (colSortDirs[i].column == columnKey) {
					colSortDirs[i].direction = sortDir; // Set the new direction
					position = colSortDirs[i].position; // Save the current position
					index = i;

					// If the sort direction is not default and the column isn't already sorted then add one to the initial position
					// and set the column to sorted. Otherwise if the sort direction is default set it to unsorted.
					if (sortDir != 'DEF' && !colSortDirs[i].sorted) {
						initialPos++;
						colSortDirs[i].sorted = true;
					} else if (sortDir == 'DEF') {
					 	colSortDirs[i].sorted = false;
					}
				}
			}

			// Change the priority position to sort of the elements.
			for (let i = 0; i <= colSortDirs.length - 1; i++) {

				// When the position of the current element is lower than the position of the changed element and bigger or equals to the
				// initial position to change.
				if (colSortDirs[i].position < position && colSortDirs[i].position >= initialPos) {
					// Move element to the next position only if the new sort direction wasn't default, in that case keep the element in the same
					// sorting priority position.
					if (colSortDirs[i].direction == 'DEF') colSortDirs[i].position = colSortDirs[i].position + 1;
				}
			}

			// After change the sort position priority of the other elements if the new position is lower than the current position set new position.
			if (initialPos < colSortDirs[index].position) colSortDirs[index].position = initialPos;
		}

		return colSortDirs;
	}

/**
 * Receive the current colSortDirs state, sort it by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
 *
 * @param 	{array}		colSortDirs Sort settings of each column
 * @return 	{array}		-colSortDirs: Sorted colSortDirs
 *						-data: Sorted data to be updated in the component state.
 */
	sortTable(colSortDirs) {
		let data = this.state.data;

		colSortDirs = _.sortBy(colSortDirs, (element) => {
			return element.position;
		});
		data = this.sortColumns(data, colSortDirs);

		return {
			data: data,
			colSortDirs: colSortDirs
		};
	}

/**
 * Receive the current colSortDirs state, sort it by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
 *
 * @param 	{array}		data 		Data to be render in the Table
 * @param 	{array}		colSortDirs Sort settings of each column. Sorted by its .position
 * @return 	{array}		sortedData 	Sorted data to be updated in the component state.
 */
	sortColumns(data, colSortDirs) {
		let sortedData = data;
		let sortVals = this.state.colSortVals, sortVal = null;
		let defaultSort = true, element = null, position = null;

		for (let i = 0; i <= colSortDirs.length - 1; i++) {
			position = colSortDirs[i].position - 1; // Pos starts on 1,2,3,4... but array pos should start on 0 to length -1.
			element = colSortDirs[position];

			// The colums could be all true (multisort) or just one of them at a time (all false but the column that must be sorted)
			if (element.direction != 'DEF' && element.multisort && element.sortable) {
				sortVal = sortVals[element.column];
				sortedData = sortedData.sortBy((row, rowIndex, allData) => {
	  				return sortVal(row.get(element.field));
				}, (val1, val2) => {
					if (val1 == val2) {
						return 0;
					} else if (element.direction == 'ASC') {
						return val1 > val2? -1 : 1;
					} else if (element.direction == 'DESC') {
					 	return val1 > val2? 1 : -1;
					}
				});
				defaultSort = false;
			}
		}

		// If all the cols are default then sort the data by the rowIndex (virtual field added on componnent's create.)
		if (defaultSort) {
			//  Set to default
			sortedData = data.sortBy((row, rowIndex, allData) => {
	  			return row.get('_rowIndex');
			}, (val1, val2) => {
				return val1 > val2? 1 : (val1 == val2 ? 0:-1);
			});
		}

		return sortedData;
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
		let col = null, colname = null, sortDir = 'DEF', sortable = null, className = null, extraProps = {
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

			// Get the initial dir of this column
			this.state.colSortDirs.forEach(element => {
				if (element.column === colname) sortDir = element.direction;
			});

			// If this column can be sort or not.
			sortable = _.isUndefined(colData.sortable) ? true : colData.sortable;

			col = <Column
				columnKey={colname}
				key={_.uniqueId(colname)}
				header={
					<SortHeaderCell
						onSortChange={this.onSortChange.bind(this)}
						sortDir={sortDir}
						children={colData.label}
						sortable={sortable}
						userClassName={className}
					/>
				}
				cell={<CellRenderer data={this.state.data} colData={colData} col={colData.field}/>}
				allowCellsRecycling
				align='center'
				{...extraProps}
			/>;

			// If isn't a children but the table has nested columns set the column into a group.
			if (!isChildren && hasNested) {
				col = <ColumnGroup key={_.uniqueId(colname+'-group')} fixed={extraProps.fixed}>{col}</ColumnGroup>
			}
		} else {
			// Call the method recursively to all the childrens of this column.
			let inner = colData.children.map((c) => this.parseColumn(c, true));

			col = <ColumnGroup
				columnKey={colname}
				key={_.uniqueId(colname)}
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
			let somethingSelected = this.state.selection.size > 0;
			let sortDir = 'DEF';

			this.state.colSortDirs.forEach(element => {
				if (element.column === 'selector-multiple-column') sortDir = element.direction;
			});

			selColumn = <Column
				columnKey={'selector-multiple-column'}
				key={_.uniqueId('selector-')}
				header={
					<SortHeaderCell
						className={''}
						onSortChange={this.onSortChange.bind(this)}
						sortDir={sortDir}
						sortable={true}
					>
						<Selector
							onClick={this.handleSelectAll.bind(this)}
							somethingSelected={somethingSelected}
							allSelected={this.state.allSelected}
							isHeader={true}
						/>
					</SortHeaderCell>
				}
				cell={<Selector
					data={this.state.data}
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
		let allSelected = this.state.allSelected;
		let newSelection = [];
		let selection = null;

		if (!allSelected) {
			newSelection = _.keys(this.state.indexed);
		}

		selection = new Set(newSelection);

		this.triggerSelection(selection);
	}

/**
 * Toogle the selected state of a column. Callback for the onRowClick of the react fixed-dataTable.
 *
 * @param {object}	e  			Event which call the function
 * @param {integer}	rowIndex  	Index of the clicked row.
 */
	handleRowClick(e, rowIndex) {
		let clickedId = this.state.data.get(rowIndex).get(this.props.idField);
		this.toggleSelected(clickedId.toString());
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
	componentWillUpdate(nextProps, nextState) {
		if (this.props.selectable == 'multiple') {
			if (nextState.selection.size !== this.state.selection.size) {
				this.updateSelectionData(nextState.selection, nextState.allSelected);
			}
		} else {
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
		let newIndexed = _.clone(this.state.indexed);
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

		} else if (!newAllSelected && newSelection.size > 0) { // Change one row data at a time
			let changedId = null, selected = null;

			// If the new selection hasn't an id of the old selection that means an selected element has been unselected.
			oldSelection.forEach(id => {
				if (!newSelection.has(id)) {
					changedId = id;
					selected = false;
					return false;
				}
			});

			// Otherwise a new row has been selected. Look through the new selection for the new element.
			if (!changedId) {
				selected = true;
				newSelection.forEach(id => {
					if (!oldSelection.has(id)) {
						changedId = id;
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
			indexed: newIndexed
		});
	}

/**
 * In case that the new selection array be different than the selection array in the components state, then update
 * the components state with the new data.
 *
 * @param {array}	newSelection	The selected rows
 */
	triggerSelection(newSelection = new Set()) {
		this.setState({
			selection: newSelection,
			allSelected: newSelection.size == this.state.data.size
		}, this.sendSelection);
	}

/**
 * If the method afterSelect in the components props has a function then call it sending the selected rows in rawdata.
 */
	sendSelection() {
		if (typeof this.props.afterSelect == 'function') {
			let {selection, indexed, rawdata} = this.state;
			let output = [];
			let selectionArray = [];

			selection.forEach( element => {
				selectionArray.push(element);
			});

			output = _.map(selectionArray, (pId) => {
				let rowIndex = indexed[pId]._rowIndex;

				return rawdata.get(rowIndex).toJSON();
			});

			if (this.props.selectable === true) {
				output = output[0];
			}

			this.props.afterSelect(output);
		}
	}


/**
 * If the method afterSort in the components props has a function then call it sending the sorted data in the rawdata.
 */
	sendSortedData() {
		if (typeof this.props.afterSort == 'function') {
			let {data, indexed, rawdata} = this.state;
			let output = [];

			output = data.map( row => {
				let rowIndex = indexed[row.get('_properId')]._rowIndex;

				return rawdata.get(rowIndex).toJSON();
			});

			this.props.afterSort(output);
		}
	}

/**
 * Add a custom class to each row of the table. If that row is selected then add one more class to apply different css to seleted
 * rows.
 *
 * @param {integer}	index	Index of the row which will get the new classes.
 */
	getRowClassName(index) {
		let addClass = 'propertable-row';
		let selected = this.state.data.get(index).get('_selected');

		if (selected) {
			addClass += ' selected';
		}

		return addClass;
	}

	onResize(width, column) {
		let sizes = this.state.sizes;
		let newsizes = sizes.set(column, width);

		this.setState({sizes: newsizes});
	}

	render() {
		let content = <div className="propertable-empty">{this.props.msgs.empty}</div>
		let tableContent = null;

		if (this.state.data && this.state.data.size) {
			tableContent = this.buildTable();

			content = <Table
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
		}

		return <div id={this.props.uniqueId} className={'propertable '+this.props.className}>{content}</div>;
	}
}

ProperTable.defaultProps = defaultProps();


export default ProperTable;
