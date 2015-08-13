import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";
import Row from "./row";
import HCell from "./hcell";
import Cell from "./cell";

function countChildren(cell) {
	let ccount = 0, haschildren = false;

	if (cell.children && cell.children.length) {
		haschildren = !!_.find(cell.children, (child) => {
			return child.children && child.children.length;
		});

		if (!haschildren) {
			return cell.children.length;
		} else {
			_.each(cell.children, (child) => {
				if (child.children && child.children.length) {
					ccount += countChildren(child);
				}
			});

			return cell.children.length + ccount;
		}
	}

	return null;
}

export default React.createClass({
	getDefaultProps() {
		return {
			className: '',
			cols: [],
			data: [],
			uniqueId: _.uniqueId('propertable-'),
			afterSort: null
		}
	},

	getInitialState() {
		return {
			cols: $.extend(true, this.props.cols, []),
			data: $.extend(true, this.props.data, []),
			sort: null
		};
	},

	buildPlainColumns(cols) {
		let rows = [], row = [], crow = [], nextrow = cols, levels = 0;
		let haschildren = false;

		while(nextrow && nextrow.length) {
			levels++;
			row = [];
			crow = nextrow;
			nextrow = [];
			haschildren = !!_.find(crow, (cell) => {
				return cell.children && cell.children.length;
			});

			row = _.map(crow, (cell) => {
				if (cell.children && cell.children.length) {
					_.each(cell.children, (child) => {
						nextrow.push(child);
					});
				}

				return $.extend(true, cell, {
					level: levels,
					colspan: countChildren(cell)
				});
			});

			rows.push(row);
		}

		rows = _.map(rows, (row) => {
			let cells = _.map(row, (cell) => {
				if (!cell.children || !cell.children.length) {
					cell.rowspan = levels - cell.level || null;
				}

				return cell;
			});

			return cells;
		});

		return rows;
	},

	handleSort(direction, col) {
		let field = col.field || null;
		let data = $.extend(true, {}, this.state.data);

		if (field) {
			if (!direction) {
				data = $.extend(true, {}, this.props.data);
				this.setState({
					data: data,
					sort: null
				});
			} else {
				data = _.sortBy(data, (item) => {
					let val = item[field];

					if (col.sortVal && typeof col.sortVal == 'function') {
						val = col.sortVal(val);
					}

					console.log(item[field], val);

					return val;
				});

				if (direction == 'desc') {
					data.reverse();
				}

				this.setState({
					data: data,
					sort: {
						field: field,
						direction: direction
					}
				});
			}
		}
	},

	buildCols(cols) {
		let plain = this.buildPlainColumns(cols), rows = [];
		let rowcount = 1;

		this.fieldsOrder = [];
		this.columnIndex = {};

		rows = _.map(plain, (row) => {
			return _.map(row, (item) => {
				item.sorted = false;

				if (typeof item.field != 'undefined' && item.field) {
					this.fieldsOrder.push(item.field);
					this.columnIndex[item.field] = item;

					if (this.state.sort && item.field == this.state.sort.field) {
						item.sorted = this.state.sort.direction;
					}
				}

				return <HCell onSort={this.handleSort} key={'header' + item.name} {...item}>{item.label}</HCell>;
			});
		});

		return _.map(rows, (row) => {
			return <Row key={'header-row-'+(rowcount++)}>{row}</Row>;
		});
	},

	buildDataRows(data) {
		let result = null, rdata = [], curCell = 1, curRow = 1;
		let defaults = {
			visible: true,
			sortable: true
		};

		result = _.map(data, (rowdata) => {
			let cells = _.map(this.fieldsOrder, (field) => {
				let col = this.columnIndex[field];
				let value = rowdata[field];

				if (typeof col.formatter == 'function') {
					value = col.formatter(value, col);
				}

				return <Cell key={'ccel-'+(curCell++)} className={col.className || ''} col={col}>{value}</Cell>;
			});

			return <Row key={'crow-'+(curRow++)}>{cells}</Row>;
		});

		return result;
	},

	render() {
		let className = this.props.className;
		let cols = [];
		let rows = [];

		if (!this.state.cols.length) {
			return <div className={"propertable "+className} id={this.props.uniqueId}>
				<div className="empty-msg">
					<p>{Settings.msg('emptymsg')}</p>
				</div>
			</div>;
		}

		cols = this.buildCols(this.state.cols);
		rows = this.buildDataRows(this.state.data);

		return <div id={this.props.uniqueId} className={"propertable "+className}>
			<table className="table table-condensed table-bordered table-hover table-responsive propertable-table">
				<thead ref="head">{cols}</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>;
	}
});
