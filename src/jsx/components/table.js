import React from 'react';
import {Table, Column, Cell, ColumnGroup} from 'fixed-data-table';
import Immutable from 'immutable';
import _ from 'underscore';
import messages from "../lang/messages";
import Selector from './selector';
import CellRenderer from './cellRenderer';
import SortHeaderCell from './sortHeaderCell';

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
		idField: null,
		msgs: messages,
		selectorWidth: 27,
		colSortDirs: null,
		multisort: false
	};
}

/**
 * Check if one or more of the columns has some nested columns. Columns inside other columns.
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
	/*static get defaultProps() {
		return defaultProps();
	}*/

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
			selection: []
		};
	}

	componentDidMount() {
		// Sort the table if the sort direction of one or more columns are diferent than the default direction.
		this.sortTable(this.state.colSortDirs);
	}

/**
 * Prepare the data received by the component for the internal working.
 *
 * @return (array)	-rawdata: The same data as the props.
 *					-indexed: Same as rawdata but indexed by the properId
 *					-data: Parsed data to add some fields necesary to internal working.
 */
	prepareData() {
		// The data will be inmutable inside the component
		let data = Immutable.fromJS(this.props.data), index = 0;
		let indexed = [], parsed = [];

		// Parsing data to add new fields (selected or not, properId, rowIndex)
		parsed = data.map(row => {
			if (!row.get('_properId',false)) {
				row = row.set('_properId', _.uniqueId());
			}
			if (!row.get('_selected',false)) {
				row = row.set('_selected', false);
			}

			row = row.set('_rowIndex', index++);

			return row;
		});

		// Prepare indexed data.
		indexed = _.indexBy(parsed.toJSON(), '_properId');

		return {
			rawdata: data,
			data: parsed,
			indexed: indexed
		};
	}

/**
 * Prepare data or restart the data to default.
 */
	initData() {
		let newdata = this.prepareData();

		this.setState(newData);
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
			position = colSortDirs[i].position - 1;
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

	parseColumn(colData, isChildren = false, hasNested = false) {
		let col = null, colname = null, sortDir = 'DEF', sortable = null, extraProps = {
			width: 100,
			fixed: false,
			isResizable: true
		};

		colname = colData.name || _.uniqueId('col-');

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

		if (typeof colData.children == 'undefined' || !colData.children.length) {
			this.state.colSortDirs.forEach(element => {
				if (element.column === colname) sortDir = element.direction;
			});

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
					/>
				}
				cell={<CellRenderer data={this.state.data} colData={colData} col={colData.field} />}
				allowCellsRecycling
				align='center'
				{...extraProps}
			/>;

			if (!isChildren && hasNested) {
				col = <ColumnGroup key={_.uniqueId(colname+'-group')} fixed={extraProps.fixed}>{col}</ColumnGroup>
			}
		} else {
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

	buildTable() {
		let columns = [], isNested = hasNested(this.state.cols), selColumn = null;

		if (this.props.selectable == 'multiple') {
			let somethingSelected = this.state.selection.length > 0;
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

	handleSelectAll(e) {
		let somethingSelected = this.state.selection.length > 0;
		let allSelected = this.state.allSelected;
		let newSelection = [];

		if (!allSelected) {
			newSelection = _.keys(this.state.indexed);
		}

		this.triggerSelection(newSelection.sort());
	}

	handleRowClick(e, rowIndex) {
		let clickedId = this.state.data.get(rowIndex).get('_properId');

		this.toggleSelected(clickedId);
	}

	toggleSelected(properId) {
		let selection = _.clone(this.state.selection);

		if (_.indexOf(selection, properId.toString()) != -1) {
			selection = _.without(selection, properId);
		} else {
			if (this.props.selectable == 'multiple') {
				selection.push(properId);
			} else {
				selection = [properId];
			}
		}

		this.triggerSelection(selection.sort());
	}

	componentWillUpdate(nextProps, nextState) {
		if (!_.isEqual(nextState.selection, this.state.selection)) {
			this.updateSelectionData(nextState.selection);
		}
	}

	updateSelectionData(newSelection) {
		let newData = this.state.data.map((row) => {
			let rdata = row.toJSON();

			rdata._selected = _.indexOf(newSelection, rdata._properId) >= 0;

			return Immutable.fromJS(rdata);
		});

		let newIndexed = _.indexBy(newData.toJSON(), '_properId');

		this.setState({
			data: newData,
			indexed: newIndexed
		});
	}

	triggerSelection(newSelection = []) {
		if (!_.isEqual(newSelection, this.state.selection)) {
			this.setState({
				selection: newSelection,
				allSelected: newSelection.length == this.state.data.size
			}, this.sendSelection);
		}
	}

	sendSelection() {
		if (typeof this.props.afterSelect == 'function') {
			let {selection, indexed, rawdata} = this.state;
			let output = [];

			output = _.map(selection, (pId) => {
				let rowIndex = indexed[pId]._rowIndex;

				return rawdata.get(rowIndex).toJSON();
			});

			if (this.props.selectable === true) {
				output = output[0];
			}

			this.props.afterSelect(output);
		}
	}

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