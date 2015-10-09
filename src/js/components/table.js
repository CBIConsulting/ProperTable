import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";
import Row from "./row";
import HCell from "./hcell";
import SelectHeader from "./selectheader";
import Cell from "./cell";
import Tbody from "./tbody";

function getLastLevelCols(cols) {
	let result = [];

	_.each(cols, (col) => {
		if (col.children && col.children.length) {
			result = $.merge(result, getLastLevelCols(col.children));
		} else {
			result.push(col);
		}
	});

	return result;
}

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

let scrollbarWidth = null;

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
			selectable: true,
			rowHeight: 50
		}
	},

	getInitialState() {
		return {
			cols: _.values($.extend(true, {}, this.props.cols)),
			data: null,
			rawdata: null,
			sort: null,
			allSelected: false,
			headerHeight: null,
			firstElement: 0,
			itemsPerVP: 1
		};
	},

	componentDidMount() {
		scrollbarWidth = getScrollbarWidth();
		this.initData();
		this.computeHeaderHeight();
	},

	initData() {
		let data = _.clone(this.props.data);

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
		let data = _.clone(this.props.data);
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
		this.computeHeaderHeight();
	},

	computeHeaderHeight() {
		if (this.refs.header) {
			let $head = $(React.findDOMNode(this.refs.header));
			if ($head.length) {
				let hh = $head.height();

				if (hh != this.state.headerHeight) {
					this.setState({
						headerHeight: $head.height()
					});
				}
			}
		}
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

	buildCols(cols, nested = false) {
		//let plain = this.buildPlainColumns(cols), rows = [];
		let result = [];
		let sorted = false;

		if (this.state.sort && '_selected' == this.state.sort.field) {
			sorted = this.state.sort.direction;
		}

		if (!nested) {
			this.fieldsOrder = [];
			this.columnIndex = {};
		}

		if (this.props.selectable && !nested) {
			result.push(<SelectHeader key={this.props.uniqueId + '-select-all-header'} selected={this.state.allSelected} sorted={sorted} onSelect={this.selectAll} onSort={this.handleSort} />);
		}

		_.each(cols, (item) => {
			let rendered = null;
			let content = [item.label];
			let nested = null;
			item.sorted = false;

			if (typeof item.field != 'undefined' && item.field) {
				this.fieldsOrder.push(item.field);
				this.columnIndex[item.field] = item;

				if (this.state.sort && item.field == this.state.sort.field) {
					item.sorted = this.state.sort.direction;
				}
			}

			if (typeof item.children != 'undefined' && item.children.length) {
				nested = (<div className="propertable-table subheader">
					<div className="propertable-container">
						{this.buildCols(item.children, true)}
					</div>
				</div>);
			}

			let width = item.width || null;

			/*if (width) {
				width -= 4;
			}*/

			rendered = <HCell width={width} nested={nested} onSort={this.handleSort} key={'header' + item.name} {...item}>{content}</HCell>;

			result.push(rendered);
		});

		return <Row selectable={false} key={'header-row'}>{result}</Row>;
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

				let width = col.width || null;

				/*if (width) {
					width += 2;
				}*/

				return <Cell width={width} key={'ccel-'+(curCell++)} className={col.className || ''} col={col}>{value}</Cell>;
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
			newData = _.map($.extend(true, {}, this.state.data), (crow) => {
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

	sliceData(data) {
		let firstElement = this.state.firstElement;
		let itemsPerVP = this.state.itemsPerVP;

		return data.slice(firstElement, firstElement + itemsPerVP);
	},

	handleScroll(firstElement, itemsPerVP) {
		if (this.state.firstElement != firstElement || this.state.itemsPerVP != itemsPerVP) {
			this.setState({
				firstElement: firstElement,
				itemsPerVP: itemsPerVP
			});
		}
	},

	updateHeaderWidths: _.debounce(function(widths) {
		let newcols = $.extend(true, [], this.state.cols);
		let fcols = getLastLevelCols(newcols);

		if (this.props.selectable) {
			widths = widths.slice(1);
		}

		_.each(fcols, (col, i) => {
			col.width = widths[i];
		});

		this.setState({
			cols: newcols
		});
	}, 200),

	render() {
		let className = this.props.className;
		let cols = [];
		let rows = [];
		let container = window;
		let content = <div className="empty-msg">
			<p>{Settings.msg('emptymsg')}</p>
		</div>;
		let hpadding = null;
		let hclass = '';

		if (this.props.fixedHeader) {
			hclass = ' fixedheader';
		}

		if (this.state.cols.length && this.state.data && this.state.data.length) {
			cols = this.buildCols(this.state.cols);
			let data = this.sliceData(this.state.data);
			rows = this.buildDataRows(data);

			if (this.props.fixedHeader) {
				hpadding = scrollbarWidth;
			}

			content = <div ref="table" className={"propertable-table table-condensed table-bordered table-hover table-responsive propertable-table " + hclass}>
				<div className="thead-wrapper" ref="header" style={{
					paddingRight: hpadding
				}}>
					<div className="propertable-container propertable-thead-container">
						<div className="propertable-thead" ref="head">{cols}</div>
					</div>
				</div>
				<Tbody
					totalItems={this.state.data.length}
					fixedHeader={this.props.fixedHeader}
					headerHeight={this.state.headerHeight}
					onScroll={this.handleScroll}
					onWidth={this.updateHeaderWidths}
				>
					{rows}
				</Tbody>
			</div>;
		}

		return <div id={this.props.uniqueId} className={"propertable propertable-base "+className}>
			{content}
		</div>
	}
});
