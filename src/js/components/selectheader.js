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
			onSort: null
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

		spans.rowSpan = this.props.rowspan;

		if (this.props.colspan) {
			spans.colSpan = this.props.colspan + 1;
		}


		tools = <div className="htools">
			{sortBtns}
			<button className={"btn btn-xs select-all"} onClick={this.handleSort}>
				{Settings.msg('selectmsg')}
			</button>
		</div>;

		className += ' has-tools'

		return <th id={this.props.uniqueId} className={"propertable-hcell selectheader "+className} {...spans}>
			{tools}
		</th>;
	}
});
