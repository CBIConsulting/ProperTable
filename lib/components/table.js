'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _CLEAR_OPTIONS;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _fixedDataTable = require('fixed-data-table');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _messages2 = require('../lang/messages');

var _messages3 = _interopRequireDefault(_messages2);

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _cellRenderer = require('./cellRenderer');

var _cellRenderer2 = _interopRequireDefault(_cellRenderer);

var _headerCell = require('./headerCell');

var _headerCell2 = _interopRequireDefault(_headerCell);

var _binarysearch = require('binarysearch');

var _binarysearch2 = _interopRequireDefault(_binarysearch);

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

var _reactImmutableRenderMixin = require('react-immutable-render-mixin');

var _rowcache = require('../lib/rowcache');

var _rowcache2 = _interopRequireDefault(_rowcache);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _normalizer = require('../lib/normalizer');

var _normalizer2 = _interopRequireDefault(_normalizer);

var _comparators = require('../filterComparators/comparators');

var _comparators2 = _interopRequireDefault(_comparators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Const
var SELECTOR_COL_NAME = 'selector-multiple-column'; // Name of the selector column
var DEFAULT_SORT_DIRECTION = 'DEF';
var ASCENDING_SORT_DIRECTION = 'ASC';
var DESCENDING_SORT_DIRECTION = 'DESC';
var SELECTED_FIELD = '_selected';
var ROW_INDEX_FIELD = '_rowIndex';
var RAWDATA_INDEX_FIELD = '_rawDataIndex';
var MULTIPLE_SELECTION = 'multiple';
var CLEAR_FILTERS = 'clear_filters';
var CLEAR_SORT = 'clear_sort';
var CLEAR_BOTH = 'clear_both';
var FILTERTYPE_SELECTION = 'selection';
var FILTERTYPE_CUSTOM = 'operation';
var NOTEQUALS = 'notequals';
var EQUALS = "equals";
var BIGGERTHAN = 'bigger';
var LOWERTHAN = 'lower';
var AFTERDATE = 'after';
var BEFOREDATE = 'before';
var BETWEENDATES = 'between';
var ONDATE = 'on';
var NOTONDATE = 'noton';
var STARTSWITH = 'start';
var FINISHWITH = 'finish';
var CONTAINS = 'contains';
var NOTCONTAINS = 'notcontains';
var EMPTY = 'empty';
var CACHE_NAME = 'formatted';
var Set = require('es6-set');
var DATE_TYPES = new Set([AFTERDATE, BEFOREDATE, ONDATE, NOTONDATE]);
var CLEAR_OPTIONS = (_CLEAR_OPTIONS = {}, _CLEAR_OPTIONS[CLEAR_BOTH] = { sort: true, filters: true }, _CLEAR_OPTIONS[CLEAR_FILTERS] = { sort: false, filters: true }, _CLEAR_OPTIONS[CLEAR_SORT] = { sort: true, filters: false }, _CLEAR_OPTIONS);

/**
 * A proper table component based on react Fixed-DataTables with an amount of new functionalities.
 * Rows selection with callback, sorting (single, multisorting), cell formating, fixed columns when scrolling, etc...
 * See Examples folder for more detail.
 *
 * Simple example usage:
 *
 * let cols = [
 *		{
 *			name: 'col1',
 *			label: <span>A number</span>,
 *			field: 'number',
 *			fixed: true
 *		},{
 *			name: 'col2',
 *			label: 'col2',
 *			field: 'col2'
 *		}
 *	]
 *
 * let data = [];
 *	  data.push({
 *		  col1: 5,
 *		  col2: 'abcde'
 *	  });
 *
 * 	<ProperTable.Table
 *		key='TableKey'
 *		uniqueId={1}
 *		rowHeight={40}
 *		cols={cols}
 *		data={data}
 *		afterSelect={
 *			function(rows) {
 *				console.log('selected', rows);
 *			}
 *		}
 *	/>
 * ```
 */

var ProperTable = function (_React$Component) {
	_inherits(ProperTable, _React$Component);

	function ProperTable(props) {
		_classCallCheck(this, ProperTable);

		// Get initial data
		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		var initialData = _this.prepareData(props, null);
		// Get initial columns sort
		var initialColSettings = _this.prepareColSettings(props, initialData.rawdata);
		// Sort cols by position if exist
		var cols = _this.sortTableCols(_immutable2['default'].fromJS(props.cols));

		_this.state = {
			cols: cols,
			colSettings: initialColSettings.colSettings,
			colSortParsers: initialColSettings.colSortParsers,
			data: initialData.data,
			initialData: initialData.initialData,
			indexed: initialData.indexed,
			initialIndexed: initialData.initialIndexed,
			rawdata: initialData.rawdata,
			sizes: _immutable2['default'].fromJS({}),
			selection: initialData.defSelection,
			sortCache: initialData.defSortCache,
			allSelected: false,
			sendSorted: false,
			hasSortedColumns: false
		};
		return _this;
	}

	ProperTable.prototype.componentWillMount = function componentWillMount() {
		this.uniqueId = this.props.uniqueId ? this.props.uniqueId : _underscore2['default'].uniqueId('propertable-');

		// Sort the table and apply filters if exist in props
		this.applySettings();

		// Add new click listener if exist
		if (this.props.restartOnClick) {
			this.addClickListener(this.props.restartOnClick);
		}
	};

	ProperTable.prototype.componentDidMount = function componentDidMount() {
		// In some cases the callback of setState it's called before the new state is set up so we use a flag to prevent this.
		if (this.state.sendSorted) {
			this.setState({
				sendSorted: false
			}, this.sendSortedAndSettings.bind(this, this.state.data, this.state.colSettings));
		} else {
			this.sendColSettings(this.state.colSettings);
		}
	};

	ProperTable.prototype.componentWillUnmount = function componentWillUnmount() {
		_rowcache2['default'].flush([CACHE_NAME, 'tb_' + this.uniqueId]);

		// Remove listener if exist
		if (this.props.restartOnClick) {
			this.removeClickListener(this.props.restartOnClick);
		}
	};

	ProperTable.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		var _this2 = this;

		var propschanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.props, nextProps);
		var statechanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.state, nextState);
		var somethingchanged = propschanged || statechanged;

		if (propschanged) {
			var _ret = function () {
				var colsDeepCompare = _this2.deepColsCompare(nextProps.cols, _this2.props.cols);
				var colsChanged = colsDeepCompare.hasChangedDeeply || colsDeepCompare.hasSmallChanges || colsDeepCompare.hasChangedPosition;
				var dataChanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(nextProps.data, _this2.props.data);
				var colSortDirsChanged = nextProps.colSortDirs ? !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(nextProps.colSortDirs, _this2.props.colSortDirs) : false;
				var colFiltersChanged = nextProps.colFilters ? !_this2.checkFiltersEquality(nextProps.colFilters, _this2.props.colFilters) : false;
				var colData = null,
				    preparedData = null,
				    cols = null,
				    newCol = void 0;

				// If data and columns change the colSettings and all data states must be updated. Then apply default (sort table
				// and set selection if it has been received). If both change It's almost the same as rebuild the component. Almost everything changes
				if (colsChanged || dataChanged) {
					if (dataChanged) {
						_rowcache2['default'].flush([CACHE_NAME, 'tb_' + _this2.uniqueId]);

						preparedData = _this2.prepareData(nextProps, nextState);
						colData = _this2.prepareColSettings(nextProps, preparedData.rawdata);
						cols = _this2.sortTableCols(_immutable2['default'].fromJS(nextProps.cols));

						_this2.setState({
							colSettings: colData.colSettings,
							colSortParsers: colData.colSortParsers,
							cols: cols,
							data: preparedData.data,
							initialData: preparedData.initialData,
							indexed: preparedData.indexed,
							initialIndexed: preparedData.initialIndexed,
							rawdata: preparedData.rawdata,
							sortCache: preparedData.defSortCache,
							selection: preparedData.defSelection
						}, _this2.applySettings.bind(_this2, colData.colSettings, nextProps, true));
					} else if (colsChanged) {
						if (colsDeepCompare.hasChangedDeeply || colsDeepCompare.hasSmallChanges && colsDeepCompare.hasChangedPosition) {
							(function () {
								var sortCache = [];

								_rowcache2['default'].flush([CACHE_NAME, 'tb_' + _this2.uniqueId]);
								colData = _this2.prepareColSettings(nextProps, _this2.state.rawdata);
								cols = _this2.sortTableCols(_immutable2['default'].fromJS(nextProps.cols));

								// Restart cache
								nextState.data.forEach(function (row) {
									sortCache[row.get(_this2.props.idField)] = {};
								});

								_this2.setState({
									colSettings: colData.colSettings,
									colSortParsers: colData.colSortParsers,
									cols: cols,
									sortCache: sortCache
								}, _this2.applySettings.bind(_this2, colData.colSettings, nextProps)); // apply selection and sort
							})();
						} else if (colsDeepCompare.hasSmallChanges) {
							cols = _this2.state.cols.map(function (col) {
								newCol = colsDeepCompare.changedCols[col.get('name')];

								if (newCol) {
									_underscore2['default'].each(newCol, function (value, key) {
										col = col.set(key, value);
									});
								}

								return col;
							});

							_this2.setState({
								cols: cols
							});
						} else {
							cols = _this2.sortTableCols(_immutable2['default'].fromJS(nextProps.cols));

							_this2.setState({
								cols: cols
							});
						}
					}

					return {
						v: false
					};
				} else if (colSortDirsChanged || colFiltersChanged) {
					_this2.applySettings(nextState.colSettings, nextProps);
				} else if (nextProps.selected) {
					_this2.setDefaultSelection(nextProps);

					return {
						v: false
					};
				}
			}();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}

		return somethingchanged;
	};

	ProperTable.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
		this.checkSelectionChange(nextProps, nextState);

		if (nextState.sendSorted) {
			this.sendSortedAndSettings(nextState.data, nextState.colSettings);
		}
	};

	ProperTable.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
		if (this.state.sendSorted) this.setState({ sendSorted: false });
	};

	ProperTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
		if (newProps.restartOnClick || this.props.restartOnClick) {
			var restartOnClickChanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.props.restartOnClick, newProps.restartOnClick);

			if (restartOnClickChanged) {
				// Remove old listener if exist
				if (this.props.restartOnClick) {
					this.removeClickListener(this.props.restartOnClick);
				}

				// Add new listener if exist
				if (newProps.restartOnClick) {
					this.addClickListener(newProps.restartOnClick);
				}
			}
		}
	};

	/**
  * Check if cols has changed deeply. This function is made to optimize shouldComponentUpdate when the visibility or something
  * like that has changed but it's not a big change, so colSettings still been the same. If has changed deeply then re-build the
  * colSettings and restart sortCache, if it's just a small change like in class, label, isVisible, etc, then update the changed
  * columns only.
  *
  * @param (array) 	nextCols		Next columns received by the table
  * @param (array)	currentCols		The current columns of the table
  *
  * @return (object) result
  *						- (boolean) hasChangedDeeply  	If has changed deeply
  *						- (boolean) hasSmallChanges 	If the properties which could be updated in hot has changed. Class, fixed, isVisible...
  *						- (boolean) hasChangedPosition 	If the position of the cols has changed
  * 						- (object)  changedCols 		Object with the changed cols indexed by the index (when it has just small changes)
  */


	ProperTable.prototype.deepColsCompare = function deepColsCompare(nextCols, currentCols) {
		var nextLength = nextCols.length,
		    currentLength = currentCols.length,
		    hasChangedDeeply = false,
		    hasSmallChanges = false,
		    changedCols = {};
		var fixedChanged = void 0,
		    classNameChanged = void 0,
		    isVisibleChanged = void 0,
		    labelChanged = void 0,
		    somethingchanged = void 0,
		    curCol = void 0,
		    hasChangedPosition = false;

		if (currentCols.length !== nextCols.length) {
			hasChangedDeeply = true;
		} else {
			_underscore2['default'].every(nextCols, function (col, index) {
				curCol = currentCols[index];

				if (col.name !== curCol.name || col.field !== curCol.field || col.sortable !== curCol.sortable || col.uniqueId !== curCol.uniqueId || !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(col.formatter, curCol.formatter) || !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(col.sortVal, curCol.sortVal) || !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(col.children, curCol.children)) {

					hasChangedDeeply = true;
					return false; // Break
				}

				fixedChanged = col.fixed !== curCol.fixed;
				classNameChanged = col.className !== curCol.className;
				isVisibleChanged = col.isVisible !== curCol.isVisible;
				labelChanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(col.label, curCol.label);
				somethingchanged = fixedChanged || classNameChanged || isVisibleChanged || labelChanged;

				if (somethingchanged) {
					changedCols[col.name] = _underscore2['default'].clone(col);
					hasSmallChanges = true;
				}

				if (!hasChangedPosition) {
					hasChangedPosition = col.position !== curCol.position;
				}

				return true; // Next
			});
		}

		return {
			hasChangedDeeply: hasChangedDeeply,
			hasSmallChanges: hasSmallChanges,
			hasChangedPosition: hasChangedPosition,
			changedCols: changedCols
		};
	};

	/**
  * Sort the columns by its position and return the cols sorted.
  *
  * @param (array) 	columns Property cols.
  * @return (object)	cols 	Sorted cols by its position as an Immutable
  */


	ProperTable.prototype.sortTableCols = function sortTableCols(cols) {
		if (cols.size > 0) {
			cols = cols.sortBy(function (col, colIndex, allCols) {
				return col.get('position', 1);
			}, function (val1, val2) {
				if (val1 === val2) {
					return 0;
				} else {
					return val1 > val2 ? 1 : -1;
				}
			});
		}

		return cols;
	};

	/**
  * Add a click listener to the props.restartOnClick element. The function clearFilterAndSort will be called when this elemente get clicked.
  *
  * @param {Js Element || React Element} restartOnClick 	Element which will have a new on click listener
  */


	ProperTable.prototype.addClickListener = function addClickListener(restartOnClick) {
		if (!_react2['default'].isValidElement(restartOnClick)) {
			// Not React element
			restartOnClick.addEventListener('click', this.clearFilterAndSort.bind(this));
		} else {
			var btn = null;

			if (restartOnClick.props.id) {
				btn = document.getElementById(restartOnClick.props.id);
				btn.addEventListener('click', this.clearFilterAndSort.bind(this));
			} else if (this.props.restartOnClick.props.className) {
				btn = document.getElementsByClassName(restartOnClick.props.className);
				for (var i = btn.length - 1; i >= 0; i--) {
					btn[i].addEventListener('click', this.clearFilterAndSort.bind(this));
				}
			}
		}
	};

	/**
  * Remove listener to the props.restartOnClick element.
  *
  * @param {Js Element || React Element} restartOnClick 	Element which have the on click listener
  */


	ProperTable.prototype.removeClickListener = function removeClickListener(restartOnClick) {
		if (!_react2['default'].isValidElement(restartOnClick)) {
			// Not React element
			this.props.restartOnClick.removeEventListener('click', this.clearFilterAndSort.bind(this));
		} else {
			var btn = null;

			if (restartOnClick.props.id) {
				btn = document.getElementById(restartOnClick.props.id);
				btn.removeEventListener('click', this.clearFilterAndSort.bind(this));
			} else if (restartOnClick.props.className) {
				btn = document.getElementsByClassName(restartOnClick.props.className);
				for (var i = btn.length - 1; i >= 0; i--) {
					btn[i].removeEventListener('click', this.clearFilterAndSort.bind(this));
				}
			}
		}
	};

	ProperTable.prototype.checkFiltersEquality = function checkFiltersEquality(nextFilters, currFilters) {
		var keysNext = void 0,
		    keysCurrent = void 0,
		    result = void 0;

		if (!nextFilters && currFilters || nextFilters && !currFilters) {
			return false;
		}

		keysNext = _underscore2['default'].keys(nextFilters);
		keysCurrent = _underscore2['default'].keys(currFilters);

		if (keysNext.length !== keysCurrent.length) return false;

		result = _underscore2['default'].some(keysNext, function (key) {
			result = _underscore2['default'].find(keysCurrent, function (currKey) {
				return key === currKey;
			});

			if (!result) {
				return true;
			} else {
				result = nextFilters[key].type === currFilters[key].type;
				if (result) {
					if (nextFilters[key].type === FILTERTYPE_SELECTION) {
						if (nextFilters[key].selection.length !== currFilters[key].selection.length) {
							return true;
						} else {
							var _ret3 = function () {
								var selectionSet = new Set(currFilters[key].selection),
								    selectionChange = void 0;
								selectionChange = _underscore2['default'].some(nextFilters[key].selection, function (id) {
									return selectionSet.has(id) ? false : true;
								});
								return {
									v: selectionChange
								};
							}();

							if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
						}
					} else {
						if (nextFilters[key].operationType !== currFilters[key].operationType || nextFilters[key].operationValue !== currFilters[key].operationValue) {
							return true;
						}
					}
				}
				return false;
			}
		});

		return !result;
	};

	/**
  * Apply the columns sort and filters over table data and update state.
  *
  * @param (array)	colSettings 		Sort / Filter settings of each column. From current or next state (case the props data/cols change)
  * @param (object) 	props 				Component props or new props on update
  * @param (boolean) forceSendSettings
  */


	ProperTable.prototype.applySettings = function applySettings() {
		var colSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.colSettings;

		var _this3 = this;

		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
		var forceSendSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		var selectionSet = {},
		    columnKeysFiltered = [],
		    fields = [],
		    formatters = [],
		    newData = null,
		    hasFilter = false,
		    hasSort = false,
		    newDirection = void 0;
		var sortedData = [],
		    filterValue = void 0,
		    newFilter = void 0,
		    hasSelectionFilter = void 0,
		    hasCustomFilter = void 0,
		    operations = {};
		var updateSortAllowed = props.colSortDirs && _underscore2['default'].isObject(props.colSortDirs);
		var updateFiltersAllowed = props.colFilters && _underscore2['default'].isObject(props.colFilters);

		// Update settings
		colSettings = _underscore2['default'].map(colSettings, function (col) {
			hasSelectionFilter = false;
			hasCustomFilter = false;

			if (updateSortAllowed) {
				newDirection = props.colSortDirs[col.column];
				if (newDirection && col.direction !== newDirection) {
					sortedData.push({ name: col.column, direction: newDirection }); // To be applied after
					hasSort = true;
				}
			} else if (col.direction !== DEFAULT_SORT_DIRECTION) {
				hasSort = true;
			}

			if (updateFiltersAllowed) {
				newFilter = props.colFilters[col.column];

				if (newFilter) {
					if (!newFilter.type || newFilter.type === FILTERTYPE_SELECTION) {
						if (!hasFilter) {
							if (col.filterType !== FILTERTYPE_SELECTION) {
								// Has changed Type
								hasFilter = true;
							} else {
								hasFilter = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(col.selection, newFilter.selection);
							}
						}
						col.filterType = FILTERTYPE_SELECTION;
						col.selection = newFilter.selection;
					} else if (newFilter.type === FILTERTYPE_CUSTOM) {
						if (!hasFilter && (col.filterType !== FILTERTYPE_CUSTOM || col.operationFilterType !== newFilter.operationType || col.operationFilterValue !== newFilter.operationValue)) {
							hasFilter = true;
						}
						col.filterType = FILTERTYPE_CUSTOM;
						col.operationFilterType = newFilter.operationType;
						col.operationFilterValue = newFilter.operationValue;
					}
				}
			} else if (!hasFilter && (col.filterType === FILTERTYPE_SELECTION && col.selection.length > 0 || col.filterType === FILTERTYPE_CUSTOM && col.operationFilterValue.length > 0)) {
				hasFilter = true;
			}

			hasSelectionFilter = col.selection.length > 0 && col.filterType === FILTERTYPE_SELECTION;
			if (!hasSelectionFilter) hasCustomFilter = col.operationFilterValue.length > 0 && col.filterType === FILTERTYPE_CUSTOM;

			// Build all selection || operation filter in case it has filter
			if (hasSelectionFilter || hasCustomFilter) {
				formatters[col.column] = col.formatter;
				columnKeysFiltered.push(col.column); // Columns filtered

				// You send a column and get the asociated field, needed because more than 1 col can use data from same field. Name is the id key of column but
				// field refer to data field.
				fields[col.column] = col.field;

				if (hasSelectionFilter) {
					selectionSet[col.column] = new Set(col.selection.toString().split(','));
					operations[col.column] = null;
				} else {
					selectionSet[col.column] = null;
					operations[col.column] = { type: col.operationFilterType, value: col.operationFilterValue };

					if (DATE_TYPES.has(col.operationFilterType) && col.operationFilterValue.length > 0) {
						if (!(0, _moment2['default'])(col.operationFilterValue).isValid()) console.warn('Invalid date format: ' + operations[col.column].value);
					}
				}
			}

			return col;
		});

		// Update sort on settings
		if (hasSort && sortedData.length > 0) {
			sortedData.forEach(function (sortObj) {
				colSettings = _this3.updateSortDir(sortObj.name, sortObj.direction, colSettings);
			});
		}

		// In case has sort and filter the sortTable() function gets the filtered data.
		newData = hasFilter ? this.applyFilters(columnKeysFiltered, formatters, selectionSet, fields, operations) : null;

		if (hasSort) {
			this.sortTable(colSettings, true, newData); // This method set state and send the cols settings
		} else if (hasFilter) {
			this.setState(newData, this.sendColSettings.bind(this, colSettings));
		} else if (forceSendSettings) {
			this.sendColSettings(colSettings);
		}
	};

	/**
  * Apply filters to the table data.
  *
  * @param (array) 	columns 	Names of the filtered columns
  * @param (array)	formatters	Formatters asociated with each column, by its name, to parse the data
  * @param (array)	filters 	Contains Set objects of selected values asociated with each column.
  * @param (array)	fields 		Fields asociated with each column name. More than 1 col can use data from same field. This array is key value, where the key is the col name and
  *								the value is the asociated field.
  * @param (array)	operations 	In case has some custom filters in a column or more. This parameter contains a object of objects indexed by column name, has the type of the
  *								filter and the value.
  *
  * @return (object)	-data 		Filtered data.
  *					-indexed 	Indexed data updated.
  */


	ProperTable.prototype.applyFilters = function applyFilters(columns, formatters, filters, fields) {
		var _this4 = this;

		var operations = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
		var _state = this.state;
		var initialData = _state.initialData;
		var indexed = _state.indexed;
		var selection = _state.selection;

		var filteredData = initialData,
		    idField = this.props.idField,
		    formatterAllowed = void 0,
		    applyFormatter = void 0;
		var notAllowedTypes = new Set([BETWEENDATES, AFTERDATE, BEFOREDATE, ONDATE, NOTONDATE]); // Date filters

		// Get the data that match with the selection (of all column filters)
		if (_underscore2['default'].size(filters) > 0) {
			(function () {
				var result = void 0,
				    field = void 0,
				    formatter = void 0,
				    val = void 0;

				filteredData = initialData.filter(function (element) {
					// If value has been found (result = true) then leave loop and return true
					columns.every(function (column) {
						field = fields[column];
						formatter = formatters[column];
						val = element.get(field);
						result = false;
						applyFormatter = true;

						// Skip unvalid values
						if (_underscore2['default'].isNull(val)) val = '';

						if (_this4.isValidType(val)) {
							if (formatter) {
								if (operations[column] && operations[column].type) {
									if (notAllowedTypes.has(operations[column].type)) {
										applyFormatter = false;
									}
								}

								if (applyFormatter) {
									val = formatter(val, null, null);
									if (_underscore2['default'].isNull(val) || _underscore2['default'].isUndefined(val)) val = '';
								}
							}

							if (filters[column]) {
								result = filters[column].has(val.toString());
							} else if (operations[column]) {
								result = _this4.customFilter(operations[column].type, operations[column].value, val, notAllowedTypes.has(operations[column].type));
							}
						}

						return result;
					});

					return result;
				});
			})();
		}

		// Apply selection and update index of each element in indexed data
		filteredData = filteredData.map(function (element, index) {
			if (selection.has(element.get(idField))) {
				element = element.set(SELECTED_FIELD, true);
			}
			indexed[element.get(idField)]._rowIndex = index; // Update index into indexed data.

			return element;
		});

		return {
			data: filteredData,
			indexed: indexed
		};
	};

	/**
  * Prepare the data received by the component for the internal working.
  * @param  (array)	props 	Component props (or nextProps)
  * @param  (array)	state 	Component state (or nextState)
  * @return (object)	-rawdata: The same data as the props.
  *					-indexed: Same as rawdata but indexed by the properId
  *					-data: Parsed data to add some fields necesary to internal working.
  */


	ProperTable.prototype.prepareData = function prepareData() {
		var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
		var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

		// The data will be immutable inside the component
		var data = _immutable2['default'].fromJS(props.data),
		    index = 0,
		    id = void 0,
		    sortCache = [];
		var indexed = {},
		    initialData = null,
		    parsed = [],
		    defSelection = new Set();
		var keyField = this.props.idField;

		if (props.selected) {
			defSelection = this.parseSelected(props);
		} else {
			if (state && state.selection) {
				defSelection = state.selection;
			}
		}

		// Parsing data to add new fields (selected or not, properId, rowIndex)
		parsed = data.map(function (row) {
			id = row.get(keyField, false);

			if (!id) id = _underscore2['default'].uniqueId();else id = id.toString();

			row = row.set(keyField, id);

			if (defSelection.has(id)) {
				row = row.set(SELECTED_FIELD, true);
			} else {
				row = row.set(SELECTED_FIELD, false);
			}

			row = row.set(ROW_INDEX_FIELD, index++);
			sortCache[id] = {};

			return row;
		});

		// Prepare indexed data.
		indexed = _underscore2['default'].indexBy(parsed.toJSON(), keyField);

		return {
			rawdata: data,
			data: parsed,
			initialData: parsed,
			indexed: indexed,
			initialIndexed: (0, _clone2['default'])(indexed),
			defSortCache: sortCache,
			defSelection: defSelection
		};
	};

	/**
  *	Set the default selection if that exist in props
  *
  * @param (array)	props 	Component props (or nextProps)
  */


	ProperTable.prototype.setDefaultSelection = function setDefaultSelection() {
		var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

		if (props.selected) {
			var selection = this.parseSelected(props);
			this.triggerSelection(selection, false); // false -> don't send the selection
		}
	};

	/**
  * Parse the property selected that could be a string, number, array of strings / numbers or a Set into a Set.
  *
  * @param (array)	props 		Component props (or nextProps)
  * @return (Set)	selection 	The default selected rows.
  */


	ProperTable.prototype.parseSelected = function parseSelected() {
		var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

		var selection = void 0,
		    isArray = _underscore2['default'].isArray(props.selected),
		    isObject = _typeof(props.selected) === 'object';

		if (!isArray && isObject) return props.selected; // Is Set

		if (!isArray) {
			// Is String or number
			selection = [props.selected.toString()];
		} else if (props.selected.length > 0) {
			// Is Array
			selection = props.selectable === MULTIPLE_SELECTION ? props.selected.toString().split(',') : [props.selected[0].toString()];
		} else {
			selection = [];
		}

		selection = new Set(selection);
		return selection;
	};

	/**
  * If the value is string, number or boolean
  *
  * @param 	(string) 	value 	Value to parse
  * @return 	(boolean)	If value is of valid type
  */


	ProperTable.prototype.isValidType = function isValidType(value) {
		return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
	};

	/**
  * Prepare the columns sort / filtering data to all columns and the array of functions to parse the data of each column before sorting.
  *
  * @param (array)	props 			Component props (or nextProps)
  * @param (object)	rawdata			Initial data to build the indexed and Immutable data (no duplicates) for every column if the component has complex column filter
  *
  * @return (array)	-colSettings: 	Sort / filter settings of each column.
  *					-colSortParsers: 	Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
  */


	ProperTable.prototype.prepareColSettings = function prepareColSettings() {
		var _this5 = this;

		var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
		var rawdata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		var cols = props.cols,
		    colSettings = [];
		var sortData = this.buildColSortDirs(cols); // Build the initial colsortdirs using the cols array.
		var multisort = props.multisort,
		    direction = null,
		    sortable = null,
		    colData = null,
		    indexed = null,
		    parsedData = null;

		// The default sort dirs (in case that's exist) will be applied in applyColSettings

		// Through each element, of the colSortDirs built data, build the colSortDirs with the default directions received,
		// setting a position (position of priority to sort (it will be modified after click on the diferent columns)), if
		// the column is sortable or not and if the Table has multisort or just only single.
		for (var i = 0; i <= sortData.colSortDirs.length - 1; i++) {
			colData = sortData.colSortDirs[i];
			sortable = !_underscore2['default'].isNull(colData.sortable) ? colData.sortable : true;

			// If has filter build a list without duplicates and it indexed
			if (this.props.columnFilterComponent && sortable) {
				(function () {
					var idSet = new Set(),
					    index = 0,
					    rawdataIndex = 0,
					    hasNulls = false,
					    val = void 0,
					    valid = void 0;

					// Parsing data for filter
					parsedData = rawdata.map(function (row) {
						val = row.get(colData.field);

						// Only string or number values then formated (Dates, etc...) Not objects allowed
						valid = _this5.isValidType(val);

						if (valid && !_underscore2['default'].isNull(val) && val !== '') {
							if (colData.formatter) {
								val = colData.formatter(val, null, null);
								valid = _this5.isValidType(val);
							}

							if (valid && !idSet.has(val) && !_underscore2['default'].isNull(val) && !_underscore2['default'].isUndefined(val)) {
								// No repeat
								idSet.add(val);

								row = row.set(colData.field, val.toString());
								row = row.set(SELECTED_FIELD, false);
								row = row.set(ROW_INDEX_FIELD, index++); // data row index
								row = row.set(RAWDATA_INDEX_FIELD, rawdataIndex++); // rawData row index
								return row; // RETURN
							}
						}

						rawdataIndex++; // add 1 to jump over duplicate values
						hasNulls = true;
						return null;
					});

					// Clear null values if exist
					if (hasNulls) {
						parsedData = parsedData.filter(function (element) {
							return !_underscore2['default'].isNull(element);
						});
					}

					// Prepare indexed data.
					indexed = _underscore2['default'].indexBy(parsedData.toJSON(), colData.field);
				})();
			}

			colSettings.push({
				column: colData.column, // Column name
				field: colData.field,
				direction: colData.direction,
				position: i + 1,
				sorted: false,
				multisort: multisort, // single (false) (in this case only one at a time can be sorted) or multisort (true - all true)
				sortable: sortable,
				filterType: FILTERTYPE_SELECTION,
				selection: [], // Selected values of this column (to filter when has a complex filter)
				operationFilterType: CONTAINS,
				operationFilterValue: '',
				indexedData: indexed, // Indexed by this column (just if has complex filter)
				data: parsedData,
				formatter: colData.formatter
			});
		}

		// Ordering by selected rows. Virtual column
		if (props.selectable == MULTIPLE_SELECTION) {
			colSettings.push({
				column: SELECTOR_COL_NAME, // Column name
				field: SELECTED_FIELD,
				direction: DEFAULT_SORT_DIRECTION,
				position: sortData.colSortDirs.length + 1, // Last
				sorted: false,
				multisort: multisort,
				sortable: true,
				filterType: FILTERTYPE_SELECTION,
				selection: [],
				operationFilterType: CONTAINS,
				operationFilterValue: '',
				indexedData: [],
				data: [],
				formatter: null
			});
		}

		return {
			colSettings: colSettings,
			colSortParsers: sortData.sortVals
		};
	};

	/**
  * Build the structure of the colSortDirs array and the sortVals array with the functions received in cols or a default function to parse.
  * In fact this method look through all the columns in props.cols recursively and add all that aren't a ColumnGroup,
  * the columns that may be sorted.
  *
  * @param 	(array)	cols Describe each column data. (name, sortable, fixed...)
  *
  * @return 	(array)	-colSortDirs: Sort settings of each column.
  *					-sortValues: Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
  */


	ProperTable.prototype.buildColSortDirs = function buildColSortDirs(cols) {
		var _this6 = this;

		var colSortDirs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var sortVals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		cols.forEach(function (element) {
			if (!element.children) {
				var sortable = _underscore2['default'].isUndefined(element.sortable) ? null : element.sortable;
				var formatter = _underscore2['default'].isUndefined(element.formatter) ? null : element.formatter;
				sortVals[element.name] = element.sortVal || function (val) {
					return val;
				}; // Function to iterate

				colSortDirs.push({
					column: element.name,
					field: element.field,
					direction: DEFAULT_SORT_DIRECTION,
					sortable: sortable,
					formatter: formatter
				});
			} else {
				_this6.buildColSortDirs(element.children, colSortDirs, sortVals);
			}
		});

		if (this.props.selectable == MULTIPLE_SELECTION) {
			sortVals[SELECTOR_COL_NAME] = function (val) {
				return val;
			};
		}

		return {
			colSortDirs: colSortDirs,
			sortVals: sortVals
		};
	};

	/**
  * Return if the value is valid with the type in comparison with compareTo string.
  *
  * @param (string) 		type 		Type of the filter. Must be Equals, Starts With...
  * @param (string) 		value 		Value of the filter
  * @param (string) 		compareTo 	Value of the field to be checked
  * @param (boolean) 	escapeLess 	If it's a date type then use escape less to don't normalize some characters like -/.
  *
  * @return (boolean) 	result
  */


	ProperTable.prototype.customFilter = function customFilter(type, value, compareTo) {
		var escapeLess = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		return _comparators2['default'][type](_normalizer2['default'].normalize(value, escapeLess), _normalizer2['default'].normalize(compareTo, escapeLess));
	};

	/**
  * Clear all column filters and sort directions
  */


	ProperTable.prototype.clearFilterAndSort = function clearFilterAndSort(e) {
		var _this7 = this;

		e.preventDefault();
		var colSettings = this.state.colSettings,
		    data = void 0,
		    indexed = this.state.indexed;
		var clear = CLEAR_OPTIONS[this.props.restartOnClickType],
		    hasSortedColumns = this.state.hasSortedColumns;

		colSettings = _underscore2['default'].map(colSettings, function (element) {
			if (clear.filters) {
				element.selection = [];
				element.operationFilterValue = '';
			}

			if (clear.sort) {
				element.direction = DEFAULT_SORT_DIRECTION;
			}

			return element;
		});

		// Apply default
		data = this.state.initialData.map(function (element, index) {
			if (_this7.state.selection.has(element.get(_this7.props.idField))) {
				element = element.set(SELECTED_FIELD, true);
			}
			indexed[element.get(_this7.props.idField)]._rowIndex = index; // Update index into indexed data.

			return element;
		});

		if (clear.sort) hasSortedColumns = false;

		this.setState({
			data: data,
			indexed: indexed,
			colSettings: colSettings,
			hasSortedColumns: hasSortedColumns
		}, this.sendSortedAndSettings.bind(this, data, colSettings));
	};

	/**
  * Check if the table has nested columns. Columns inside other columns. In that case this component will render the single columns as a
  * column inside a ColumnGroup even if the column has not childrens.
  *
  * @param (array)		cols  	Describe columns
  * @return (boolean)	result	True if has nested columns or false otherwhise
  */


	ProperTable.prototype.hasNested = function hasNested(cols) {
		var result = false;

		if (cols.size) {
			cols.forEach(function (c) {
				if (c.get('children') && c.get('children').size) {
					result = true;
					return false;
				}
			});
		}

		return result;
	};

	/**
  * Function called each time the user click on the header of a column, then apply a sortBy function in that column.
  * After that, update the state of the component
  *
  * @param {String} 		columnKey 	The name of the column which will be resort.
  * @param {String} 		sortDir 	The new direction of the sort. ASC || DESC || DEF(AULT)
  * @param {object}		newData 	In case this method is called after filtering data (don't update state twice for the same)
  */


	ProperTable.prototype.onSortChange = function onSortChange(columnKey, sortDir) {
		var newData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		var colSettings = newData ? newData.colSettings : this.state.colSettings;

		colSettings = this.updateSortDir(columnKey, sortDir, colSettings);
		this.sortTable(colSettings, true, newData);
	};

	/**
  * Function called (just when a component has been sent in props columnFilterComponent) each time the user click on the header of a column,
  * then apply's an filter over the initial data using the current selected values, also update the selection in the colSettings state
  *
  * @param {String} 		columnKey 	The name of the column which will get a new selection filter from the complex filter.
  * @param {object}		selection 	The values selected to filter this column (values from all the values of this column)
  * @param {String} 		sortDir 	(Just on clear filter) The direction of the sort. DEF
  */


	ProperTable.prototype.onColumnGetFiltered = function onColumnGetFiltered(columnKey, selection) {
		var sortDir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
		var colSettings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.state.colSettings;

		var selectionSet = {},
		    columnKeysFiltered = [],
		    fields = [],
		    formatters = []; // new Set(selection)
		var newData = [],
		    hasSort = false;

		// Update selection of this column in the colSettings and add this values to the selection set array if the selection has more than 0
		// elements.
		colSettings = _underscore2['default'].map(colSettings, function (col) {
			if (col.column !== SELECTOR_COL_NAME) {
				if (col.column === columnKey) {
					// Update
					col.selection = selection;
					col.filterType = FILTERTYPE_SELECTION;
				}

				if (!hasSort && col.direction !== DEFAULT_SORT_DIRECTION) hasSort = true;

				if (col.selection.length > 0) {
					// Build all selection
					selectionSet[col.column] = new Set(col.selection.toString().split(','));
					formatters[col.column] = col.formatter;
					columnKeysFiltered.push(col.column);

					// You send a column and get the asociated field, needed because more than 1 col can use data from same field. Name is the id key of column but
					// field refer to data field.
					fields[col.column] = col.field;
				}
			}

			return col;
		});

		// Apply selections
		newData = this.applyFilters(columnKeysFiltered, formatters, selectionSet, fields);
		newData.colSettings = colSettings;

		// In case we didn't get a sort direction then only sort the filtered data (if sort different than default) applying colSettings and update state.
		if (_underscore2['default'].isNull(sortDir)) {
			if (hasSort) {
				this.sortTable(colSettings, true, newData);
			} else {
				this.setState(newData, this.sendColSettings.bind(this, colSettings)); // All columns have sort to default
			}
		} else {
			// Update col Settings with new sort direction for this column, then sort the data and update the component's state.
			this.onSortChange(columnKey, sortDir, newData);
		}
	};

	/**
  * Receive the column name and a sort direction and change the direction of that column, then set the proper position
  * of all the columns (just if the Table have multisorting allowed). The position will be used to set which columns
  * will be sorted first. If there are some columns with sortDir ASC or DESC the data will be sorted in function of
  * what element was clicked before.
  *
  * @param {String} 		columnKey 	The name of the column which will be resort.
  * @param {String} 		sortDir 	The direction of the sort. ASC || DESC || DEF(AULT)
  * @param {array}		colSettings ColSettings to update
  * @return {array}		colSettings Updated colSettings array.
  */


	ProperTable.prototype.updateSortDir = function updateSortDir(columnKey, sortDir) {
		var colSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.colSettings;

		var position = 1;

		// Single sorting.
		if (!this.props.multisort) {
			for (var i = 0; i <= colSettings.length - 1; i++) {
				if (colSettings[i].column === columnKey) {
					colSettings[i].direction = sortDir;
					colSettings[i].multisort = true;
				} else {
					colSettings[i].direction = DEFAULT_SORT_DIRECTION;
					colSettings[i].multisort = false;
				}
			}
		} else {
			// Multisort
			var initialPos = 0,
			    index = 0;

			for (var _i = 0; _i <= colSettings.length - 1; _i++) {
				// If some columns were sorted before then the position of the sorted columns wont be changed, so the initial
				// position will be the next. If 2 columns are already sorted and we sort by a new one then the position of this
				// last column will be 3 and will change to 2 or 1 if the sorted columns back to default.
				if (colSettings[_i].sorted) initialPos++;

				if (colSettings[_i].column === columnKey) {
					colSettings[_i].direction = sortDir; // Set the new direction
					position = colSettings[_i].position; // Save the current position
					index = _i;

					// If the sort direction is not default and the column isn't already sorted then add one to the initial position
					// and set the column to sorted. Otherwise if the sort direction is default set it to unsorted.
					if (sortDir !== DEFAULT_SORT_DIRECTION && !colSettings[_i].sorted) {
						initialPos++;
						colSettings[_i].sorted = true;
					} else if (sortDir == DEFAULT_SORT_DIRECTION) {
						colSettings[_i].sorted = false;
					}
				}
			}

			// Change the priority position to sort of the elements.
			for (var _i2 = 0; _i2 <= colSettings.length - 1; _i2++) {

				// When the position of the current element is lower than the position of the changed element and bigger or equals to the
				// initial position to change.
				if (colSettings[_i2].position < position && colSettings[_i2].position >= initialPos) {
					// Move element to the next position only if the new sort direction wasn't default, in that case keep the element in the same
					// sorting priority position.
					if (colSettings[_i2].direction === DEFAULT_SORT_DIRECTION) colSettings[_i2].position = colSettings[_i2].position + 1;
				}
			}

			// After change the sort position priority of the other elements if the new position is lower than the current position set new position.
			if (initialPos < colSettings[index].position) colSettings[index].position = initialPos;
		}

		return colSettings;
	};

	/**
  * Get the current colSettings state, sort by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
  *
  * @param 	{array}		colSettings Sort settings of each column
  * @param 	{boolean}	sendSorted 	If the sorted data must be sent or not
  * @param 	{object}	newData 	In case this method is called after filtering data (don't update state twice for the same)
  * @return 	{array}		-colSettings: Sorted column in colSettings
  *						-data: Sorted data to be updated in the component state.
  */


	ProperTable.prototype.sortTable = function sortTable(colSettings) {
		var sendSorted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		var newData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		var data = newData ? newData.data : this.state.data,
		    indexedData = newData ? newData.indexed : this.state.indexed;
		var sendSortedAllowed = sendSorted,
		    hasSortedColumns = false;

		colSettings = _underscore2['default'].sortBy(colSettings, function (element) {
			if (!hasSortedColumns && element.direction !== DEFAULT_SORT_DIRECTION) {
				hasSortedColumns = true;
			}

			return element.position;
		}).reverse();

		data = this.sortColumns(data, indexedData, colSettings);

		if (sendSortedAllowed && typeof this.props.afterSort !== 'function' && typeof this.props.getColSettings !== 'function') {
			sendSortedAllowed = false;
		}

		this.setState({
			data: data.data,
			indexed: data.indexed,
			colSettings: colSettings,
			sortCache: data.sortCache,
			sendSorted: sendSortedAllowed,
			hasSortedColumns: hasSortedColumns
		});
	};

	/**
  * Get the current colSettings state, sort it by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
  *
  * @param 	{array}		data 		Data to be render in the Table
  * @param 	{array}		indexed 	Indexed data to be updated (its row index)
  * @param 	{array}		colSettings Sort / filter settings of each column. Sorted by its .position
  * @return 	{array}		sortedData 	Sorted data to be updated in the component state.
  */


	ProperTable.prototype.sortColumns = function sortColumns(data, indexed, colSettings) {
		var _this8 = this;

		var sortedData = data,
		    indexedData = indexed;
		var colSortParsers = this.state.colSortParsers,
		    sortParser = null,
		    sortCache = this.state.sortCache;
		var defaultSort = true,
		    element = null,
		    position = null,
		    rowId = void 0,
		    val = void 0;

		colSettings.forEach(function (element) {
			// The colums could be all true (multisort) or just one of them at a time (all false but the column that must be sorted)
			if (element.direction !== DEFAULT_SORT_DIRECTION && element.multisort && element.sortable) {
				sortParser = colSortParsers[element.column];

				sortedData = sortedData.sortBy(function (row, rowIndex, allData) {
					rowId = row.get(_this8.props.idField);
					// sortCache [row-id] [column-id] = procesed value.
					if (_underscore2['default'].isUndefined(sortCache[rowId][element.field]) || element.column === SELECTOR_COL_NAME) {
						val = sortParser(row.get(element.field));
						sortCache[rowId][element.field] = val || ''; // Turn null's into empty values
					}

					return sortCache[rowId][element.field];
				}, function (val1, val2) {
					if (val1 == val2) {
						return 0;
					} else if (element.direction == ASCENDING_SORT_DIRECTION) {
						return val1 > val2 ? 1 : -1;
					} else if (element.direction == DESCENDING_SORT_DIRECTION) {
						return val1 > val2 ? -1 : 1;
					}
				});
				defaultSort = false;
			}
		});

		// If all the cols are default then sort the data by the rowIndex (virtual field added on componnent's create.)
		if (defaultSort) {
			//  Set to default
			sortedData = data.sortBy(function (row, rowIndex, allData) {
				return row.get(ROW_INDEX_FIELD);
			}, function (val1, val2) {
				return val1 > val2 ? 1 : val1 == val2 ? 0 : -1;
			});
		}

		// Update index into indexed data.
		sortedData.map(function (element, index) {
			indexedData[element.get(_this8.props.idField)]._rowIndex = index;
		});

		return {
			data: sortedData,
			indexed: indexedData,
			sortCache: sortCache
		};
	};

	/**
  *	Get the current data rendered in component using a HOC
  *
  * @param (boolean)			getAsRaw 	Get the data as inmutable or parse to raw data
  * @return (array...object)	data
  */


	ProperTable.prototype.getCurrentData = function getCurrentData() {
		var _this9 = this;

		var getAsRaw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		var data = this.state.data;

		if (getAsRaw) {
			(function () {
				var properId = void 0,
				    rowIndex = void 0,
				    rawdata = _this9.state.rawdata;
				data = data.map(function (row) {
					properId = row.get(_this9.props.idField);
					rowIndex = _this9.state.initialIndexed[properId]._rowIndex;

					return rawdata.get(rowIndex);
				});
				data = data.toJSON();
			})();
		}

		return data;
	};

	/**
  * Recursive function that build the nested columns. If the column has childrens then call itself and put the column into
  * a ColumnGroup.
  *
  * @param 	(array)		colData 	Data to be parsed
  * @param 	(boolean)	isChildren	Is a children of another column or not
  * @param 	(boolean)	hasNested	The whole table has nested columns or not
  * @return 	(object)	col 		The builded column or tree of columns
  */


	ProperTable.prototype.parseColumn = function parseColumn(colData) {
		var _this10 = this;

		var isChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var hasNested = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		var col = null,
		    colname = null,
		    sortDir = DEFAULT_SORT_DIRECTION,
		    sortable = null,
		    selection = [],
		    columnFilter = null,
		    hasComplexFilter = false;
		var indexed = null,
		    headerData = null,
		    className = null,
		    settings = null,
		    isSortedOrFiltered = false,
		    align = 'center',
		    filterExtraProps = {};
		var extraProps = {
			width: 100,
			fixed: false,
			isResizable: true
		};

		colname = colData.name || _underscore2['default'].uniqueId('col-');
		className = colData.className || null;

		if (this.state.sizes.get(colname)) {
			colData.width = this.state.sizes.get(colname);
			colData.flex = 0;
		}

		if (colData.width) {
			extraProps.width = colData.width;
		}

		if (!colData.width && !colData.maxWidth) {
			extraProps.flexGrow = 1;

			if (colData.flex !== undefined) {
				extraProps.flexGrow = colData.flex;
			}
		}

		if (colData.fixed !== undefined) {
			extraProps.fixed = colData.fixed;
		}

		if (colData.isResizable !== undefined) {
			extraProps.isResizable = colData.isResizable;
		}

		if (colData.align !== undefined) {
			align = colData.align;
		}

		// If this column doesn't have childrens then build a column, otherwise build a ColumnGroup and call the method recursively
		// setting the result inside this columns group.
		if (colData.children === undefined || !colData.children.length) {
			// Get column settings
			settings = _underscore2['default'].findWhere(this.state.colSettings, { column: colname }) || {};

			// If this column can be sort or not.
			sortable = _underscore2['default'].isUndefined(colData.sortable) ? true : colData.sortable;

			// Check for a complex filter component. In that case use onColumnFilter instead of onSortChange. That method render the received component
			// just beside the icon of the column header. If the filter type isn't selection then selection must be an empty array
			if (this.props.columnFilterComponent) {
				// react component
				hasComplexFilter = true;
				columnFilter = this.onColumnGetFiltered.bind(this);

				if (settings.filterType === FILTERTYPE_SELECTION) {
					isSortedOrFiltered = settings.selection.length > 0;
					selection = settings.selection;
				} else {
					// if (settings.filterType === FILTERTYPE_CUSTOM)
					isSortedOrFiltered = settings.operationFilterValue.length > 0;
				}

				if (!isSortedOrFiltered && settings.direction !== DEFAULT_SORT_DIRECTION) {
					isSortedOrFiltered = true;
				}

				if (_underscore2['default'].isObject(colData.filterProps) && !_underscore2['default'].isArray(colData.filterProps)) {
					filterExtraProps = colData.filterProps;
				}
			}

			col = _react2['default'].createElement(_fixedDataTable.Column, _extends({
				columnKey: colname,
				key: colname + '-column',
				header: _react2['default'].createElement(_headerCell2['default'], {
					key: this.uniqueId + '-sort-header',
					uniqueId: this.uniqueId,
					onSortChange: this.onSortChange.bind(this),
					columnFilter: columnFilter // function || null
					, filterComponent: this.props.columnFilterComponent // react component
					, data: settings.data // data for columnFilter
					, rawdata: this.state.rawdata // data for columnFilter
					, indexed: settings.indexedData,
					selection: selection // selection for complex filter
					, iconColor: this.props.iconColor // icon color when column filter displayed
					, iconDefColor: this.props.iconDefColor // icon color when column filter closed
					, col: colData.field,
					lang: this.props.lang,
					sortDir: settings.direction,
					children: colData.label,
					colName: colData.name,
					filterWidth: this.props.filterWidth,
					sortable: sortable,
					userClassName: className,
					columnFormater: null // Formatter function that get the value to be render and return it parsed settings.formatter
					, isSortedOrFiltered: isSortedOrFiltered,
					extraProps: filterExtraProps
				}),
				cell: _react2['default'].createElement(_cellRenderer2['default'], { tableId: this.uniqueId, idField: this.props.idField, indexed: this.state.indexed, data: this.state.data, colData: colData, col: colData.field }),
				allowCellsRecycling: !hasComplexFilter,
				align: align
			}, extraProps));

			// If isn't a children but the table has nested columns set the column into a group.
			if (!isChildren && hasNested) {
				col = _react2['default'].createElement(
					_fixedDataTable.ColumnGroup,
					{ key: colname + '-group', fixed: extraProps.fixed },
					col
				);
			}
		} else {
			// Call the method recursively to all the childrens of this column.
			var hasFalsy = false,
			    inner = colData.children.map(function (c) {
				if (c.isVisible === undefined || c.isVisible) return _this10.parseColumn(c, true);else hasFalsy = true;
			});

			if (hasFalsy) inner = _underscore2['default'].compact(inner);

			col = _react2['default'].createElement(
				_fixedDataTable.ColumnGroup,
				_extends({
					columnKey: colname,
					key: colname + '-group',
					header: _react2['default'].createElement(
						_fixedDataTable.Cell,
						null,
						colData.label
					)
				}, extraProps),
				inner
			);
		}

		return col;
	};

	/**
  * Build the table calling the parsecolumn() method for each column in props.cols and saving it to an array to be render into
  * a react fixed-datatable Table. If multiple rows can be selected then build a column with checkboxes to show which rows are seleted.
  *
  * @return (array) 	columns 	Array with all the columns to be rendered.
  */


	ProperTable.prototype.buildTable = function buildTable() {
		var _this11 = this;

		var columns = [],
		    isNested = this.hasNested(this.state.cols),
		    selColumn = null;

		if (this.props.selectable == MULTIPLE_SELECTION) {
			var somethingSelected = this.state.selection.size > 0;
			var allSelected = this.props.columnFilterComponent ? this.isAllSelected(this.state.data, this.state.selection) : this.state.allSelected;
			var settings = _underscore2['default'].findWhere(this.state.colSettings, { column: SELECTOR_COL_NAME }) || null;
			var sortDir = settings ? settings.direction : DEFAULT_SORT_DIRECTION;

			selColumn = _react2['default'].createElement(_fixedDataTable.Column, {
				columnKey: SELECTOR_COL_NAME,
				key: _underscore2['default'].uniqueId('selector-'),
				header: _react2['default'].createElement(
					_headerCell2['default'],
					{
						className: 'selector-column-header',
						onSortChange: this.onSortChange.bind(this),
						sortDir: sortDir,
						sortable: true
					},
					_react2['default'].createElement(_selector2['default'], {
						onClick: this.handleSelectAll.bind(this),
						somethingSelected: somethingSelected,
						allSelected: allSelected,
						indexed: this.state.indexed,
						isHeader: true
					})
				),
				cell: _react2['default'].createElement(_selector2['default'], {
					indexed: this.state.indexed,
					data: this.state.data,
					selected: this.state.selection,
					idField: this.props.idField
				}),
				allowCellsRecycling: true,
				width: this.props.selectorWidth,
				fixed: true
			});

			if (isNested) {
				selColumn = _react2['default'].createElement(
					_fixedDataTable.ColumnGroup,
					{ fixed: true, key: _underscore2['default'].uniqueId('selector-group-') },
					selColumn
				);
			}

			columns.push(selColumn);
		}

		this.state.cols.forEach(function (col) {
			if (col.get('isVisible', true)) {
				columns.push(_this11.parseColumn(col.toJSON(), false, isNested));
			}
		});

		return columns;
	};

	/*
  * Build the table footer with info about sort and filters.
  */


	ProperTable.prototype.buildFooter = function buildFooter() {
		var footer = null;

		if (this.props.displayFooter) {
			var _messages = this.props.msgs[this.props.lang];
			var msgFilters = void 0,
			    msgSort = null,
			    isFirstFilter = true,
			    isFirstColumn = true,
			    column = void 0;
			var hasSort = this.state.hasSortedColumns;

			if (this.state.data.size < this.state.initialData.size) {
				msgFilters = _messages.filtered;
				if (hasSort) msgSort = _messages.sorted + ' ';

				for (var i = this.state.colSettings.length - 1; i >= 0; i--) {
					column = this.state.colSettings[i];

					if (column.selection.length > 0 && column.filterType === FILTERTYPE_SELECTION || column.operationFilterValue.length > 0 && column.filterType === FILTERTYPE_CUSTOM) {
						if (!isFirstFilter) msgFilters += ' > ';
						msgFilters += ' ' + column.column;
						isFirstFilter = false;
					}

					if (hasSort) {
						if (column.direction !== DEFAULT_SORT_DIRECTION) {
							if (!isFirstColumn) msgSort += ' > ';
							msgSort += ' ' + column.column + ' - ' + column.direction;
							isFirstColumn = false;
						}
					}
				}
				msgFilters += '. ' + _messages.there + ' ' + this.state.data.size + ' ' + _messages.filtering + ' ' + this.state.initialData.size;
				if (hasSort) hasSort = false; // It's already parsed.
			} else {
				msgFilters = _messages.allData + ' ' + this.state.data.size + ' ' + _messages.rows;
			}

			if (hasSort) {
				msgSort = _messages.sorted + ' ';

				for (var _i3 = this.state.colSettings.length - 1; _i3 >= 0; _i3--) {
					column = this.state.colSettings[_i3];

					if (column.direction !== DEFAULT_SORT_DIRECTION) {
						if (!isFirstColumn) msgSort += ' > ';
						msgSort += ' ' + column.column + ' - ' + column.direction;
						isFirstColumn = false;
					}
				}
			}

			footer = _react2['default'].createElement(
				'div',
				{ className: 'propertable-footer-info', style: { height: this.props.footerInfoHeight } },
				_react2['default'].createElement(
					'div',
					{ className: 'footer-left-info' },
					msgSort
				),
				_react2['default'].createElement(
					'div',
					{ className: 'footer-right-info' },
					msgFilters
				)
			);
		}

		return footer;
	};

	/**
  * Set all columns to selected or to not selected. Callback for the onclick of the Selector component, in the top of the table, in
  * the case that the Table allows multiple selection.
  *
  * @param {object}	e  	Event which call the function.
  */


	ProperTable.prototype.handleSelectAll = function handleSelectAll(e) {
		var _this12 = this;

		e.preventDefault();

		if (this.props.selectable) {
			(function () {
				var idField = _this12.props.idField,
				    value = void 0,
				    selection = new Set(_this12.state.selection);
				var _state2 = _this12.state;
				var allSelected = _state2.allSelected;
				var data = _state2.data;
				var indexed = _state2.indexed;
				var rawdata = _state2.rawdata;

				// Select all

				if (!allSelected) {
					if (data.size < rawdata.size) {
						// Filtered
						data.forEach(function (element) {
							value = element.get(idField);
							if (!selection.has(value.toString())) selection.add(value.toString());
						});
					} else {
						selection = new Set(_underscore2['default'].keys(indexed));
					}
				} else if (selection.size > 0) {
					// Unselect all
					// Filtered data
					if (data.size < rawdata.size) {
						// Remove elements from selection
						data.forEach(function (element) {
							value = element.get(idField);
							if (selection.has(value.toString())) selection['delete'](value.toString());
						});
					} else {
						selection = new Set();
					}
				}

				_this12.triggerSelection(selection);
			})();
		}
	};

	/**
  * Toogle the selected state of a column. Callback for the onRowClick of the react fixed-dataTable.
  *
  * @param {object}	e  			Event which call the function
  * @param {integer}	rowIndex  	Index of the clicked row.
  */


	ProperTable.prototype.handleRowClick = function handleRowClick(e, rowIndex) {
		e.preventDefault();
		var clickedRow = this.state.data.get(rowIndex);
		var clickedId = clickedRow.get(this.props.idField);

		if (this.props.selectable) {
			this.toggleSelected(clickedId.toString());
		}
	};

	/**
  * Check if all the current data are selected.
  *
  * @param {array}	data		The data to compare with selection
  * @param {object}	selection	The current selection Set of values (idField)
  */


	ProperTable.prototype.isAllSelected = function isAllSelected(data, selection) {
		var _this13 = this;

		var result = true;

		if (data.size === 0) return false;else if (data.size === this.state.rawdata.size) return selection.size >= this.state.data.size; // Not filtered data

		// Filtered data
		data.forEach(function (element) {
			if (!selection.has(element.get(_this13.props.idField).toString())) {
				// Some data not in selection
				result = false;
				return false;
			}
		});

		return result;
	};

	/**
  * Toogle the selected state of the column that has the same properId as in the parameters.
  *
  * @param {integet}	id  	Virtual field added to each row data on componnent's create
  */


	ProperTable.prototype.toggleSelected = function toggleSelected(id) {
		var selection = new Set(this.state.selection);

		if (selection.has(id)) {
			selection['delete'](id); // Returns a copy of the array with the instance with that properId deleted.
		} else {
			if (this.props.selectable == MULTIPLE_SELECTION) {
				selection.add(id);
			} else {
				selection = new Set([id]);
			}
		}

		this.triggerSelection(selection); // Set the new selection to the components state.
	};

	/**
  * Before the components update set the updated selection data to the components state.
  *
  * @param {object}	nextProps	The props that will be set for the updated component
  * @param {object}	nextState	The state that will be set for the updated component
  */


	ProperTable.prototype.checkSelectionChange = function checkSelectionChange(nextProps, nextState) {
		if (nextProps.selectable == MULTIPLE_SELECTION) {
			if (nextState.selection.size !== this.state.selection.size) {
				this.updateSelectionData(nextState.selection, nextState.allSelected);
			}
		} else if (nextProps.selectable == true) {
			var next = nextState.selection.values().next().value || null;
			var old = this.state.selection.values().next().value || null;

			if (next !== old) {
				this.updateSelectionData(next);
			}
		}
	};

	/**
  * Method called before the components update to set the new selection to states component and update the data
  *
  * @param {array}	newSelection	The new selected rows (Set object)
  * @param {array}	newAllSelected	If the new state has all the rows selected
  */


	ProperTable.prototype.updateSelectionData = function updateSelectionData(newSelection) {
		var _this14 = this;

		var newAllSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var newIndexed = this.state.indexed;
		var oldSelection = this.state.selection;
		var rowid = null,
		    selected = null,
		    rdata = null,
		    curIndex = null,
		    newData = this.state.data,
		    rowIndex = null;

		if (this.props.selectable != MULTIPLE_SELECTION) {
			var oldId = oldSelection.values().next().value || null;

			if (!_underscore2['default'].isNull(oldId)) {
				newIndexed[oldId]._selected = false; // Update indexed data
				rowIndex = newIndexed[oldId]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set(SELECTED_FIELD, false); // Change the row in that index
				newData = newData.set(rowIndex, rdata); // Set that row in the data object
			}

			if (!_underscore2['default'].isNull(newSelection)) {
				newIndexed[newSelection]._selected = true; // Update indexed data
				rowIndex = newIndexed[newSelection]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set(SELECTED_FIELD, true); // Change the row in that index
				newData = newData.set(rowIndex, rdata); // Set that row in the data object
			}
		} else if (!newAllSelected && newSelection.size > 0 && newData.size === this.state.rawdata.size) {
			// Change one row data at a time
			var changedId = null,
			    _selected = null;

			// If the new selection hasn't an id of the old selection that means an selected element has been unselected.
			oldSelection.forEach(function (id) {
				if (!newSelection.has(id)) {
					// has not id
					changedId = id;
					_selected = false;
					return false;
				}
			});

			// Otherwise a new row has been selected. Look through the new selection for the new element.
			if (!changedId) {
				newSelection.forEach(function (id) {
					if (!oldSelection.has(id)) {
						changedId = id;
						_selected = true;
						return false;
					}
				});
			}

			if (changedId && newIndexed[changedId]) {
				newIndexed[changedId]._selected = _selected; // Update indexed data
				rowIndex = newIndexed[changedId]._rowIndex; // Get data index
				rdata = newData.get(rowIndex).set(SELECTED_FIELD, _selected); // Change the row in that index
				newData = newData.set(rowIndex, rdata); // Set that row in the data object
			}
		} else {
			// Change all data
			newData = newData.map(function (row) {
				rowid = row.get(_this14.props.idField);
				selected = newSelection.has(rowid.toString());
				rdata = row.set(SELECTED_FIELD, selected);
				curIndex = newIndexed[rowid];

				if (curIndex && curIndex._selected != selected) {
					// update indexed data
					curIndex._selected = selected;
					newIndexed[rowid] = curIndex;
				}

				return rdata;
			});
		}

		this.setState({
			data: newData,
			indexed: newIndexed
		});
	};

	/**
  * In case that the new selection array be different than the selection array in the components state, then update
  * the components state with the new data.
  *
  * @param {array}	newSelection	The selected rows
  * @param {boolean}	sendSelection 	If the selection must be sent or not
  */


	ProperTable.prototype.triggerSelection = function triggerSelection() {
		var newSelection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
		var sendSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		if (sendSelection) {
			this.setState({
				selection: newSelection,
				allSelected: this.isAllSelected(this.state.data, newSelection)
			}, this.sendSelection);
		} else {
			this.setState({
				selection: newSelection,
				allSelected: this.isAllSelected(this.state.data, newSelection)
			});
		}
	};

	/**
  * If the method afterSelect in the components props has a function then call it sending the selected rows in rawdata.
  */


	ProperTable.prototype.sendSelection = function sendSelection() {
		var _this15 = this;

		var newSelection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		if (typeof this.props.afterSelect == 'function') {
			(function () {
				var _state3 = _this15.state;
				var selection = _state3.selection;
				var initialIndexed = _state3.initialIndexed;
				var rawdata = _state3.rawdata;

				var output = [];
				var selectionArray = [];

				if (newSelection) {
					newSelection.forEach(function (element) {
						selectionArray.push(element);
					});
				} else {
					selection.forEach(function (element) {
						selectionArray.push(element);
					});
				}

				output = _underscore2['default'].map(selectionArray, function (pId) {
					if (typeof initialIndexed[pId] == 'undefined') {
						return null;
					}

					var rowIndex = initialIndexed[pId]._rowIndex;

					return rawdata.get(rowIndex).toJSON();
				});

				output = _underscore2['default'].compact(output);

				if (_this15.props.selectable === true && !_underscore2['default'].isUndefined(output[0])) {
					output = output[0];
				}

				_this15.props.afterSelect(output, selectionArray);
			})();
		}
	};

	/**
  * Send sorted data and column settings to the props getColSettings and afterSort
  *
  * @param (object)	data 			Component's data
  * @param (array)	colSettings 	Column settings of the table
  */


	ProperTable.prototype.sendSortedAndSettings = function sendSortedAndSettings(data, colSettings) {
		this.sendSortedData(data);
		this.sendColSettings(colSettings);
	};

	/**
  * If the method afterSort in the components props has a function then call it sending the sorted data in the rawdata.
  *
  * @param (object)	data 			Component's data
  */


	ProperTable.prototype.sendSortedData = function sendSortedData(data) {
		var _this16 = this;

		if (typeof this.props.afterSort === 'function') {
			(function () {
				var _state4 = _this16.state;
				var initialIndexed = _state4.initialIndexed;
				var rawdata = _state4.rawdata;

				var output = [];

				output = data.map(function (row) {
					var rowIndex = initialIndexed[row.get(_this16.props.idField)]._rowIndex;
					return rawdata.get(rowIndex);
				});

				_this16.props.afterSort(output.toJSON());
			})();
		}
	};

	/**
  * Send the colSettings if the prop getColSettings is a function.
  *
  * @param (array)	colSettings 	Column settings of the table
  */


	ProperTable.prototype.sendColSettings = function sendColSettings(colSettings) {
		if (typeof this.props.getColSettings === 'function' && colSettings) {
			this.props.getColSettings(colSettings);
		}
	};

	/**
  * Add a custom class to each row of the table. If that row is selected then add one more class to apply different css to seleted
  * rows.
  *
  * @param {integer}	index	Index of the row which will get the new classes.
  */


	ProperTable.prototype.getRowClassName = function getRowClassName(index) {
		var addClass = 'propertable-row',
		    row = this.state.data.get(index);
		var selected = row.get(SELECTED_FIELD),
		    enabled = void 0;

		if (this.props.hasDisableRows) {
			enabled = row.get('Enabled');

			if (!enabled) {
				addClass += ' disabled-row';
			}
		}

		if (selected) addClass += ' selected';

		return addClass;
	};

	ProperTable.prototype.onResize = function onResize(width, column) {
		var sizes = this.state.sizes;
		var newsizes = sizes.set(column, width);

		this.setState({ sizes: newsizes });
	};

	ProperTable.prototype.render = function render() {
		// let content = <div className="propertable-empty">{this.props.msgs[this.props.lang].empty}</div>;
		var content = null,
		    tableHeight = this.props.containerHeight || 400;
		var tableContent = this.buildTable();
		var footer = this.buildFooter();

		if (this.props.containerHeight && this.props.displayFooter) {
			tableHeight -= this.props.footerInfoHeight;
		}

		content = _react2['default'].createElement(
			_fixedDataTable.Table,
			_extends({
				ref: 'fixeddatatable',
				key: this.uniqueId + '-table',
				width: this.props.containerWidth || 400,
				height: tableHeight,
				headerHeight: this.props.headerHeight || this.props.rowHeight,
				groupHeaderHeight: this.props.rowHeight,
				rowHeight: this.props.rowHeight,
				rowsCount: this.state.data.size,
				isColumnResizing: false,
				onRowClick: this.handleRowClick.bind(this),
				rowClassNameGetter: this.getRowClassName.bind(this),
				onColumnResizeEndCallback: this.onResize.bind(this),
				className: 'propertable-table'
			}, this.props),
			tableContent
		);

		return _react2['default'].createElement(
			'div',
			{ key: this.uniqueId, id: this.uniqueId, className: 'propertable ' + this.props.className },
			content,
			footer
		);
	};

	return ProperTable;
}(_react2['default'].Component);

