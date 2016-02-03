import React from "react/addons";
import _ from "underscore";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('propertable-hcell-'),
			width: null,
			col: {}
		}
	},

	render() {
		let className = this.props.className;

		return <div id={this.props.uniqueId} className={"propertable-cell "+className} style={{
				minWidth: this.props.col.minWidth || this.props.minWidth}}
			>
			<div className="cell-inner"  style={{
				width: this.props.col.width || this.props.width
			}}>
				{this.props.children}
			</div>
		</div>;
	}
});
