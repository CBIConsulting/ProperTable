import React from 'react';
import {Table, Column, Cell, ColumnGroup} from 'fixed-data-table';
import Immutable from 'immutable';
import _ from 'underscore';
import messages from "../lang/messages";
import Dimensions from 'react-dimensions';

function defaultProps() {
	return {
		className: '',
		cols: [],
		data: [],
		uniqueId: _.uniqueId('propertable-'),
		afterSort: null,
		afterSelect: null,
		selectable: true,
		rowHeight: 50,
		msgs: messages
	};
}

const ParseCell = (props) => {
	let row = props.data.get(props.rowIndex), val = null, formatted = null;
	let colData = props.colData;

	if (row) {
		val = row.get(props.col);
		formatted = val;
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
			rawdata: null,
			sort: null,
			allSelected: false
		};
	}

	componentWillMount() {
		this.initData();
	}

	initData() {
		let data = Immutable.fromJS(this.props.data);

		this.setState({
			rawdata: data,
			data: data.map(row => {
				if (!row._properId) {
					row._properId = _.uniqueId()
				}

				if (typeof row._selected == 'undefined') {
					row._selected = false
				}

				return row;
			})
		});
	}

	parseColumn(colData, isChildren = false) {
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
				{...extraProps}
			/>;

			if (!isChildren) {
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
		let columns = [];

		this.state.cols.forEach((col) => {
			columns.push(this.parseColumn(col.toJSON()));
		});

		return columns;
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
				{...this.props}
			>
				{tableContent}
			</Table>;
		}

		return <div id={this.props.uniqueId} className={'propertable '+this.props.className}>{content}</div>;
	}
}

export default Dimensions()(ProperTable);