ProperTable.propTypes = {
	className: _react2['default'].PropTypes.string,
	data: _react2['default'].PropTypes.array,
	cols: _react2['default'].PropTypes.array.isRequired,
	uniqueId: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	afterSort: _react2['default'].PropTypes.func,
	afterSelect: _react2['default'].PropTypes.func,
	selectable: _react2['default'].PropTypes.oneOf([true, MULTIPLE_SELECTION, false]),
	selected: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number, _react2['default'].PropTypes.array, _react2['default'].PropTypes.object]),
	rowHeight: _react2['default'].PropTypes.number,
	idField: _react2['default'].PropTypes.string,
	msgs: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.object),
	lang: _react2['default'].PropTypes.string,
	selectorWidth: _react2['default'].PropTypes.number,
	multisort: _react2['default'].PropTypes.bool,
	sortIcons: _react2['default'].PropTypes.object,
	iconColor: _react2['default'].PropTypes.string,
	iconDefColor: _react2['default'].PropTypes.string,
	columnFilterComponent: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func]),
	restartOnClick: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.element, _react2['default'].PropTypes.object // Js element but not React element
	]),
	restartOnClickType: _react2['default'].PropTypes.oneOf([CLEAR_FILTERS, CLEAR_SORT, CLEAR_BOTH]),
	getColSettings: _react2['default'].PropTypes.func,
	colSortDirs: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.string),
	colFilters: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.object),
	filterWidth: _react2['default'].PropTypes.number,
	onScrollStart: _react2['default'].PropTypes.func,
	onScrollEnd: _react2['default'].PropTypes.func,
	hasDisableRows: _react2['default'].PropTypes.bool,
	displayFooter: _react2['default'].PropTypes.bool,
	footerInfoHeight: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string])
};

ProperTable.defaultProps = {
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
	msgs: _messages3['default'],
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
	onScrollStart: null,
	onScrollEnd: null,
	hasDisableRows: false,
	displayFooter: false,
	footerInfoHeight: 30
};

exports['default'] = ProperTable;
module.exports = exports['default'];