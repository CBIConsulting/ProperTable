import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";

export default React.createClass({
	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('propertable-row-')
		}
	},

	render() {
		let className = this.props.className;

		return <tr id={this.props.uniqueId} className={"propertable-row "+className}>
			{this.props.children}
		</tr>;
	}
});
