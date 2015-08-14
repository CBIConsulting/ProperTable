import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";
import SelectCell from "./selectcell";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			className: '',
			uniqueId: _.uniqueId('propertable-row-'),
			selectable: true,
			selected: false,
			onSelect: null,
			data: {}
		}
	},

	handleSelect() {
		if (this.props.selectable && typeof this.props.onSelect == 'function') {
			this.props.onSelect(this.props.data, !this.props.selected);
		}
	},

	buildSelectContent() {
		if (this.props.selectable) {
			return <SelectCell onChange={this.handleSelect} selected={this.props.selected}/>;
		}

		return null;
	},

	render() {
		let className = this.props.className;
		let selectcontent = this.buildSelectContent();

		if (this.props.selected) {
			className += " selected";
		}

		return <tr id={this.props.uniqueId} className={"propertable-row "+className} onClick={this.handleSelect}>
			{selectcontent}
			{this.props.children}
		</tr>;
	}
});
