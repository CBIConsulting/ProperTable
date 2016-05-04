import React from 'react';
import Table from './table';
import NestedCell from './nestedcell';
import Immutable from 'immutable';
import {keys, clone, extend} from 'underscore';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';

const Set = require('es6-set');

function defaultProps() {
	return {
		groupBy: null,
		groupCol: null,
		nestedBy: null,
		nestedParentField: 'parent_id',
		collapsable: true,
		expanded: []
	};
}

class TreeTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: new Set(this.props.expanded)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let propschanged = !shallowEqualImmutable(this.props, nextProps);
		let statechanged = !shallowEqualImmutable(this.state, nextState);

		return propschanged || statechanged;
	}

	componentWillMount() {
		this.prepareNestedData();
	}

	componentWillUpdate(nextProps, nextState) {
		this.prepareNestedData(nextProps, nextState);
	}

	prepareNestedData(props = this.props, state = this.state) {
		this.cols = Immutable.fromJS(props.cols).toJS();
		this.data = Immutable.fromJS(props.data).toJS();
		this.grouped = {};
		this.colsByName = {};
		this.groupCol = {};
		let sortedGroups = [];

		if (props.groupBy) {
			this.grouped = _.groupBy(this.data, props.groupBy);
			this.colsByName = _.indexBy(this.cols, 'name');
			this.groupCol = this.colsByName[props.groupCol];
			let groupKeys = keys(this.grouped);
			let newdata = [];
			let oldFormatter = this.groupCol.formatter;

			this.groupCol.formatter = (val, colData, rawdata) => {
				let content = val;

				if (typeof oldFormatter == 'function') {
					content = oldFormatter(val, colData, rawdata);
				}

				return <NestedCell collapsable={props.collapsable} val={val} colData={colData} rawData={rawdata} onClick={this.toggleCollapse.bind(this, val, colData, rawdata)}>
					{content}
				</NestedCell>;
			}

			if (groupKeys && groupKeys.length) {
				groupKeys.forEach((item) => {
					let row = {};

					row[props.groupCol] = item;
					row._level = 1;
					row._isGroup = true;
					row._hasChildren = true;
					row._expanded = state.expanded.has(item);

					newdata.push(row);

					if (!props.collapsable || state.expanded.has(item)) {
						this.grouped[item].forEach((inneritem) => {
							let nitem = extend(inneritem, {
								_level: 2,
								_isGroup: false,
								_hasChildren: false
							});

							newdata.push(nitem);
						});
					}
				});

				this.data = newdata;
			}
		}
	}

	toggleCollapse(val, colData, rawdata) {
		let expanded = new Set(this.state.expanded.values());

		if (expanded.has(val)) {
			expanded.delete(val);
		} else {
			expanded.add(val);
		}

		this.setState({expanded: expanded});
	}

	render() {
		let {cols, data, afterSelect, afterSort, ...props} = this.props;
		cols = this.cols;
		data = this.data;

		return <Table cols={cols} data={data} {...props} />;
	}
}

TreeTable.defaultProps = defaultProps();

export default TreeTable;