import messages from "../lang/messages";
import React from 'react';
import Table from './table';
import NestedCell from './nestedcell';
import Immutable from 'immutable';
import {keys, clone, extend, isArray} from 'underscore';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';
import cache from '../lib/rowcache';

const CACHE_NAME = 'formatted';
const GROUP = '__group__';
const MULTIPLE_SELECTION = 'multiple';
const CLEAR_FILTERS = 'clear_filters';
const CLEAR_SORT = 'clear_sort';
const CLEAR_BOTH = 'clear_both';
const Set = require('es6-set');


class TreeTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: new Set(this.props.expanded),
			selection: new Set()
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
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
			this.triggerSelection(Table.prototype.parseSelected(props), false); // false -> don't send the selection
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

	sendSelection(selection) {
		let selArray = [];
		let selData = [];

		if (typeof this.props.afterSelect === 'function') {
			selection.forEach(id => {
				let row = null;

				if (!this.isGroupId(id)) {
					row = this.dataIndex[id];

					if (row) {
						selArray.push(row[this.props.idField]);
						selData.push(row);
					}
				}
			});

			this.props.afterSelect(selData, selArray);
		}
	}

	isGroupId(id) {
		return id.toString().indexOf(GROUP) === 0;
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
					row[props.idField] = GROUP+item;
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

				if (typeof oldFormatter === 'function') {
					content = oldFormatter(val, colData, rawdata);
				}

				if (rawdata[this.props.idField].toString().indexOf(GROUP) === 0) {
					if (typeof this.colsByName[props.groupBy].formatter === 'function') {
						content = this.colsByName[props.groupBy].formatter(val, this.colsByName[props.groupBy], rawdata);
					}
				}

				return <NestedCell
					expanded={this.state.expanded.has(val)}
					collapsable={this.props.collapsable}
					val={val}
					colData={colData}
					rawData={rawdata}
					onClick={this.toggleCollapse.bind(this, val, colData, rawdata)}
				>
					{content}
				</NestedCell>;
			}
		}
	}

	toggleCollapse(val, colData, rawdata) {
		let expanded = new Set(this.state.expanded.values());
		let ckey = [CACHE_NAME, 'tb_'+this.uniqueId, 'r__'+rawdata[this.props.idField]];

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

		//console.log('he seleccionado', selection, selectionArray, this.data);

		if (!selection.length && extcb) {
			this.props.afterSelect([], []);
			newSelection = new Set();
		} else {
			selectionArray.forEach((k) => {
				let isGroup = k.indexOf(GROUP) === 0;

				newSelArray.push(k.toString());
				if (isGroup) {
					let gkey = k.replace(GROUP, '');
					let items = _.pluck(this.grouped[gkey], this.props.idField);

					items.forEach((ik) => {
						newSelArray.push(ik.toString());
					});
				}
			});

			newSelection = new Set(newSelArray);
		}

		cache.flush([CACHE_NAME, 'tb_'+this.uniqueId]);
		this.setState({selection: newSelection}, this.sendSelection.bind(this, newSelection));
	}

	render() {
		let {cols, data, afterSelect, afterSort, selected, uniqueId, ...props} = this.props;
		cols = this.cols;
		data = this.data;
		uniqueId = this.uniqueId;

		console.log('seleccion en tree', this.state.selection);

		return <Table
			afterSelect={(selection, selectionArray) => {
				this.onSelect(afterSelect, selection, selectionArray);
			}}
			uniqueId={uniqueId}
			selected={this.state.selection}
			cols={cols}
			data={data}
			{...props}
		/>;
	}
}

TreeTable.propTypes = {
	className: React.PropTypes.string,
	data: React.PropTypes.array,
	cols: React.PropTypes.array.isRequired,
	uniqueId: React.PropTypes.oneOfType([
      	React.PropTypes.string,
      	React.PropTypes.number
    ]),
	afterSort: React.PropTypes.func,
	afterSelect: React.PropTypes.func,
	selectable: React.PropTypes.oneOf([true, MULTIPLE_SELECTION, false]),
	selected: React.PropTypes.oneOfType([
      	React.PropTypes.string,
      	React.PropTypes.number,
      	React.PropTypes.array,
      	React.PropTypes.object
    ]),
    rowHeight: React.PropTypes.number,
    idField: React.PropTypes.string,
    msgs: React.PropTypes.objectOf(React.PropTypes.object),
    lang: React.PropTypes.string,
    selectorWidth: React.PropTypes.number,
    multisort: React.PropTypes.bool,
    sortIcons: React.PropTypes.object,
    iconColor: React.PropTypes.string,
    iconDefColor: React.PropTypes.string,
  	columnFilterComponent: React.PropTypes.oneOfType([
  		React.PropTypes.object,
      	React.PropTypes.func
    ]),
  	restartOnClick: React.PropTypes.oneOfType([
      	React.PropTypes.element,
      	React.PropTypes.object // Js element but not React element
    ]),
    restartOnClickType: React.PropTypes.oneOf([CLEAR_FILTERS, CLEAR_SORT, CLEAR_BOTH]),
    getColSettings: React.PropTypes.func,
    colSortDirs: React.PropTypes.objectOf(React.PropTypes.string),
    colFilters: React.PropTypes.objectOf(React.PropTypes.object),
    filterWidth: React.PropTypes.number,
}

TreeTable.defaultProps = {
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
	lang: 'ENG',
	selectorWidth: 27,
	multisort: false,
	columnFilterComponent: null,
	sortIcons: null,
	iconColor: '#5E78D3',
	iconDefColor: '#D6D6D6',
	restartOnClick: null,
	restartOnClickType: CLEAR_BOTH,
	getColSettings: null,
	colSortDirs: null,
	colFilters: null,
	filterWidth: null,

	// PROPS of Three
	groupBy: null,
	groupCol: null,
	nestedBy: null,
	nestedParentField: 'parent_id',
	collapsable: true,
	expanded: [],
	onGroupClick: null
}

export default TreeTable;