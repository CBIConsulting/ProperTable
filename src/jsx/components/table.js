import React from 'react';
import {Table, Column, Cell, ColumnGroup} from 'fixed-data-table';
import Immutable from 'immutable';
import _ from 'underscore';
import messages from "../lang/messages";
import Dimensions from 'react-dimensions';
import Selector from './selector';

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
		msgs: messages
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

const ParseCell = (props) => {
	let row = props.data.get(props.rowIndex), val = null, formatted = null;
	let colData = props.colData;
	let selected = false;

	if (row) {
		val = row.get(props.col);
		formatted = val;

		selected = row.get('_selected');
	}

	if (typeof colData.formatter == 'function') {
		formatted = colData.formatter(val, colData, row.toJSON());
	}

	return <Cell>
		{formatted}
	</Cell>;
};

class ProperTable extends React.Component {
	static get defaultProps() {
		return defaultProps();
	}

	constructor(props) {
		super(props);

		this.state = {
			cols: Immutable.fromJS(this.props.cols),
			data: null,
			indexed: null,
			rawdata: null,
			sort: null,
			allSelected: false,
			selection: []
		};
	}

	componentWillMount() {
		this.initData();
	}

	initData() {
		let data = Immutable.fromJS(this.props.data), index = 0;
		let indexed = [], parsed = [];

		parsed = data.map(row => {
			let rdata = row.toJSON();

			if (!rdata._properId) {
				rdata._properId = _.uniqueId()
			}

			if (typeof rdata._selected == 'undefined') {
				rdata._selected = false
			}

			rdata._rowIndex = index++;

			return Immutable.fromJS(rdata);
		});

		indexed = _.indexBy(parsed.toJSON(), '_properId');

		this.setState({
			rawdata: data,
			data: parsed,
			indexed: indexed
		});
	}

	parseColumn(colData, isChildren = false, hasNested = false) {
		let col = null, colname = null, extraProps = {
			width: 100
		};

		colname = colData.name || _.uniqueId('col-');

		if (typeof colData.children == 'undefined' || !colData.children.length) {

			if (colData.width) {
				extraProps.width = colData.width;
			}

			if (!colData.width && !colData.maxWidth) {
				extraProps.flexGrow = colData.flex || 1;
			}

			col = <Column
				columnKey={_.uniqueId(colname)}
				key={_.uniqueId(colname)}
				header={<Cell>{colData.label}</Cell>}
				cell={<ParseCell data={this.state.data} colData={colData} col={colData.field} />}
				allowCellsRecycling
				align='center'
				{...extraProps}
			/>;

			if (!isChildren && hasNested) {
				col = <ColumnGroup key={_.uniqueId(colname+'-group')}>{col}</ColumnGroup>
			}
		} else {
			let inner = colData.children.map((c) => this.parseColumn(c, true));

			col = <ColumnGroup
				columnKey={_.uniqueId(colname)}
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

			selColumn = <Column
				columnKey={_.uniqueId('selector-')}
				key={_.uniqueId('selector-')}
				header={<Selector
					onClick={this.handleSelectAll.bind(this)}
					somethingSelected={somethingSelected}
					allSelected={this.state.allSelected}
				/>}
				cell={<Selector
					data={this.state.data}
				/>}
				allowCellsRecycling
				width={50}
			/>

			if (isNested) {
				selColumn = <ColumnGroup key={_.uniqueId('selector-group-')}>{selColumn}</ColumnGroup>;
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
		let addClass = null;
		let selected = this.state.data.get(index).get('_selected');

		if (selected) {
			addClass = 'selected';
		}

		return addClass;
	}

	render() {
		let content = <div className="propertable-empty">{this.props.msgs.empty}</div>
		let tableContent = null;

		if (this.state.data === null) {
			content = <div className="propertable-loading">{this.props.msgs.loading}</div>
		}

		if (this.state.data && this.state.data.size) {
			tableContent = this.buildTable();

			content = <Table
				width={this.props.containerWidth}
				height={this.props.containerHeight}
				headerHeight={this.props.rowHeight}
				groupHeaderHeight={this.props.rowHeight}
				rowHeight={this.props.rowHeight}
				rowsCount={this.state.data.size}
				onRowClick={this.handleRowClick.bind(this)}
				rowClassNameGetter={this.getRowClassName.bind(this)}
				{...this.props}
			>
				{tableContent}
			</Table>;
		}

		return <div id={this.props.uniqueId} className={'propertable '+this.props.className}>{content}</div>;
	}
}

export default Dimensions()(ProperTable);
