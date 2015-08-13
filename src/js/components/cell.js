import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('propertable-hcell-')
		}
	},

	render() {
		let className = this.props.className;

		return <td id={this.props.uniqueId} className={"propertable-cell "+className}>
			{this.props.children}
		</td>;
	}
});
