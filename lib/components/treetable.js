'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _nestedcell = require('./nestedcell');

var _nestedcell2 = _interopRequireDefault(_nestedcell);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _underscore = require('underscore');

var _reactImmutableRenderMixin = require('react-immutable-render-mixin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Set = require('es6-set');

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

var TreeTable = function (_React$Component) {
	_inherits(TreeTable, _React$Component);

	function TreeTable(props) {
		_classCallCheck(this, TreeTable);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeTable).call(this, props));

		_this.state = {
			expanded: new Set(_this.props.expanded)
		};
		return _this;
	}

	_createClass(TreeTable, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			var propschanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.props, nextProps);
			var statechanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.state, nextState);

			return propschanged || statechanged;
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.prepareNestedData();
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			this.prepareNestedData(nextProps, nextState);
		}
	}, {
		key: 'prepareNestedData',
		value: function prepareNestedData() {
			var _this2 = this;

			var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
			var state = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];

			this.cols = _immutable2['default'].fromJS(props.cols).toJS();
			this.data = _immutable2['default'].fromJS(props.data).toJS();
			this.grouped = {};
			this.colsByName = {};
			this.groupCol = {};
			var sortedGroups = [];

			if (props.groupBy) {
				(function () {
					_this2.grouped = _.groupBy(_this2.data, props.groupBy);
					_this2.colsByName = _.indexBy(_this2.cols, 'name');
					_this2.groupCol = _this2.colsByName[props.groupCol];
					var groupKeys = (0, _underscore.keys)(_this2.grouped);
					var newdata = [];
					var oldFormatter = _this2.groupCol.formatter;

					_this2.groupCol.formatter = function (val, colData, rawdata) {
						var content = val;

						if (typeof oldFormatter == 'function') {
							content = oldFormatter(val, colData, rawdata);
						}

						return _react2['default'].createElement(
							_nestedcell2['default'],
							{ collapsable: props.collapsable, val: val, colData: colData, rawData: rawdata, onClick: _this2.toggleCollapse.bind(_this2, val, colData, rawdata) },
							content
						);
					};

					if (groupKeys && groupKeys.length) {
						groupKeys.forEach(function (item) {
							var row = {};

							row[props.groupCol] = item;
							row._level = 1;
							row._isGroup = true;
							row._hasChildren = true;
							row._expanded = state.expanded.has(item);

							newdata.push(row);

							if (!props.collapsable || state.expanded.has(item)) {
								_this2.grouped[item].forEach(function (inneritem) {
									var nitem = (0, _underscore.extend)(inneritem, {
										_level: 2,
										_isGroup: false,
										_hasChildren: false
									});

									newdata.push(nitem);
								});
							}
						});

						_this2.data = newdata;
					}
				})();
			}
		}
	}, {
		key: 'toggleCollapse',
		value: function toggleCollapse(val, colData, rawdata) {
			var expanded = new Set(this.state.expanded.values());

			if (expanded.has(val)) {
				expanded['delete'](val);
			} else {
				expanded.add(val);
			}

			this.setState({ expanded: expanded });
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var cols = _props.cols;
			var data = _props.data;
			var afterSelect = _props.afterSelect;
			var afterSort = _props.afterSort;

			var props = _objectWithoutProperties(_props, ['cols', 'data', 'afterSelect', 'afterSort']);

			cols = this.cols;
			data = this.data;

			return _react2['default'].createElement(_table2['default'], _extends({ cols: cols, data: data }, props));
		}
	}]);

	return TreeTable;
}(_react2['default'].Component);

TreeTable.defaultProps = defaultProps();

exports['default'] = TreeTable;
module.exports = exports['default'];