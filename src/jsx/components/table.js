import React from 'react';
import {Table, Column, Cell, ColumnGroup} from 'fixed-data-table';
import Immutable from 'immutable';
import _ from 'underscore';
import messages from "../lang/messages";
import Selector from './selector';
import CellRenderer from './cellRenderer';
import SortHeaderCell from './sortHeaderCell';

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
		colSortDirs: null, // [{name: fieldName,  direction: 'DEF'},{},{}]
		multisort: false
	};
}

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

class ProperTable extends React.Component {
	/*static get defaultProps() {
		return defaultProps();
	}*/

	constructor(props) {

		super(props);

		let initialData = this.prepareData();
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
		this.sortTable(this.state.colSortDirs);
	}

	prepareData() {
		let data = Immutable.fromJS(this.props.data), index = 0;
		let indexed = [], parsed = [];

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

		indexed = _.indexBy(parsed.toJSON(), '_properId');

		return {
			rawdata: data,
			data: parsed,
			index: indexed
		};
	}

	initData() {
		let newdata = this.prepareData();

		this.setState(newData);
	}

	prepareColSort() {
        let colSortDirs = this.props.colSortDirs, cols = this.props.cols;
        let sort = [], multisort = this.props.multisort;
		let sortData = this.buildColSortDirs(cols);
		let direction = null, sortable = null, colData = null;

        if (_.isNull(colSortDirs)) {
            colSortDirs = sortData.colSortDirs;
        }

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
         		multisort: multisort, // single (false) (in this case only one at a time could be true at this field) or multisort (true - all true)
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
	    });
	}

	updateSortDir(columnKey, sortDir) {
		let colSortDirs = this.state.colSortDirs || [], position = 1;

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
			let initialPos = 0, index = 0;

			for (let i = 0; i <= colSortDirs.length - 1; i++) {
				if (colSortDirs[i].sorted) initialPos++;

				if (colSortDirs[i].column == columnKey) {
					colSortDirs[i].direction = sortDir;
					position = colSortDirs[i].position;
					index = i;
					if (sortDir != 'DEF' && !colSortDirs[i].sorted) {
						initialPos++;
						colSortDirs[i].sorted = true;
					} else if (sortDir == 'DEF') {
					 	colSortDirs[i].sorted = false;
					}
				}
			}

			for (let i = 0; i <= colSortDirs.length - 1; i++) {
				if (colSortDirs[i].position < position && colSortDirs[i].position >= initialPos) {
					if (colSortDirs[i].direction == 'DEF') colSortDirs[i].position = colSortDirs[i].position + 1;
				}
			}

			if (colSortDirs[index].position != 'DEF' && initialPos < colSortDirs[index].position) colSortDirs[index].position = initialPos;
		}

		return colSortDirs;
	}

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
