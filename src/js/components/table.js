import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";
import Row from "./row";
import HCell from "./hcell";
import SelectHeader from "./selectheader";
import Cell from "./cell";
import "floatthead";

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
			afterSort: null,
			afterSelect: null,
			fixedHeader: true,
			selectable: true
		}
	},

	getInitialState() {
		return {
			cols: $.extend(true, this.props.cols, []),
			data: null,
			rawdata: null,
			sort: null,
			allSelected: false
		};
	},

	componentDidMount() {
		this.initData();

		$(window).on('resize', this.fixHeader);
	},

	initData() {
		let data = _.values($.extend(true, this.props.data, []));

		this.setState({
			rawdata: data,
			data: _.map(data, (row) => {
				if (!row._properId) {
					row._properId = _.uniqueId();
				}

				if (typeof row._selected == 'undefined') {
					row._selected = false;
				}

				return row;
			})
		});
	},

	updateData() {
		let data = _.values($.extend(true, this.props.data, []));
		let newdata = [];

		if (this.state.rawdata && !_.isEqual(data, this.state.rawdata)) {
			newdata = _.map(data, (row) => {
				if (!row._properId) {
					row._properId = _.uniqueId();
				}

				if (typeof row._selected == 'undefined') {
					row._selected = false;
				}

				return row;
			});

			this.setState({
				rawdata: data,
				data: newdata
			});

			if (this.state.sort && this.state.sort.field) {
				this.handleSort(this.state.sort.direction, this.state.sort);
			}
		}
	},

	componentDidUpdate() {
		this.updateData();
		this.fixHeader();
	},

	componentWillUnmount() {
		$(window).off('resize', this.fixHeader);
	},

	fixHeader: _.debounce(function() {
		let $container = null, $table = null;
		let parentHeight = null, parentTag;

		if (this.isMounted()) {
			$container = $(React.findDOMNode(this));
			$table = $(React.findDOMNode(this.refs.table));

			$container.removeAttr('style');
			$table.floatThead('destroy');
		}

		if (this.isMounted() && this.props.fixedHeader && this.refs.table) {
			$container.css({
				position: 'relative',
				height: $container.height() || $container.parent().height()
			});

			$table.floatThead({
				scrollContainer: function($table) {
					return $container;
				}
			});
		}
	}, 50),

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
		let data = _.values($.extend(true, {}, this.state.data));

		if (field) {
			if (!direction) {
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

					if (_.isBoolean(val)) {
						val = - (val * 10000) * parseInt(item._properId);
					}

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
			let selectable = this.props.selectable;
			let sorted = false;

			if (this.state.sort && '_selected' == this.state.sort.field) {
				sorted = this.state.sort.direction;
			}

			if (rowcount === 1) {
				row = row.reverse();
				row.push(<SelectHeader rowspan={rows.length} selected={this.state.allSelected} sorted={sorted} onSelect={this.selectAll} onSort={this.handleSort} />);
				row = row.reverse();
			}

			return <Row selectable={false} key={'header-row-'+(rowcount++)}>{row}</Row>;
		});
	},

	selectAll() {
		let data = $.extend(true, {}, this.state.data);
		let selectedState = !this.state.allSelected;

		data = _.each(data, (item) => {
			this.handleSelect(item, selectedState);
		});

		this.setState({
			allSelected: selectedState
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
					value = col.formatter(value, col, rowdata);
				}

				return <Cell key={'ccel-'+(curCell++)} className={col.className || ''} col={col}>{value}</Cell>;
			});
			let nextRow = rowdata._properId;

			return <Row data={rowdata} selected={rowdata._selected} selectable={this.props.selectable} key={'crow-'+nextRow} uniqueId={'propertable-row-' + nextRow} onSelect={this.handleSelect}>
				{cells}
			</Row>;
		});

		return result;
	},

	handleSelect(row, status) {
		let curRow = _.findWhere(this.state.data, {_properId: row._properId});
		let id = row._properId;
		let newData = null;

		if (curRow._selected != status) {
			newData = _.map($.extend(true, this.state.data, {}), (crow) => {
				if (crow._properId == id) {
					crow._selected = status;
				}

				return crow;
			});

			this.setState({
				data: newData
			});
		}

		this.callAfterSelect();

		if (this.state.sort && '_selected' == this.state.sort.field) {
			this.handleSort(this.state.sort.direction, this.state.sort);
		}
	},

	callAfterSelect: _.debounce(function(all = false) {
		let selection = [];

		if (typeof this.props.afterSelect == 'function') {

			if (!all) {
				selection = _.filter(this.state.data, (item) => {
					return item._selected;
				});
			} else {
				selection = _.clone(this.state.data);
			}

			this.props.afterSelect.call(this, selection);
		}
	}, 25),

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
			<table ref="table" className="table table-condensed table-bordered table-hover table-responsive propertable-table">
				<thead ref="head">{cols}</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>;
	}
});
