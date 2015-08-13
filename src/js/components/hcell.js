import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";

export default React.createClass({
	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('propertable-hcell-'),
			rowspan: null,
			colspan: null
		}
	},

	render() {
		let className = this.props.className;
		let spans = {};

		if (this.props.rowspan) {
			spans.rowSpan = this.props.rowspan + 1;
		}

		if (this.props.colspan) {
			spans.colSpan = this.props.colspan + 1;
		}

		console.log(this.props.colspan, this.props.rowspan);

		return <th id={this.props.uniqueId} className={"propertable-hcell "+className} {...spans}>
			{this.props.children}
		</th>;
	}
});
