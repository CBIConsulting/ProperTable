import messages from "../lang/messages";
import React from 'react';
import Table from './table';
import NestedCell from './nestedcell';
import Immutable from 'immutable';
import {keys, clone, extend, isArray} from 'underscore';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';
import cache from '../lib/rowcache';

const Set = require('es6-set');

function defaultProps() {
	return {
		groupBy: null,
		groupCol: null,
		nestedBy: null,
		nestedParentField: 'parent_id',
		collapsable: true,
		expanded: [],
		className: '',
		cols: [],
		data: [],
		uniqueId: null,
		afterSort: null,
		afterSelect: null,
		selectable: true,
		selected: null,
		rowHeight: 50,
		idField: '_properId',
		msgs: messages,
		onGroupClick: null,
		selectorWidth: 27,
		colSortDirs: null,
		multisort: false
	};
}

class TreeTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: new Set(this.props.expanded),
			selection: new Set()
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let propschanged = !shallowEqualImmutable(this.props, nextProps);
		let statechanged = !shallowEqualImmutable(this.state, nextState);

		return propschanged || statechanged;
	}

	componentWillMount() {
		this.uniqueId = this.props.uniqueId || _.uniqueId('propertable-');
		this.prepareNestedData();
		this.setDefaultSelection();
	}

	componentWillReceiveProps(nextProps) {
		this.setDefaultSelection(nextProps);
	}

	componentWillUpdate(nextProps, nextState) {
		this.prepareNestedData(nextProps, nextState);
	}

	setDefaultSelection(props = this.props) {
		if (props.selected) {
			let selected = props.selected, selection;

			if (selected.length == 0) {
				selection = new Set();
			} else {
				if (!isArray(selected)) {
					selection = new Set([selected.toString()]);
				} else {
					if (props.selectable == 'multiple') selection = new Set(selected.toString().split(','));
					else selection = new Set([selected[0].toString()]);
				}
			}

			this.triggerSelection(selection, false); // false -> don't send the selection
		}
	}

	triggerSelection(newSelection = new Set(), sendSelection = true) {
		if (sendSelection) {
			this.setState({
				selection: newSelection
			}, this.sendSelection);
		} else {
			this.setState({
				selection: newSelection
			});
		}
	}

	sendSelection() {
		console.log('send selection');
	}

	prepareNestedData(props = this.props, state = this.state) {
		this.cols = Immutable.fromJS(props.cols).toJS();
		this.data = Immutable.fromJS(props.data).toJS();
		this.grouped = {};
		this.colsByName = {};
		this.groupCol = {};
		this.dataIndex = _.indexBy(props.data, props.idField)
		let sortedGroups = [];

		if (props.groupBy) {
			this.grouped = _.groupBy(this.data, props.groupBy);
			this.colsByName = _.indexBy(this.cols, 'name');
			this.groupCol = this.colsByName[props.groupCol];
			let groupKeys = keys(this.grouped);
			let newdata = [];
			let oldFormatter = this.groupCol.formatter;

			if (groupKeys && groupKeys.length) {
				groupKeys.forEach((item) => {
					let row = {};

					row[props.groupCol] = item;
					row[props.idField] = '__group__'+item;
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

			this.groupCol.formatter = (val, colData, rawdata) => {
				let content = val;

				if (typeof oldFormatter == 'function') {
					content = oldFormatter(val, colData, rawdata);
				}

				if (rawdata[this.props.idField].toString().indexOf('__group__') !== 0) {
					return content;
				} else {
					if (typeof this.colsByName[props.groupBy].formatter == 'function') {
						content = this.colsByName[props.groupBy].formatter(val, this.colsByName[props.groupBy], rawdata);
					}
				}

				return <NestedCell expanded={this.state.expanded.has(val)}  collapsable={this.props.collapsable} val={val} colData={colData} rawData={rawdata} onClick={this.toggleCollapse.bind(this, val, colData, rawdata)}>
					{content}
				</NestedCell>;
			}
		}
	}

	toggleCollapse(val, colData, rawdata) {
		let expanded = new Set(this.state.expanded.values());
		let ckey = ['formatted', 'tb_'+this.uniqueId, 'r__'+rawdata[this.props.idField]];

		if (expanded.has(val)) {
			expanded.delete(val);
		} else {
			expanded.add(val);
		}

		cache.flush(ckey);

		this.setState({expanded: expanded});
	}

	onSelect(extcb, selection, selectionArray) {
		let newSelection = new Set(this.state.selection);
		let newSelArray = [];

		if (!selection.length && extcb) {
			this.props.afterSelect([], []);
			newSelection = new Set();
		} else {
			selectionArray.forEach((k) => {
				let isGroup = k.indexOf('__group__') === 0;

				newSelArray.push(k.toString());
				if (isGroup) {
					let gkey = k.replace('__group__', '');
					let items = _.pluck(this.grouped[gkey], this.props.idField);

					items.forEach((ik) => {
						newSelArray.push(ik.toString());
					});
				}
			});

			newSelection = new Set(newSelArray);
		}

		this.setState({selection: newSelection});
	}

	render() {
		let {cols, data, afterSelect, afterSort, selection, uniqueId, ...props} = this.props;
		cols = this.cols;
		data = this.data;
		selection = [...this.state.selection];
		uniqueId = this.uniqueId;

		console.log('state selection', selection);

		return <Table
			afterSelect={(selection, selectionArray) => {
				this.onSelect(afterSelect, selection, selectionArray);
			}}
			uniqueId={uniqueId}
			selection={selection}
			cols={cols}
			data={data}
			{...props}
		/>;
	}
}

TreeTable.defaultProps = defaultProps();

export default TreeTable;