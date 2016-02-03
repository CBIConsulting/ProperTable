import React from "react/addons";
import _ from "underscore";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			className: '',
			uniqueId: null,
			onChange: null,
			selected: false
		}
	},

	handleChange() {
		if (typeof this.props.onChange == 'function') {
			this.props.onChange(!this.props.selected);
		}
	},

	render() {
		let className = this.props.className;

		return <div id={this.props.uniqueId || _.uniqueId('propertable-selectcell-')} className={"propertable-cell select-cell "+className}>
			<div className="cell-inner">
				<input type="checkbox" value={1} checked={this.props.selected} onChange={this.handleChange}/>
			</div>
		</div>;
	}
});
