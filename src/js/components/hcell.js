import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('propertable-hcell-'),
			rowspan: null,
			colspan: null,
			sortable: true,
			sorted: false,
			onSort: null,
			width: null,
			nested: null
		}
	},

	handleSort(e) {
		let next = 'asc';

		if (this.props.sorted == 'asc') {
			next = 'desc';
		}

		if (this.props.sorted == 'desc') {
			next = false;
		}

		if (this.props.onSort && typeof this.props.onSort == 'function') {
			this.props.onSort(next, this.props);
		}
	},

	renderSortOptions() {
		let next = 'asc';

		if (this.props.sorted == 'asc') {
			next = 'desc';
		}

		if (this.props.sorted == 'desc') {
			next = false;
		}

		if (!this.props.sortable) {
			return false;
		}

		return <button className={"btn btn-xs sort sort-"+next} onClick={this.handleSort}>sort</button>;
	},

	render() {
		let className = this.props.className;
		let spans = {};
		let sortBtns = this.renderSortOptions();
		let tools = null;

		if (this.props.rowspan) {
			spans.rowSpan = this.props.rowspan + 1;
		}

		if (this.props.colspan) {
			spans.colSpan = this.props.colspan + 1;
		}

		if (this.props.field) {
			tools = <div className="htools">
				{sortBtns}
			</div>;

			className += ' has-tools'
		}

		var style = this.props.width !== null  ? {"width": this.props.width + "px"} : {};

		return <div id={this.props.uniqueId} style={style} className={"propertable-hcell "+className} {...spans}>
			<div className="cell-inner">
				<div className="hlabel">
					{this.props.children}
				</div>
				{tools}
			</div>
			{this.props.nested}
		</div>;
	}
});
