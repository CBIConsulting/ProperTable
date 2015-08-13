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
			uniqueId: _.uniqueId('propertable-')
		}
	},

	getInitialState() {
		return {
			cols: $.extend(true, this.props.cols, []),
			data: $.extend(true, this.props.data, [])
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

	buildCols(cols) {
		let plain = this.buildPlainColumns(cols), rows = [];
		let rowcount = 1;

		this.fieldsOrder = [];
		this.columnIndex = {};

		rows = _.map(plain, (row) => {
			return _.map(row, (item) => {
				if (typeof item.field != 'undefined' && item.field) {
					this.fieldsOrder.push(item.field);
					this.columnIndex[item.field] = item;
				}

				return <HCell key={'header' + item.name} {...item}>{item.label}</HCell>;
			});
		});

		return _.map(rows, (row) => {
			return <Row key={'header-row-'+(rowcount++)}>{row}</Row>;
		});
	},

	buildDataRows(data) {
		let result = null, rdata = [], curCell = 1, curRow = 1;

		result = _.map(data, (rowdata) => {
			let cells = _.map(this.fieldsOrder, (field) => {
				let col = this.columnIndex[field];
				let value = rowdata[field];

				if (typeof col.formatter == 'function') {
					value = col.formatter(value, col);
				}

				return <Cell key={'ccel-'+(curCell++)} className={col.className || ''}>{value}</Cell>;
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
