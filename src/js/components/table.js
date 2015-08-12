import React from "react/addons";
import _ from "underscore";
import Settings from "../config/settings";

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

	render() {
		let className = this.props.className;

		if (!this.state.cols.length) {
			return <div className={"propertable "+className} id={this.props.uniqueId}>
				<div className="empty-msg">
					<p>{Settings.msg('emptymsg')}</p>
				</div>
			</div>;
		}

		return <div id={this.props.uniqueId} className={"propertable "+className}>Soy una tabla</div>;
	}
});
