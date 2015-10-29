import React from "react/addons";
import _ from "underscore";
import Settings from "../config/settings";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('select-all-header'),
			rowspan: null,
			colspan: null,
			sortable: true,
			sorted: false,
			onSort: null,
			selected: false,
			onSelect: null
		}
	},

	handleSort() {
		let next = 'asc';

		if (this.props.sorted == 'asc') {
			next = 'desc';
		}

		if (this.props.sorted == 'desc') {
			next = false;
		}

		if (this.props.onSort && typeof this.props.onSort == 'function') {
			this.props.onSort(next, {field: '_selected'});
		}
	},

	handleSelect() {
		if (typeof this.props.onSelect == 'function') {
			this.props.onSelect(this.props.data, !this.props.selected);
		}
	},

	render() {
		let className = this.props.className;
		let spans = {};
		let tools = null;
		let msg = msg = <i className="fa fa-square-o" />;
		let title = Settings.msg('select_all');
		let sortedclass = '';

		spans.rowSpan = this.props.rowspan;

		if (this.props.colspan) {
			spans.colSpan = this.props.colspan + 1;
		}

		if (this.props.selected) {
			title = Settings.msg('deselect_all');
			msg = <i className="fa fa-check-square-o" />;
		}

		tools = <div className="htools">
			<button title={title} className={"btn btn-xs select-all"} onClick={this.handleSelect}>
				{msg}
			</button>
		</div>;

		className += ' has-tools'


		if (this.props.sortable) {
			className += ' sortable';
		}

		if (this.props.sorted) {
			sortedclass = 'sorted-'+this.props.sorted;
		}

		className += ' '+sortedclass;

		return <div id={this.props.uniqueId} className={"propertable-hcell selectheader last-nested-level"+className} {...spans} >
			<div className="cell-inner">
				{tools}
			</div>
		</div>;
	}
});
