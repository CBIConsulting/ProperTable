var ProperTable =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _table = __webpack_require__(1);

	var _table2 = _interopRequireDefault(_table);

	var _portal = __webpack_require__(63);

	var _portal2 = _interopRequireDefault(_portal);

	var _formatters = __webpack_require__(91);

	var _formatters2 = _interopRequireDefault(_formatters);

	var _messages = __webpack_require__(56);

	var _messages2 = _interopRequireDefault(_messages);

	var _reactDimensions = __webpack_require__(167);

	var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	if (true) {
		// require("../css/style.scss");
	}

	exports["default"] = {
		Table: (0, _reactDimensions2["default"])()(_table2["default"]),
		Portal: _portal2["default"],
		formatters: _formatters2["default"],
		lang: _messages2["default"]
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CLEAR_OPTIONS;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _fixedDataTable = __webpack_require__(3);

	var _immutable = __webpack_require__(54);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _underscore = __webpack_require__(55);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _messages2 = __webpack_require__(56);

	var _messages3 = _interopRequireDefault(_messages2);

	var _selector = __webpack_require__(57);

	var _selector2 = _interopRequireDefault(_selector);

	var _cellRenderer = __webpack_require__(58);

	var _cellRenderer2 = _interopRequireDefault(_cellRenderer);

	var _headerCell = __webpack_require__(62);

	var _headerCell2 = _interopRequireDefault(_headerCell);

	var _footerCell = __webpack_require__(82);

	var _footerCell2 = _interopRequireDefault(_footerCell);

	var _clone = __webpack_require__(83);

	var _clone2 = _interopRequireDefault(_clone);

	var _reactImmutableRenderMixin = __webpack_require__(76);

	var _rowcache = __webpack_require__(59);

	var _rowcache2 = _interopRequireDefault(_rowcache);

	var _moment = __webpack_require__(88);

	var _moment2 = _interopRequireDefault(_moment);

	var _normalizer = __webpack_require__(89);

	var _normalizer2 = _interopRequireDefault(_normalizer);

	var _comparators = __webpack_require__(90);

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
	var AFTERDATE = 'after';
	var BEFOREDATE = 'before';
	var BETWEENDATES = 'between';
	var CONTAINS = 'contains';
	var ONDATE = 'on';
	var NOTONDATE = 'noton';
	var CACHE_NAME = 'formatted';
	var Set = __webpack_require__(93);
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
				aggregationData: _immutable2['default'].fromJS(props.aggregationData), // Sums, avgs, etc by column object
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
				var colsDeepCompare = this.deepColsCompare(nextProps.cols, this.props.cols);
				var colsChanged = colsDeepCompare.hasChangedDeeply || colsDeepCompare.hasSmallChanges || colsDeepCompare.hasChangedPosition;
				var dataChanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(nextProps.data, this.props.data);
				var colSortDirsChanged = nextProps.colSortDirs ? !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(nextProps.colSortDirs, this.props.colSortDirs) : false;
				var colFiltersChanged = nextProps.colFilters ? !this.checkFiltersEquality(nextProps.colFilters, this.props.colFilters) : false;
				var colData = null,
				    preparedData = null,
				    cols = null,
				    newCol = void 0;

				// If data and columns change the colSettings and all data states must be updated. Then apply default (sort table
				// and set selection if it has been received). If both change It's almost the same as rebuild the component. Almost everything changes
				if (colsChanged || dataChanged) {
					if (dataChanged) {
						_rowcache2['default'].flush([CACHE_NAME, 'tb_' + this.uniqueId]);

						preparedData = this.prepareData(nextProps, nextState);
						colData = this.prepareColSettings(nextProps, preparedData.rawdata);
						cols = this.sortTableCols(_immutable2['default'].fromJS(nextProps.cols));

						this.setState({
							colSettings: colData.colSettings,
							colSortParsers: colData.colSortParsers,
							cols: cols,
							data: preparedData.data,
							aggregationData: _immutable2['default'].fromJS(nextProps.aggregationData),
							initialData: preparedData.initialData,
							indexed: preparedData.indexed,
							initialIndexed: preparedData.initialIndexed,
							rawdata: preparedData.rawdata,
							sortCache: preparedData.defSortCache,
							selection: preparedData.defSelection
						}, this.applySettings.bind(this, colData.colSettings, nextProps, true));
					} else if (colsChanged) {
						if (colsDeepCompare.hasChangedDeeply || colsDeepCompare.hasSmallChanges && colsDeepCompare.hasChangedPosition) {
							var sortCache = [];

							_rowcache2['default'].flush([CACHE_NAME, 'tb_' + this.uniqueId]);
							colData = this.prepareColSettings(nextProps, this.state.rawdata);
							cols = this.sortTableCols(_immutable2['default'].fromJS(nextProps.cols));

							// Restart cache
							nextState.data.forEach(function (row) {
								sortCache[row.get(_this2.props.idField)] = {};
							});

							this.setState({
								colSettings: colData.colSettings,
								colSortParsers: colData.colSortParsers,
								cols: cols,
								sortCache: sortCache
							}, this.applySettings.bind(this, colData.colSettings, nextProps)); // apply selection and sort
						} else if (colsDeepCompare.hasSmallChanges) {
							cols = this.state.cols.map(function (col) {
								newCol = colsDeepCompare.changedCols[col.get('name')];

								if (newCol) {
									_underscore2['default'].each(newCol, function (value, key) {
										col = col.set(key, value);
									});
								}

								return col;
							});

							this.setState({
								cols: cols
							});
						} else {
							cols = this.sortTableCols(_immutable2['default'].fromJS(nextProps.cols));

							this.setState({
								cols: cols
							});
						}
					}

					return false;
				} else if (colSortDirsChanged || colFiltersChanged) {
					this.applySettings(nextState.colSettings, nextProps);
				} else if (nextProps.selected) {
					this.setDefaultSelection(nextProps);

					return false;
				}
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
			var hasChangedDeeply = false,
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

					if (col.name !== curCol.name || col.field !== curCol.field || col.sortable !== curCol.sortable || col.uniqueId !== curCol.uniqueId || !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(col.formatter, curCol.formatter) || !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(col.children, curCol.children)) {

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
				cols = cols.sortBy(function (col) {
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
				if (restartOnClick.length) {
					for (var i = restartOnClick.length - 1; i >= 0; i--) {
						restartOnClick[i].addEventListener('click', this.clearFilterAndSort.bind(this));
					}
				}
			} else {
				var btn = null;

				if (restartOnClick.props.id) {
					btn = document.getElementById(restartOnClick.props.id);
					btn.addEventListener('click', this.clearFilterAndSort.bind(this));
				} else if (this.props.restartOnClick.props.className) {
					btn = document.getElementsByClassName(restartOnClick.props.className);
					for (var _i = btn.length - 1; _i >= 0; _i--) {
						btn[_i].addEventListener('click', this.clearFilterAndSort.bind(this));
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
								var selectionSet = new Set(currFilters[key].selection),
								    selectionChange = void 0;
								selectionChange = _underscore2['default'].some(nextFilters[key].selection, function (id) {
									return selectionSet.has(id) ? false : true;
								});
								return selectionChange;
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
							if (!(0, _moment2['default'])(col.operationFilterValue).isValid()) {
								console.warn('Invalid date format: ' + operations[col.column].value);
							}
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
			var _state = this.state,
			    initialData = _state.initialData,
			    indexed = _state.indexed,
			    selection = _state.selection;

			var idField = this.props.idField;
			var notAllowedTypes = new Set([BETWEENDATES, AFTERDATE, BEFOREDATE, ONDATE, NOTONDATE]); // Date filters
			var filteredData = initialData,
			    applyFormatter = void 0;

			// Get the data that match with the selection (of all column filters)
			if (_underscore2['default'].size(filters) > 0) {
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
			var data = _immutable2['default'].fromJS(props.data);
			var keyField = this.props.idField;
			var index = 0,
			    id = void 0,
			    sortCache = [];
			var indexed = {},
			    parsed = [],
			    defSelection = new Set();

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
			    sortable = null,
			    colData = null,
			    indexed = null,
			    parsedData = null;

			// The default sort dirs (in case that's exist) will be applied in applyColSettings
			// Iterate through each element of the colSortDirs and the built data, build the colSortDirs with the default directions received,
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
				colSortParsers: sortData.sortParsers
			};
		};

		/**
	  * Build the structure of the colSortDirs array and the sortParsers array with the functions received in cols or a default function to parse.
	  * In fact this method look through all the columns in props.cols recursively and add all that aren't a ColumnGroup,
	  * the columns that may be sorted.
	  *
	  * @param 	(array)	cols Describe each column data. (name, sortable, fixed...)
	  *
	  * @return 	(array)	-colSortDirs: Sort settings of each column.
	  *					-sortParsers: Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
	  */


		ProperTable.prototype.buildColSortDirs = function buildColSortDirs(cols) {
			var _this6 = this;

			var colSortDirs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
			var sortParsers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			cols.forEach(function (element) {
				if (!element.children) {
					var sortable = _underscore2['default'].isUndefined(element.sortable) ? null : element.sortable;
					var formatter = _underscore2['default'].isUndefined(element.formatter) ? null : element.formatter;
					var sortParser = element.sortParser ? element.sortParser : null;

					if (sortParser === null) {
						if (element.sortVal) {
							sortParser = element.sortVal;

							if (console && console.warm) {
								console.warm('The sortVal property of the column has been deprecated. Please, use the sortParser instead for this purpouse');
							}
						} else {
							sortParser = function sortParser(val) {
								return val;
							};
						}
					}
					sortParsers[element.name] = sortParser; // Function to iterate

					colSortDirs.push({
						column: element.name,
						field: element.field,
						direction: DEFAULT_SORT_DIRECTION,
						sortable: sortable,
						formatter: formatter
					});
				} else {
					_this6.buildColSortDirs(element.children, colSortDirs, sortParsers);
				}
			});

			if (this.props.selectable == MULTIPLE_SELECTION) {
				sortParsers[SELECTOR_COL_NAME] = function (val) {
					return val;
				};
			}

			return {
				colSortDirs: colSortDirs,
				sortParsers: sortParsers
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
						selectionSet[col.column] = new Set(col.selection.slice());
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

				for (var _i2 = 0; _i2 <= colSettings.length - 1; _i2++) {
					// If some columns were sorted before then the position of the sorted columns wont be changed, so the initial
					// position will be the next. If 2 columns are already sorted and we sort by a new one then the position of this
					// last column will be 3 and will change to 2 or 1 if the sorted columns back to default.
					if (colSettings[_i2].sorted) initialPos++;

					if (colSettings[_i2].column === columnKey) {
						colSettings[_i2].direction = sortDir; // Set the new direction
						position = colSettings[_i2].position; // Save the current position
						index = _i2;

						// If the sort direction is not default and the column isn't already sorted then add one to the initial position
						// and set the column to sorted. Otherwise if the sort direction is default set it to unsorted.
						if (sortDir !== DEFAULT_SORT_DIRECTION && !colSettings[_i2].sorted) {
							initialPos++;
							colSettings[_i2].sorted = true;
						} else if (sortDir == DEFAULT_SORT_DIRECTION) {
							colSettings[_i2].sorted = false;
						}
					}
				}

				// Change the priority position to sort of the elements.
				for (var _i3 = 0; _i3 <= colSettings.length - 1; _i3++) {

					// When the position of the current element is lower than the position of the changed element and bigger or equals to the
					// initial position to change.
					if (colSettings[_i3].position < position && colSettings[_i3].position >= initialPos) {
						// Move element to the next position only if the new sort direction wasn't default, in that case keep the element in the same
						// sorting priority position.
						if (colSettings[_i3].direction === DEFAULT_SORT_DIRECTION) colSettings[_i3].position = colSettings[_i3].position + 1;
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
			    rowId = void 0,
			    val = void 0;

			colSettings.forEach(function (element) {
				// The colums could be all true (multisort) or just one of them at a time (all false but the column that must be sorted)
				if (element.direction !== DEFAULT_SORT_DIRECTION && element.multisort && element.sortable) {
					sortParser = colSortParsers[element.column];

					sortedData = sortedData.sortBy(function (row) {
						rowId = row.get(_this8.props.idField);
						// sortCache [row-id] [column-id] = procesed value.
						if (_underscore2['default'].isUndefined(sortCache[rowId][element.field]) || element.column === SELECTOR_COL_NAME) {
							val = sortParser(row.get(element.field), null, null);
							sortCache[rowId][element.field] = val || ''; // Turn null's into empty values
						}

						return sortCache[rowId][element.field];
					}, function (a, b) {
						if (a == b) {
							return 0;
						} else if (element.direction == ASCENDING_SORT_DIRECTION) {
							return a > b ? 1 : -1;
						} else if (element.direction == DESCENDING_SORT_DIRECTION) {
							return a > b ? -1 : 1;
						}
					});
					defaultSort = false;
				}
			});

			// If all the cols are default then sort the data by the rowIndex (virtual field added on componnent's create.)
			if (defaultSort) {
				//  Set to default
				sortedData = data.sortBy(function (row) {
					return row.get(ROW_INDEX_FIELD);
				}, function (a, b) {
					return a > b ? 1 : a == b ? 0 : -1;
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
	  * Get the current data rendered in component using a HOC
	  *
	  * @param (boolean)			getAsRaw 	Get the data as inmutable or parse to raw data
	  * @return (array...object)	data
	  */


		ProperTable.prototype.getCurrentData = function getCurrentData() {
			var _this9 = this;

			var getAsRaw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var data = this.state.data;

			if (getAsRaw) {
				var properId = void 0,
				    rowIndex = void 0,
				    rawdata = this.state.rawdata;
				data = data.map(function (row) {
					properId = row.get(_this9.props.idField);
					rowIndex = _this9.state.initialIndexed[properId]._rowIndex;

					return rawdata.get(rowIndex);
				});
				data = data.toJSON();
			}

			return data;
		};

		/**
	  * Get the current cols using a HOC
	  *
	  * @return (array)	cols
	  */


		ProperTable.prototype.getCurrentCols = function getCurrentCols() {
			return this.state.cols.toJSON();
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

			var sortable = null,
			    selection = [],
			    columnFilter = null,
			    hasComplexFilter = false;
			var settings = null,
			    isSortedOrFiltered = false,
			    align = 'center',
			    filterExtraProps = {};
			var extraProps = {
				width: 100,
				fixed: false,
				isResizable: true
			};

			var colname = colData.name || _underscore2['default'].uniqueId('col-');
			var className = colData.className || null;

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

			// If this column have childrens build a ColumnGroup and call the method
			// recursively setting the result inside this columns group.
			if (colData.children && colData.children.length) {
				// Call the method recursively to all the childrens of this column.
				var hasFalsy = false;
				var inner = colData.children.map(function (c) {
					if (c.isVisible === undefined || c.isVisible) return _this10.parseColumn(c, true);else hasFalsy = true;
				});

				if (hasFalsy) inner = _underscore2['default'].compact(inner);

				return _react2['default'].createElement(
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

			// Get column settings
			settings = _underscore2['default'].findWhere(this.state.colSettings, { column: colname }) || {};

			// If this column can be sort or not.
			sortable = _underscore2['default'].isUndefined(colData.sortable) ? true : colData.sortable;

			// Check for a complex filter component. In that case use onColumnFilter
			// instead of onSortChange. That method render the received component
			// just beside the icon of the column header. If the filter type isn't
			// selection then selection must be an empty array
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

			var col = _react2['default'].createElement(_fixedDataTable.Column, _extends({
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
					columnFormater: null,
					isSortedOrFiltered: isSortedOrFiltered,
					extraProps: filterExtraProps,
					columnHeaderClass: colData.columnHeaderClass
				}),
				cell: _react2['default'].createElement(_cellRenderer2['default'], {
					tableId: this.uniqueId,
					idField: this.props.idField,
					indexed: this.state.indexed,
					data: this.state.data,
					colData: colData,
					col: colData.field
				}),
				footer: _react2['default'].createElement(_footerCell2['default'], {
					key: this.uniqueId + '-footer',
					data: this.state.aggregationData,
					colData: colData
				}),
				allowCellsRecycling: !hasComplexFilter,
				align: align
			}, extraProps));

			// If isn't a children but the table has nested columns set the column into a group.
			if (!isChildren && hasNested) {
				col = _react2['default'].createElement(
					_fixedDataTable.ColumnGroup,
					{
						key: colname + '-group',
						fixed: extraProps.fixed
					},
					col
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
				var _messages = this.getTranslatedMessages();
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

					for (var _i4 = this.state.colSettings.length - 1; _i4 >= 0; _i4--) {
						column = this.state.colSettings[_i4];

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
			e.preventDefault();

			if (this.props.selectable) {
				var idField = this.props.idField,
				    value = void 0,
				    selection = new Set(this.state.selection);
				var _state2 = this.state,
				    allSelected = _state2.allSelected,
				    data = _state2.data,
				    indexed = _state2.indexed,
				    rawdata = _state2.rawdata;

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

				this.triggerSelection(selection);
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
			var _this12 = this;

			var result = true;

			if (data.size === 0) return false;else if (data.size === this.state.rawdata.size) return selection.size >= this.state.data.size; // Not filtered data

			// Filtered data
			data.forEach(function (element) {
				if (!selection.has(element.get(_this12.props.idField).toString())) {
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
			var _this13 = this;

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
					rowid = row.get(_this13.props.idField);
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
			var newSelection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			if (typeof this.props.afterSelect == 'function') {
				var _state3 = this.state,
				    selection = _state3.selection,
				    initialIndexed = _state3.initialIndexed,
				    rawdata = _state3.rawdata;

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

				if (this.props.selectable === true && !_underscore2['default'].isUndefined(output[0])) {
					output = output[0];
				}

				this.props.afterSelect(output, selectionArray);
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
			var _this14 = this;

			if (typeof this.props.afterSort === 'function') {
				var _state4 = this.state,
				    initialIndexed = _state4.initialIndexed,
				    rawdata = _state4.rawdata;

				var output = [];

				output = data.map(function (row) {
					var rowIndex = initialIndexed[row.get(_this14.props.idField)]._rowIndex;
					return rawdata.get(rowIndex);
				});

				this.props.afterSort(output.toJSON());
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

		/**
	  * Get the translated messages for the component.
	  *
	  * @return object Messages of the selected language or in English if the translation for this lang doesn't exist.
	  */


		ProperTable.prototype.getTranslatedMessages = function getTranslatedMessages() {
			if (!_underscore2['default'].isObject(this.props.msgs)) {
				return {};
			}

			if (this.props.msgs[this.props.lang]) {
				return this.props.msgs[this.props.lang];
			}

			return this.props.msgs['ENG'];
		};

		ProperTable.prototype.onResize = function onResize(width, column) {
			var sizes = this.state.sizes;
			var newsizes = sizes.set(column, width);

			this.setState({ sizes: newsizes });
		};

		ProperTable.prototype.render = function render() {
			var tableContent = this.buildTable();
			var footer = this.buildFooter();
			var content = null,
			    tableHeight = this.props.containerHeight || 400,
			    tableFooterHeight = 0;

			if (this.props.displayAggregationFooter && this.state.aggregationData.size) {
				tableFooterHeight = this.props.rowHeight;
			}

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
					footerHeight: tableFooterHeight,
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
		aggregationData: _react2['default'].PropTypes.object,
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
		displayAggregationFooter: _react2['default'].PropTypes.bool,
		footerInfoHeight: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
		containerHeight: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
		containerWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
		footerAggregationHeight: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string])
	};

	ProperTable.defaultProps = {
		className: '',
		cols: [],
		data: [],
		aggregationData: {},
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
		displayAggregationFooter: true,
		footerInfoHeight: 30,
		footerAggregationHeight: null
	};

	exports['default'] = ProperTable;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRoot
	 */

	'use strict';

	var FixedDataTable = __webpack_require__(5);
	var FixedDataTableCellDefault = __webpack_require__(43);
	var FixedDataTableColumn = __webpack_require__(41);
	var FixedDataTableColumnGroup = __webpack_require__(40);

	var FixedDataTableRoot = {
	  Cell: FixedDataTableCellDefault,
	  Column: FixedDataTableColumn,
	  ColumnGroup: FixedDataTableColumnGroup,
	  Table: FixedDataTable };

	FixedDataTableRoot.version = '0.6.0';
	module.exports = FixedDataTableRoot;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTable.react
	 */

	/**
	 * TRANSITION SHIM
	 * This acts to provide an intermediate mapping from the old API to the new API
	 *
	 * Remove this entire file and replace the two lines in FixedDataTableRoot
	 * when ready to continue to the new API.
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(6);

	var ReactChildren = React.Children;

	var PropTypes = React.PropTypes;

	// New Table API
	var Table = __webpack_require__(7);
	var Column = __webpack_require__(51);
	var ColumnGroup = __webpack_require__(52);

	// Transition Cell
	var TransitionCell = __webpack_require__(53);

	var NEXT_VERSION = '0.7.0';
	var DOCUMENTATION_URL = 'https://fburl.com/FixedDataTable-v0.6';

	var EMPTY_OBJECT = {};

	/**
	 * Notify in console that some prop has been deprecated.
	 */
	var notified = {};
	function notifyDeprecated(prop, reason) {
	  if (false) {
	    if (!notified[prop]) {
	      console.warn('`' + prop + '` will be DEPRECATED in version ' + NEXT_VERSION + ' of FixedDataTable and beyond. \n' + reason + '\n' + 'Read the docs at: ' + DOCUMENTATION_URL);
	      notified[prop] = true;
	    }
	  }
	}

	/**
	 * Data grid component with fixed or scrollable header and columns.
	 *
	 * This is currently in a transition mode, as the new API is used.
	 * DEPRECATED endpoints work, but will not be supported in later versions.
	 *
	 * The layout of the data table is as follows:
	 *
	 * ```
	 * +---------------------------------------------------+
	 * | Fixed Column Group    | Scrollable Column Group   |
	 * | Header                | Header                    |
	 * |                       |                           |
	 * +---------------------------------------------------+
	 * |                       |                           |
	 * | Fixed Header Columns  | Scrollable Header Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Body Columns    | Scrollable Body Columns   |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Footer Columns  | Scrollable Footer Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * ```
	 *
	 * - Fixed Column Group Header: These are the headers for a group
	 *   of columns if included in the table that do not scroll
	 *   vertically or horizontally.
	 *
	 * - Scrollable Column Group Header: The header for a group of columns
	 *   that do not move while scrolling vertically, but move horizontally
	 *   with the horizontal scrolling.
	 *
	 * - Fixed Header Columns: The header columns that do not move while scrolling
	 *   vertically or horizontally.
	 *
	 * - Scrollable Header Columns: The header columns that do not move
	 *   while scrolling vertically, but move horizontally with the horizontal
	 *   scrolling.
	 *
	 * - Fixed Body Columns: The body columns that do not move while scrolling
	 *   horizontally, but move vertically with the vertical scrolling.
	 *
	 * - Scrollable Body Columns: The body columns that move while scrolling
	 *   vertically or horizontally.
	 */
	var TransitionTable = React.createClass({
	  displayName: 'TransitionTable',

	  propTypes: {
	    /**
	     * Pixel width of table. If all columns do not fit,
	     * a horizontal scrollbar will appear.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    height: PropTypes.number,

	    /**
	     * Maximum pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    maxHeight: PropTypes.number,

	    /**
	     * Pixel height of table's owner, this is used in a managed scrolling
	     * situation when you want to slide the table up from below the fold
	     * without having to constantly update the height on every scroll tick.
	     * Instead, vary this property on scroll. By using `ownerHeight`, we
	     * over-render the table while making sure the footer and horizontal
	     * scrollbar of the table are visible when the current space for the table
	     * in view is smaller than the final, over-flowing height of table. It
	     * allows us to avoid resizing and reflowing table when it is moving in the
	     * view.
	     *
	     * This is used if `ownerHeight < height` (or `maxHeight`).
	     */
	    ownerHeight: PropTypes.number,

	    overflowX: PropTypes.oneOf(['hidden', 'auto']),
	    overflowY: PropTypes.oneOf(['hidden', 'auto']),

	    /**
	     * Number of rows in the table.
	     */
	    rowsCount: PropTypes.number.isRequired,

	    /**
	     * Pixel height of rows unless `rowHeightGetter` is specified and returns
	     * different value.
	     */
	    rowHeight: PropTypes.number.isRequired,

	    /**
	     * If specified, `rowHeightGetter(index)` is called for each row and the
	     * returned value overrides `rowHeight` for particular row.
	     */
	    rowHeightGetter: PropTypes.func,

	    /**
	     * DEPRECATED
	     *
	     * To get rows to display in table, `rowGetter(index)`
	     * is called. `rowGetter` should be smart enough to handle async
	     * fetching of data and return temporary objects
	     * while data is being fetched.
	     */
	    rowGetter: PropTypes.func,

	    /**
	     * To get any additional CSS classes that should be added to a row,
	     * `rowClassNameGetter(index)` is called.
	     */
	    rowClassNameGetter: PropTypes.func,

	    /**
	     * Pixel height of the column group header.
	     */
	    groupHeaderHeight: PropTypes.number,

	    /**
	     * Pixel height of header.
	     */
	    headerHeight: PropTypes.number.isRequired,

	    /**
	     * DEPRECATED
	     *
	     * Function that is called to get the data for the header row.
	     * If the function returns null, the header will be set to the
	     * Column's label property.
	     */
	    headerDataGetter: PropTypes.func,

	    /**
	     * Pixel height of footer.
	     */
	    footerHeight: PropTypes.number,

	    /**
	     * DEPRECATED - use footerDataGetter instead.
	     * Data that will be passed to footer cell renderers.
	     */
	    footerData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

	    /**
	     * DEPRECATED
	     *
	     * Function that is called to get the data for the footer row.
	     */
	    footerDataGetter: PropTypes.func,

	    /**
	     * Value of horizontal scroll.
	     */
	    scrollLeft: PropTypes.number,

	    /**
	     * Index of column to scroll to.
	     */
	    scrollToColumn: PropTypes.number,

	    /**
	     * Value of vertical scroll.
	     */
	    scrollTop: PropTypes.number,

	    /**
	     * Index of row to scroll to.
	     */
	    scrollToRow: PropTypes.number,

	    /**
	     * Callback that is called when scrolling starts with current horizontal
	     * and vertical scroll values.
	     */
	    onScrollStart: PropTypes.func,

	    /**
	     * Callback that is called when scrolling ends or stops with new horizontal
	     * and vertical scroll values.
	     */
	    onScrollEnd: PropTypes.func,

	    /**
	     * Callback that is called when `rowHeightGetter` returns a different height
	     * for a row than the `rowHeight` prop. This is necessary because initially
	     * table estimates heights of some parts of the content.
	     */
	    onContentHeightChange: PropTypes.func,

	    /**
	     * Callback that is called when a row is clicked.
	     */
	    onRowClick: PropTypes.func,

	    /**
	     * Callback that is called when a row is double clicked.
	     */
	    onRowDoubleClick: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-down event happens on a row.
	     */
	    onRowMouseDown: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-enter event happens on a row.
	     */
	    onRowMouseEnter: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-leave event happens on a row.
	     */
	    onRowMouseLeave: PropTypes.func,

	    /**
	     * Callback that is called when resizer has been released
	     * and column needs to be updated.
	     *
	     * Required if the isResizable property is true on any column.
	     *
	     * ```
	     * function(
	     *   newColumnWidth: number,
	     *   dataKey: string,
	     * )
	     * ```
	     */
	    onColumnResizeEndCallback: PropTypes.func,

	    /**
	     * Whether a column is currently being resized.
	     */
	    isColumnResizing: PropTypes.bool },

	  getInitialState: function getInitialState() {
	    // Throw warnings on deprecated props.
	    var state = {};
	    state.needsMigration = this._checkDeprecations();

	    return state;
	  },

	  _checkDeprecations: function _checkDeprecations() {
	    var needsMigration = false;

	    if (this.props.rowGetter) {
	      notifyDeprecated('rowGetter', 'Please use the cell API in Column to fetch data for your cells.');

	      // ROWGETTER??? You need to migrate.
	      needsMigration = true;
	    }

	    if (this.props.headerDataGetter) {
	      notifyDeprecated('headerDataGetter', 'Please use the header API in Column to ' + 'fetch data for your header cells.');
	    }

	    if (this.props.footerData) {
	      notifyDeprecated('footerData', 'Please use the footer API in Column to ' + 'fetch data for your footer cells.');
	    }

	    if (this.props.footerDataGetter) {
	      notifyDeprecated('footerDataGetter', 'Please use the footer API in Column to ' + 'fetch data for your footer cells.');
	    }

	    ReactChildren.forEach(this.props.children, function (child) {
	      if (!child || !child.props) {
	        return;
	      }

	      var props = child.props;

	      if (props.label) {
	        notifyDeprecated('label', 'Please use `header` instead.');
	      }

	      if (props.dataKey) {
	        notifyDeprecated('dataKey', 'Please use the `cell` API to pass in a dataKey');
	      }

	      if (props.cellRenderer) {
	        notifyDeprecated('cellRenderer', 'Please use the `cell` API to pass in a React Element instead.');
	      }

	      if (props.headerRenderer) {
	        notifyDeprecated('headerRenderer', 'Please use the `header` API to pass in a React Element instead.');
	      }

	      if (props.columnData) {
	        notifyDeprecated('columnData', 'Please pass data in through props to your header, cell or footer.');
	      }

	      if (props.groupHeaderRenderer) {
	        notifyDeprecated('groupHeaderRenderer', 'Please use the `header` API in ColumnGroup to ' + 'pass in a React Element instead of a function that creates one.');
	      }

	      if (props.groupHeaderData) {
	        notifyDeprecated('groupHeaderData', 'Please pass in any data through props to your header.');
	      }
	    });

	    return needsMigration;
	  },

	  // Wrapper for onRow callbacks, since we don't have rowData at that level.
	  _onRowAction: function _onRowAction(props, callback) {
	    if (!callback) {
	      return undefined;
	    }

	    return function (e, rowIndex) {
	      callback(e, rowIndex, props.rowGetter && props.rowGetter(rowIndex) || EMPTY_OBJECT);
	    };
	  },

	  _transformColumn: function _transformColumn(column, tableProps, key) {

	    var props = column.props;

	    if (column.type.__TableColumn__) {
	      // Constuct the cell to be used using the rowGetter
	      return React.createElement(Column, _extends({
	        key: 'column_' + key
	      }, props, {
	        header: React.createElement(TransitionCell, {
	          isHeaderCell: true,
	          label: props.label,
	          width: props.width,
	          dataKey: props.dataKey,
	          className: props.headerClassName,
	          columnData: props.columnData || EMPTY_OBJECT,
	          cellRenderer: props.headerRenderer,
	          headerDataGetter: tableProps.headerDataGetter
	        }),
	        columnKey: props.dataKey,
	        cell: React.createElement(TransitionCell, {
	          dataKey: props.dataKey,
	          className: props.cellClassName,
	          rowGetter: tableProps.rowGetter,
	          width: props.width,
	          columnData: props.columnData || EMPTY_OBJECT,
	          cellDataGetter: props.cellDataGetter,
	          cellRenderer: props.cellRenderer
	        }),
	        footer: React.createElement(TransitionCell, {
	          isFooterCell: true,
	          className: props.footerClassName,
	          dataKey: props.dataKey,
	          cellRenderer: props.footerRenderer,
	          footerDataGetter: tableProps.footerDataGetter,
	          footerData: tableProps.footerData || EMPTY_OBJECT
	        })
	      }));
	    }
	  },

	  _transformColumnGroup: function _transformColumnGroup(group, tableProps, key, labels) {
	    var _this = this;

	    var props = group.props;

	    var j = 0;
	    var columns = ReactChildren.map(props.children, function (child) {
	      j++;
	      return _this._transformColumn(child, tableProps, key + '_' + j);
	    });

	    return React.createElement(
	      ColumnGroup,
	      _extends({}, props, {
	        key: 'group_' + key,
	        header: React.createElement(TransitionCell, {
	          isHeaderCell: true,
	          label: group.props.label,
	          dataKey: key,
	          groupHeaderRenderer: props.groupHeaderRenderer,
	          groupHeaderLabels: labels,
	          groupHeaderData: props.columnGroupData || EMPTY_OBJECT
	        }) }),
	      columns
	    );
	  },

	  _convertedColumns: function _convertedColumns(needsMigration) {
	    var _this2 = this;

	    // If we don't need to migrate, map directly to the new API.
	    if (!needsMigration) {
	      return ReactChildren.map(this.props.children, function (child) {

	        if (!child) {
	          return null;
	        }

	        if (child.type.__TableColumn__) {
	          return React.createElement(Column, child.props);
	        }

	        if (child.type.__TableColumnGroup__) {
	          return React.createElement(ColumnGroup, child.props);
	        }
	      });
	    }

	    var tableProps = this.props;

	    // Otherwise, if a migration is needed, we need to transform each Column
	    // or ColumnGroup.
	    var i = 0;
	    return ReactChildren.map(this.props.children, function (child) {

	      if (!child) {
	        return null;
	      }

	      if (child.type.__TableColumn__) {
	        child = _this2._transformColumn(child, tableProps, i);
	      }

	      if (child.type.__TableColumnGroup__) {
	        // Since we apparently give an array of labels to groupHeaderRenderer
	        var labels = [];
	        ReactChildren.forEach(_this2.props.children, function (child) {
	          labels.push(child.props.label);
	        });

	        child = _this2._transformColumnGroup(child, tableProps, i, labels);
	      }

	      i++;
	      return child;
	    });
	  },

	  render: function render() {
	    var props = this.props;
	    return React.createElement(
	      Table,
	      _extends({}, props, {
	        onRowMouseDown: this._onRowAction(props, props.onRowMouseDown),
	        onRowClick: this._onRowAction(props, props.onRowClick),
	        onRowDoubleClick: this._onRowAction(props, props.onRowDoubleClick),
	        onRowMouseEnter: this._onRowAction(props, props.onRowMouseEnter),
	        onRowMouseLeave: this._onRowAction(props, props.onRowMouseLeave)
	      }),
	      this._convertedColumns(this.state.needsMigration)
	    );
	  } });

	module.exports = TransitionTable;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	module.exports = __webpack_require__(2);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableNew.react
	 * @typechecks
	 * @noflow
	 */

	/*eslint no-bitwise:1*/

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(6);
	var ReactComponentWithPureRenderMixin = __webpack_require__(8);
	var ReactWheelHandler = __webpack_require__(9);
	var Scrollbar = __webpack_require__(17);
	var FixedDataTableBufferedRows = __webpack_require__(31);
	var FixedDataTableColumnResizeHandle = __webpack_require__(45);
	var FixedDataTableRow = __webpack_require__(36);
	var FixedDataTableScrollHelper = __webpack_require__(46);
	var FixedDataTableWidthHelper = __webpack_require__(48);

	var cx = __webpack_require__(25);
	var debounceCore = __webpack_require__(49);
	var emptyFunction = __webpack_require__(10);
	var invariant = __webpack_require__(30);
	var joinClasses = __webpack_require__(44);
	var shallowEqual = __webpack_require__(50);
	var translateDOMPositionXY = __webpack_require__(26);

	var PropTypes = React.PropTypes;

	var ReactChildren = React.Children;

	var EMPTY_OBJECT = {};
	var BORDER_HEIGHT = 1;
	var HEADER = 'header';
	var FOOTER = 'footer';
	var CELL = 'cell';

	/**
	 * Data grid component with fixed or scrollable header and columns.
	 *
	 * The layout of the data table is as follows:
	 *
	 * ```
	 * +---------------------------------------------------+
	 * | Fixed Column Group    | Scrollable Column Group   |
	 * | Header                | Header                    |
	 * |                       |                           |
	 * +---------------------------------------------------+
	 * |                       |                           |
	 * | Fixed Header Columns  | Scrollable Header Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Body Columns    | Scrollable Body Columns   |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Footer Columns  | Scrollable Footer Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * ```
	 *
	 * - Fixed Column Group Header: These are the headers for a group
	 *   of columns if included in the table that do not scroll
	 *   vertically or horizontally.
	 *
	 * - Scrollable Column Group Header: The header for a group of columns
	 *   that do not move while scrolling vertically, but move horizontally
	 *   with the horizontal scrolling.
	 *
	 * - Fixed Header Columns: The header columns that do not move while scrolling
	 *   vertically or horizontally.
	 *
	 * - Scrollable Header Columns: The header columns that do not move
	 *   while scrolling vertically, but move horizontally with the horizontal
	 *   scrolling.
	 *
	 * - Fixed Body Columns: The body columns that do not move while scrolling
	 *   horizontally, but move vertically with the vertical scrolling.
	 *
	 * - Scrollable Body Columns: The body columns that move while scrolling
	 *   vertically or horizontally.
	 */
	var FixedDataTable = React.createClass({
	  displayName: 'FixedDataTable',

	  propTypes: {

	    /**
	     * Pixel width of table. If all columns do not fit,
	     * a horizontal scrollbar will appear.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    height: PropTypes.number,

	    /**
	     * Maximum pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    maxHeight: PropTypes.number,

	    /**
	     * Pixel height of table's owner, this is used in a managed scrolling
	     * situation when you want to slide the table up from below the fold
	     * without having to constantly update the height on every scroll tick.
	     * Instead, vary this property on scroll. By using `ownerHeight`, we
	     * over-render the table while making sure the footer and horizontal
	     * scrollbar of the table are visible when the current space for the table
	     * in view is smaller than the final, over-flowing height of table. It
	     * allows us to avoid resizing and reflowing table when it is moving in the
	     * view.
	     *
	     * This is used if `ownerHeight < height` (or `maxHeight`).
	     */
	    ownerHeight: PropTypes.number,

	    overflowX: PropTypes.oneOf(['hidden', 'auto']),
	    overflowY: PropTypes.oneOf(['hidden', 'auto']),

	    /**
	     * Number of rows in the table.
	     */
	    rowsCount: PropTypes.number.isRequired,

	    /**
	     * Pixel height of rows unless `rowHeightGetter` is specified and returns
	     * different value.
	     */
	    rowHeight: PropTypes.number.isRequired,

	    /**
	     * If specified, `rowHeightGetter(index)` is called for each row and the
	     * returned value overrides `rowHeight` for particular row.
	     */
	    rowHeightGetter: PropTypes.func,

	    /**
	     * To get any additional CSS classes that should be added to a row,
	     * `rowClassNameGetter(index)` is called.
	     */
	    rowClassNameGetter: PropTypes.func,

	    /**
	     * Pixel height of the column group header.
	     */
	    groupHeaderHeight: PropTypes.number,

	    /**
	     * Pixel height of header.
	     */
	    headerHeight: PropTypes.number.isRequired,

	    /**
	     * Pixel height of footer.
	     */
	    footerHeight: PropTypes.number,

	    /**
	     * Value of horizontal scroll.
	     */
	    scrollLeft: PropTypes.number,

	    /**
	     * Index of column to scroll to.
	     */
	    scrollToColumn: PropTypes.number,

	    /**
	     * Value of vertical scroll.
	     */
	    scrollTop: PropTypes.number,

	    /**
	     * Index of row to scroll to.
	     */
	    scrollToRow: PropTypes.number,

	    /**
	     * Callback that is called when scrolling starts with current horizontal
	     * and vertical scroll values.
	     */
	    onScrollStart: PropTypes.func,

	    /**
	     * Callback that is called when scrolling ends or stops with new horizontal
	     * and vertical scroll values.
	     */
	    onScrollEnd: PropTypes.func,

	    /**
	     * Callback that is called when `rowHeightGetter` returns a different height
	     * for a row than the `rowHeight` prop. This is necessary because initially
	     * table estimates heights of some parts of the content.
	     */
	    onContentHeightChange: PropTypes.func,

	    /**
	     * Callback that is called when a row is clicked.
	     */
	    onRowClick: PropTypes.func,

	    /**
	     * Callback that is called when a row is double clicked.
	     */
	    onRowDoubleClick: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-down event happens on a row.
	     */
	    onRowMouseDown: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-enter event happens on a row.
	     */
	    onRowMouseEnter: PropTypes.func,

	    /**
	     * Callback that is called when a mouse-leave event happens on a row.
	     */
	    onRowMouseLeave: PropTypes.func,

	    /**
	     * Callback that is called when resizer has been released
	     * and column needs to be updated.
	     *
	     * Required if the isResizable property is true on any column.
	     *
	     * ```
	     * function(
	     *   newColumnWidth: number,
	     *   columnKey: string,
	     * )
	     * ```
	     */
	    onColumnResizeEndCallback: PropTypes.func,

	    /**
	     * Whether a column is currently being resized.
	     */
	    isColumnResizing: PropTypes.bool },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      footerHeight: 0,
	      groupHeaderHeight: 0,
	      headerHeight: 0,
	      scrollLeft: 0,
	      scrollTop: 0 };
	  },

	  getInitialState: function getInitialState() /*object*/{
	    var props = this.props;
	    var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
	    this._scrollHelper = new FixedDataTableScrollHelper(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter);
	    if (props.scrollTop) {
	      this._scrollHelper.scrollTo(props.scrollTop);
	    }
	    this._didScrollStop = debounceCore(this._didScrollStop, 200, this);

	    return this._calculateState(this.props);
	  },

	  componentWillMount: function componentWillMount() {
	    var scrollToRow = this.props.scrollToRow;
	    if (scrollToRow !== undefined && scrollToRow !== null) {
	      this._rowToScrollTo = scrollToRow;
	    }
	    var scrollToColumn = this.props.scrollToColumn;
	    if (scrollToColumn !== undefined && scrollToColumn !== null) {
	      this._columnToScrollTo = scrollToColumn;
	    }
	    this._wheelHandler = new ReactWheelHandler(this._onWheel, this._shouldHandleWheelX, this._shouldHandleWheelY);
	  },

	  _shouldHandleWheelX: function _shouldHandleWheelX( /*number*/delta) /*boolean*/{
	    if (this.props.overflowX === 'hidden') {
	      return false;
	    }

	    delta = Math.round(delta);
	    if (delta === 0) {
	      return false;
	    }

	    return delta < 0 && this.state.scrollX > 0 || delta >= 0 && this.state.scrollX < this.state.maxScrollX;
	  },

	  _shouldHandleWheelY: function _shouldHandleWheelY( /*number*/delta) /*boolean*/{
	    if (this.props.overflowY === 'hidden' || delta === 0) {
	      return false;
	    }

	    delta = Math.round(delta);
	    if (delta === 0) {
	      return false;
	    }

	    return delta < 0 && this.state.scrollY > 0 || delta >= 0 && this.state.scrollY < this.state.maxScrollY;
	  },

	  _reportContentHeight: function _reportContentHeight() {
	    var scrollContentHeight = this.state.scrollContentHeight;
	    var reservedHeight = this.state.reservedHeight;
	    var requiredHeight = scrollContentHeight + reservedHeight;
	    var contentHeight;
	    var useMaxHeight = this.props.height === undefined;
	    if (useMaxHeight && this.props.maxHeight > requiredHeight) {
	      contentHeight = requiredHeight;
	    } else if (this.state.height > requiredHeight && this.props.ownerHeight) {
	      contentHeight = Math.max(requiredHeight, this.props.ownerHeight);
	    } else {
	      contentHeight = this.state.height + this.state.maxScrollY;
	    }
	    if (contentHeight !== this._contentHeight && this.props.onContentHeightChange) {
	      this.props.onContentHeightChange(contentHeight);
	    }
	    this._contentHeight = contentHeight;
	  },

	  componentDidMount: function componentDidMount() {
	    this._reportContentHeight();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    var scrollToRow = nextProps.scrollToRow;
	    if (scrollToRow !== undefined && scrollToRow !== null) {
	      this._rowToScrollTo = scrollToRow;
	    }
	    var scrollToColumn = nextProps.scrollToColumn;
	    if (scrollToColumn !== undefined && scrollToColumn !== null) {
	      this._columnToScrollTo = scrollToColumn;
	    }

	    var newOverflowX = nextProps.overflowX;
	    var newOverflowY = nextProps.overflowY;
	    if (newOverflowX !== this.props.overflowX || newOverflowY !== this.props.overflowY) {
	      this._wheelHandler = new ReactWheelHandler(this._onWheel, newOverflowX !== 'hidden', // Should handle horizontal scroll
	      newOverflowY !== 'hidden' // Should handle vertical scroll
	      );
	    }

	    // In the case of controlled scrolling, notify.
	    if (this.props.ownerHeight !== nextProps.ownerHeight || this.props.scrollTop !== nextProps.scrollTop) {
	      this._didScrollStart();
	    }
	    this._didScrollStop();

	    this.setState(this._calculateState(nextProps, this.state));
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._reportContentHeight();
	  },

	  render: function render() /*object*/{
	    var state = this.state;
	    var props = this.props;

	    var groupHeader;
	    if (state.useGroupHeader) {
	      groupHeader = React.createElement(FixedDataTableRow, {
	        key: 'group_header',
	        isScrolling: this._isScrolling,
	        className: joinClasses(cx('fixedDataTableLayout/header'), cx('public/fixedDataTable/header')),
	        width: state.width,
	        height: state.groupHeaderHeight,
	        index: 0,
	        zIndex: 1,
	        offsetTop: 0,
	        scrollLeft: state.scrollX,
	        fixedColumns: state.groupHeaderFixedColumns,
	        scrollableColumns: state.groupHeaderScrollableColumns,
	        onColumnResize: this._onColumnResize
	      });
	    }

	    var maxScrollY = this.state.maxScrollY;
	    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden';
	    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden';
	    var scrollbarXHeight = showScrollbarX ? Scrollbar.SIZE : 0;
	    var scrollbarYHeight = state.height - scrollbarXHeight - 2 * BORDER_HEIGHT - state.footerHeight;

	    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
	    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
	    scrollbarYHeight -= bodyOffsetTop;
	    var bottomSectionOffset = 0;
	    var footOffsetTop = props.maxHeight != null ? bodyOffsetTop + state.bodyHeight : bodyOffsetTop + scrollbarYHeight;
	    var rowsContainerHeight = footOffsetTop + state.footerHeight;

	    if (props.ownerHeight !== undefined && props.ownerHeight < state.height) {
	      bottomSectionOffset = props.ownerHeight - state.height;

	      footOffsetTop = Math.min(footOffsetTop, props.ownerHeight - state.footerHeight - scrollbarXHeight);

	      scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
	    }

	    var verticalScrollbar;
	    if (showScrollbarY) {
	      verticalScrollbar = React.createElement(Scrollbar, {
	        size: scrollbarYHeight,
	        contentSize: scrollbarYHeight + maxScrollY,
	        onScroll: this._onVerticalScroll,
	        verticalTop: bodyOffsetTop,
	        position: state.scrollY
	      });
	    }

	    var horizontalScrollbar;
	    if (showScrollbarX) {
	      var scrollbarXWidth = state.width;
	      horizontalScrollbar = React.createElement(HorizontalScrollbar, {
	        contentSize: scrollbarXWidth + state.maxScrollX,
	        offset: bottomSectionOffset,
	        onScroll: this._onHorizontalScroll,
	        position: state.scrollX,
	        size: scrollbarXWidth
	      });
	    }

	    var dragKnob = React.createElement(FixedDataTableColumnResizeHandle, {
	      height: state.height,
	      initialWidth: state.columnResizingData.width || 0,
	      minWidth: state.columnResizingData.minWidth || 0,
	      maxWidth: state.columnResizingData.maxWidth || Number.MAX_VALUE,
	      visible: !!state.isColumnResizing,
	      leftOffset: state.columnResizingData.left || 0,
	      knobHeight: state.headerHeight,
	      initialEvent: state.columnResizingData.initialEvent,
	      onColumnResizeEnd: props.onColumnResizeEndCallback,
	      columnKey: state.columnResizingData.key
	    });

	    var footer = null;
	    if (state.footerHeight) {
	      footer = React.createElement(FixedDataTableRow, {
	        key: 'footer',
	        isScrolling: this._isScrolling,
	        className: joinClasses(cx('fixedDataTableLayout/footer'), cx('public/fixedDataTable/footer')),
	        width: state.width,
	        height: state.footerHeight,
	        index: -1,
	        zIndex: 1,
	        offsetTop: footOffsetTop,
	        fixedColumns: state.footFixedColumns,
	        scrollableColumns: state.footScrollableColumns,
	        scrollLeft: state.scrollX
	      });
	    }

	    var rows = this._renderRows(bodyOffsetTop);

	    var header = React.createElement(FixedDataTableRow, {
	      key: 'header',
	      isScrolling: this._isScrolling,
	      className: joinClasses(cx('fixedDataTableLayout/header'), cx('public/fixedDataTable/header')),
	      width: state.width,
	      height: state.headerHeight,
	      index: -1,
	      zIndex: 1,
	      offsetTop: headerOffsetTop,
	      scrollLeft: state.scrollX,
	      fixedColumns: state.headFixedColumns,
	      scrollableColumns: state.headScrollableColumns,
	      onColumnResize: this._onColumnResize
	    });

	    var topShadow;
	    var bottomShadow;
	    if (state.scrollY) {
	      topShadow = React.createElement('div', {
	        className: joinClasses(cx('fixedDataTableLayout/topShadow'), cx('public/fixedDataTable/topShadow')),
	        style: { top: bodyOffsetTop }
	      });
	    }

	    if (state.ownerHeight != null && state.ownerHeight < state.height && state.scrollContentHeight + state.reservedHeight > state.ownerHeight || state.scrollY < maxScrollY) {
	      bottomShadow = React.createElement('div', {
	        className: joinClasses(cx('fixedDataTableLayout/bottomShadow'), cx('public/fixedDataTable/bottomShadow')),
	        style: { top: footOffsetTop }
	      });
	    }

	    return React.createElement(
	      'div',
	      {
	        className: joinClasses(cx('fixedDataTableLayout/main'), cx('public/fixedDataTable/main')),
	        onWheel: this._wheelHandler.onWheel,
	        style: { height: state.height, width: state.width } },
	      React.createElement(
	        'div',
	        {
	          className: cx('fixedDataTableLayout/rowsContainer'),
	          style: { height: rowsContainerHeight, width: state.width } },
	        dragKnob,
	        groupHeader,
	        header,
	        rows,
	        footer,
	        topShadow,
	        bottomShadow
	      ),
	      verticalScrollbar,
	      horizontalScrollbar
	    );
	  },

	  _renderRows: function _renderRows( /*number*/offsetTop) /*object*/{
	    var state = this.state;

	    return React.createElement(FixedDataTableBufferedRows, {
	      isScrolling: this._isScrolling,
	      defaultRowHeight: state.rowHeight,
	      firstRowIndex: state.firstRowIndex,
	      firstRowOffset: state.firstRowOffset,
	      fixedColumns: state.bodyFixedColumns,
	      height: state.bodyHeight,
	      offsetTop: offsetTop,
	      onRowClick: state.onRowClick,
	      onRowDoubleClick: state.onRowDoubleClick,
	      onRowMouseDown: state.onRowMouseDown,
	      onRowMouseEnter: state.onRowMouseEnter,
	      onRowMouseLeave: state.onRowMouseLeave,
	      rowClassNameGetter: state.rowClassNameGetter,
	      rowsCount: state.rowsCount,
	      rowGetter: state.rowGetter,
	      rowHeightGetter: state.rowHeightGetter,
	      scrollLeft: state.scrollX,
	      scrollableColumns: state.bodyScrollableColumns,
	      showLastRowBorder: true,
	      width: state.width,
	      rowPositionGetter: this._scrollHelper.getRowPosition
	    });
	  },

	  /**
	   * This is called when a cell that is in the header of a column has its
	   * resizer knob clicked on. It displays the resizer and puts in the correct
	   * location on the table.
	   */
	  _onColumnResize: function _onColumnResize(
	  /*number*/combinedWidth,
	  /*number*/leftOffset,
	  /*number*/cellWidth,
	  /*?number*/cellMinWidth,
	  /*?number*/cellMaxWidth,
	  /*number|string*/columnKey,
	  /*object*/event) {
	    this.setState({
	      isColumnResizing: true,
	      columnResizingData: {
	        left: leftOffset + combinedWidth - cellWidth,
	        width: cellWidth,
	        minWidth: cellMinWidth,
	        maxWidth: cellMaxWidth,
	        initialEvent: {
	          clientX: event.clientX,
	          clientY: event.clientY,
	          preventDefault: emptyFunction
	        },
	        key: columnKey
	      }
	    });
	  },

	  _areColumnSettingsIdentical: function _areColumnSettingsIdentical(oldColumns, newColumns) {
	    if (oldColumns.length !== newColumns.length) {
	      return false;
	    }
	    for (var index = 0; index < oldColumns.length; ++index) {
	      if (!shallowEqual(oldColumns[index].props, newColumns[index].props)) {
	        return false;
	      }
	    }
	    return true;
	  },

	  _populateColumnsAndColumnData: function _populateColumnsAndColumnData(columns, columnGroups, oldState) {
	    var canReuseColumnSettings = false;
	    var canReuseColumnGroupSettings = false;

	    if (oldState && oldState.columns) {
	      canReuseColumnSettings = this._areColumnSettingsIdentical(columns, oldState.columns);
	    }
	    if (oldState && oldState.columnGroups && columnGroups) {
	      canReuseColumnGroupSettings = this._areColumnSettingsIdentical(columnGroups, oldState.columnGroups);
	    }

	    var columnInfo = {};
	    if (canReuseColumnSettings) {
	      columnInfo.bodyFixedColumns = oldState.bodyFixedColumns;
	      columnInfo.bodyScrollableColumns = oldState.bodyScrollableColumns;
	      columnInfo.headFixedColumns = oldState.headFixedColumns;
	      columnInfo.headScrollableColumns = oldState.headScrollableColumns;
	      columnInfo.footFixedColumns = oldState.footFixedColumns;
	      columnInfo.footScrollableColumns = oldState.footScrollableColumns;
	    } else {
	      var bodyColumnTypes = this._splitColumnTypes(columns);
	      columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
	      columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

	      var headColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columns));
	      columnInfo.headFixedColumns = headColumnTypes.fixed;
	      columnInfo.headScrollableColumns = headColumnTypes.scrollable;

	      var footColumnTypes = this._splitColumnTypes(this._selectColumnElement(FOOTER, columns));
	      columnInfo.footFixedColumns = footColumnTypes.fixed;
	      columnInfo.footScrollableColumns = footColumnTypes.scrollable;
	    }

	    if (canReuseColumnGroupSettings) {
	      columnInfo.groupHeaderFixedColumns = oldState.groupHeaderFixedColumns;
	      columnInfo.groupHeaderScrollableColumns = oldState.groupHeaderScrollableColumns;
	    } else {
	      if (columnGroups) {
	        var groupHeaderColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columnGroups));
	        columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
	        columnInfo.groupHeaderScrollableColumns = groupHeaderColumnTypes.scrollable;
	      }
	    }

	    return columnInfo;
	  },

	  _calculateState: function _calculateState( /*object*/props, /*?object*/oldState) /*object*/{
	    invariant(props.height !== undefined || props.maxHeight !== undefined, 'You must set either a height or a maxHeight');

	    var children = [];
	    ReactChildren.forEach(props.children, function (child, index) {
	      if (child == null) {
	        return;
	      }
	      invariant(child.type.__TableColumnGroup__ || child.type.__TableColumn__, 'child type should be <FixedDataTableColumn /> or ' + '<FixedDataTableColumnGroup />');
	      children.push(child);
	    });

	    var useGroupHeader = false;
	    if (children.length && children[0].type.__TableColumnGroup__) {
	      useGroupHeader = true;
	    }

	    var firstRowIndex = oldState && oldState.firstRowIndex || 0;
	    var firstRowOffset = oldState && oldState.firstRowOffset || 0;
	    var scrollX, scrollY;
	    if (oldState && props.overflowX !== 'hidden') {
	      scrollX = oldState.scrollX;
	    } else {
	      scrollX = props.scrollLeft;
	    }
	    if (oldState && props.overflowY !== 'hidden') {
	      scrollY = oldState.scrollY;
	    } else {
	      scrollState = this._scrollHelper.scrollTo(props.scrollTop);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    }

	    if (this._rowToScrollTo !== undefined) {
	      scrollState = this._scrollHelper.scrollRowIntoView(this._rowToScrollTo);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	      delete this._rowToScrollTo;
	    }

	    var groupHeaderHeight = useGroupHeader ? props.groupHeaderHeight : 0;

	    if (oldState && props.rowsCount !== oldState.rowsCount) {
	      // Number of rows changed, try to scroll to the row from before the
	      // change
	      var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
	      this._scrollHelper = new FixedDataTableScrollHelper(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter);
	      var scrollState = this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    } else if (oldState && props.rowHeightGetter !== oldState.rowHeightGetter) {
	      this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
	    }

	    var columnResizingData;
	    if (props.isColumnResizing) {
	      columnResizingData = oldState && oldState.columnResizingData;
	    } else {
	      columnResizingData = EMPTY_OBJECT;
	    }

	    var columns;
	    var columnGroups;

	    if (useGroupHeader) {
	      var columnGroupSettings = FixedDataTableWidthHelper.adjustColumnGroupWidths(children, props.width);
	      columns = columnGroupSettings.columns;
	      columnGroups = columnGroupSettings.columnGroups;
	    } else {
	      columns = FixedDataTableWidthHelper.adjustColumnWidths(children, props.width);
	    }

	    var columnInfo = this._populateColumnsAndColumnData(columns, columnGroups, oldState);

	    if (this._columnToScrollTo !== undefined) {
	      // If selected column is a fixed column, don't scroll
	      var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
	      if (this._columnToScrollTo >= fixedColumnsCount) {
	        var totalFixedColumnsWidth = 0;
	        var i, column;
	        for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
	          column = columnInfo.bodyFixedColumns[i];
	          totalFixedColumnsWidth += column.props.width;
	        }

	        var scrollableColumnIndex = Math.min(this._columnToScrollTo - fixedColumnsCount, columnInfo.bodyScrollableColumns.length - 1);

	        var previousColumnsWidth = 0;
	        for (i = 0; i < scrollableColumnIndex; ++i) {
	          column = columnInfo.bodyScrollableColumns[i];
	          previousColumnsWidth += column.props.width;
	        }

	        var availableScrollWidth = props.width - totalFixedColumnsWidth;
	        var selectedColumnWidth = columnInfo.bodyScrollableColumns[scrollableColumnIndex].props.width;
	        var minAcceptableScrollPosition = previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

	        if (scrollX < minAcceptableScrollPosition) {
	          scrollX = minAcceptableScrollPosition;
	        }

	        if (scrollX > previousColumnsWidth) {
	          scrollX = previousColumnsWidth;
	        }
	      }
	      delete this._columnToScrollTo;
	    }

	    var useMaxHeight = props.height === undefined;
	    var height = Math.round(useMaxHeight ? props.maxHeight : props.height);
	    var totalHeightReserved = props.footerHeight + props.headerHeight + groupHeaderHeight + 2 * BORDER_HEIGHT;
	    var bodyHeight = height - totalHeightReserved;
	    var scrollContentHeight = this._scrollHelper.getContentHeight();
	    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
	    var scrollContentWidth = FixedDataTableWidthHelper.getTotalWidth(columns);

	    var horizontalScrollbarVisible = scrollContentWidth > props.width && props.overflowX !== 'hidden';

	    if (horizontalScrollbarVisible) {
	      bodyHeight -= Scrollbar.SIZE;
	      totalHeightNeeded += Scrollbar.SIZE;
	      totalHeightReserved += Scrollbar.SIZE;
	    }

	    var maxScrollX = Math.max(0, scrollContentWidth - props.width);
	    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
	    scrollX = Math.min(scrollX, maxScrollX);
	    scrollY = Math.min(scrollY, maxScrollY);

	    if (!maxScrollY) {
	      // no vertical scrollbar necessary, use the totals we tracked so we
	      // can shrink-to-fit vertically
	      if (useMaxHeight) {
	        height = totalHeightNeeded;
	      }
	      bodyHeight = totalHeightNeeded - totalHeightReserved;
	    }

	    this._scrollHelper.setViewportHeight(bodyHeight);

	    // The order of elements in this object metters and bringing bodyHeight,
	    // height or useGroupHeader to the top can break various features
	    var newState = _extends({
	      isColumnResizing: oldState && oldState.isColumnResizing }, columnInfo, props, {

	      columns: columns,
	      columnGroups: columnGroups,
	      columnResizingData: columnResizingData,
	      firstRowIndex: firstRowIndex,
	      firstRowOffset: firstRowOffset,
	      horizontalScrollbarVisible: horizontalScrollbarVisible,
	      maxScrollX: maxScrollX,
	      maxScrollY: maxScrollY,
	      reservedHeight: totalHeightReserved,
	      scrollContentHeight: scrollContentHeight,
	      scrollX: scrollX,
	      scrollY: scrollY,

	      // These properties may overwrite properties defined in
	      // columnInfo and props
	      bodyHeight: bodyHeight,
	      height: height,
	      groupHeaderHeight: groupHeaderHeight,
	      useGroupHeader: useGroupHeader });

	    return newState;
	  },

	  _selectColumnElement: function _selectColumnElement( /*string*/type, /*array*/columns) /*array*/{
	    var newColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      var column = columns[i];
	      newColumns.push(React.cloneElement(column, {
	        cell: type ? column.props[type] : column.props[CELL]
	      }));
	    }
	    return newColumns;
	  },

	  _splitColumnTypes: function _splitColumnTypes( /*array*/columns) /*object*/{
	    var fixedColumns = [];
	    var scrollableColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      if (columns[i].props.fixed) {
	        fixedColumns.push(columns[i]);
	      } else {
	        scrollableColumns.push(columns[i]);
	      }
	    }
	    return {
	      fixed: fixedColumns,
	      scrollable: scrollableColumns };
	  },

	  _onWheel: function _onWheel( /*number*/deltaX, /*number*/deltaY) {
	    if (this.isMounted()) {
	      if (!this._isScrolling) {
	        this._didScrollStart();
	      }
	      var x = this.state.scrollX;
	      if (Math.abs(deltaY) > Math.abs(deltaX) && this.props.overflowY !== 'hidden') {
	        var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
	        var maxScrollY = Math.max(0, scrollState.contentHeight - this.state.bodyHeight);
	        this.setState({
	          firstRowIndex: scrollState.index,
	          firstRowOffset: scrollState.offset,
	          scrollY: scrollState.position,
	          scrollContentHeight: scrollState.contentHeight,
	          maxScrollY: maxScrollY });
	      } else if (deltaX && this.props.overflowX !== 'hidden') {
	        x += deltaX;
	        x = x < 0 ? 0 : x;
	        x = x > this.state.maxScrollX ? this.state.maxScrollX : x;
	        this.setState({
	          scrollX: x });
	      }

	      this._didScrollStop();
	    }
	  },

	  _onHorizontalScroll: function _onHorizontalScroll( /*number*/scrollPos) {
	    if (this.isMounted() && scrollPos !== this.state.scrollX) {
	      if (!this._isScrolling) {
	        this._didScrollStart();
	      }
	      this.setState({
	        scrollX: scrollPos });
	      this._didScrollStop();
	    }
	  },

	  _onVerticalScroll: function _onVerticalScroll( /*number*/scrollPos) {
	    if (this.isMounted() && scrollPos !== this.state.scrollY) {
	      if (!this._isScrolling) {
	        this._didScrollStart();
	      }
	      var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));
	      this.setState({
	        firstRowIndex: scrollState.index,
	        firstRowOffset: scrollState.offset,
	        scrollY: scrollState.position,
	        scrollContentHeight: scrollState.contentHeight });
	      this._didScrollStop();
	    }
	  },

	  _didScrollStart: function _didScrollStart() {
	    if (this.isMounted() && !this._isScrolling) {
	      this._isScrolling = true;
	      if (this.props.onScrollStart) {
	        this.props.onScrollStart(this.state.scrollX, this.state.scrollY);
	      }
	    }
	  },

	  _didScrollStop: function _didScrollStop() {
	    if (this.isMounted() && this._isScrolling) {
	      this._isScrolling = false;
	      this.setState({ redraw: true });
	      if (this.props.onScrollEnd) {
	        this.props.onScrollEnd(this.state.scrollX, this.state.scrollY);
	      }
	    }
	  } });

	var HorizontalScrollbar = React.createClass({
	  displayName: 'HorizontalScrollbar',

	  mixins: [ReactComponentWithPureRenderMixin],
	  propTypes: {
	    contentSize: PropTypes.number.isRequired,
	    offset: PropTypes.number.isRequired,
	    onScroll: PropTypes.func.isRequired,
	    position: PropTypes.number.isRequired,
	    size: PropTypes.number.isRequired },

	  render: function render() /*object*/{
	    var outerContainerStyle = {
	      height: Scrollbar.SIZE,
	      width: this.props.size };
	    var innerContainerStyle = {
	      height: Scrollbar.SIZE,
	      position: 'absolute',
	      overflow: 'hidden',
	      width: this.props.size };
	    translateDOMPositionXY(innerContainerStyle, 0, this.props.offset);

	    return React.createElement(
	      'div',
	      {
	        className: joinClasses(cx('fixedDataTableLayout/horizontalScrollbar'), cx('public/fixedDataTable/horizontalScrollbar')),
	        style: outerContainerStyle },
	      React.createElement(
	        'div',
	        { style: innerContainerStyle },
	        React.createElement(Scrollbar, _extends({}, this.props, {
	          isOpaque: true,
	          orientation: 'horizontal',
	          offset: undefined
	        }))
	      )
	    );
	  } });

	module.exports = FixedDataTable;

	// isColumnResizing should be overwritten by value from props if
	// avaialble

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentWithPureRenderMixin
	 */

	'use strict';

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is utility that hanlds onWheel events and calls provided wheel
	 * callback with correct frame rate.
	 *
	 * @providesModule ReactWheelHandler
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var emptyFunction = __webpack_require__(10);
	var normalizeWheel = __webpack_require__(11);
	var requestAnimationFramePolyfill = __webpack_require__(15);

	var ReactWheelHandler = (function () {
	  /**
	   * onWheel is the callback that will be called with right frame rate if
	   * any wheel events happened
	   * onWheel should is to be called with two arguments: deltaX and deltaY in
	   * this order
	   */

	  function ReactWheelHandler(
	  /*function*/onWheel,
	  /*boolean|function*/handleScrollX,
	  /*boolean|function*/handleScrollY,
	  /*?boolean|?function*/stopPropagation) {
	    _classCallCheck(this, ReactWheelHandler);

	    this._animationFrameID = null;
	    this._deltaX = 0;
	    this._deltaY = 0;
	    this._didWheel = this._didWheel.bind(this);
	    if (typeof handleScrollX !== 'function') {
	      handleScrollX = handleScrollX ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
	    }

	    if (typeof handleScrollY !== 'function') {
	      handleScrollY = handleScrollY ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
	    }

	    if (typeof stopPropagation !== 'function') {
	      stopPropagation = stopPropagation ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
	    }

	    this._handleScrollX = handleScrollX;
	    this._handleScrollY = handleScrollY;
	    this._stopPropagation = stopPropagation;
	    this._onWheelCallback = onWheel;
	    this.onWheel = this.onWheel.bind(this);
	  }

	  _createClass(ReactWheelHandler, [{
	    key: 'onWheel',
	    value: function onWheel( /*object*/event) {
	      var normalizedEvent = normalizeWheel(event);
	      var deltaX = this._deltaX + normalizedEvent.pixelX;
	      var deltaY = this._deltaY + normalizedEvent.pixelY;
	      var handleScrollX = this._handleScrollX(deltaX, deltaY);
	      var handleScrollY = this._handleScrollY(deltaY, deltaX);
	      if (!handleScrollX && !handleScrollY) {
	        return;
	      }

	      this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
	      this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0;
	      event.preventDefault();

	      var changed;
	      if (this._deltaX !== 0 || this._deltaY !== 0) {
	        if (this._stopPropagation()) {
	          event.stopPropagation();
	        }
	        changed = true;
	      }

	      if (changed === true && this._animationFrameID === null) {
	        this._animationFrameID = requestAnimationFramePolyfill(this._didWheel);
	      }
	    }
	  }, {
	    key: '_didWheel',
	    value: function _didWheel() {
	      this._animationFrameID = null;
	      this._onWheelCallback(this._deltaX, this._deltaY);
	      this._deltaX = 0;
	      this._deltaY = 0;
	    }
	  }]);

	  return ReactWheelHandler;
	})();

	module.exports = ReactWheelHandler;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule normalizeWheel
	 * @typechecks
	 */

	'use strict';

	var UserAgent_DEPRECATED = __webpack_require__(12);

	var isEventSupported = __webpack_require__(13);

	// Reasonable defaults
	var PIXEL_STEP = 10;
	var LINE_HEIGHT = 40;
	var PAGE_HEIGHT = 800;

	/**
	 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
	 * complicated, thus this doc is long and (hopefully) detailed enough to answer
	 * your questions.
	 *
	 * If you need to react to the mouse wheel in a predictable way, this code is
	 * like your bestest friend. * hugs *
	 *
	 * As of today, there are 4 DOM event types you can listen to:
	 *
	 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
	 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
	 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
	 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
	 *
	 * So what to do?  The is the best:
	 *
	 *   normalizeWheel.getEventType();
	 *
	 * In your event callback, use this code to get sane interpretation of the
	 * deltas.  This code will return an object with properties:
	 *
	 *   spinX   -- normalized spin speed (use for zoom) - x plane
	 *   spinY   -- " - y plane
	 *   pixelX  -- normalized distance (to pixels) - x plane
	 *   pixelY  -- " - y plane
	 *
	 * Wheel values are provided by the browser assuming you are using the wheel to
	 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
	 * significantly on different platforms and browsers, forgetting that you can
	 * scroll at different speeds.  Some devices (like trackpads) emit more events
	 * at smaller increments with fine granularity, and some emit massive jumps with
	 * linear speed or acceleration.
	 *
	 * This code does its best to normalize the deltas for you:
	 *
	 *   - spin is trying to normalize how far the wheel was spun (or trackpad
	 *     dragged).  This is super useful for zoom support where you want to
	 *     throw away the chunky scroll steps on the PC and make those equal to
	 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
	 *     resolve a single slow step on a wheel to 1.
	 *
	 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
	 *     get the crazy differences between browsers, but at least it'll be in
	 *     pixels!
	 *
	 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
	 *     should translate to positive value zooming IN, negative zooming OUT.
	 *     This matches the newer 'wheel' event.
	 *
	 * Why are there spinX, spinY (or pixels)?
	 *
	 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
	 *     with a mouse.  It results in side-scrolling in the browser by default.
	 *
	 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
	 *
	 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
	 *     probably is by browsers in conjunction with fancy 3D controllers .. but
	 *     you know.
	 *
	 * Implementation info:
	 *
	 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
	 * average mouse:
	 *
	 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
	 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
	 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
	 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
	 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
	 *
	 * On the trackpad:
	 *
	 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
	 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
	 *
	 * On other/older browsers.. it's more complicated as there can be multiple and
	 * also missing delta values.
	 *
	 * The 'wheel' event is more standard:
	 *
	 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
	 *
	 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
	 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
	 * backward compatibility with older events.  Those other values help us
	 * better normalize spin speed.  Example of what the browsers provide:
	 *
	 *                          | event.wheelDelta | event.detail
	 *        ------------------+------------------+--------------
	 *          Safari v5/OS X  |       -120       |       0
	 *          Safari v5/Win7  |       -120       |       0
	 *         Chrome v17/OS X  |       -120       |       0
	 *         Chrome v17/Win7  |       -120       |       0
	 *                IE9/Win7  |       -120       |   undefined
	 *         Firefox v4/OS X  |     undefined    |       1
	 *         Firefox v4/Win7  |     undefined    |       3
	 *
	 */
	function normalizeWheel( /*object*/event) /*object*/{
	  var sX = 0,
	      sY = 0,
	      // spinX, spinY
	  pX = 0,
	      pY = 0; // pixelX, pixelY

	  // Legacy
	  if ('detail' in event) {
	    sY = event.detail;
	  }
	  if ('wheelDelta' in event) {
	    sY = -event.wheelDelta / 120;
	  }
	  if ('wheelDeltaY' in event) {
	    sY = -event.wheelDeltaY / 120;
	  }
	  if ('wheelDeltaX' in event) {
	    sX = -event.wheelDeltaX / 120;
	  }

	  // side scrolling on FF with DOMMouseScroll
	  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
	    sX = sY;
	    sY = 0;
	  }

	  pX = sX * PIXEL_STEP;
	  pY = sY * PIXEL_STEP;

	  if ('deltaY' in event) {
	    pY = event.deltaY;
	  }
	  if ('deltaX' in event) {
	    pX = event.deltaX;
	  }

	  if ((pX || pY) && event.deltaMode) {
	    if (event.deltaMode == 1) {
	      // delta in LINE units
	      pX *= LINE_HEIGHT;
	      pY *= LINE_HEIGHT;
	    } else {
	      // delta in PAGE units
	      pX *= PAGE_HEIGHT;
	      pY *= PAGE_HEIGHT;
	    }
	  }

	  // Fall-back if spin cannot be determined
	  if (pX && !sX) {
	    sX = pX < 1 ? -1 : 1;
	  }
	  if (pY && !sY) {
	    sY = pY < 1 ? -1 : 1;
	  }

	  return { spinX: sX,
	    spinY: sY,
	    pixelX: pX,
	    pixelY: pY };
	}

	/**
	 * The best combination if you prefer spinX + spinY normalization.  It favors
	 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
	 * 'wheel' event, making spin speed determination impossible.
	 */
	normalizeWheel.getEventType = function () /*string*/{
	  return UserAgent_DEPRECATED.firefox() ? 'DOMMouseScroll' : isEventSupported('wheel') ? 'wheel' : 'mousewheel';
	};

	module.exports = normalizeWheel;

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Copyright 2004-present Facebook. All Rights Reserved.
	 *
	 * @providesModule UserAgent_DEPRECATED
	 */

	/**
	 *  Provides entirely client-side User Agent and OS detection. You should prefer
	 *  the non-deprecated UserAgent module when possible, which exposes our
	 *  authoritative server-side PHP-based detection to the client.
	 *
	 *  Usage is straightforward:
	 *
	 *    if (UserAgent_DEPRECATED.ie()) {
	 *      //  IE
	 *    }
	 *
	 *  You can also do version checks:
	 *
	 *    if (UserAgent_DEPRECATED.ie() >= 7) {
	 *      //  IE7 or better
	 *    }
	 *
	 *  The browser functions will return NaN if the browser does not match, so
	 *  you can also do version compares the other way:
	 *
	 *    if (UserAgent_DEPRECATED.ie() < 7) {
	 *      //  IE6 or worse
	 *    }
	 *
	 *  Note that the version is a float and may include a minor version number,
	 *  so you should always use range operators to perform comparisons, not
	 *  strict equality.
	 *
	 *  **Note:** You should **strongly** prefer capability detection to browser
	 *  version detection where it's reasonable:
	 *
	 *    http://www.quirksmode.org/js/support.html
	 *
	 *  Further, we have a large number of mature wrapper functions and classes
	 *  which abstract away many browser irregularities. Check the documentation,
	 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
	 *  another copy of "event || window.event".
	 *
	 */

	'use strict';

	var _populated = false;

	// Browsers
	var _ie, _firefox, _opera, _webkit, _chrome;

	// Actual IE browser for compatibility mode
	var _ie_real_version;

	// Platforms
	var _osx, _windows, _linux, _android;

	// Architectures
	var _win64;

	// Devices
	var _iphone, _ipad, _native;

	var _mobile;

	function _populate() {
	  if (_populated) {
	    return;
	  }

	  _populated = true;

	  // To work around buggy JS libraries that can't handle multi-digit
	  // version numbers, Opera 10's user agent string claims it's Opera
	  // 9, then later includes a Version/X.Y field:
	  //
	  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
	  var uas = navigator.userAgent;
	  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
	  var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

	  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
	  _ipad = /\b(iP[ao]d)/.exec(uas);
	  _android = /Android/i.exec(uas);
	  _native = /FBAN\/\w+;/i.exec(uas);
	  _mobile = /Mobile/i.exec(uas);

	  // Note that the IE team blog would have you believe you should be checking
	  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
	  // from either x64 or ia64;  so ultimately, you should just check for Win64
	  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
	  // Windows will send 'WOW64' instead.
	  _win64 = !!/Win64/.exec(uas);

	  if (agent) {
	    _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
	    // IE compatibility mode
	    if (_ie && document && document.documentMode) {
	      _ie = document.documentMode;
	    }
	    // grab the "true" ie version from the trident token if available
	    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
	    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

	    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
	    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
	    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
	    if (_webkit) {
	      // We do not add the regexp to the above test, because it will always
	      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
	      // the userAgent string.
	      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
	      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
	    } else {
	      _chrome = NaN;
	    }
	  } else {
	    _ie = _firefox = _opera = _chrome = _webkit = NaN;
	  }

	  if (os) {
	    if (os[1]) {
	      // Detect OS X version.  If no version number matches, set _osx to true.
	      // Version examples:  10, 10_6_1, 10.7
	      // Parses version number as a float, taking only first two sets of
	      // digits.  If only one set of digits is found, returns just the major
	      // version number.
	      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

	      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
	    } else {
	      _osx = false;
	    }
	    _windows = !!os[2];
	    _linux = !!os[3];
	  } else {
	    _osx = _windows = _linux = false;
	  }
	}

	var UserAgent_DEPRECATED = {

	  /**
	   *  Check if the UA is Internet Explorer.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  ie: function ie() {
	    return _populate() || _ie;
	  },

	  /**
	   * Check if we're in Internet Explorer compatibility mode.
	   *
	   * @return bool true if in compatibility mode, false if
	   * not compatibility mode or not ie
	   */
	  ieCompatibilityMode: function ieCompatibilityMode() {
	    return _populate() || _ie_real_version > _ie;
	  },

	  /**
	   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
	   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
	   * this when we don't need it -- tracked by #601957.
	   */
	  ie64: function ie64() {
	    return UserAgent_DEPRECATED.ie() && _win64;
	  },

	  /**
	   *  Check if the UA is Firefox.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  firefox: function firefox() {
	    return _populate() || _firefox;
	  },

	  /**
	   *  Check if the UA is Opera.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  opera: function opera() {
	    return _populate() || _opera;
	  },

	  /**
	   *  Check if the UA is WebKit.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  webkit: function webkit() {
	    return _populate() || _webkit;
	  },

	  /**
	   *  For Push
	   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
	   */
	  safari: function safari() {
	    return UserAgent_DEPRECATED.webkit();
	  },

	  /**
	   *  Check if the UA is a Chrome browser.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  chrome: function chrome() {
	    return _populate() || _chrome;
	  },

	  /**
	   *  Check if the user is running Windows.
	   *
	   *  @return bool `true' if the user's OS is Windows.
	   */
	  windows: function windows() {
	    return _populate() || _windows;
	  },

	  /**
	   *  Check if the user is running Mac OS X.
	   *
	   *  @return float|bool   Returns a float if a version number is detected,
	   *                       otherwise true/false.
	   */
	  osx: function osx() {
	    return _populate() || _osx;
	  },

	  /**
	   * Check if the user is running Linux.
	   *
	   * @return bool `true' if the user's OS is some flavor of Linux.
	   */
	  linux: function linux() {
	    return _populate() || _linux;
	  },

	  /**
	   * Check if the user is running on an iPhone or iPod platform.
	   *
	   * @return bool `true' if the user is running some flavor of the
	   *    iPhone OS.
	   */
	  iphone: function iphone() {
	    return _populate() || _iphone;
	  },

	  mobile: function mobile() {
	    return _populate() || (_iphone || _ipad || _android || _mobile);
	  },

	  nativeApp: function nativeApp() {
	    // webviews inside of the native apps
	    return _populate() || _native;
	  },

	  android: function android() {
	    return _populate() || _android;
	  },

	  ipad: function ipad() {
	    return _populate() || _ipad;
	  }
	};

	module.exports = UserAgent_DEPRECATED;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isEventSupported
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(14);

	var useHasFeature;
	if (ExecutionEnvironment.canUseDOM) {
	  useHasFeature = document.implementation && document.implementation.hasFeature &&
	  // always returns true in newer browsers as per the standard.
	  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	  document.implementation.hasFeature('', '') !== true;
	}

	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
	    return false;
	  }

	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = (eventName in document);

	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }

	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }

	  return isSupported;
	}

	module.exports = isEventSupported;

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule requestAnimationFramePolyfill
	 */

	'use strict';

	var emptyFunction = __webpack_require__(10);
	var nativeRequestAnimationFrame = __webpack_require__(16);

	var lastTime = 0;

	/**
	 * Here is the native and polyfill version of requestAnimationFrame.
	 * Please don't use it directly and use requestAnimationFrame module instead.
	 */
	var requestAnimationFrame = nativeRequestAnimationFrame || function (callback) {
	  var currTime = Date.now();
	  var timeDelay = Math.max(0, 16 - (currTime - lastTime));
	  lastTime = currTime + timeDelay;
	  return global.setTimeout(function () {
	    callback(Date.now());
	  }, timeDelay);
	};

	// Works around a rare bug in Safari 6 where the first request is never invoked.
	requestAnimationFrame(emptyFunction);

	module.exports = requestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule nativeRequestAnimationFrame
	 */

	"use strict";

	var nativeRequestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame;

	module.exports = nativeRequestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Scrollbar.react
	 * @typechecks
	 */

	'use strict';

	var DOMMouseMoveTracker = __webpack_require__(18);
	var Keys = __webpack_require__(21);
	var React = __webpack_require__(6);
	var ReactDOM = __webpack_require__(22);
	var ReactComponentWithPureRenderMixin = __webpack_require__(8);
	var ReactWheelHandler = __webpack_require__(9);

	var cssVar = __webpack_require__(24);
	var cx = __webpack_require__(25);
	var emptyFunction = __webpack_require__(10);
	var translateDOMPositionXY = __webpack_require__(26);

	var PropTypes = React.PropTypes;

	var UNSCROLLABLE_STATE = {
	  position: 0,
	  scrollable: false };

	var FACE_MARGIN = parseInt(cssVar('scrollbar-face-margin'), 10);
	var FACE_MARGIN_2 = FACE_MARGIN * 2;
	var FACE_SIZE_MIN = 30;
	var KEYBOARD_SCROLL_AMOUNT = 40;

	var _lastScrolledScrollbar = null;

	var Scrollbar = React.createClass({
	  displayName: 'Scrollbar',

	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    contentSize: PropTypes.number.isRequired,
	    defaultPosition: PropTypes.number,
	    isOpaque: PropTypes.bool,
	    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
	    onScroll: PropTypes.func,
	    position: PropTypes.number,
	    size: PropTypes.number.isRequired,
	    trackColor: PropTypes.oneOf(['gray']),
	    zIndex: PropTypes.number,
	    verticalTop: PropTypes.number
	  },

	  getInitialState: function getInitialState() /*object*/{
	    var props = this.props;
	    return this._calculateState(props.position || props.defaultPosition || 0, props.size, props.contentSize, props.orientation);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    var controlledPosition = nextProps.position;
	    if (controlledPosition === undefined) {
	      this._setNextState(this._calculateState(this.state.position, nextProps.size, nextProps.contentSize, nextProps.orientation));
	    } else {
	      this._setNextState(this._calculateState(controlledPosition, nextProps.size, nextProps.contentSize, nextProps.orientation), nextProps);
	    }
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      defaultPosition: 0,
	      isOpaque: false,
	      onScroll: emptyFunction,
	      orientation: 'vertical',
	      zIndex: 99 };
	  },

	  render: function render() /*?object*/{
	    if (!this.state.scrollable) {
	      return null;
	    }

	    var size = this.props.size;
	    var mainStyle;
	    var faceStyle;
	    var isHorizontal = this.state.isHorizontal;
	    var isVertical = !isHorizontal;
	    var isActive = this.state.focused || this.state.isDragging;
	    var faceSize = this.state.faceSize;
	    var isOpaque = this.props.isOpaque;
	    var verticalTop = this.props.verticalTop || 0;

	    var mainClassName = cx({
	      'ScrollbarLayout/main': true,
	      'ScrollbarLayout/mainVertical': isVertical,
	      'ScrollbarLayout/mainHorizontal': isHorizontal,
	      'public/Scrollbar/main': true,
	      'public/Scrollbar/mainOpaque': isOpaque,
	      'public/Scrollbar/mainActive': isActive });

	    var faceClassName = cx({
	      'ScrollbarLayout/face': true,
	      'ScrollbarLayout/faceHorizontal': isHorizontal,
	      'ScrollbarLayout/faceVertical': isVertical,
	      'public/Scrollbar/faceActive': isActive,
	      'public/Scrollbar/face': true });

	    var position = this.state.position * this.state.scale + FACE_MARGIN;

	    if (isHorizontal) {
	      mainStyle = {
	        width: size };
	      faceStyle = {
	        width: faceSize - FACE_MARGIN_2
	      };
	      translateDOMPositionXY(faceStyle, position, 0);
	    } else {
	      mainStyle = {
	        top: verticalTop,
	        height: size };
	      faceStyle = {
	        height: faceSize - FACE_MARGIN_2 };
	      translateDOMPositionXY(faceStyle, 0, position);
	    }

	    mainStyle.zIndex = this.props.zIndex;

	    if (this.props.trackColor === 'gray') {
	      mainStyle.backgroundColor = cssVar('fbui-desktop-background-light');
	    }

	    return React.createElement(
	      'div',
	      {
	        onFocus: this._onFocus,
	        onBlur: this._onBlur,
	        onKeyDown: this._onKeyDown,
	        onMouseDown: this._onMouseDown,
	        onWheel: this._wheelHandler.onWheel,
	        className: mainClassName,
	        style: mainStyle,
	        tabIndex: 0 },
	      React.createElement('div', {
	        ref: 'face',
	        className: faceClassName,
	        style: faceStyle
	      })
	    );
	  },

	  componentWillMount: function componentWillMount() {
	    var isHorizontal = this.props.orientation === 'horizontal';
	    var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

	    this._wheelHandler = new ReactWheelHandler(onWheel, this._shouldHandleX, // Should hanlde horizontal scroll
	    this._shouldHandleY // Should handle vertical scroll
	    );
	  },

	  componentDidMount: function componentDidMount() {
	    this._mouseMoveTracker = new DOMMouseMoveTracker(this._onMouseMove, this._onMouseMoveEnd, document.documentElement);

	    if (this.props.position !== undefined && this.state.position !== this.props.position) {
	      this._didScroll();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    if (_lastScrolledScrollbar === this) {
	      _lastScrolledScrollbar = null;
	    }
	    delete this._mouseMoveTracker;
	  },

	  scrollBy: function scrollBy( /*number*/delta) {
	    this._onWheel(delta);
	  },

	  _shouldHandleX: function _shouldHandleX( /*number*/delta) /*boolean*/{
	    return this.props.orientation === 'horizontal' ? this._shouldHandleChange(delta) : false;
	  },

	  _shouldHandleY: function _shouldHandleY( /*number*/delta) /*boolean*/{
	    return this.props.orientation !== 'horizontal' ? this._shouldHandleChange(delta) : false;
	  },

	  _shouldHandleChange: function _shouldHandleChange( /*number*/delta) /*boolean*/{
	    var nextState = this._calculateState(this.state.position + delta, this.props.size, this.props.contentSize, this.props.orientation);
	    return nextState.position !== this.state.position;
	  },

	  _calculateState: function _calculateState(
	  /*number*/position,
	  /*number*/size,
	  /*number*/contentSize,
	  /*string*/orientation) /*object*/{
	    if (size < 1 || contentSize <= size) {
	      return UNSCROLLABLE_STATE;
	    }

	    var stateKey = '' + position + '_' + size + '_' + contentSize + '_' + orientation;
	    if (this._stateKey === stateKey) {
	      return this._stateForKey;
	    }

	    // There are two types of positions here.
	    // 1) Phisical position: changed by mouse / keyboard
	    // 2) Logical position: changed by props.
	    // The logical position will be kept as as internal state and the `render()`
	    // function will translate it into physical position to render.

	    var isHorizontal = orientation === 'horizontal';
	    var scale = size / contentSize;
	    var faceSize = size * scale;

	    if (faceSize < FACE_SIZE_MIN) {
	      scale = (size - FACE_SIZE_MIN) / (contentSize - size);
	      faceSize = FACE_SIZE_MIN;
	    }

	    var scrollable = true;
	    var maxPosition = contentSize - size;

	    if (position < 0) {
	      position = 0;
	    } else if (position > maxPosition) {
	      position = maxPosition;
	    }

	    var isDragging = this._mouseMoveTracker ? this._mouseMoveTracker.isDragging() : false;

	    // This function should only return flat values that can be compared quiclky
	    // by `ReactComponentWithPureRenderMixin`.
	    var state = {
	      faceSize: faceSize,
	      isDragging: isDragging,
	      isHorizontal: isHorizontal,
	      position: position,
	      scale: scale,
	      scrollable: scrollable };

	    // cache the state for later use.
	    this._stateKey = stateKey;
	    this._stateForKey = state;
	    return state;
	  },

	  _onWheelY: function _onWheelY( /*number*/deltaX, /*number*/deltaY) {
	    this._onWheel(deltaY);
	  },

	  _onWheelX: function _onWheelX( /*number*/deltaX, /*number*/deltaY) {
	    this._onWheel(deltaX);
	  },

	  _onWheel: function _onWheel( /*number*/delta) {
	    var props = this.props;

	    // The mouse may move faster then the animation frame does.
	    // Use `requestAnimationFrame` to avoid over-updating.
	    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
	  },

	  _onMouseDown: function _onMouseDown( /*object*/event) {
	    var nextState;

	    if (event.target !== ReactDOM.findDOMNode(this.refs.face)) {
	      // Both `offsetX` and `layerX` are non-standard DOM property but they are
	      // magically available for browsers somehow.
	      var nativeEvent = event.nativeEvent;
	      var position = this.state.isHorizontal ? nativeEvent.offsetX || nativeEvent.layerX : nativeEvent.offsetY || nativeEvent.layerY;

	      // MouseDown on the scroll-track directly, move the center of the
	      // scroll-face to the mouse position.
	      var props = this.props;
	      position /= this.state.scale;
	      nextState = this._calculateState(position - this.state.faceSize * 0.5 / this.state.scale, props.size, props.contentSize, props.orientation);
	    } else {
	      nextState = {};
	    }

	    nextState.focused = true;
	    this._setNextState(nextState);

	    this._mouseMoveTracker.captureMouseMoves(event);
	    // Focus the node so it may receive keyboard event.
	    ReactDOM.findDOMNode(this).focus();
	  },

	  _onMouseMove: function _onMouseMove( /*number*/deltaX, /*number*/deltaY) {
	    var props = this.props;
	    var delta = this.state.isHorizontal ? deltaX : deltaY;
	    delta /= this.state.scale;

	    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
	  },

	  _onMouseMoveEnd: function _onMouseMoveEnd() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.setState({ isDragging: false });
	  },

	  _onKeyDown: function _onKeyDown( /*object*/event) {
	    var keyCode = event.keyCode;

	    if (keyCode === Keys.TAB) {
	      // Let focus move off the scrollbar.
	      return;
	    }

	    var distance = KEYBOARD_SCROLL_AMOUNT;
	    var direction = 0;

	    if (this.state.isHorizontal) {
	      switch (keyCode) {
	        case Keys.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case Keys.LEFT:
	          direction = -1;
	          break;

	        case Keys.RIGHT:
	          direction = 1;
	          break;

	        default:
	          return;
	      }
	    }

	    if (!this.state.isHorizontal) {
	      switch (keyCode) {
	        case Keys.SPACE:
	          if (event.shiftKey) {
	            direction = -1;
	          } else {
	            direction = 1;
	          }
	          break;

	        case Keys.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case Keys.UP:
	          direction = -1;
	          break;

	        case Keys.DOWN:
	          direction = 1;
	          break;

	        case Keys.PAGE_UP:
	          direction = -1;
	          distance = this.props.size;
	          break;

	        case Keys.PAGE_DOWN:
	          direction = 1;
	          distance = this.props.size;
	          break;

	        default:
	          return;
	      }
	    }

	    event.preventDefault();

	    var props = this.props;
	    this._setNextState(this._calculateState(this.state.position + distance * direction, props.size, props.contentSize, props.orientation));
	  },

	  _onFocus: function _onFocus() {
	    this.setState({
	      focused: true });
	  },

	  _onBlur: function _onBlur() {
	    this.setState({
	      focused: false });
	  },

	  _blur: function _blur() {
	    if (this.isMounted()) {
	      try {
	        this._onBlur();
	        ReactDOM.findDOMNode(this).blur();
	      } catch (oops) {}
	    }
	  },

	  _setNextState: function _setNextState( /*object*/nextState, /*?object*/props) {
	    props = props || this.props;
	    var controlledPosition = props.position;
	    var willScroll = this.state.position !== nextState.position;
	    if (controlledPosition === undefined) {
	      var callback = willScroll ? this._didScroll : undefined;
	      this.setState(nextState, callback);
	    } else if (controlledPosition === nextState.position) {
	      this.setState(nextState);
	    } else {
	      // Scrolling is controlled. Don't update the state and let the owner
	      // to update the scrollbar instead.
	      if (nextState.position !== undefined && nextState.position !== this.state.position) {
	        this.props.onScroll(nextState.position);
	      }
	      return;
	    }

	    if (willScroll && _lastScrolledScrollbar !== this) {
	      _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
	      _lastScrolledScrollbar = this;
	    }
	  },

	  _didScroll: function _didScroll() {
	    this.props.onScroll(this.state.position);
	  } });

	Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
	Scrollbar.SIZE = parseInt(cssVar('scrollbar-size'), 10);

	module.exports = Scrollbar;

	// pass

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This class listens to events on the document and then updates a react
	 * component through callbacks.
	 * Please note that captureMouseMove must be called in
	 * order to initialize listeners on mousemove and mouseup.
	 * releaseMouseMove must be called to remove them. It is important to
	 * call releaseMouseMoves since mousemove is expensive to listen to.
	 *
	 * @providesModule DOMMouseMoveTracker
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var EventListener = __webpack_require__(19);

	var cancelAnimationFramePolyfill = __webpack_require__(20);
	var requestAnimationFramePolyfill = __webpack_require__(15);

	var DOMMouseMoveTracker = (function () {
	  /**
	   * onMove is the callback that will be called on every mouse move.
	   * onMoveEnd is called on mouse up when movement has ended.
	   */

	  function DOMMouseMoveTracker(
	  /*function*/onMove,
	  /*function*/onMoveEnd,
	  /*DOMElement*/domNode) {
	    _classCallCheck(this, DOMMouseMoveTracker);

	    this._isDragging = false;
	    this._animationFrameID = null;
	    this._domNode = domNode;
	    this._onMove = onMove;
	    this._onMoveEnd = onMoveEnd;
	    this._onMouseMove = this._onMouseMove.bind(this);
	    this._onMouseUp = this._onMouseUp.bind(this);
	    this._didMouseMove = this._didMouseMove.bind(this);
	  }

	  _createClass(DOMMouseMoveTracker, [{
	    key: 'captureMouseMoves',

	    /**
	     * This is to set up the listeners for listening to mouse move
	     * and mouse up signaling the movement has ended. Please note that these
	     * listeners are added at the document.body level. It takes in an event
	     * in order to grab inital state.
	     */
	    value: function captureMouseMoves( /*object*/event) {
	      if (!this._eventMoveToken && !this._eventUpToken) {
	        this._eventMoveToken = EventListener.listen(this._domNode, 'mousemove', this._onMouseMove);
	        this._eventUpToken = EventListener.listen(this._domNode, 'mouseup', this._onMouseUp);
	      }

	      if (!this._isDragging) {
	        this._deltaX = 0;
	        this._deltaY = 0;
	        this._isDragging = true;
	        this._x = event.clientX;
	        this._y = event.clientY;
	      }
	      event.preventDefault();
	    }
	  }, {
	    key: 'releaseMouseMoves',

	    /**
	     * These releases all of the listeners on document.body.
	     */
	    value: function releaseMouseMoves() {
	      if (this._eventMoveToken && this._eventUpToken) {
	        this._eventMoveToken.remove();
	        this._eventMoveToken = null;
	        this._eventUpToken.remove();
	        this._eventUpToken = null;
	      }

	      if (this._animationFrameID !== null) {
	        cancelAnimationFramePolyfill(this._animationFrameID);
	        this._animationFrameID = null;
	      }

	      if (this._isDragging) {
	        this._isDragging = false;
	        this._x = null;
	        this._y = null;
	      }
	    }
	  }, {
	    key: 'isDragging',

	    /**
	     * Returns whether or not if the mouse movement is being tracked.
	     */
	    value: function isDragging() /*boolean*/{
	      return this._isDragging;
	    }
	  }, {
	    key: '_onMouseMove',

	    /**
	     * Calls onMove passed into constructor and updates internal state.
	     */
	    value: function _onMouseMove( /*object*/event) {
	      var x = event.clientX;
	      var y = event.clientY;

	      this._deltaX += x - this._x;
	      this._deltaY += y - this._y;

	      if (this._animationFrameID === null) {
	        // The mouse may move faster then the animation frame does.
	        // Use `requestAnimationFramePolyfill` to avoid over-updating.
	        this._animationFrameID = requestAnimationFramePolyfill(this._didMouseMove);
	      }

	      this._x = x;
	      this._y = y;
	      event.preventDefault();
	    }
	  }, {
	    key: '_didMouseMove',
	    value: function _didMouseMove() {
	      this._animationFrameID = null;
	      this._onMove(this._deltaX, this._deltaY);
	      this._deltaX = 0;
	      this._deltaY = 0;
	    }
	  }, {
	    key: '_onMouseUp',

	    /**
	     * Calls onMoveEnd passed into constructor and updates internal state.
	     */
	    value: function _onMouseUp() {
	      if (this._animationFrameID) {
	        this._didMouseMove();
	      }
	      this._onMoveEnd();
	    }
	  }]);

	  return DOMMouseMoveTracker;
	})();

	module.exports = DOMMouseMoveTracker;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventListener
	 * @typechecks
	 */

	'use strict';

	var emptyFunction = __webpack_require__(10);

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function capture(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    } else {
	      if (false) {
	        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
	      }
	      return {
	        remove: emptyFunction
	      };
	    }
	  },

	  registerDefault: function registerDefault() {}
	};

	module.exports = EventListener;

/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cancelAnimationFramePolyfill
	 */

	/**
	 * Here is the native and polyfill version of cancelAnimationFrame.
	 * Please don't use it directly and use cancelAnimationFrame module instead.
	 */
	"use strict";

	var cancelAnimationFrame = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || global.oCancelAnimationFrame || global.msCancelAnimationFrame || global.clearTimeout;

	module.exports = cancelAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Keys
	 */

	"use strict";

	module.exports = {
	  BACKSPACE: 8,
	  TAB: 9,
	  RETURN: 13,
	  ALT: 18,
	  ESC: 27,
	  SPACE: 32,
	  PAGE_UP: 33,
	  PAGE_DOWN: 34,
	  END: 35,
	  HOME: 36,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40,
	  DELETE: 46,
	  COMMA: 188,
	  PERIOD: 190,
	  A: 65,
	  Z: 90,
	  ZERO: 48,
	  NUMPAD_0: 96,
	  NUMPAD_9: 105
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOM
	 */

	'use strict';

	module.exports = __webpack_require__(23);

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cssVar
	 * @typechecks
	 */

	'use strict';

	var CSS_VARS = {
	  'scrollbar-face-active-color': '#7d7d7d',
	  'scrollbar-face-color': '#c2c2c2',
	  'scrollbar-face-margin': '4px',
	  'scrollbar-face-radius': '6px',
	  'scrollbar-size': '15px',
	  'scrollbar-size-large': '17px',
	  'scrollbar-track-color': 'rgba(255, 255, 255, 0.8)',
	  'fbui-white': '#fff',
	  'fbui-desktop-background-light': '#f6f7f8' };

	/**
	 * @param {string} name
	 */
	function cssVar(name) {
	  if (CSS_VARS.hasOwnProperty(name)) {
	    return CSS_VARS[name];
	  }

	  throw new Error('cssVar' + '("' + name + '"): Unexpected class transformation.');
	}

	cssVar.CSS_VARS = CSS_VARS;

	module.exports = cssVar;

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	'use strict';

	var slashReplaceRegex = /\//g;
	var cache = {};

	function getClassName(className) {
	  if (cache[className]) {
	    return cache[className];
	  }

	  cache[className] = className.replace(slashReplaceRegex, '_');
	  return cache[className];
	}

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  var classNamesArray;
	  if (typeof classNames == 'object') {
	    classNamesArray = Object.keys(classNames).filter(function (className) {
	      return classNames[className];
	    });
	  } else {
	    classNamesArray = Array.prototype.slice.call(arguments);
	  }

	  return classNamesArray.map(getClassName).join(' ');
	}

	module.exports = cx;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule translateDOMPositionXY
	 * @typechecks
	 */

	'use strict';

	var BrowserSupportCore = __webpack_require__(27);

	var getVendorPrefixedName = __webpack_require__(28);

	var TRANSFORM = getVendorPrefixedName('transform');
	var BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

	var translateDOMPositionXY = (function () {
	  if (BrowserSupportCore.hasCSSTransforms()) {
	    var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
	    var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
	    // It appears that Safari messes up the composition order
	    // of GPU-accelerated layers
	    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
	    // Use 2D translation instead.
	    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
	      return function ( /*object*/style, /*number*/x, /*number*/y) {
	        style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
	        style[BACKFACE_VISIBILITY] = 'hidden';
	      };
	    } else {
	      return function ( /*object*/style, /*number*/x, /*number*/y) {
	        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
	      };
	    }
	  } else {
	    return function ( /*object*/style, /*number*/x, /*number*/y) {
	      style.left = x + 'px';
	      style.top = y + 'px';
	    };
	  }
	})();

	module.exports = translateDOMPositionXY;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule BrowserSupportCore
	 */

	'use strict';

	var getVendorPrefixedName = __webpack_require__(28);

	var BrowserSupportCore = {
	  /**
	   * @return {bool} True if browser supports css animations.
	   */
	  hasCSSAnimations: function hasCSSAnimations() {
	    return !!getVendorPrefixedName('animationName');
	  },

	  /**
	   * @return {bool} True if browser supports css transforms.
	   */
	  hasCSSTransforms: function hasCSSTransforms() {
	    return !!getVendorPrefixedName('transform');
	  },

	  /**
	   * @return {bool} True if browser supports css 3d transforms.
	   */
	  hasCSS3DTransforms: function hasCSS3DTransforms() {
	    return !!getVendorPrefixedName('perspective');
	  },

	  /**
	   * @return {bool} True if browser supports css transitions.
	   */
	  hasCSSTransitions: function hasCSSTransitions() {
	    return !!getVendorPrefixedName('transition');
	  } };

	module.exports = BrowserSupportCore;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getVendorPrefixedName
	 * @typechecks
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(14);

	var camelize = __webpack_require__(29);
	var invariant = __webpack_require__(30);

	var memoized = {};
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
	var testStyle = ExecutionEnvironment.canUseDOM ? document.createElement('div').style : {};

	function getWithPrefix(name) {
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixedName = prefixes[i] + name;
	    if (prefixedName in testStyle) {
	      return prefixedName;
	    }
	  }
	  return null;
	}

	/**
	 * @param {string} property Name of a css property to check for.
	 * @return {?string} property name supported in the browser, or null if not
	 * supported.
	 */
	function getVendorPrefixedName(property) {
	  var name = camelize(property);
	  if (memoized[name] === undefined) {
	    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	    if (prefixRegex.test(capitalizedName)) {
	      invariant(false, 'getVendorPrefixedName must only be called with unprefixed' + 'CSS property names. It was called with %s', property);
	    }
	    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
	  }
	  return memoized[name];
	}

	module.exports = getVendorPrefixedName;

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	"use strict";

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableBufferedRows.react
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(6);
	var FixedDataTableRowBuffer = __webpack_require__(32);
	var FixedDataTableRow = __webpack_require__(36);

	var cx = __webpack_require__(25);
	var emptyFunction = __webpack_require__(10);
	var joinClasses = __webpack_require__(44);
	var translateDOMPositionXY = __webpack_require__(26);

	var PropTypes = React.PropTypes;

	var FixedDataTableBufferedRows = React.createClass({
	  displayName: 'FixedDataTableBufferedRows',

	  propTypes: {
	    isScrolling: PropTypes.bool,
	    defaultRowHeight: PropTypes.number.isRequired,
	    firstRowIndex: PropTypes.number.isRequired,
	    firstRowOffset: PropTypes.number.isRequired,
	    fixedColumns: PropTypes.array.isRequired,
	    height: PropTypes.number.isRequired,
	    offsetTop: PropTypes.number.isRequired,
	    onRowClick: PropTypes.func,
	    onRowDoubleClick: PropTypes.func,
	    onRowMouseDown: PropTypes.func,
	    onRowMouseEnter: PropTypes.func,
	    onRowMouseLeave: PropTypes.func,
	    rowClassNameGetter: PropTypes.func,
	    rowsCount: PropTypes.number.isRequired,
	    rowHeightGetter: PropTypes.func,
	    rowPositionGetter: PropTypes.func.isRequired,
	    scrollLeft: PropTypes.number.isRequired,
	    scrollableColumns: PropTypes.array.isRequired,
	    showLastRowBorder: PropTypes.bool,
	    width: PropTypes.number.isRequired },

	  getInitialState: function getInitialState() /*object*/{
	    this._rowBuffer = new FixedDataTableRowBuffer(this.props.rowsCount, this.props.defaultRowHeight, this.props.height, this._getRowHeight);
	    return {
	      rowsToRender: this._rowBuffer.getRows(this.props.firstRowIndex, this.props.firstRowOffset) };
	  },

	  componentWillMount: function componentWillMount() {
	    this._staticRowArray = [];
	  },

	  componentDidMount: function componentDidMount() {
	    setTimeout(this._updateBuffer, 1000);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    if (nextProps.rowsCount !== this.props.rowsCount || nextProps.defaultRowHeight !== this.props.defaultRowHeight || nextProps.height !== this.props.height) {
	      this._rowBuffer = new FixedDataTableRowBuffer(nextProps.rowsCount, nextProps.defaultRowHeight, nextProps.height, this._getRowHeight);
	    }
	    if (this.props.isScrolling && !nextProps.isScrolling) {
	      this._updateBuffer();
	    } else {
	      this.setState({
	        rowsToRender: this._rowBuffer.getRows(nextProps.firstRowIndex, nextProps.firstRowOffset) });
	    }
	  },

	  _updateBuffer: function _updateBuffer() {
	    if (this.isMounted()) {
	      this.setState({
	        rowsToRender: this._rowBuffer.getRowsWithUpdatedBuffer() });
	    }
	  },

	  shouldComponentUpdate: function shouldComponentUpdate() /*boolean*/{
	    // Don't add PureRenderMixin to this component please.
	    return true;
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._staticRowArray.length = 0;
	  },

	  render: function render() /*object*/{
	    var props = this.props;
	    var rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
	    var rowPositionGetter = props.rowPositionGetter;

	    var rowsToRender = this.state.rowsToRender;
	    this._staticRowArray.length = rowsToRender.length;

	    for (var i = 0; i < rowsToRender.length; ++i) {
	      var rowIndex = rowsToRender[i];
	      var currentRowHeight = this._getRowHeight(rowIndex);
	      var rowOffsetTop = rowPositionGetter(rowIndex);

	      var hasBottomBorder = rowIndex === props.rowsCount - 1 && props.showLastRowBorder;

	      this._staticRowArray[i] = React.createElement(FixedDataTableRow, {
	        key: i,
	        isScrolling: props.isScrolling,
	        index: rowIndex,
	        width: props.width,
	        height: currentRowHeight,
	        scrollLeft: Math.round(props.scrollLeft),
	        offsetTop: Math.round(rowOffsetTop),
	        fixedColumns: props.fixedColumns,
	        scrollableColumns: props.scrollableColumns,
	        onClick: props.onRowClick,
	        onDoubleClick: props.onRowDoubleClick,
	        onMouseDown: props.onRowMouseDown,
	        onMouseEnter: props.onRowMouseEnter,
	        onMouseLeave: props.onRowMouseLeave,
	        className: joinClasses(rowClassNameGetter(rowIndex), cx('public/fixedDataTable/bodyRow'), cx({
	          'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
	          'public/fixedDataTable/hasBottomBorder': hasBottomBorder }))
	      });
	    }

	    var firstRowPosition = props.rowPositionGetter(props.firstRowIndex);

	    var style = {
	      position: 'absolute',
	      pointerEvents: props.isScrolling ? 'none' : 'auto' };

	    translateDOMPositionXY(style, 0, props.firstRowOffset - firstRowPosition + props.offsetTop);

	    return React.createElement(
	      'div',
	      { style: style },
	      this._staticRowArray
	    );
	  },

	  _getRowHeight: function _getRowHeight( /*number*/index) /*number*/{
	    return this.props.rowHeightGetter ? this.props.rowHeightGetter(index) : this.props.defaultRowHeight;
	  } });

	module.exports = FixedDataTableBufferedRows;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRowBuffer
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var IntegerBufferSet = __webpack_require__(33);

	var clamp = __webpack_require__(35);
	var invariant = __webpack_require__(30);
	var MIN_BUFFER_ROWS = 3;
	var MAX_BUFFER_ROWS = 6;

	// FixedDataTableRowBuffer is a helper class that executes row buffering
	// logic for FixedDataTable. It figures out which rows should be rendered
	// and in which positions.

	var FixedDataTableRowBuffer = (function () {
	  function FixedDataTableRowBuffer(
	  /*number*/rowsCount,
	  /*number*/defaultRowHeight,
	  /*number*/viewportHeight,
	  /*?function*/rowHeightGetter) {
	    _classCallCheck(this, FixedDataTableRowBuffer);

	    invariant(defaultRowHeight !== 0, 'defaultRowHeight musn\'t be equal 0 in FixedDataTableRowBuffer');

	    this._bufferSet = new IntegerBufferSet();
	    this._defaultRowHeight = defaultRowHeight;
	    this._viewportRowsBegin = 0;
	    this._viewportRowsEnd = 0;
	    this._maxVisibleRowCount = Math.ceil(viewportHeight / defaultRowHeight) + 1;
	    this._bufferRowsCount = clamp(Math.floor(this._maxVisibleRowCount / 2), MIN_BUFFER_ROWS, MAX_BUFFER_ROWS);
	    this._rowsCount = rowsCount;
	    this._rowHeightGetter = rowHeightGetter;
	    this._rows = [];
	    this._viewportHeight = viewportHeight;

	    this.getRows = this.getRows.bind(this);
	    this.getRowsWithUpdatedBuffer = this.getRowsWithUpdatedBuffer.bind(this);
	  }

	  _createClass(FixedDataTableRowBuffer, [{
	    key: 'getRowsWithUpdatedBuffer',
	    value: function getRowsWithUpdatedBuffer() /*array*/{
	      var remainingBufferRows = 2 * this._bufferRowsCount;
	      var bufferRowIndex = Math.max(this._viewportRowsBegin - this._bufferRowsCount, 0);
	      while (bufferRowIndex < this._viewportRowsBegin) {
	        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
	        bufferRowIndex++;
	        remainingBufferRows--;
	      }
	      bufferRowIndex = this._viewportRowsEnd;
	      while (bufferRowIndex < this._rowsCount && remainingBufferRows > 0) {
	        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
	        bufferRowIndex++;
	        remainingBufferRows--;
	      }
	      return this._rows;
	    }
	  }, {
	    key: 'getRows',
	    value: function getRows(
	    /*number*/firstRowIndex,
	    /*number*/firstRowOffset) /*array*/{
	      var top = firstRowOffset;
	      var totalHeight = top;
	      var rowIndex = firstRowIndex;
	      var endIndex = Math.min(firstRowIndex + this._maxVisibleRowCount, this._rowsCount);

	      this._viewportRowsBegin = firstRowIndex;
	      while (rowIndex < endIndex || totalHeight < this._viewportHeight && rowIndex < this._rowsCount) {
	        this._addRowToBuffer(rowIndex, firstRowIndex, endIndex - 1);
	        totalHeight += this._rowHeightGetter(rowIndex);
	        ++rowIndex;
	        // Store index after the last viewport row as end, to be able to
	        // distinguish when there are no rows rendered in viewport
	        this._viewportRowsEnd = rowIndex;
	      }

	      return this._rows;
	    }
	  }, {
	    key: '_addRowToBuffer',
	    value: function _addRowToBuffer(
	    /*number*/rowIndex,
	    /*number*/firstViewportRowIndex,
	    /*number*/lastViewportRowIndex) {
	      var rowPosition = this._bufferSet.getValuePosition(rowIndex);
	      var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;
	      var allowedRowsCount = viewportRowsCount + this._bufferRowsCount * 2;
	      if (rowPosition === null && this._bufferSet.getSize() >= allowedRowsCount) {
	        rowPosition = this._bufferSet.replaceFurthestValuePosition(firstViewportRowIndex, lastViewportRowIndex, rowIndex);
	      }
	      if (rowPosition === null) {
	        // We can't reuse any of existing positions for this row. We have to
	        // create new position
	        rowPosition = this._bufferSet.getNewPositionForValue(rowIndex);
	        this._rows[rowPosition] = rowIndex;
	      } else {
	        // This row already is in the table with rowPosition position or it
	        // can replace row that is in that position
	        this._rows[rowPosition] = rowIndex;
	      }
	    }
	  }]);

	  return FixedDataTableRowBuffer;
	})();

	module.exports = FixedDataTableRowBuffer;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule IntegerBufferSet
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Heap = __webpack_require__(34);

	var invariant = __webpack_require__(30);

	// Data structure that allows to store values and assign positions to them
	// in a way to minimize changing positions of stored values when new ones are
	// added or when some values are replaced. Stored elements are alwasy assigned
	// a consecutive set of positoins startin from 0 up to count of elements less 1
	// Following actions can be executed
	// * get position assigned to given value (null if value is not stored)
	// * create new entry for new value and get assigned position back
	// * replace value that is furthest from specified value range with new value
	//   and get it's position back
	// All operations take amortized log(n) time where n is number of elements in
	// the set.

	var IntegerBufferSet = (function () {
	  function IntegerBufferSet() {
	    _classCallCheck(this, IntegerBufferSet);

	    this._valueToPositionMap = {};
	    this._size = 0;
	    this._smallValues = new Heap([], // Initial data in the heap
	    this._smallerComparator);
	    this._largeValues = new Heap([], // Initial data in the heap
	    this._greaterComparator);

	    this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
	    this.getValuePosition = this.getValuePosition.bind(this);
	    this.getSize = this.getSize.bind(this);
	    this.replaceFurthestValuePosition = this.replaceFurthestValuePosition.bind(this);
	  }

	  _createClass(IntegerBufferSet, [{
	    key: 'getSize',
	    value: function getSize() /*number*/{
	      return this._size;
	    }
	  }, {
	    key: 'getValuePosition',
	    value: function getValuePosition( /*number*/value) /*?number*/{
	      if (this._valueToPositionMap[value] === undefined) {
	        return null;
	      }
	      return this._valueToPositionMap[value];
	    }
	  }, {
	    key: 'getNewPositionForValue',
	    value: function getNewPositionForValue( /*number*/value) /*number*/{
	      invariant(this._valueToPositionMap[value] === undefined, 'Shouldn\'t try to find new position for value already stored in BufferSet');
	      var newPosition = this._size;
	      this._size++;
	      this._pushToHeaps(newPosition, value);
	      this._valueToPositionMap[value] = newPosition;
	      return newPosition;
	    }
	  }, {
	    key: 'replaceFurthestValuePosition',
	    value: function replaceFurthestValuePosition(
	    /*number*/lowValue,
	    /*number*/highValue,
	    /*number*/newValue) /*?number*/{
	      invariant(this._valueToPositionMap[newValue] === undefined, 'Shouldn\'t try to replace values with value already stored value in ' + 'BufferSet');

	      this._cleanHeaps();
	      if (this._smallValues.empty() || this._largeValues.empty()) {
	        // Threre are currently no values stored. We will have to create new
	        // position for this value.
	        return null;
	      }

	      var minValue = this._smallValues.peek().value;
	      var maxValue = this._largeValues.peek().value;
	      if (minValue >= lowValue && maxValue <= highValue) {
	        // All values currently stored are necessary, we can't reuse any of them.
	        return null;
	      }

	      var valueToReplace;
	      if (lowValue - minValue > maxValue - highValue) {
	        // minValue is further from provided range. We will reuse it's position.
	        valueToReplace = minValue;
	        this._smallValues.pop();
	      } else {
	        valueToReplace = maxValue;
	        this._largeValues.pop();
	      }
	      var position = this._valueToPositionMap[valueToReplace];
	      delete this._valueToPositionMap[valueToReplace];
	      this._valueToPositionMap[newValue] = position;
	      this._pushToHeaps(position, newValue);

	      return position;
	    }
	  }, {
	    key: '_pushToHeaps',
	    value: function _pushToHeaps( /*number*/position, /*number*/value) {
	      var element = {
	        position: position,
	        value: value };
	      // We can reuse the same object in both heaps, because we don't mutate them
	      this._smallValues.push(element);
	      this._largeValues.push(element);
	    }
	  }, {
	    key: '_cleanHeaps',
	    value: function _cleanHeaps() {
	      // We not usually only remove object from one heap while moving value.
	      // Here we make sure that there is no stale data on top of heaps.
	      this._cleanHeap(this._smallValues);
	      this._cleanHeap(this._largeValues);
	      var minHeapSize = Math.min(this._smallValues.size(), this._largeValues.size());
	      var maxHeapSize = Math.max(this._smallValues.size(), this._largeValues.size());
	      if (maxHeapSize > 10 * minHeapSize) {
	        // There are many old values in one of heaps. We nned to get rid of them
	        // to not use too avoid memory leaks
	        this._recreateHeaps();
	      }
	    }
	  }, {
	    key: '_recreateHeaps',
	    value: function _recreateHeaps() {
	      var sourceHeap = this._smallValues.size() < this._largeValues.size() ? this._smallValues : this._largeValues;
	      var newSmallValues = new Heap([], // Initial data in the heap
	      this._smallerComparator);
	      var newLargeValues = new Heap([], // Initial datat in the heap
	      this._greaterComparator);
	      while (!sourceHeap.empty()) {
	        var element = sourceHeap.pop();
	        // Push all stil valid elements to new heaps
	        if (this._valueToPositionMap[element.value] !== undefined) {
	          newSmallValues.push(element);
	          newLargeValues.push(element);
	        }
	      }
	      this._smallValues = newSmallValues;
	      this._largeValues = newLargeValues;
	    }
	  }, {
	    key: '_cleanHeap',
	    value: function _cleanHeap( /*object*/heap) {
	      while (!heap.empty() && this._valueToPositionMap[heap.peek().value] === undefined) {
	        heap.pop();
	      }
	    }
	  }, {
	    key: '_smallerComparator',
	    value: function _smallerComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
	      return lhs.value < rhs.value;
	    }
	  }, {
	    key: '_greaterComparator',
	    value: function _greaterComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
	      return lhs.value > rhs.value;
	    }
	  }]);

	  return IntegerBufferSet;
	})();

	module.exports = IntegerBufferSet;

/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Heap
	 * @typechecks
	 * @preventMunge
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	/*
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	function defaultComparator(a, b) {
	  return a < b;
	}

	var Heap = (function () {
	  function Heap(items, comparator) {
	    _classCallCheck(this, Heap);

	    this._items = items || [];
	    this._size = this._items.length;
	    this._comparator = comparator || defaultComparator;
	    this._heapify();
	  }

	  _createClass(Heap, [{
	    key: 'empty',

	    /*
	     * @return {boolean}
	     */
	    value: function empty() {
	      return this._size === 0;
	    }
	  }, {
	    key: 'pop',

	    /*
	     * @return {*}
	     */
	    value: function pop() {
	      if (this._size === 0) {
	        return;
	      }

	      var elt = this._items[0];

	      var lastElt = this._items.pop();
	      this._size--;

	      if (this._size > 0) {
	        this._items[0] = lastElt;
	        this._sinkDown(0);
	      }

	      return elt;
	    }
	  }, {
	    key: 'push',

	    /*
	     * @param {*} item
	     */
	    value: function push(item) {
	      this._items[this._size++] = item;
	      this._bubbleUp(this._size - 1);
	    }
	  }, {
	    key: 'size',

	    /*
	     * @return {number}
	     */
	    value: function size() {
	      return this._size;
	    }
	  }, {
	    key: 'peek',

	    /*
	     * @return {*}
	     */
	    value: function peek() {
	      if (this._size === 0) {
	        return;
	      }

	      return this._items[0];
	    }
	  }, {
	    key: '_heapify',
	    value: function _heapify() {
	      for (var index = Math.floor((this._size + 1) / 2); index >= 0; index--) {
	        this._sinkDown(index);
	      }
	    }
	  }, {
	    key: '_bubbleUp',

	    /*
	     * @parent {number} index
	     */
	    value: function _bubbleUp(index) {
	      var elt = this._items[index];
	      while (index > 0) {
	        var parentIndex = Math.floor((index + 1) / 2) - 1;
	        var parentElt = this._items[parentIndex];

	        // if parentElt < elt, stop
	        if (this._comparator(parentElt, elt)) {
	          return;
	        }

	        // swap
	        this._items[parentIndex] = elt;
	        this._items[index] = parentElt;
	        index = parentIndex;
	      }
	    }
	  }, {
	    key: '_sinkDown',

	    /*
	     * @parent {number} index
	     */
	    value: function _sinkDown(index) {
	      var elt = this._items[index];

	      while (true) {
	        var leftChildIndex = 2 * (index + 1) - 1;
	        var rightChildIndex = 2 * (index + 1);
	        var swapIndex = -1;

	        if (leftChildIndex < this._size) {
	          var leftChild = this._items[leftChildIndex];
	          if (this._comparator(leftChild, elt)) {
	            swapIndex = leftChildIndex;
	          }
	        }

	        if (rightChildIndex < this._size) {
	          var rightChild = this._items[rightChildIndex];
	          if (this._comparator(rightChild, elt)) {
	            if (swapIndex === -1 || this._comparator(rightChild, this._items[swapIndex])) {
	              swapIndex = rightChildIndex;
	            }
	          }
	        }

	        // if we don't have a swap, stop
	        if (swapIndex === -1) {
	          return;
	        }

	        this._items[index] = this._items[swapIndex];
	        this._items[swapIndex] = elt;
	        index = swapIndex;
	      }
	    }
	  }]);

	  return Heap;
	})();

	module.exports = Heap;

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule clamp
	 * @typechecks
	 */

	/**
	 * Clamps (or clips or confines) the value to be between min and max.
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 */
	"use strict";

	function clamp(value, min, max) {
	  if (value < min) {
	    return min;
	  }
	  if (value > max) {
	    return max;
	  }
	  return value;
	}

	module.exports = clamp;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRow.react
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(6);
	var FixedDataTableCellGroup = __webpack_require__(37);

	var cx = __webpack_require__(25);
	var joinClasses = __webpack_require__(44);
	var translateDOMPositionXY = __webpack_require__(26);

	var PropTypes = React.PropTypes;

	/**
	 * Component that renders the row for <FixedDataTable />.
	 * This component should not be used directly by developer. Instead,
	 * only <FixedDataTable /> should use the component internally.
	 */
	var FixedDataTableRowImpl = React.createClass({
	  displayName: 'FixedDataTableRowImpl',

	  propTypes: {

	    isScrolling: PropTypes.bool,

	    /**
	     * Array of <FixedDataTableColumn /> for the fixed columns.
	     */
	    fixedColumns: PropTypes.array.isRequired,

	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * The row index.
	     */
	    index: PropTypes.number.isRequired,

	    /**
	     * Array of <FixedDataTableColumn /> for the scrollable columns.
	     */
	    scrollableColumns: PropTypes.array.isRequired,

	    /**
	     * The distance between the left edge of the table and the leftmost portion
	     * of the row currently visible in the table.
	     */
	    scrollLeft: PropTypes.number.isRequired,

	    /**
	     * Width of the row.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * Fire when a row is clicked.
	     */
	    onClick: PropTypes.func,

	    /**
	     * Fire when a row is double clicked.
	     */
	    onDoubleClick: PropTypes.func,

	    /**
	     * Callback for when resizer knob (in FixedDataTableCell) is clicked
	     * to initialize resizing. Please note this is only on the cells
	     * in the header.
	     * @param number combinedWidth
	     * @param number leftOffset
	     * @param number cellWidth
	     * @param number|string columnKey
	     * @param object event
	     */
	    onColumnResize: PropTypes.func },

	  render: function render() /*object*/{
	    var style = {
	      width: this.props.width,
	      height: this.props.height };

	    var className = cx({
	      'fixedDataTableRowLayout/main': true,
	      'public/fixedDataTableRow/main': true,
	      'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
	      'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
	      'public/fixedDataTableRow/even': this.props.index % 2 === 0 });

	    var fixedColumnsWidth = this._getColumnsWidth(this.props.fixedColumns);
	    var fixedColumns = React.createElement(FixedDataTableCellGroup, {
	      key: 'fixed_cells',
	      isScrolling: this.props.isScrolling,
	      height: this.props.height,
	      left: 0,
	      width: fixedColumnsWidth,
	      zIndex: 2,
	      columns: this.props.fixedColumns,
	      onColumnResize: this.props.onColumnResize,
	      rowHeight: this.props.height,
	      rowIndex: this.props.index
	    });
	    var columnsShadow = this._renderColumnsShadow(fixedColumnsWidth);
	    var scrollableColumns = React.createElement(FixedDataTableCellGroup, {
	      key: 'scrollable_cells',
	      isScrolling: this.props.isScrolling,
	      height: this.props.height,
	      left: this.props.scrollLeft,
	      offsetLeft: fixedColumnsWidth,
	      width: this.props.width - fixedColumnsWidth,
	      zIndex: 0,
	      columns: this.props.scrollableColumns,
	      onColumnResize: this.props.onColumnResize,
	      rowHeight: this.props.height,
	      rowIndex: this.props.index
	    });

	    return React.createElement(
	      'div',
	      {
	        className: joinClasses(className, this.props.className),
	        onClick: this.props.onClick ? this._onClick : null,
	        onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
	        onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
	        onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null,
	        onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
	        style: style },
	      React.createElement(
	        'div',
	        { className: cx('fixedDataTableRowLayout/body') },
	        fixedColumns,
	        scrollableColumns,
	        columnsShadow
	      )
	    );
	  },

	  _getColumnsWidth: function _getColumnsWidth( /*array*/columns) /*number*/{
	    var width = 0;
	    for (var i = 0; i < columns.length; ++i) {
	      width += columns[i].props.width;
	    }
	    return width;
	  },

	  _renderColumnsShadow: function _renderColumnsShadow( /*number*/left) /*?object*/{
	    if (left > 0) {
	      var className = cx({
	        'fixedDataTableRowLayout/fixedColumnsDivider': true,
	        'fixedDataTableRowLayout/columnsShadow': this.props.scrollLeft > 0,
	        'public/fixedDataTableRow/fixedColumnsDivider': true,
	        'public/fixedDataTableRow/columnsShadow': this.props.scrollLeft > 0 });
	      var style = {
	        left: left,
	        height: this.props.height
	      };
	      return React.createElement('div', { className: className, style: style });
	    }
	  },

	  _onClick: function _onClick( /*object*/event) {
	    this.props.onClick(event, this.props.index);
	  },

	  _onDoubleClick: function _onDoubleClick( /*object*/event) {
	    this.props.onDoubleClick(event, this.props.index);
	  },

	  _onMouseDown: function _onMouseDown( /*object*/event) {
	    this.props.onMouseDown(event, this.props.index);
	  },

	  _onMouseEnter: function _onMouseEnter( /*object*/event) {
	    this.props.onMouseEnter(event, this.props.index);
	  },

	  _onMouseLeave: function _onMouseLeave( /*object*/event) {
	    this.props.onMouseLeave(event, this.props.index);
	  } });

	var FixedDataTableRow = React.createClass({
	  displayName: 'FixedDataTableRow',

	  propTypes: {

	    isScrolling: PropTypes.bool,

	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * Z-index on which the row will be displayed. Used e.g. for keeping
	     * header and footer in front of other rows.
	     */
	    zIndex: PropTypes.number,

	    /**
	     * The vertical position where the row should render itself
	     */
	    offsetTop: PropTypes.number.isRequired,

	    /**
	     * Width of the row.
	     */
	    width: PropTypes.number.isRequired },

	  render: function render() /*object*/{
	    var style = {
	      width: this.props.width,
	      height: this.props.height,
	      zIndex: this.props.zIndex ? this.props.zIndex : 0 };
	    translateDOMPositionXY(style, 0, this.props.offsetTop);

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        className: cx('fixedDataTableRowLayout/rowWrapper') },
	      React.createElement(FixedDataTableRowImpl, _extends({}, this.props, {
	        offsetTop: undefined,
	        zIndex: undefined
	      }))
	    );
	  } });

	module.exports = FixedDataTableRow;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellGroup.react
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var FixedDataTableHelper = __webpack_require__(38);
	var React = __webpack_require__(6);
	var FixedDataTableCell = __webpack_require__(42);

	var cx = __webpack_require__(25);
	var translateDOMPositionXY = __webpack_require__(26);

	var PropTypes = React.PropTypes;

	var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

	var FixedDataTableCellGroupImpl = React.createClass({
	  displayName: 'FixedDataTableCellGroupImpl',

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {

	    /**
	     * Array of <FixedDataTableColumn />.
	     */
	    columns: PropTypes.array.isRequired,

	    isScrolling: PropTypes.bool,

	    left: PropTypes.number,

	    onColumnResize: PropTypes.func,

	    rowHeight: PropTypes.number.isRequired,

	    rowIndex: PropTypes.number.isRequired,

	    width: PropTypes.number.isRequired,

	    zIndex: PropTypes.number.isRequired },

	  render: function render() /*object*/{
	    var props = this.props;
	    var columns = props.columns;
	    var cells = new Array(columns.length);

	    var currentPosition = 0;
	    for (var i = 0, j = columns.length; i < j; i++) {
	      var columnProps = columns[i].props;
	      if (!columnProps.allowCellsRecycling || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
	        var key = 'cell_' + i;
	        cells[i] = this._renderCell(props.rowIndex, props.rowHeight, columnProps, currentPosition, key);
	      }
	      currentPosition += columnProps.width;
	    }

	    var contentWidth = this._getColumnsWidth(columns);

	    var style = {
	      height: props.height,
	      position: 'absolute',
	      width: contentWidth,
	      zIndex: props.zIndex };
	    translateDOMPositionXY(style, -1 * DIR_SIGN * props.left, 0);

	    return React.createElement(
	      'div',
	      {
	        className: cx('fixedDataTableCellGroupLayout/cellGroup'),
	        style: style },
	      cells
	    );
	  },

	  _renderCell: function _renderCell(
	  /*number*/rowIndex,
	  /*number*/height,
	  /*object*/columnProps,
	  /*number*/left,
	  /*string*/key) /*object*/{

	    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
	    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

	    var className = columnProps.cellClassName;

	    return React.createElement(FixedDataTableCell, {
	      isScrolling: this.props.isScrolling,
	      align: columnProps.align,
	      className: className,
	      height: height,
	      key: key,
	      maxWidth: columnProps.maxWidth,
	      minWidth: columnProps.minWidth,
	      onColumnResize: onColumnResize,
	      rowIndex: rowIndex,
	      columnKey: columnProps.columnKey,
	      width: columnProps.width,
	      left: left,
	      cell: columnProps.cell
	    });
	  },

	  _getColumnsWidth: function _getColumnsWidth( /*array*/columns) /*number*/{
	    var width = 0;
	    for (var i = 0; i < columns.length; ++i) {
	      width += columns[i].props.width;
	    }
	    return width;
	  } });

	var FixedDataTableCellGroup = React.createClass({
	  displayName: 'FixedDataTableCellGroup',

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {
	    isScrolling: PropTypes.bool,
	    /**
	     * Height of the row.
	     */
	    height: PropTypes.number.isRequired,

	    offsetLeft: PropTypes.number,

	    left: PropTypes.number,
	    /**
	     * Z-index on which the row will be displayed. Used e.g. for keeping
	     * header and footer in front of other rows.
	     */
	    zIndex: PropTypes.number.isRequired },

	  shouldComponentUpdate: function shouldComponentUpdate( /*object*/nextProps) /*boolean*/{
	    return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex || this.props.left !== nextProps.left;
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      offsetLeft: 0 };
	  },

	  render: function render() /*object*/{
	    var _props = this.props;
	    var offsetLeft = _props.offsetLeft;

	    var props = _objectWithoutProperties(_props, ['offsetLeft']);

	    var style = {
	      height: props.height };

	    if (DIR_SIGN === 1) {
	      style.left = offsetLeft;
	    } else {
	      style.right = offsetLeft;
	    }

	    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        className: cx('fixedDataTableCellGroupLayout/cellGroupWrapper') },
	      React.createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
	        onColumnResize: onColumnResize
	      }))
	    );
	  },

	  _onColumnResize: function _onColumnResize(
	  /*number*/left,
	  /*number*/width,
	  /*?number*/minWidth,
	  /*?number*/maxWidth,
	  /*string|number*/columnKey,
	  /*object*/event) {
	    this.props.onColumnResize && this.props.onColumnResize(this.props.offsetLeft, left - this.props.left + width, width, minWidth, maxWidth, columnKey, event);
	  } });

	module.exports = FixedDataTableCellGroup;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableHelper
	 * @typechecks
	 */

	'use strict';

	var Locale = __webpack_require__(39);
	var React = __webpack_require__(6);
	var FixedDataTableColumnGroup = __webpack_require__(40);
	var FixedDataTableColumn = __webpack_require__(41);

	var DIR_SIGN = Locale.isRTL() ? -1 : +1;
	// A cell up to 5px outside of the visible area will still be considered visible
	var CELL_VISIBILITY_TOLERANCE = 5; // used for flyouts

	function renderToString(value) /*string*/{
	  if (value === null || value === undefined) {
	    return '';
	  } else {
	    return String(value);
	  }
	}

	/**
	 * Helper method to execute a callback against all columns given the children
	 * of a table.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column.
	 */
	function forEachColumn(children, callback) {
	  React.Children.forEach(children, function (child) {
	    if (child.type === FixedDataTableColumnGroup) {
	      forEachColumn(child.props.children, callback);
	    } else if (child.type === FixedDataTableColumn) {
	      callback(child);
	    }
	  });
	}

	/**
	 * Helper method to map columns to new columns. This takes into account column
	 * groups and will generate a new column group if its columns change.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column and should
	 *    return a result column.
	 */
	function mapColumns(children, callback) {
	  var newChildren = [];
	  React.Children.forEach(children, function (originalChild) {
	    var newChild = originalChild;

	    // The child is either a column group or a column. If it is a column group
	    // we need to iterate over its columns and then potentially generate a
	    // new column group
	    if (originalChild.type === FixedDataTableColumnGroup) {
	      var haveColumnsChanged = false;
	      var newColumns = [];

	      forEachColumn(originalChild.props.children, function (originalcolumn) {
	        var newColumn = callback(originalcolumn);
	        if (newColumn !== originalcolumn) {
	          haveColumnsChanged = true;
	        }
	        newColumns.push(newColumn);
	      });

	      // If the column groups columns have changed clone the group and supply
	      // new children
	      if (haveColumnsChanged) {
	        newChild = React.cloneElement(originalChild, {
	          children: newColumns });
	      }
	    } else if (originalChild.type === FixedDataTableColumn) {
	      newChild = callback(originalChild);
	    }

	    newChildren.push(newChild);
	  });

	  return newChildren;
	}

	var FixedDataTableHelper = {
	  DIR_SIGN: DIR_SIGN,
	  CELL_VISIBILITY_TOLERANCE: CELL_VISIBILITY_TOLERANCE,
	  renderToString: renderToString,
	  forEachColumn: forEachColumn,
	  mapColumns: mapColumns };

	module.exports = FixedDataTableHelper;

/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Locale
	 */

	"use strict";

	// Hard code this for now.
	var Locale = {
	  isRTL: function isRTL() {
	    return false;
	  },
	  getDirection: function getDirection() {
	    return "LTR";
	  }
	};

	module.exports = Locale;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumnGroup.react
	 */

	/**
	 * TRANSITION SHIM
	 * This provides an intermediate mapping from the old API to the new API.
	 *
	 * When ready, remove this file and rename the providesModule in
	 * FixedDataTableColumnNew.react
	 */

	'use strict';

	var React = __webpack_require__(6);

	var TransitionColumnGroup = React.createClass({
	  displayName: 'TransitionColumnGroup',

	  statics: {
	    __TableColumnGroup__: true },

	  render: function render() {
	    if (false) {
	      throw new Error('Component <TransitionColumnGroup /> should never render');
	    }
	    return null;
	  }
	});

	module.exports = TransitionColumnGroup;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumn.react
	 */

	/**
	 * TRANSITION SHIM
	 * This acts to provide an intermediate mapping from the old API to the new API.
	 *
	 * When ready, remove this file and rename the providesModule in
	 * FixedDataTableColumnNew.react
	 */

	'use strict';

	var React = __webpack_require__(6);

	var TransitionColumn = React.createClass({
	  displayName: 'TransitionColumn',

	  statics: {
	    __TableColumn__: true
	  },

	  render: function render() {
	    if (false) {
	      throw new Error('Component <TransitionColumn /> should never render');
	    }
	    return null;
	  }
	});

	module.exports = TransitionColumn;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCell.react
	 * @typechecks
	 */

	'use strict';

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var FixedDataTableCellDefault = __webpack_require__(43);
	var FixedDataTableHelper = __webpack_require__(38);
	var React = __webpack_require__(6);
	var cx = __webpack_require__(25);
	var joinClasses = __webpack_require__(44);

	var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

	var PropTypes = React.PropTypes;

	var DEFAULT_PROPS = {
	  align: 'left',
	  highlighted: false };

	var FixedDataTableCell = React.createClass({
	  displayName: 'FixedDataTableCell',

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {
	    isScrolling: PropTypes.bool,
	    align: PropTypes.oneOf(['left', 'center', 'right']),
	    className: PropTypes.string,
	    highlighted: PropTypes.bool,
	    width: PropTypes.number.isRequired,
	    minWidth: PropTypes.number,
	    maxWidth: PropTypes.number,
	    height: PropTypes.number.isRequired,

	    cell: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),

	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	    /**
	     * The row index that will be passed to `cellRenderer` to render.
	     */
	    rowIndex: PropTypes.number.isRequired,

	    /**
	     * Callback for when resizer knob (in FixedDataTableCell) is clicked
	     * to initialize resizing. Please note this is only on the cells
	     * in the header.
	     * @param number combinedWidth
	     * @param number left
	     * @param number width
	     * @param number minWidth
	     * @param number maxWidth
	     * @param number|string columnKey
	     * @param object event
	     */
	    onColumnResize: PropTypes.func,

	    /**
	     * The left offset in pixels of the cell.
	     */
	    left: PropTypes.number },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex;
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return DEFAULT_PROPS;
	  },

	  render: function render() /*object*/{
	    var _props = this.props;
	    var height = _props.height;
	    var width = _props.width;
	    var columnKey = _props.columnKey;

	    var props = _objectWithoutProperties(_props, ['height', 'width', 'columnKey']);

	    var style = {
	      height: height,
	      width: width };

	    if (DIR_SIGN === 1) {
	      style.left = props.left;
	    } else {
	      style.right = props.left;
	    }

	    var className = joinClasses(cx({
	      'fixedDataTableCellLayout/main': true,
	      'fixedDataTableCellLayout/lastChild': props.lastChild,
	      'fixedDataTableCellLayout/alignRight': props.align === 'right',
	      'fixedDataTableCellLayout/alignCenter': props.align === 'center',
	      'public/fixedDataTableCell/alignRight': props.align === 'right',
	      'public/fixedDataTableCell/highlighted': props.highlighted,
	      'public/fixedDataTableCell/main': true }), props.className);

	    var columnResizerComponent;
	    if (props.onColumnResize) {
	      var columnResizerStyle = {
	        height: height
	      };
	      columnResizerComponent = React.createElement(
	        'div',
	        {
	          className: cx('fixedDataTableCellLayout/columnResizerContainer'),
	          style: columnResizerStyle,
	          onMouseDown: this._onColumnResizerMouseDown },
	        React.createElement('div', {
	          className: joinClasses(cx('fixedDataTableCellLayout/columnResizerKnob'), cx('public/fixedDataTableCell/columnResizerKnob')),
	          style: columnResizerStyle
	        })
	      );
	    }

	    var cellProps = {
	      columnKey: columnKey,
	      height: height,
	      width: width
	    };

	    if (props.rowIndex >= 0) {
	      cellProps.rowIndex = props.rowIndex;
	    }

	    var content;
	    if (React.isValidElement(props.cell)) {
	      content = React.cloneElement(props.cell, cellProps);
	    } else if (typeof props.cell === 'function') {
	      content = props.cell(cellProps);
	    } else {
	      content = React.createElement(
	        FixedDataTableCellDefault,
	        cellProps,
	        props.cell
	      );
	    }

	    return React.createElement(
	      'div',
	      { className: className, style: style },
	      columnResizerComponent,
	      content
	    );
	  },

	  _onColumnResizerMouseDown: function _onColumnResizerMouseDown( /*object*/event) {
	    this.props.onColumnResize(this.props.left, this.props.width, this.props.minWidth, this.props.maxWidth, this.props.columnKey, event);
	  } });

	module.exports = FixedDataTableCell;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellDefault.react
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var React = __webpack_require__(6);

	var cx = __webpack_require__(25);
	var joinClasses = __webpack_require__(44);

	var PropTypes = React.PropTypes;

	/**
	 * Component that handles default cell layout and styling.
	 *
	 * All props unless specified below will be set onto the top level `div`
	 * rendered by the cell.
	 *
	 * Example usage via from a `Column`:
	 * ```
	 * const MyColumn = (
	 *   <Column
	 *     cell={({rowIndex, width, height}) => (
	 *       <Cell
	 *         width={width}
	 *         height={height}
	 *         className="my-class">
	 *         Cell number: <span>{rowIndex}</span>
	*        </Cell>
	 *     )}
	 *     width={100}
	 *   />
	 * );
	 * ```
	 */
	var FixedDataTableCellDefault = React.createClass({
	  displayName: 'FixedDataTableCellDefault',

	  propTypes: {

	    /**
	     * Outer height of the cell.
	     */
	    height: PropTypes.number,

	    /**
	     * Outer width of the cell.
	     */
	    width: PropTypes.number,

	    /**
	     * Optional prop that if specified on the `Column` will be passed to the
	     * cell. It can be used to uniquely identify which column is the cell is in.
	     */
	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) },

	  render: function render() {
	    var _props = this.props;
	    var height = _props.height;
	    var width = _props.width;
	    var style = _props.style;
	    var className = _props.className;
	    var children = _props.children;

	    var props = _objectWithoutProperties(_props, ['height', 'width', 'style', 'className', 'children']);

	    var innerStyle = _extends({
	      height: height,
	      width: width }, style);

	    return React.createElement(
	      'div',
	      _extends({}, props, {
	        className: joinClasses(cx('fixedDataTableCellLayout/wrap1'), cx('public/fixedDataTableCell/wrap1'), className),
	        style: innerStyle }),
	      React.createElement(
	        'div',
	        {
	          className: joinClasses(cx('fixedDataTableCellLayout/wrap2'), cx('public/fixedDataTableCell/wrap2')) },
	        React.createElement(
	          'div',
	          {
	            className: joinClasses(cx('fixedDataTableCellLayout/wrap3'), cx('public/fixedDataTableCell/wrap3')) },
	          React.createElement(
	            'div',
	            { className: cx('public/fixedDataTableCell/cellContent') },
	            children
	          )
	        )
	      )
	    );
	  } });

	module.exports = FixedDataTableCellDefault;

/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} className
	 * @return {string}
	 */
	function joinClasses(className /*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is to be used with the FixedDataTable. It is a read line
	 * that when you click on a column that is resizable appears and allows
	 * you to resize the corresponding column.
	 *
	 * @providesModule FixedDataTableColumnResizeHandle.react
	 * @typechecks
	 */

	'use strict';

	var DOMMouseMoveTracker = __webpack_require__(18);
	var Locale = __webpack_require__(39);
	var React = __webpack_require__(6);
	var ReactComponentWithPureRenderMixin = __webpack_require__(8);

	var clamp = __webpack_require__(35);
	var cx = __webpack_require__(25);

	var PropTypes = React.PropTypes;

	var FixedDataTableColumnResizeHandle = React.createClass({
	  displayName: 'FixedDataTableColumnResizeHandle',

	  mixins: [ReactComponentWithPureRenderMixin],

	  propTypes: {
	    visible: PropTypes.bool.isRequired,

	    /**
	     * This is the height of the line
	     */
	    height: PropTypes.number.isRequired,

	    /**
	     * Offset from left border of the table, please note
	     * that the line is a border on diff. So this is really the
	     * offset of the column itself.
	     */
	    leftOffset: PropTypes.number.isRequired,

	    /**
	     * Height of the clickable region of the line.
	     * This is assumed to be at the top of the line.
	     */
	    knobHeight: PropTypes.number.isRequired,

	    /**
	     * The line is a border on a diff, so this is essentially
	     * the width of column.
	     */
	    initialWidth: PropTypes.number,

	    /**
	     * The minimum width this dragger will collapse to
	     */
	    minWidth: PropTypes.number,

	    /**
	     * The maximum width this dragger will collapse to
	     */
	    maxWidth: PropTypes.number,

	    /**
	     * Initial click event on the header cell.
	     */
	    initialEvent: PropTypes.object,

	    /**
	     * When resizing is complete this is called.
	     */
	    onColumnResizeEnd: PropTypes.func,

	    /**
	     * Column key for the column being resized.
	     */
	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) },

	  getInitialState: function getInitialState() /*object*/{
	    return {
	      width: 0,
	      cursorDelta: 0
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {
	    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
	      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
	      this.setState({
	        width: newProps.initialWidth,
	        cursorDelta: newProps.initialWidth
	      });
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this._mouseMoveTracker = new DOMMouseMoveTracker(this._onMove, this._onColumnResizeEnd, document.body);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this._mouseMoveTracker = null;
	  },

	  render: function render() /*object*/{
	    var style = {
	      width: this.state.width,
	      height: this.props.height };
	    if (Locale.isRTL()) {
	      style.right = this.props.leftOffset;
	    } else {
	      style.left = this.props.leftOffset;
	    }
	    return React.createElement(
	      'div',
	      {
	        className: cx({
	          'fixedDataTableColumnResizerLineLayout/main': true,
	          'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
	          'public/fixedDataTableColumnResizerLine/main': true }),
	        style: style },
	      React.createElement('div', {
	        className: cx('fixedDataTableColumnResizerLineLayout/mouseArea'),
	        style: { height: this.props.height }
	      })
	    );
	  },

	  _onMove: function _onMove( /*number*/deltaX) {
	    if (Locale.isRTL()) {
	      deltaX = -deltaX;
	    }
	    var newWidth = this.state.cursorDelta + deltaX;
	    var newColumnWidth = clamp(newWidth, this.props.minWidth, this.props.maxWidth);

	    // Please note cursor delta is the different between the currently width
	    // and the new width.
	    this.setState({
	      width: newColumnWidth,
	      cursorDelta: newWidth
	    });
	  },

	  _onColumnResizeEnd: function _onColumnResizeEnd() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.props.onColumnResizeEnd(this.state.width, this.props.columnKey);
	  } });

	module.exports = FixedDataTableColumnResizeHandle;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableScrollHelper
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PrefixIntervalTree = __webpack_require__(47);
	var clamp = __webpack_require__(35);

	var BUFFER_ROWS = 5;
	var NO_ROWS_SCROLL_RESULT = {
	  index: 0,
	  offset: 0,
	  position: 0,
	  contentHeight: 0 };

	var FixedDataTableScrollHelper = (function () {
	  function FixedDataTableScrollHelper(
	  /*number*/rowCount,
	  /*number*/defaultRowHeight,
	  /*number*/viewportHeight,
	  /*?function*/rowHeightGetter) {
	    _classCallCheck(this, FixedDataTableScrollHelper);

	    this._rowOffsets = PrefixIntervalTree.uniform(rowCount, defaultRowHeight);
	    this._storedHeights = new Array(rowCount);
	    for (var i = 0; i < rowCount; ++i) {
	      this._storedHeights[i] = defaultRowHeight;
	    }
	    this._rowCount = rowCount;
	    this._position = 0;
	    this._contentHeight = rowCount * defaultRowHeight;
	    this._defaultRowHeight = defaultRowHeight;
	    this._rowHeightGetter = rowHeightGetter ? rowHeightGetter : function () {
	      return defaultRowHeight;
	    };
	    this._viewportHeight = viewportHeight;
	    this.scrollRowIntoView = this.scrollRowIntoView.bind(this);
	    this.setViewportHeight = this.setViewportHeight.bind(this);
	    this.scrollBy = this.scrollBy.bind(this);
	    this.scrollTo = this.scrollTo.bind(this);
	    this.scrollToRow = this.scrollToRow.bind(this);
	    this.setRowHeightGetter = this.setRowHeightGetter.bind(this);
	    this.getContentHeight = this.getContentHeight.bind(this);
	    this.getRowPosition = this.getRowPosition.bind(this);

	    this._updateHeightsInViewport(0, 0);
	  }

	  _createClass(FixedDataTableScrollHelper, [{
	    key: 'setRowHeightGetter',
	    value: function setRowHeightGetter( /*function*/rowHeightGetter) {
	      this._rowHeightGetter = rowHeightGetter;
	    }
	  }, {
	    key: 'setViewportHeight',
	    value: function setViewportHeight( /*number*/viewportHeight) {
	      this._viewportHeight = viewportHeight;
	    }
	  }, {
	    key: 'getContentHeight',
	    value: function getContentHeight() /*number*/{
	      return this._contentHeight;
	    }
	  }, {
	    key: '_updateHeightsInViewport',
	    value: function _updateHeightsInViewport(
	    /*number*/firstRowIndex,
	    /*number*/firstRowOffset) {
	      var top = firstRowOffset;
	      var index = firstRowIndex;
	      while (top <= this._viewportHeight && index < this._rowCount) {
	        this._updateRowHeight(index);
	        top += this._storedHeights[index];
	        index++;
	      }
	    }
	  }, {
	    key: '_updateHeightsAboveViewport',
	    value: function _updateHeightsAboveViewport( /*number*/firstRowIndex) {
	      var index = firstRowIndex - 1;
	      while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
	        var delta = this._updateRowHeight(index);
	        this._position += delta;
	        index--;
	      }
	    }
	  }, {
	    key: '_updateRowHeight',
	    value: function _updateRowHeight( /*number*/rowIndex) /*number*/{
	      if (rowIndex < 0 || rowIndex >= this._rowCount) {
	        return 0;
	      }
	      var newHeight = this._rowHeightGetter(rowIndex);
	      if (newHeight !== this._storedHeights[rowIndex]) {
	        var change = newHeight - this._storedHeights[rowIndex];
	        this._rowOffsets.set(rowIndex, newHeight);
	        this._storedHeights[rowIndex] = newHeight;
	        this._contentHeight += change;
	        return change;
	      }
	      return 0;
	    }
	  }, {
	    key: 'getRowPosition',
	    value: function getRowPosition( /*number*/rowIndex) /*number*/{
	      this._updateRowHeight(rowIndex);
	      return this._rowOffsets.sumUntil(rowIndex);
	    }
	  }, {
	    key: 'scrollBy',
	    value: function scrollBy( /*number*/delta) /*object*/{
	      if (this._rowCount === 0) {
	        return NO_ROWS_SCROLL_RESULT;
	      }
	      var firstRow = this._rowOffsets.greatestLowerBound(this._position);
	      firstRow = clamp(firstRow, 0, Math.max(this._rowCount - 1, 0));
	      var firstRowPosition = this._rowOffsets.sumUntil(firstRow);
	      var rowIndex = firstRow;
	      var position = this._position;

	      var rowHeightChange = this._updateRowHeight(rowIndex);
	      if (firstRowPosition !== 0) {
	        position += rowHeightChange;
	      }
	      var visibleRowHeight = this._storedHeights[rowIndex] - (position - firstRowPosition);

	      if (delta >= 0) {

	        while (delta > 0 && rowIndex < this._rowCount) {
	          if (delta < visibleRowHeight) {
	            position += delta;
	            delta = 0;
	          } else {
	            delta -= visibleRowHeight;
	            position += visibleRowHeight;
	            rowIndex++;
	          }
	          if (rowIndex < this._rowCount) {
	            this._updateRowHeight(rowIndex);
	            visibleRowHeight = this._storedHeights[rowIndex];
	          }
	        }
	      } else if (delta < 0) {
	        delta = -delta;
	        var invisibleRowHeight = this._storedHeights[rowIndex] - visibleRowHeight;

	        while (delta > 0 && rowIndex >= 0) {
	          if (delta < invisibleRowHeight) {
	            position -= delta;
	            delta = 0;
	          } else {
	            position -= invisibleRowHeight;
	            delta -= invisibleRowHeight;
	            rowIndex--;
	          }
	          if (rowIndex >= 0) {
	            var change = this._updateRowHeight(rowIndex);
	            invisibleRowHeight = this._storedHeights[rowIndex];
	            position += change;
	          }
	        }
	      }

	      var maxPosition = this._contentHeight - this._viewportHeight;
	      position = clamp(position, 0, maxPosition);
	      this._position = position;
	      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
	      firstRowIndex = clamp(firstRowIndex, 0, Math.max(this._rowCount - 1, 0));
	      firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
	      var firstRowOffset = firstRowPosition - position;

	      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
	      this._updateHeightsAboveViewport(firstRowIndex);

	      return {
	        index: firstRowIndex,
	        offset: firstRowOffset,
	        position: this._position,
	        contentHeight: this._contentHeight };
	    }
	  }, {
	    key: '_getRowAtEndPosition',
	    value: function _getRowAtEndPosition( /*number*/rowIndex) /*number*/{
	      // We need to update enough rows above the selected one to be sure that when
	      // we scroll to selected position all rows between first shown and selected
	      // one have most recent heights computed and will not resize
	      this._updateRowHeight(rowIndex);
	      var currentRowIndex = rowIndex;
	      var top = this._storedHeights[currentRowIndex];
	      while (top < this._viewportHeight && currentRowIndex >= 0) {
	        currentRowIndex--;
	        if (currentRowIndex >= 0) {
	          this._updateRowHeight(currentRowIndex);
	          top += this._storedHeights[currentRowIndex];
	        }
	      }
	      var position = this._rowOffsets.sumTo(rowIndex) - this._viewportHeight;
	      if (position < 0) {
	        position = 0;
	      }
	      return position;
	    }
	  }, {
	    key: 'scrollTo',
	    value: function scrollTo( /*number*/position) /*object*/{
	      if (this._rowCount === 0) {
	        return NO_ROWS_SCROLL_RESULT;
	      }
	      if (position <= 0) {
	        // If position less than or equal to 0 first row should be fully visible
	        // on top
	        this._position = 0;
	        this._updateHeightsInViewport(0, 0);

	        return {
	          index: 0,
	          offset: 0,
	          position: this._position,
	          contentHeight: this._contentHeight };
	      } else if (position >= this._contentHeight - this._viewportHeight) {
	        // If position is equal to or greater than max scroll value, we need
	        // to make sure to have bottom border of last row visible.
	        var rowIndex = this._rowCount - 1;
	        position = this._getRowAtEndPosition(rowIndex);
	      }
	      this._position = position;

	      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
	      firstRowIndex = clamp(firstRowIndex, 0, Math.max(this._rowCount - 1, 0));
	      var firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
	      var firstRowOffset = firstRowPosition - position;

	      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
	      this._updateHeightsAboveViewport(firstRowIndex);

	      return {
	        index: firstRowIndex,
	        offset: firstRowOffset,
	        position: this._position,
	        contentHeight: this._contentHeight };
	    }
	  }, {
	    key: 'scrollToRow',

	    /**
	     * Allows to scroll to selected row with specified offset. It always
	     * brings that row to top of viewport with that offset
	     */
	    value: function scrollToRow( /*number*/rowIndex, /*number*/offset) /*object*/{
	      rowIndex = clamp(rowIndex, 0, Math.max(this._rowCount - 1, 0));
	      offset = clamp(offset, -this._storedHeights[rowIndex], 0);
	      var firstRow = this._rowOffsets.sumUntil(rowIndex);
	      return this.scrollTo(firstRow - offset);
	    }
	  }, {
	    key: 'scrollRowIntoView',

	    /**
	     * Allows to scroll to selected row by bringing it to viewport with minimal
	     * scrolling. This that if row is fully visible, scroll will not be changed.
	     * If top border of row is above top of viewport it will be scrolled to be
	     * fully visible on the top of viewport. If the bottom border of row is
	     * below end of viewport, it will be scrolled up to be fully visible on the
	     * bottom of viewport.
	     */
	    value: function scrollRowIntoView( /*number*/rowIndex) /*object*/{
	      rowIndex = clamp(rowIndex, 0, Math.max(this._rowCount - 1, 0));
	      var rowBegin = this._rowOffsets.sumUntil(rowIndex);
	      var rowEnd = rowBegin + this._storedHeights[rowIndex];
	      if (rowBegin < this._position) {
	        return this.scrollTo(rowBegin);
	      } else if (this._position + this._viewportHeight < rowEnd) {
	        var position = this._getRowAtEndPosition(rowIndex);
	        return this.scrollTo(position);
	      }
	      return this.scrollTo(this._position);
	    }
	  }]);

	  return FixedDataTableScrollHelper;
	})();

	module.exports = FixedDataTableScrollHelper;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PrefixIntervalTree
	 * @flow
	 * @typechecks
	 */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(30);

	var parent = function parent(node) {
	  return Math.floor(node / 2);
	};

	var Int32Array = global.Int32Array || function (size) {
	  var xs = [];
	  for (var i = size - 1; i >= 0; --i) {
	    xs[i] = 0;
	  }
	  return xs;
	};

	/**
	 * Computes the next power of 2 after or equal to x.
	 */
	function ceilLog2(x) {
	  var y = 1;
	  while (y < x) {
	    y *= 2;
	  }
	  return y;
	}

	/**
	 * A prefix interval tree stores an numeric array and the partial sums of that
	 * array. It is optimized for updating the values of the array without
	 * recomputing all of the partial sums.
	 *
	 *   - O(ln n) update
	 *   - O(1) lookup
	 *   - O(ln n) compute a partial sum
	 *   - O(n) space
	 *
	 * Note that the sequence of partial sums is one longer than the array, so that
	 * the first partial sum is always 0, and the last partial sum is the sum of the
	 * entire array.
	 */

	var PrefixIntervalTree = (function () {
	  function PrefixIntervalTree(xs) {
	    _classCallCheck(this, PrefixIntervalTree);

	    this._size = xs.length;
	    this._half = ceilLog2(this._size);
	    this._heap = new Int32Array(2 * this._half);

	    var i;
	    for (i = 0; i < this._size; ++i) {
	      this._heap[this._half + i] = xs[i];
	    }

	    for (i = this._half - 1; i > 0; --i) {
	      this._heap[i] = this._heap[2 * i] + this._heap[2 * i + 1];
	    }
	  }

	  _createClass(PrefixIntervalTree, [{
	    key: 'set',
	    value: function set(index, value) {
	      invariant(0 <= index && index < this._size, 'Index out of range %s', index);

	      var node = this._half + index;
	      this._heap[node] = value;

	      node = parent(node);
	      for (; node !== 0; node = parent(node)) {
	        this._heap[node] = this._heap[2 * node] + this._heap[2 * node + 1];
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get(index) {
	      invariant(0 <= index && index < this._size, 'Index out of range %s', index);

	      var node = this._half + index;
	      return this._heap[node];
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	      return this._size;
	    }
	  }, {
	    key: 'sumUntil',

	    /**
	     * Returns the sum get(0) + get(1) + ... + get(end - 1).
	     */
	    value: function sumUntil(end) {
	      invariant(0 <= end && end < this._size + 1, 'Index out of range %s', end);

	      if (end === 0) {
	        return 0;
	      }

	      var node = this._half + end - 1;
	      var sum = this._heap[node];
	      for (; node !== 1; node = parent(node)) {
	        if (node % 2 === 1) {
	          sum += this._heap[node - 1];
	        }
	      }

	      return sum;
	    }
	  }, {
	    key: 'sumTo',

	    /**
	     * Returns the sum get(0) + get(1) + ... + get(inclusiveEnd).
	     */
	    value: function sumTo(inclusiveEnd) {
	      invariant(0 <= inclusiveEnd && inclusiveEnd < this._size, 'Index out of range %s', inclusiveEnd);
	      return this.sumUntil(inclusiveEnd + 1);
	    }
	  }, {
	    key: 'sum',

	    /**
	     * Returns the sum get(begin) + get(begin + 1) + ... + get(end - 1).
	     */
	    value: function sum(begin, end) {
	      invariant(begin <= end, 'Begin must precede end');
	      return this.sumUntil(end) - this.sumUntil(begin);
	    }
	  }, {
	    key: 'greatestLowerBound',

	    /**
	     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) <= t, or
	     * -1 if no such i exists.
	     */
	    value: function greatestLowerBound(t) {
	      if (t < 0) {
	        return -1;
	      }

	      var node = 1;
	      if (this._heap[node] <= t) {
	        return this._size;
	      }

	      while (node < this._half) {
	        var leftSum = this._heap[2 * node];
	        if (t < leftSum) {
	          node = 2 * node;
	        } else {
	          node = 2 * node + 1;
	          t -= leftSum;
	        }
	      }

	      return node - this._half;
	    }
	  }, {
	    key: 'greatestStrictLowerBound',

	    /**
	     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) < t, or
	     * -1 if no such i exists.
	     */
	    value: function greatestStrictLowerBound(t) {
	      if (t <= 0) {
	        return -1;
	      }

	      var node = 1;
	      if (this._heap[node] < t) {
	        return this._size;
	      }

	      while (node < this._half) {
	        var leftSum = this._heap[2 * node];
	        if (t <= leftSum) {
	          node = 2 * node;
	        } else {
	          node = 2 * node + 1;
	          t -= leftSum;
	        }
	      }

	      return node - this._half;
	    }
	  }, {
	    key: 'leastUpperBound',

	    /**
	     * Returns the smallest i such that 0 <= i <= size and t <= sumUntil(i), or
	     * size + 1 if no such i exists.
	     */
	    value: function leastUpperBound(t) {
	      return this.greatestStrictLowerBound(t) + 1;
	    }
	  }, {
	    key: 'leastStrictUpperBound',

	    /**
	     * Returns the smallest i such that 0 <= i <= size and t < sumUntil(i), or
	     * size + 1 if no such i exists.
	     */
	    value: function leastStrictUpperBound(t) {
	      return this.greatestLowerBound(t) + 1;
	    }
	  }], [{
	    key: 'uniform',
	    value: function uniform(size, initialValue) {
	      var xs = [];
	      for (var i = size - 1; i >= 0; --i) {
	        xs[i] = initialValue;
	      }

	      return new PrefixIntervalTree(xs);
	    }
	  }, {
	    key: 'empty',
	    value: function empty(size) {
	      return PrefixIntervalTree.uniform(size, 0);
	    }
	  }]);

	  return PrefixIntervalTree;
	})();

	module.exports = PrefixIntervalTree;

	/**
	 * Number of elements in the array
	 */

	/**
	 * Half the size of the heap. It is also the number of non-leaf nodes, and the
	 * index of the first element in the heap. Always a power of 2.
	 */

	/**
	 * Binary heap
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableWidthHelper
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(6);

	function getTotalWidth( /*array*/columns) /*number*/{
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalWidth += columns[i].props.width;
	  }
	  return totalWidth;
	}

	function getTotalFlexGrow( /*array*/columns) /*number*/{
	  var totalFlexGrow = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalFlexGrow += columns[i].props.flexGrow || 0;
	  }
	  return totalFlexGrow;
	}

	function distributeFlexWidth(
	/*array*/columns,
	/*number*/flexWidth) /*object*/{
	  if (flexWidth <= 0) {
	    return {
	      columns: columns,
	      width: getTotalWidth(columns) };
	  }
	  var remainingFlexGrow = getTotalFlexGrow(columns);
	  var remainingFlexWidth = flexWidth;
	  var newColumns = [];
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    var column = columns[i];
	    if (!column.props.flexGrow) {
	      totalWidth += column.props.width;
	      newColumns.push(column);
	      continue;
	    }
	    var columnFlexWidth = Math.floor(column.props.flexGrow / remainingFlexGrow * remainingFlexWidth);
	    var newColumnWidth = Math.floor(column.props.width + columnFlexWidth);
	    totalWidth += newColumnWidth;

	    remainingFlexGrow -= column.props.flexGrow;
	    remainingFlexWidth -= columnFlexWidth;

	    newColumns.push(React.cloneElement(column, { width: newColumnWidth }));
	  }

	  return {
	    columns: newColumns,
	    width: totalWidth };
	}

	function adjustColumnGroupWidths(
	/*array*/columnGroups,
	/*number*/expectedWidth) /*object*/{
	  var allColumns = [];
	  var i;
	  for (i = 0; i < columnGroups.length; ++i) {
	    React.Children.forEach(columnGroups[i].props.children, function (column) {
	      allColumns.push(column);
	    });
	  }
	  var columnsWidth = getTotalWidth(allColumns);
	  var remainingFlexGrow = getTotalFlexGrow(allColumns);
	  var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);

	  var newAllColumns = [];
	  var newColumnGroups = [];

	  for (i = 0; i < columnGroups.length; ++i) {
	    var columnGroup = columnGroups[i];
	    var currentColumns = [];

	    React.Children.forEach(columnGroup.props.children, function (column) {
	      currentColumns.push(column);
	    });

	    var columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
	    var columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth);

	    var newColumnSettings = distributeFlexWidth(currentColumns, columnGroupFlexWidth);

	    remainingFlexGrow -= columnGroupFlexGrow;
	    remainingFlexWidth -= columnGroupFlexWidth;

	    for (var j = 0; j < newColumnSettings.columns.length; ++j) {
	      newAllColumns.push(newColumnSettings.columns[j]);
	    }

	    newColumnGroups.push(React.cloneElement(columnGroup, { width: newColumnSettings.width }));
	  }

	  return {
	    columns: newAllColumns,
	    columnGroups: newColumnGroups };
	}

	function adjustColumnWidths(
	/*array*/columns,
	/*number*/expectedWidth) /*array*/{
	  var columnsWidth = getTotalWidth(columns);
	  if (columnsWidth < expectedWidth) {
	    return distributeFlexWidth(columns, expectedWidth - columnsWidth).columns;
	  }
	  return columns;
	}

	var FixedDataTableWidthHelper = {
	  getTotalWidth: getTotalWidth,
	  getTotalFlexGrow: getTotalFlexGrow,
	  distributeFlexWidth: distributeFlexWidth,
	  adjustColumnWidths: adjustColumnWidths,
	  adjustColumnGroupWidths: adjustColumnGroupWidths };

	module.exports = FixedDataTableWidthHelper;

/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule debounceCore
	 * @typechecks
	 */

	/**
	 * Invokes the given callback after a specified number of milliseconds have
	 * elapsed, ignoring subsequent calls.
	 *
	 * For example, if you wanted to update a preview after the user stops typing
	 * you could do the following:
	 *
	 *   elem.addEventListener('keyup', debounce(this.updatePreview, 250), false);
	 *
	 * The returned function has a reset method which can be called to cancel a
	 * pending invocation.
	 *
	 *   var debouncedUpdatePreview = debounce(this.updatePreview, 250);
	 *   elem.addEventListener('keyup', debouncedUpdatePreview, false);
	 *
	 *   // later, to cancel pending calls
	 *   debouncedUpdatePreview.reset();
	 *
	 * @param {function} func - the function to debounce
	 * @param {number} wait - how long to wait in milliseconds
	 * @param {*} context - optional context to invoke the function in
	 * @param {?function} setTimeoutFunc - an implementation of setTimeout
	 *  if nothing is passed in the default setTimeout function is used
	  * @param {?function} clearTimeoutFunc - an implementation of clearTimeout
	 *  if nothing is passed in the default clearTimeout function is used
	 */
	"use strict";

	function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
	  setTimeoutFunc = setTimeoutFunc || setTimeout;
	  clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
	  var timeout;

	  function debouncer() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    debouncer.reset();

	    var callback = function callback() {
	      func.apply(context, args);
	    };
	    callback.__SMmeta = func.__SMmeta;
	    timeout = setTimeoutFunc(callback, wait);
	  }

	  debouncer.reset = function () {
	    clearTimeoutFunc(timeout);
	  };

	  return debouncer;
	}

	module.exports = debounce;

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * @flow
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumnNew.react
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(6);

	var PropTypes = React.PropTypes;

	/**
	 * Component that defines the attributes of table column.
	 */
	var FixedDataTableColumn = React.createClass({
	  displayName: 'FixedDataTableColumn',

	  statics: {
	    __TableColumn__: true
	  },

	  propTypes: {
	    /**
	     * The horizontal alignment of the table cell content.
	     */
	    align: PropTypes.oneOf(['left', 'center', 'right']),

	    /**
	     * Controls if the column is fixed when scrolling in the X axis.
	     */
	    fixed: PropTypes.bool,

	    /**
	     * The header cell for this column.
	     * This can either be a string a React element, or a function that generates
	     * a React Element. Passing in a string will render a default header cell
	     * with that string. By default, the React element passed in can expect to
	     * receive the following props:
	     *
	     * ```
	     * props: {
	     *   columnKey: string // (of the column, if given)
	     *   height: number // (supplied from the Table or rowHeightGetter)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * If you pass in a function, you will receive the same props object as the
	     * first argument.
	     */
	    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

	    /**
	     * This is the body cell that will be cloned for this column.
	     * This can either be a string a React element, or a function that generates
	     * a React Element. Passing in a string will render a default header cell
	     * with that string. By default, the React element passed in can expect to
	     * receive the following props:
	     *
	     * ```
	     * props: {
	     *   rowIndex; number // (the row index of the cell)
	     *   columnKey: string // (of the column, if given)
	     *   height: number // (supplied from the Table or rowHeightGetter)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * If you pass in a function, you will receive the same props object as the
	     * first argument.
	     */
	    cell: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

	    /**
	     * This is the footer cell for this column.
	     * This can either be a string a React element, or a function that generates
	     * a React Element. Passing in a string will render a default header cell
	     * with that string. By default, the React element passed in can expect to
	     * receive the following props:
	     *
	     * ```
	     * props: {
	     *   columnKey: string // (of the column, if given)
	     *   height: number // (supplied from the Table or rowHeightGetter)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * If you pass in a function, you will receive the same props object as the
	     * first argument.
	     */
	    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

	    /**
	     * This is used to uniquely identify the column, and is not required unless
	     * you a resizing columns. This will be the key given in the
	     * `onColumnResizeEndCallback` on the Table.
	     */
	    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	    /**
	     * The pixel width of the column.
	     */
	    width: PropTypes.number.isRequired,

	    /**
	     * If this is a resizable column this is its minimum pixel width.
	     */
	    minWidth: PropTypes.number,

	    /**
	     * If this is a resizable column this is its maximum pixel width.
	     */
	    maxWidth: PropTypes.number,

	    /**
	     * The grow factor relative to other columns. Same as the flex-grow API
	     * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
	     * extra width and distribute it proportionally according to all columns'
	     * flexGrow values. Defaults to zero (no-flexing).
	     */
	    flexGrow: PropTypes.number,

	    /**
	     * Whether the column can be resized with the
	     * FixedDataTableColumnResizeHandle. Please note that if a column
	     * has a flex grow, once you resize the column this will be set to 0.
	     *
	     * This property only provides the UI for the column resizing. If this
	     * is set to true, you will need to set the onColumnResizeEndCallback table
	     * property and render your columns appropriately.
	     */
	    isResizable: PropTypes.bool,

	    /**
	     * Whether cells in this column can be removed from document when outside
	     * of viewport as a result of horizontal scrolling.
	     * Setting this property to true allows the table to not render cells in
	     * particular column that are outside of viewport for visible rows. This
	     * allows to create table with many columns and not have vertical scrolling
	     * performance drop.
	     * Setting the property to false will keep previous behaviour and keep
	     * cell rendered if the row it belongs to is visible.
	     */
	    allowCellsRecycling: PropTypes.bool },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      allowCellsRecycling: false,
	      fixed: false };
	  },

	  render: function render() {
	    if (false) {
	      throw new Error('Component <FixedDataTableColumn /> should never render');
	    }
	    return null;
	  } });

	module.exports = FixedDataTableColumn;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableColumnGroupNew.react
	 * @typechecks
	 */

	'use strict';

	var React = __webpack_require__(6);

	var PropTypes = React.PropTypes;

	/**
	 * Component that defines the attributes of a table column group.
	 */
	var FixedDataTableColumnGroup = React.createClass({
	  displayName: 'FixedDataTableColumnGroup',

	  statics: {
	    __TableColumnGroup__: true },

	  propTypes: {
	    /**
	     * The horizontal alignment of the table cell content.
	     */
	    align: PropTypes.oneOf(['left', 'center', 'right']),

	    /**
	     * Controls if the column group is fixed when scrolling in the X axis.
	     */
	    fixed: PropTypes.bool,

	    /**
	     * This is the header cell for this column group.
	     * This can either be a string or a React element. Passing in a string
	     * will render a default footer cell with that string. By default, the React
	     * element passed in can expect to receive the following props:
	     *
	     * ```
	     * props: {
	     *   height: number // (supplied from the groupHeaderHeight)
	     *   width: number // (supplied from the Column)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * You can also pass in a function that returns a react elemnt, with the
	     * props object above passed in as the first parameter.
	     */
	    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      fixed: false };
	  },

	  render: function render() {
	    if (false) {
	      throw new Error('Component <FixedDataTableColumnGroup /> should never render');
	    }
	    return null;
	  } });

	module.exports = FixedDataTableColumnGroup;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellTransition.react
	 */

	/**
	 * TRANSITION SHIM
	 * This acts to provide an intermediate mapping from the old API to the new API.
	 *
	 * When ready, remove this file and rename the providesModule in
	 * FixedDataTableCellNew.react and dependency in FixedDataTableCellGroup.react
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(6);
	var PropTypes = React.PropTypes;

	var cx = __webpack_require__(25);
	var joinClasses = __webpack_require__(44);
	var shallowEqual = __webpack_require__(50);

	var CellDefault = __webpack_require__(43);

	var TransitionCell = React.createClass({
	  displayName: 'TransitionCell',

	  propTypes: {
	    label: PropTypes.string, // header, footer
	    className: PropTypes.string,
	    rowIndex: PropTypes.number,
	    rowGetter: PropTypes.func, // cell
	    dataKey: PropTypes.oneOfType([// cell, footer
	    PropTypes.string, PropTypes.number]),
	    cellRenderer: PropTypes.func,
	    cellDataGetter: PropTypes.func,
	    footerDataGetter: PropTypes.func, // footer
	    footerData: PropTypes.any, // footer
	    columnData: PropTypes.any, // cell, header
	    width: PropTypes.number,
	    height: PropTypes.number,
	    isHeaderCell: PropTypes.bool, // header
	    isFooterCell: PropTypes.bool },

	  shouldComponentUpdate: function shouldComponentUpdate( /*object*/nextProps) {
	    var update = false;
	    var rowData;
	    if (nextProps.rowGetter) {
	      rowData = nextProps.rowGetter(nextProps.rowIndex);
	      if (this._rowData !== rowData) {
	        update = true;
	      }
	    }

	    var cellData;
	    if (nextProps.dataKey != null) {
	      if (nextProps.cellDataGetter) {
	        cellData = nextProps.cellDataGetter(nextProps.dataKey, rowData);
	      }
	      if (!cellData && rowData) {
	        cellData = rowData[nextProps.dataKey];
	      }
	    }
	    if (this._cellData !== cellData) {
	      update = true;
	    }
	    this._rowData = rowData;
	    this._cellData = cellData;

	    return update || !shallowEqual(nextProps, this.props);
	  },

	  _getCellData: function _getCellData(props) {
	    var dataKey = props.dataKey;
	    if (dataKey == null) {
	      return null;
	    }

	    var rowData;
	    if (props.rowGetter) {
	      rowData = props.rowGetter(props.rowIndex);
	    }

	    if (props.cellDataGetter) {
	      return props.cellDataGetter(dataKey, rowData);
	    }

	    if (rowData) {
	      return rowData[dataKey];
	    }

	    if (props.footerDataGetter) {
	      return props.footerDataGetter()[dataKey];
	    }

	    if (props.footerData) {
	      return props.footerData[dataKey];
	    }

	    if (props.headerDataGetter) {
	      return props.headerDataGetter[dataKey];
	    }
	  },

	  _getRowData: function _getRowData(props) {
	    if (props.rowGetter) {
	      return props.rowGetter(props.rowIndex) || {};
	    }

	    if (props.footerDataGetter) {
	      return props.footerDataGetter() || {};
	    }

	    if (props.footerData) {
	      return props.footerData || {};
	    }

	    return {};
	  },

	  render: function render() {
	    var props = this.props;

	    var cellData = this._getCellData(props);
	    var content = cellData;
	    var rowData = this._getRowData(props);
	    var usingRenderer = !!(props.cellRenderer || props.groupHeaderRenderer);

	    if (props.isHeaderCell || props.isFooterCell) {
	      content = content || props.label;
	    }

	    if (props.cellRenderer) {
	      if (props.isHeaderCell || props.isFooterCell) {
	        content = props.cellRenderer(props.label, props.dataKey, props.columnData, rowData, props.width) || props.label;
	      } else {
	        content = props.cellRenderer(cellData, props.dataKey, rowData, props.rowIndex, props.columnData, props.width);
	      }
	    }

	    if (props.groupHeaderRenderer) {
	      content = props.groupHeaderRenderer(props.label, props.dataKey, // index in children
	      props.groupHeaderData, props.groupHeaderLabels, props.width) || content;
	    }

	    var contentClass = cx('public/fixedDataTableCell/cellContent');

	    if (React.isValidElement(content) && usingRenderer) {
	      content = React.cloneElement(content, {
	        className: joinClasses(content.props.className, contentClass)
	      });
	    } else {
	      return React.createElement(
	        CellDefault,
	        props,
	        content
	      );
	    }

	    var innerStyle = _extends({
	      height: props.height,
	      width: props.width }, props.style);

	    return React.createElement(
	      'div',
	      _extends({}, this.props, {
	        className: joinClasses(cx('fixedDataTableCellLayout/wrap1'), cx('public/fixedDataTableCell/wrap1'), this.props.className),
	        style: innerStyle }),
	      React.createElement(
	        'div',
	        {
	          className: joinClasses(cx('fixedDataTableCellLayout/wrap2'), cx('public/fixedDataTableCell/wrap2')) },
	        React.createElement(
	          'div',
	          {
	            className: joinClasses(cx('fixedDataTableCellLayout/wrap3'), cx('public/fixedDataTableCell/wrap3')) },
	          content
	        )
	      )
	    );
	  }
	});

	module.exports = TransitionCell;
	// footer

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.Immutable = factory();
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function Iterator(next) {
	      this.next = next;
	    }

	    Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect =
	  Iterator.prototype.toSource = function () { return this.toString(); }
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step > 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(Map, KeyedCollection);

	    // @pragma Construction

	    function Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger, arguments);
	    };

	    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	    };

	    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ?
	      existing.mergeDeep(value) :
	      is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function(existing, value, key)  {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.insert = function(index, value) {
	      return this.splice(index, 0, value);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger, arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMergerWith(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	    // @pragma Construction

	    function Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    findEntry: function(predicate, context) {
	      var found;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findLastEntry: function(predicate, context) {
	      return this.toSeq().reverse().findEntry(predicate, context);
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  // Temporary warning about using length
	  (function () {
	    try {
	      Object.defineProperty(IterablePrototype, 'length', {
	        get: function () {
	          if (!Iterable.noLengthWarning) {
	            var stack;
	            try {
	              throw new Error();
	            } catch (error) {
	              stack = error.stack;
	            }
	            if (stack.indexOf('_wrapObject') === -1) {
	              console && console.warn && console.warn(
	                'iterable.length has been deprecated, '+
	                'use iterable.size or iterable.count(). '+
	                'This warning will become a silent error in a future version. ' +
	                stack
	              );
	              return this.size;
	            }
	          }
	        }
	      });
	    } catch (e) {}
	  })();



	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLastKey: function(predicate, context) {
	      return this.toSeq().reverse().findKey(predicate, context);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    lastKeyOf: function(searchValue) {
	      return this.findLastKey(function(value ) {return is(value, searchValue)});
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.toKeyedSeq().keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      var key = this.toKeyedSeq().reverse().keyOf(searchValue);
	      return key === undefined ? -1 : key;

	      // var index =
	      // return this.toSeq().reverse().indexOf(searchValue);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var key = this.toKeyedSeq().findLastKey(predicate, context);
	      return key === undefined ? -1 : key;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : value;
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
		'SPA': {
			loading: 'cargando...',
			empty: 'No se encontró ningún elemento',
			allData: 'Todos los datos, sin filtrar.',
			filtering: 'filas filtradas de',
			filtered: 'Filtrado por',
			there: 'Hay',
			sorted: 'Ordenado por',
			rows: 'filas.'
		},
		'ENG': {
			loading: 'loading...',
			empty: 'No data found',
			allData: 'All data, no filtering.',
			filtering: 'filtered rows of',
			filtered: 'Filtered by',
			there: 'There is',
			sorted: 'Sorted by',
			rows: 'rows.'
		}
	};
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _fixedDataTable = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Stateless component which render a Cell which contain a icon like a checkbox that can be clicked.
	 * Each time the selector were clicked then a callback from the main class is called which name is onClick.
	 *
	 * Example usage via from a `Column`:
	 * ```
	 * const MyColumn = (
	 *     <Column
	 *        header={
	 *            	<Selector
	 *					onClick={this.handleSelectAll.bind(this)}
	 *					somethingSelected={true || false}
	 *					allSelected={true || false}
	 *					isHeader={true}
	 *				/>
	 *          }
	 * 			cell={
	 *				<Selector
	 *					data={data} // Inmutable js object with upper component data.
	 *				/>
	 *			}
	 *        ...
	 *     />
	 * );
	 * ```
	 */
	var Selector = function Selector(props) {
		var allSelected = false,
		    somethingSelected = false,
		    content = _react2['default'].createElement('i', { className: 'fa fa-square-o selector-button' });
		var addClass = 'unchecked';
		var selected = false;
		var row = null,
		    id = null;
		var render = null;
		var _onClick = props.onClick;
		var isHeader = props.isHeader;

		// Default callback function
		if (!_onClick) {
			_onClick = function onClick() {};
		}

		if (typeof props.rowIndex != 'undefined') {
			row = props.data.get(props.rowIndex).toJSON();
			id = row[props.idField];
		}

		if (typeof props.allSelected !== 'undefined') {
			allSelected = props.allSelected;
		}

		if (typeof props.somethingSelected !== 'undefined') {
			somethingSelected = props.somethingSelected;
		}

		// If something is selected add the class partial to the FontAwesome component <i />
		if (somethingSelected) {
			addClass = 'partial';
		}

		// Then if all elements are selected change the addClass to complete
		if (allSelected) {
			addClass = 'complete';
		}

		// If something is selected but not all then print - into the "check-box"
		if (somethingSelected && !allSelected) {
			content = _react2['default'].createElement('i', { className: 'fa fa-minus-square-o' });
		}

		// If all are selected (header) or the row is selected print a check into the FontAwesome checkbox.
		if (allSelected || row && row._selected) {
			content = _react2['default'].createElement('i', { className: 'fa fa-check-square-o' });
		}

		if (props.selected && id && props.selected.has(id.toString())) {
			content = _react2['default'].createElement('i', { className: 'fa fa-check-square-o' });
		}

		if (isHeader) {
			// It's render inside the sortHeaderCell component
			render = _react2['default'].createElement(
				'div',
				{ className: 'propertable-cell select-cell' },
				_react2['default'].createElement(
					'div',
					{ className: "propertable-selector " + addClass, onClick: function onClick(e) {
							_onClick(e, row);
						} },
					content
				)
			);
		} else {
			render = _react2['default'].createElement(
				_fixedDataTable.Cell,
				{ className: 'propertable-cell select-cell' },
				_react2['default'].createElement(
					'div',
					{ className: "propertable-selector " + addClass, onClick: function onClick(e) {
							_onClick(e, row);
						} },
					content
				)
			);
		}

		// Render
		return render;
	};

	exports['default'] = Selector;
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _fixedDataTable = __webpack_require__(3);

	var _rowcache = __webpack_require__(59);

	var _rowcache2 = _interopRequireDefault(_rowcache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Stateless component which render a cell value formated.
	 *
	 * Example usage via from a `Column`:
	 * ```
	 * const MyColumn = (
	 *     <Column
	 *        cell={
	 *            <CellRenderer
	 *				data={all-table-data}
	 *				colData={current-column-data} //  {name: -, field: -, formater: -, ...}
	 *				col={colData.field}
	 *			/>
	 *        }
	 *        ...
	 *     />
	 * );
	 * ```
	 */
	var CellRenderer = function CellRenderer(props) {
		var indexed = props.indexed;
		var row = props.data.get(props.rowIndex),
		    val = null,
		    formatted = null;
		var colData = props.colData;
		var className = colData.className + ' ' + colData.columnBodyClass || '';
		var selected = false;
		var rawdata = indexed[row.get(props.idField)];
		var ckey = null;

		if (row) {
			// Get the value of the current column in the row
			val = rawdata[props.col] === undefined ? null : rawdata[props.col];
			formatted = val;
		}

		// If exist apply a formater function to that value.
		if (typeof colData.formatter == 'function') {
			ckey = ['formatted', 'tb_' + props.tableId, 'r__' + row.get(props.idField), colData.name];
			formatted = _rowcache2['default'].read(ckey);

			if (formatted === undefined) {
				formatted = colData.formatter(val, colData, rawdata);
				_rowcache2['default'].write(ckey, formatted);
			}
		}

		return _react2['default'].createElement(
			_fixedDataTable.Cell,
			{ className: "propertable-cell " + className },
			formatted
		);
	};

	exports['default'] = CellRenderer;
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _dotObject = __webpack_require__(60);

	var _dotObject2 = _interopRequireDefault(_dotObject);

	var _underscore = __webpack_require__(55);

	var _deepmerge = __webpack_require__(61);

	var _deepmerge2 = _interopRequireDefault(_deepmerge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var cache = {};

	function parseKey(key) {
		return (0, _underscore.map)(key, function (k) {
			return k.toString().replace('.', '_');
		}).join('.');
	}

	var RowCache = function () {
		function RowCache() {
			var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, RowCache);

			this.init(base);
		}

		RowCache.prototype.init = function init() {
			var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			cache = base;

			return this;
		};

		RowCache.prototype.read = function read(key) {
			var k = parseKey(key);
			return _dotObject2['default'].pick(k, cache);
		};

		RowCache.prototype.write = function write(key, value) {
			var k = parseKey(key);
			var writable = {};

			writable[k] = value;
			writable = _dotObject2['default'].object(writable);

			cache = (0, _deepmerge2['default'])(cache, writable);

			return this;
		};

		RowCache.prototype.flush = function flush() {
			var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			if (key) {
				var k = parseKey(key);
				_dotObject2['default'].remove(k, cache);
			} else {
				this.init();
			}

			return this;
		};

		return RowCache;
	}();

	var rowcache = new RowCache();

	exports['default'] = rowcache;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict'

	function _process (v, mod) {
	  var i
	  var r

	  if (typeof mod === 'function') {
	    r = mod(v)
	    if (r !== undefined) {
	      v = r
	    }
	  } else if (Array.isArray(mod)) {
	    for (i = 0; i < mod.length; i++) {
	      r = mod[i](v)
	      if (r !== undefined) {
	        v = r
	      }
	    }
	  }

	  return v
	}

	function parseKey (key, val) {
	  // detect negative index notation
	  if (key[0] === '-' && Array.isArray(val) && /^-\d+$/.test(key)) {
	    return val.length + parseInt(key, 10)
	  }
	  return key
	}

	function isIndex (k) {
	  return /^\d+/.test(k)
	}

	function parsePath (path, sep) {
	  if (path.indexOf('[') >= 0) {
	    path = path.replace(/\[/g, '.').replace(/]/g, '')
	  }
	  return path.split(sep)
	}

	function DotObject (seperator, override, useArray) {
	  if (!(this instanceof DotObject)) {
	    return new DotObject(seperator, override, useArray)
	  }

	  if (typeof seperator === 'undefined') seperator = '.'
	  if (typeof override === 'undefined') override = false
	  if (typeof useArray === 'undefined') useArray = true
	  this.seperator = seperator
	  this.override = override
	  this.useArray = useArray

	  // contains touched arrays
	  this.cleanup = []
	}

	var dotDefault = new DotObject('.', false, true)
	function wrap (method) {
	  return function () {
	    return dotDefault[method].apply(dotDefault, arguments)
	  }
	}

	DotObject.prototype._fill = function (a, obj, v, mod) {
	  var k = a.shift()

	  if (a.length > 0) {
	    obj[k] = obj[k] ||
	      (this.useArray && isIndex(a[0]) ? [] : {})

	    if (obj[k] !== Object(obj[k])) {
	      if (this.override) {
	        obj[k] = {}
	      } else {
	        throw new Error(
	          'Trying to redefine `' + k + '` which is a ' + typeof obj[k]
	        )
	      }
	    }

	    this._fill(a, obj[k], v, mod)
	  } else {
	    if (!this.override &&
	      obj[k] === Object(obj[k]) && Object.keys(obj[k]).length) {
	      throw new Error("Trying to redefine non-empty obj['" + k + "']")
	    }

	    obj[k] = _process(v, mod)
	  }
	}

	/**
	 *
	 * Converts an object with dotted-key/value pairs to it's expanded version
	 *
	 * Optionally transformed by a set of modifiers.
	 *
	 * Usage:
	 *
	 *   var row = {
	 *     'nr': 200,
	 *     'doc.name': '  My Document  '
	 *   }
	 *
	 *   var mods = {
	 *     'doc.name': [_s.trim, _s.underscored]
	 *   }
	 *
	 *   dot.object(row, mods)
	 *
	 * @param {Object} obj
	 * @param {Object} mods
	 */
	DotObject.prototype.object = function (obj, mods) {
	  var self = this

	  Object.keys(obj).forEach(function (k) {
	    var mod = mods === undefined ? null : mods[k]
	    // normalize array notation.
	    var ok = parsePath(k, self.seperator).join(self.seperator)

	    if (ok.indexOf(self.seperator) !== -1) {
	      self._fill(ok.split(self.seperator), obj, obj[k], mod)
	      delete obj[k]
	    } else if (self.override) {
	      obj[k] = _process(obj[k], mod)
	    }
	  })

	  return obj
	}

	/**
	 * @param {String} path dotted path
	 * @param {String} v value to be set
	 * @param {Object} obj object to be modified
	 * @param {Function|Array} mod optional modifier
	 */
	DotObject.prototype.str = function (path, v, obj, mod) {
	  if (path.indexOf(this.seperator) !== -1) {
	    this._fill(path.split(this.seperator), obj, v, mod)
	  } else if (this.override) {
	    obj[path] = _process(v, mod)
	  }

	  return obj
	}

	/**
	 *
	 * Pick a value from an object using dot notation.
	 *
	 * Optionally remove the value
	 *
	 * @param {String} path
	 * @param {Object} obj
	 * @param {Boolean} remove
	 */
	DotObject.prototype.pick = function (path, obj, remove) {
	  var i
	  var keys
	  var val
	  var key
	  var cp

	  keys = parsePath(path, this.seperator)
	  for (i = 0; i < keys.length; i++) {
	    key = parseKey(keys[i], obj)
	    if (obj && typeof obj === 'object' && key in obj) {
	      if (i === (keys.length - 1)) {
	        if (remove) {
	          val = obj[key]
	          delete obj[key]
	          if (Array.isArray(obj)) {
	            cp = keys.slice(0, -1).join('.')
	            if (this.cleanup.indexOf(cp) === -1) {
	              this.cleanup.push(cp)
	            }
	          }
	          return val
	        } else {
	          return obj[key]
	        }
	      } else {
	        obj = obj[key]
	      }
	    } else {
	      return undefined
	    }
	  }
	  if (remove && Array.isArray(obj)) {
	    obj = obj.filter(function (n) { return n !== undefined })
	  }
	  return obj
	}

	/**
	 *
	 * Remove value from an object using dot notation.
	 *
	 * @param {String} path
	 * @param {Object} obj
	 * @return {Mixed} The removed value
	 */
	DotObject.prototype.remove = function (path, obj) {
	  var i

	  this.cleanup = []
	  if (Array.isArray(path)) {
	    for (i = 0; i < path.length; i++) {
	      this.pick(path[i], obj, true)
	    }
	    this._cleanup(obj)
	    return obj
	  } else {
	    return this.pick(path, obj, true)
	  }
	}

	DotObject.prototype._cleanup = function (obj) {
	  var ret
	  var i
	  var keys
	  var root
	  if (this.cleanup.length) {
	    for (i = 0; i < this.cleanup.length; i++) {
	      keys = this.cleanup[i].split('.')
	      root = keys.splice(0, -1).join('.')
	      ret = root ? this.pick(root, obj) : obj
	      ret = ret[keys[0]].filter(function (v) { return v !== undefined })
	      this.set(this.cleanup[i], ret, obj)
	    }
	    this.cleanup = []
	  }
	}

	// alias method
	DotObject.prototype.del = DotObject.prototype.remove

	/**
	 *
	 * Move a property from one place to the other.
	 *
	 * If the source path does not exist (undefined)
	 * the target property will not be set.
	 *
	 * @param {String} source
	 * @param {String} target
	 * @param {Object} obj
	 * @param {Function|Array} mods
	 * @param {Boolean} merge
	 */
	DotObject.prototype.move = function (source, target, obj, mods, merge) {
	  if (typeof mods === 'function' || Array.isArray(mods)) {
	    this.set(target, _process(this.pick(source, obj, true), mods), obj, merge)
	  } else {
	    merge = mods
	    this.set(target, this.pick(source, obj, true), obj, merge)
	  }

	  return obj
	}

	/**
	 *
	 * Transfer a property from one object to another object.
	 *
	 * If the source path does not exist (undefined)
	 * the property on the other object will not be set.
	 *
	 * @param {String} source
	 * @param {String} target
	 * @param {Object} obj1
	 * @param {Object} obj2
	 * @param {Function|Array} mods
	 * @param {Boolean} merge
	 */
	DotObject.prototype.transfer = function (source, target, obj1, obj2, mods, merge) {
	  if (typeof mods === 'function' || Array.isArray(mods)) {
	    this.set(target,
	      _process(
	        this.pick(source, obj1, true),
	        mods
	      ), obj2, merge)
	  } else {
	    merge = mods
	    this.set(target, this.pick(source, obj1, true), obj2, merge)
	  }

	  return obj2
	}

	/**
	 *
	 * Copy a property from one object to another object.
	 *
	 * If the source path does not exist (undefined)
	 * the property on the other object will not be set.
	 *
	 * @param {String} source
	 * @param {String} target
	 * @param {Object} obj1
	 * @param {Object} obj2
	 * @param {Function|Array} mods
	 * @param {Boolean} merge
	 */
	DotObject.prototype.copy = function (source, target, obj1, obj2, mods, merge) {
	  if (typeof mods === 'function' || Array.isArray(mods)) {
	    this.set(target,
	      _process(
	        // clone what is picked
	        JSON.parse(
	          JSON.stringify(
	            this.pick(source, obj1, false)
	          )
	        ),
	        mods
	      ), obj2, merge)
	  } else {
	    merge = mods
	    this.set(target, this.pick(source, obj1, false), obj2, merge)
	  }

	  return obj2
	}

	function isObject (val) {
	  return Object.prototype.toString.call(val) === '[object Object]'
	}

	/**
	 *
	 * Set a property on an object using dot notation.
	 *
	 * @param {String} path
	 * @param {Mixed} val
	 * @param {Object} obj
	 * @param {Boolean} merge
	 */
	DotObject.prototype.set = function (path, val, obj, merge) {
	  var i
	  var k
	  var keys
	  var key

	  // Do not operate if the value is undefined.
	  if (typeof val === 'undefined') {
	    return obj
	  }
	  keys = parsePath(path, this.seperator)

	  for (i = 0; i < keys.length; i++) {
	    key = keys[i]
	    if (i === (keys.length - 1)) {
	      if (merge && isObject(val) && isObject(obj[key])) {
	        for (k in val) {
	          if (val.hasOwnProperty(k)) {
	            obj[key][k] = val[k]
	          }
	        }
	      } else if (merge && Array.isArray(obj[key]) && Array.isArray(val)) {
	        for (var j = 0; j < val.length; j++) {
	          obj[keys[i]].push(val[j])
	        }
	      } else {
	        obj[key] = val
	      }
	    } else if (
	      // force the value to be an object
	      !obj.hasOwnProperty(key) ||
	      (!isObject(obj[key]) && !Array.isArray(obj[key]))
	    ) {
	      // initialize as array if next key is numeric
	      if (/^\d+$/.test(keys[i + 1])) {
	        obj[key] = []
	      } else {
	        obj[key] = {}
	      }
	    }
	    obj = obj[key]
	  }
	  return obj
	}

	/**
	 *
	 * Transform an object
	 *
	 * Usage:
	 *
	 *   var obj = {
	 *     "id": 1,
	  *    "some": {
	  *      "thing": "else"
	  *    }
	 *   }
	 *
	 *   var transform = {
	 *     "id": "nr",
	  *    "some.thing": "name"
	 *   }
	 *
	 *   var tgt = dot.transform(transform, obj)
	 *
	 * @param {Object} recipe Transform recipe
	 * @param {Object} obj Object to be transformed
	 * @param {Array} mods modifiers for the target
	 */
	DotObject.prototype.transform = function (recipe, obj, tgt) {
	  obj = obj || {}
	  tgt = tgt || {}
	  Object.keys(recipe).forEach(function (key) {
	    this.set(recipe[key], this.pick(key, obj), tgt)
	  }.bind(this))
	  return tgt
	}

	/**
	 *
	 * Convert object to dotted-key/value pair
	 *
	 * Usage:
	 *
	 *   var tgt = dot.dot(obj)
	 *
	 *   or
	 *
	 *   var tgt = {}
	 *   dot.dot(obj, tgt)
	 *
	 * @param {Object} obj source object
	 * @param {Object} tgt target object
	 * @param {Array} path path array (internal)
	 */
	DotObject.prototype.dot = function (obj, tgt, path) {
	  tgt = tgt || {}
	  path = path || []
	  Object.keys(obj).forEach(function (key) {
	    if (Object(obj[key]) === obj[key]) {
	      return this.dot(obj[key], tgt, path.concat(key))
	    } else {
	      tgt[path.concat(key).join(this.seperator)] = obj[key]
	    }
	  }.bind(this))
	  return tgt
	}

	DotObject.pick = wrap('pick')
	DotObject.move = wrap('move')
	DotObject.transfer = wrap('transfer')
	DotObject.transform = wrap('transform')
	DotObject.copy = wrap('copy')
	DotObject.object = wrap('object')
	DotObject.str = wrap('str')
	DotObject.set = wrap('set')
	DotObject.del = DotObject.remove = wrap('remove')
	DotObject.dot = wrap('dot')

	;['override', 'overwrite'].forEach(function (prop) {
	  Object.defineProperty(DotObject, prop, {
	    get: function () {
	      return dotDefault.override
	    },
	    set: function (val) {
	      dotDefault.override = !!val
	    }
	  })
	})

	Object.defineProperty(DotObject, 'useArray', {
	  get: function () {
	    return dotDefault.useArray
	  },
	  set: function (val) {
	    dotDefault.useArray = val
	  }
	})

	DotObject._process = _process

	module.exports = DotObject;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.deepmerge = factory();
	    }
	}(this, function () {

	return function deepmerge(target, src) {
	    var array = Array.isArray(src);
	    var dst = array && [] || {};

	    if (array) {
	        target = target || [];
	        dst = dst.concat(target);
	        src.forEach(function(e, i) {
	            if (typeof dst[i] === 'undefined') {
	                dst[i] = e;
	            } else if (typeof e === 'object') {
	                dst[i] = deepmerge(target[i], e);
	            } else {
	                if (target.indexOf(e) === -1) {
	                    dst.push(e);
	                }
	            }
	        });
	    } else {
	        if (target && typeof target === 'object') {
	            Object.keys(target).forEach(function (key) {
	                dst[key] = target[key];
	            })
	        }
	        Object.keys(src).forEach(function (key) {
	            if (typeof src[key] !== 'object' || !src[key]) {
	                dst[key] = src[key];
	            }
	            else {
	                if (!target[key]) {
	                    dst[key] = src[key];
	                } else {
	                    dst[key] = deepmerge(target[key], src[key]);
	                }
	            }
	        });
	    }

	    return dst;
	}

	}));


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _fixedDataTable = __webpack_require__(3);

	var _underscore = __webpack_require__(55);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _portal = __webpack_require__(63);

	var _portal2 = _interopRequireDefault(_portal);

	var _tween = __webpack_require__(81);

	var _tween2 = _interopRequireDefault(_tween);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	//Const
	var SELECTOR_COL_NAME = 'selector-multiple-column'; // Name of the selector column
	var DEFAULT_SORT_DIRECTION = 'DEF';
	var ASCENDING_SORT_DIRECTION = 'ASC';
	var DESCENDING_SORT_DIRECTION = 'DESC';

	/**
	 *  Possible Sort Types Default || ASC || DESC
	 */
	var SortTypes = {
	  ASC: ASCENDING_SORT_DIRECTION,
	  DESC: DESCENDING_SORT_DIRECTION,
	  DEF: DEFAULT_SORT_DIRECTION
	};

	/**
	 *  Asociated Icons when it's sorting
	 */
	var SortIcons = {
	  ASC: "fa fa-long-arrow-up",
	  DESC: "fa fa-long-arrow-down",
	  DEF: null
	};

	/**
	 *  Icons for column filter
	 */
	var ColumnFilterIcons = {
	  DEF: "fa fa-caret-square-o-down",
	  NONE: null
	};

	//REQUEST ANIMATION FRAME POLYFILL
	;(function () {
	  'use strict';

	  var lastTime = 0;
	  var vendors = ['webkit', 'moz'];
	  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	  }

	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function (callback, element) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      var id = window.setTimeout(function () {
	        callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }

	  if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function (id) {
	      clearTimeout(id);
	    };
	  }
	})();

	/**
	 * Stateless component which render the header cell of a column. Also if you send a react component in the props.filterComponent
	 * that will be rendered under the column header (when user click). That component must have a function called afterSelect (that
	 * get the selection (selected values)) and another one called afterSort that get the new sort direction if that changes, also
	 * data (column data, {value: column-values-to-filter, label: column-values-to-display}) and the current selection.
	 *
	 * Example usage via from a `Column`:
	 * ```
	 * const MyColumn = (
	 *     <Column
	 *        header={
	 *            <HeaderCell
	 *              sortDir={ASC || DESC || DEF}
	 *              sortable={true || false}
	 *            />
	 *              {children (label || Component)}
	 *            </HeaderCell>
	 *        }
	 *        ...
	 *     />
	 * );
	 * ```
	 */
	var HeaderCell = function HeaderCell(props) {
	  var sortDir = props.sortDir || null,
	      sortable = props.sortable;
	  var children = props.children || null;
	  var sortIcon = null,
	      columnFilter = null,
	      isSelectorCol = props.columnKey === SELECTOR_COL_NAME ? true : false;
	  var userClass = props.userClassName + ' ' + props.columnHeaderClass || '';
	  var className = sortable ? "propertable-header-cell sortable " + userClass : "propertable-header-cell not-sortable " + userClass;
	  var isSortedOrFiltered = '';

	  // Check for custom icons array and if the column is sortable
	  if (!_underscore2['default'].isNull(sortDir) && sortable) {
	    if (_underscore2['default'].isNull(props.sortIcons) || _underscore2['default'].isUndefined(props.sortIcons)) {
	      //default sort icons
	      sortIcon = _underscore2['default'].isNull(props.filterComponent) || isSelectorCol ? SortIcons[sortDir] : ColumnFilterIcons[DEFAULT_SORT_DIRECTION];
	    } else {
	      // custom sort icons
	      sortIcon = props.sortIcons[sortDir];
	    }
	  } else {
	    sortIcon = _underscore2['default'].isNull(props.filterComponent) ? SortIcons[DEFAULT_SORT_DIRECTION] : ColumnFilterIcons['NONE'];
	  }

	  // Check if the columns have complex filter to be rendered behind the column
	  if (props.filterComponent && sortable && !isSelectorCol) {
	    isSortedOrFiltered = props.isSortedOrFiltered ? ' _isFilteredOrSorted' : '';
	    sortIcon = _react2['default'].createElement('i', { className: sortIcon + isSortedOrFiltered });
	    sortIcon = buildColumnFilter(props, sortIcon);
	  } else {
	    sortIcon = _underscore2['default'].isString(sortIcon) ? _react2['default'].createElement('i', { className: sortIcon }) : sortIcon;
	  }

	  // Change sort direction on click in label when using a complex filter
	  if (children && props.filterComponent && !isSelectorCol) {
	    children = _react2['default'].createElement(
	      'span',
	      { onClick: function onClick(e) {
	          onSortChange(e, props, sortable);
	        } },
	      children
	    );
	  }

	  return _react2['default'].createElement(
	    'div',
	    { key: props.uniqueId + '-column-header' },
	    _react2['default'].createElement(
	      _fixedDataTable.Cell,
	      _extends({
	        key: props.uniqueId + '-column-header-cell',
	        className: className + ' column-header_header',
	        onClick: function onClick(e) {
	          if (!props.filterComponent || isSelectorCol) {
	            onSortChange(e, props, sortable);
	          }
	        }
	      }, props),
	      children,
	      '\xA0',
	      sortIcon
	    )
	  );
	};

	/**
	 * Build and return the complex filter received in params
	 *
	 * @param {object} props      The props of the component
	 * @param {object} sortIcon   Icon to open / close
	 * @return {object}           The filter to be rendered
	 */
	var buildColumnFilter = function buildColumnFilter(props, icon) {
	  var filter = void 0,
	      afterSelect = void 0,
	      afterSort = void 0,
	      afterClear = void 0;
	  var portalWidth = props.filterWidth || 280;

	  afterSelect = function afterSelect(selection) {
	    if (typeof props.columnFilter === 'function') {
	      props.columnFilter(props.columnKey, selection);
	    }
	  };

	  afterSort = function afterSort(direction) {
	    if (typeof props.onSortChange === 'function') {
	      props.onSortChange(props.columnKey, direction);
	    }
	  };

	  afterClear = function afterClear(selection, direction) {
	    // must be ([], 'DEF')
	    if (typeof props.columnFilter === 'function') {
	      props.columnFilter(props.columnKey, selection, direction);
	    }
	  };

	  filter = _react2['default'].createElement(
	    _portal2['default'],
	    {
	      key: props.uniqueId + '-column-header-component',
	      className: 'propertable column-complex-filter',
	      beforeClose: beforeClose,
	      closeOnEsc: true,
	      closeOnOutsideClick: true,
	      onOpen: onOpen,
	      openByClickOn: icon,
	      iconColor: props.iconColor,
	      iconDefColor: props.iconDefColor,
	      isSortedOrFiltered: props.isSortedOrFiltered,
	      width: portalWidth,
	      style: { opacity: 0, position: 'fixed', width: portalWidth }
	    },
	    _react2['default'].createElement(props.filterComponent, _extends({
	      key: props.uniqueId + '-column-header-component-filter',
	      data: props.data // Initial data Inmutable
	      , rawdata: props.rawdata // Raw data Inmutable
	      , indexed: props.indexed // initial Indexed Obj
	      , selection: props.selection,
	      idField: props.col,
	      displayField: props.col,
	      lang: props.lang,
	      sort: props.sortDir,
	      rowFormater: props.columnFormater,
	      uniqueId: props.uniqueId,
	      afterSelect: afterSelect,
	      afterSort: afterSort,
	      afterClear: afterClear
	    }, props.extaProps))
	  );

	  return filter;
	};

	/**
	 * Get the next sort direction to sort the current column.
	 *
	 * @param {string}  sortDir  Current sort direction.
	 * @return {string}  nextSortDir  Next sort direction.
	 */
	var nextSortDirection = function nextSortDirection(sortDir) {
	  if (sortDir) {
	    // Second sort
	    if (sortDir === SortTypes.DEF) return nextSortDirection(null); // From default start again
	    else return sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.DEF; // Third sort. From ASC to DESC then from DESC back to default
	  }
	  return SortTypes.ASC; // First sort
	};

	/**
	 * Callback called each time the header been clicked. If the column is sortable it will call the upper method with the
	 * same name sending the key of the column clicked and the next sort direction. The sort direction change with each click.
	 *
	 * @param {object}    e         Event which call the function
	 * @param {object}    props     Props of the component
	 * @param {boolean}   sortable  If the current column is sortable or not
	 */
	var onSortChange = function onSortChange(e, props, sortable) {
	  e.preventDefault();
	  // If you use a complex filter by column then it will be rendered under the header and has it's own methods
	  if (sortable) {
	    if (typeof props.onSortChange === 'function') {
	      props.onSortChange(props.columnKey, nextSortDirection(props.sortDir));
	    }
	  }
	};

	function animate(time) {
	  requestAnimationFrame(animate);
	  _tween2['default'].update(time);
	}

	/**
	 * On open Portal. Animation
	 */
	function onOpen(node) {
	  requestAnimationFrame(animate);

	  new _tween2['default'].Tween({ opacity: 0 }).to({ opacity: 1 }, 300).onUpdate(function () {
	    node.style.opacity = this.opacity;
	  }).start();
	}

	/**
	 * Before close Portal. Animation
	 */
	function beforeClose(node, removeFromDom) {
	  new _tween2['default'].Tween({ opacity: 1 }).to({ opacity: 0 }, 500).easing(_tween2['default'].Easing.Cubic.Out).onUpdate(function () {
	    node.style.opacity = this.opacity;
	  }).onComplete(removeFromDom).start();
	}

	exports['default'] = HeaderCell;
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(23);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _CSSPropertyOperations = __webpack_require__(64);

	var _CSSPropertyOperations2 = _interopRequireDefault(_CSSPropertyOperations);

	var _reactImmutableRenderMixin = __webpack_require__(76);

	var _tween = __webpack_require__(81);

	var _tween2 = _interopRequireDefault(_tween);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Portal vs 2.1.1 All rights to Vojtech Miksu. This is a copy with some modifications to fill the needs of this project.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://github.com/tajo/react-portal
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               The MIT License (MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2016 Vojtech Miksu
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Permission is hereby granted, free of charge, to any person obtaining a copy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of this software and associated documentation files (the "Software"), to deal
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               in the Software without restriction, including without limitation the rights
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               copies of the Software, and to permit persons to whom the Software is
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               furnished to do so, subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               The above copyright notice and this permission notice shall be included in all
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               copies or substantial portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

	var KEYCODES = {
	  ESCAPE: 27
	};

	var Portal = function (_React$Component) {
	  _inherits(Portal, _React$Component);

	  function Portal() {
	    _classCallCheck(this, Portal);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

	    _this.state = {
	      active: false,
	      x: 0,
	      y: 0,
	      width: null,
	      height: null,
	      element: null // element clicked to open the portal
	    };
	    _this.handleWrapperClick = _this.handleWrapperClick.bind(_this);
	    _this.closePortal = _this.closePortal.bind(_this);
	    _this.handleOutsideMouseClick = _this.handleOutsideMouseClick.bind(_this);
	    _this.handleKeydown = _this.handleKeydown.bind(_this);
	    _this.portal = null;
	    _this.node = null;
	    return _this;
	  }

	  Portal.prototype.componentDidMount = function componentDidMount() {
	    if (this.props.closeOnEsc) {
	      document.addEventListener('keydown', this.handleKeydown);
	    }

	    if (this.props.closeOnOutsideClick) {
	      document.addEventListener('mouseup', this.handleOutsideMouseClick);
	      document.addEventListener('touchstart', this.handleOutsideMouseClick);
	      window.addEventListener('resize', this.handleResize.bind(this));
	      window.addEventListener("scroll", this.handleScroll.bind(this));
	    }

	    if (this.props.isOpened) {
	      this.openPortal();
	    }
	  };

	  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
	    // portal's 'is open' state is handled through the prop isOpened
	    if (typeof newProps.isOpened !== 'undefined') {
	      if (newProps.isOpened) {
	        if (this.state.active) {
	          this.renderPortal(newProps);
	        } else {
	          this.openPortal(newProps);
	        }
	      }
	      if (!newProps.isOpened && this.state.active) {
	        this.closePortal();
	      }
	    }

	    // portal handles its own 'is open' state
	    if (typeof newProps.isOpened === 'undefined' && this.state.active) {
	      this.renderPortal(newProps);
	    }
	  };

	  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.props.closeOnEsc) {
	      document.removeEventListener('keydown', this.handleKeydown);
	    }

	    if (this.props.closeOnOutsideClick) {
	      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
	      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
	      window.removeEventListener('resize', this.handleResize.bind(this));
	      window.removeEventListener("scroll", this.handleScroll.bind(this));
	    }

	    this.closePortal(true);
	  };

	  Portal.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    var propschanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.props, nextProps);
	    var statechanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.state, nextState);
	    var somethingchanged = propschanged || statechanged;
	    var mustUpdate = nextState.element && this.props.isSortedOrFiltered !== nextProps.isSortedOrFiltered;

	    if (propschanged) {
	      if (mustUpdate && !nextProps.isSortedOrFiltered) {
	        nextState.element.style.color = this.props.iconDefColor; // back to default color
	      } else if (mustUpdate && nextProps.isSortedOrFiltered) {
	        nextState.element.style.color = this.props.iconColor;
	      }
	    }
	    return somethingchanged;
	  };

	  Portal.prototype.handleResize = function handleResize(e) {
	    // Close portal if rendered
	    if (this.node) {
	      this.closePortal();
	    }
	  };

	  Portal.prototype.handleScroll = function handleScroll(e) {
	    // Move portal if rendered
	    if (this.node) {
	      var rect = this.state.element.getBoundingClientRect(),
	          top = void 0,
	          y = this.state.y,
	          node = this.node;

	      top = rect.top + 5;

	      // Move node to new position
	      _CSSPropertyOperations2['default'].setValueForStyles(node, { top: top });
	      this.setState({ y: top });
	    }
	  };

	  Portal.prototype.renderPortal = function renderPortal(props) {
	    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.x;
	    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.y;

	    var style = props.style || {},
	        width = this.props.width || 280;

	    if (!this.node) {
	      this.node = document.createElement('div');

	      if (props.className) {
	        this.node.className = props.className;
	      }

	      if (this.props.repositioning) {
	        style.position = 'fixed';
	        style.top = y - 1;
	        style.left = x - width + 12;
	        if (this.props.width) style.width = this.props.width;
	        if (this.props.height) style.height = this.props.height;
	        if (style.left < 0) style.left = x + 1;
	      }

	      _CSSPropertyOperations2['default'].setValueForStyles(this.node, style);
	      document.body.appendChild(this.node);
	    }

	    this.portal = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, _react2['default'].cloneElement(props.children, { closePortal: this.closePortal }), this.node, this.props.onUpdate);
	  };

	  Portal.prototype.render = function render() {
	    if (this.props.openByClickOn) {
	      return _react2['default'].cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick });
	    } else {
	      return null;
	    }
	  };

	  Portal.prototype.handleWrapperClick = function handleWrapperClick(e) {
	    e.preventDefault();
	    e.stopPropagation();

	    if (this.state.active) {
	      return;
	    }

	    var element = this.state.element,
	        position = e.target.getBoundingClientRect();

	    // element which call
	    if (!element) {
	      element = _reactDom2['default'].findDOMNode(e.target);
	      element.style.color = this.props.iconColor;
	    } else {
	      if (this.rgb2hex(element.style.color) == this.props.iconColor && !this.props.isSortedOrFiltered) {
	        element.style.color = this.props.iconDefColor;
	      } else {
	        element.style.color = this.props.iconColor;
	      }
	    }

	    this.openPortal(this.props, position.left, position.top + position.height, element);
	  };

	  Portal.prototype.openPortal = function openPortal() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
	    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.x;
	    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.y;
	    var element = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.state.element;

	    this.setState({ active: true, x: x, y: y, element: element });
	    this.renderPortal(props, x, y);

	    this.props.onOpen(this.node);
	  };

	  Portal.prototype.closePortal = function closePortal() {
	    var _this2 = this;

	    var isUnmounted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var resetPortalState = function resetPortalState() {
	      if (_this2.node) {
	        _reactDom2['default'].unmountComponentAtNode(_this2.node);
	        document.body.removeChild(_this2.node);
	      }
	      _this2.portal = null;
	      _this2.node = null;
	      if (!isUnmounted) {
	        _this2.setState({ active: false });
	      }
	    };

	    if (this.state.element && !this.props.isSortedOrFiltered) {
	      this.state.element.style.color = this.props.iconDefColor; // back to default color
	    }

	    if (this.state.active) {
	      if (this.props.beforeClose) {
	        this.props.beforeClose(this.node, resetPortalState);
	      } else {
	        resetPortalState();
	      }

	      this.props.onClose();
	    }
	  };

	  //Function to convert hex format to a rgb color


	  Portal.prototype.rgb2hex = function rgb2hex(rgb) {
	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
	  };

	  Portal.prototype.hex = function hex(x) {
	    var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
	    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	  };

	  Portal.prototype.handleOutsideMouseClick = function handleOutsideMouseClick(e) {
	    if (!this.state.active) {
	      return;
	    }

	    var root = (0, _reactDom.findDOMNode)(this.portal);
	    if (root.contains(e.target) || e.button && e.button !== 0) {
	      return;
	    }

	    e.stopPropagation();
	    this.closePortal();
	  };

	  Portal.prototype.handleKeydown = function handleKeydown(e) {
	    if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
	      this.closePortal();
	    }
	  };

	  return Portal;
	}(_react2['default'].Component);

	Portal.propTypes = {
	  className: _react2['default'].PropTypes.string,
	  style: _react2['default'].PropTypes.object,
	  children: _react2['default'].PropTypes.element.isRequired,
	  openByClickOn: _react2['default'].PropTypes.element,
	  closeOnEsc: _react2['default'].PropTypes.bool,
	  closeOnOutsideClick: _react2['default'].PropTypes.bool,
	  isOpened: _react2['default'].PropTypes.bool,
	  onOpen: _react2['default'].PropTypes.func,
	  onClose: _react2['default'].PropTypes.func,
	  beforeClose: _react2['default'].PropTypes.func,
	  onUpdate: _react2['default'].PropTypes.func,
	  isSortedOrFiltered: _react2['default'].PropTypes.bool,
	  repositioning: _react2['default'].PropTypes.bool
	};

	Portal.defaultProps = {
	  onOpen: function onOpen() {},
	  onClose: function onClose() {},
	  onUpdate: function onUpdate() {},
	  isSortedOrFiltered: false,
	  repositioning: true
	};

	exports['default'] = Portal;
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSPropertyOperations
	 * @typechecks static-only
	 */

	'use strict';

	var CSSProperty = __webpack_require__(65);
	var ExecutionEnvironment = __webpack_require__(66);
	var ReactPerf = __webpack_require__(67);

	var camelizeStyleName = __webpack_require__(68);
	var dangerousStyleValue = __webpack_require__(70);
	var hyphenateStyleName = __webpack_require__(71);
	var memoizeStringOnly = __webpack_require__(73);
	var warning = __webpack_require__(74);

	var processStyleName = memoizeStringOnly(function (styleName) {
	  return hyphenateStyleName(styleName);
	});

	var hasShorthandPropertyBug = false;
	var styleFloatAccessor = 'cssFloat';
	if (ExecutionEnvironment.canUseDOM) {
	  var tempStyle = document.createElement('div').style;
	  try {
	    // IE8 throws "Invalid argument." if resetting shorthand style properties.
	    tempStyle.font = '';
	  } catch (e) {
	    hasShorthandPropertyBug = true;
	  }
	  // IE8 only supports accessing cssFloat (standard) as styleFloat
	  if (document.documentElement.style.cssFloat === undefined) {
	    styleFloatAccessor = 'styleFloat';
	  }
	}

	if (false) {
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

	  // style values shouldn't contain a semicolon
	  var badStyleValueWithSemicolonPattern = /;\s*$/;

	  var warnedStyleNames = {};
	  var warnedStyleValues = {};

	  var warnHyphenatedStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?', name, camelizeStyleName(name)) : undefined;
	  };

	  var warnBadVendoredStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1)) : undefined;
	  };

	  var warnStyleValueWithSemicolon = function (name, value) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon. ' + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, '')) : undefined;
	  };

	  /**
	   * @param {string} name
	   * @param {*} value
	   */
	  var warnValidStyle = function (name, value) {
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value);
	    }
	  };
	}

	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {

	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @return {?string}
	   */
	  createMarkupForStyles: function (styles) {
	    var serialized = '';
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = styles[styleName];
	      if (false) {
	        warnValidStyle(styleName, styleValue);
	      }
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue) + ';';
	      }
	    }
	    return serialized || null;
	  },

	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   */
	  setValueForStyles: function (node, styles) {
	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      if (false) {
	        warnValidStyle(styleName, styles[styleName]);
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
	      if (styleName === 'float') {
	        styleName = styleFloatAccessor;
	      }
	      if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }

	};

	ReactPerf.measureMethods(CSSPropertyOperations, 'CSSPropertyOperations', {
	  setValueForStyles: 'setValueForStyles'
	});

	module.exports = CSSPropertyOperations;

/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSProperty
	 */

	'use strict';

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  animationIterationCount: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  stopOpacity: true,
	  strokeDashoffset: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundAttachment: true,
	    backgroundColor: true,
	    backgroundImage: true,
	    backgroundPositionX: true,
	    backgroundPositionY: true,
	    backgroundRepeat: true
	  },
	  backgroundPosition: {
	    backgroundPositionX: true,
	    backgroundPositionY: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  },
	  outline: {
	    outlineWidth: true,
	    outlineStyle: true,
	    outlineColor: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	module.exports = CSSProperty;

/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPerf
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * ReactPerf is a general AOP system designed to measure performance. This
	 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
	 */
	var ReactPerf = {
	  /**
	   * Boolean to enable/disable measurement. Set to false by default to prevent
	   * accidental logging and perf loss.
	   */
	  enableMeasure: false,

	  /**
	   * Holds onto the measure function in use. By default, don't measure
	   * anything, but we'll override this if we inject a measure function.
	   */
	  storedMeasure: _noMeasure,

	  /**
	   * @param {object} object
	   * @param {string} objectName
	   * @param {object<string>} methodNames
	   */
	  measureMethods: function (object, objectName, methodNames) {
	    if (false) {
	      for (var key in methodNames) {
	        if (!methodNames.hasOwnProperty(key)) {
	          continue;
	        }
	        object[key] = ReactPerf.measure(objectName, methodNames[key], object[key]);
	      }
	    }
	  },

	  /**
	   * Use this to wrap methods you want to measure. Zero overhead in production.
	   *
	   * @param {string} objName
	   * @param {string} fnName
	   * @param {function} func
	   * @return {function}
	   */
	  measure: function (objName, fnName, func) {
	    if (false) {
	      var measuredFunc = null;
	      var wrapper = function () {
	        if (ReactPerf.enableMeasure) {
	          if (!measuredFunc) {
	            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
	          }
	          return measuredFunc.apply(this, arguments);
	        }
	        return func.apply(this, arguments);
	      };
	      wrapper.displayName = objName + '_' + fnName;
	      return wrapper;
	    }
	    return func;
	  },

	  injection: {
	    /**
	     * @param {function} measure
	     */
	    injectMeasure: function (measure) {
	      ReactPerf.storedMeasure = measure;
	    }
	  }
	};

	/**
	 * Simply passes through the measured function, without measuring it.
	 *
	 * @param {string} objName
	 * @param {string} fnName
	 * @param {function} func
	 * @return {function}
	 */
	function _noMeasure(objName, fnName, func) {
	  return func;
	}

	module.exports = ReactPerf;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelizeStyleName
	 * @typechecks
	 */

	'use strict';

	var camelize = __webpack_require__(69);

	var msPattern = /^-ms-/;

	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}

	module.exports = camelizeStyleName;

/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	"use strict";

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule dangerousStyleValue
	 * @typechecks static-only
	 */

	'use strict';

	var CSSProperty = __webpack_require__(65);

	var isUnitlessNumber = CSSProperty.isUnitlessNumber;

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }

	  if (typeof value === 'string') {
	    value = value.trim();
	  }
	  return value + 'px';
	}

	module.exports = dangerousStyleValue;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenateStyleName
	 * @typechecks
	 */

	'use strict';

	var hyphenate = __webpack_require__(72);

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	module.exports = hyphenateStyleName;

/***/ },
/* 72 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenate
	 * @typechecks
	 */

	'use strict';

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;

/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule memoizeStringOnly
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */
	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}

	module.exports = memoizeStringOnly;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	'use strict';

	var emptyFunction = __webpack_require__(75);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (false) {
	  warning = function (condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;

/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shallowEqualImmutable = exports.shouldComponentUpdate = exports.immutableRenderDecorator = exports.default = undefined;

	var _shouldComponentUpdate = __webpack_require__(77);

	var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

	var _shallowEqualImmutable = __webpack_require__(78);

	var _shallowEqualImmutable2 = _interopRequireDefault(_shallowEqualImmutable);

	var _immutableRenderMixin = __webpack_require__(79);

	var _immutableRenderMixin2 = _interopRequireDefault(_immutableRenderMixin);

	var _immutableRenderDecorator = __webpack_require__(80);

	var _immutableRenderDecorator2 = _interopRequireDefault(_immutableRenderDecorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _immutableRenderMixin2.default;
	exports.immutableRenderDecorator = _immutableRenderDecorator2.default;
	exports.shouldComponentUpdate = _shouldComponentUpdate2.default;
	exports.shallowEqualImmutable = _shallowEqualImmutable2.default;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = shouldComponentUpdate;

	var _shallowEqualImmutable = __webpack_require__(78);

	var _shallowEqualImmutable2 = _interopRequireDefault(_shallowEqualImmutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function shouldComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqualImmutable2.default)(this.props, nextProps) || !(0, _shallowEqualImmutable2.default)(this.state, nextState);
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = shallowEqualImmutable;

	var _immutable = __webpack_require__(54);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var is = _immutable2.default.is.bind(_immutable2.default);

	function shallowEqualImmutable(objA, objB) {
	  if (objA === objB || is(objA, objB)) {
	    return true;
	  }

	  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _shouldComponentUpdate = __webpack_require__(77);

	var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  shouldComponentUpdate: _shouldComponentUpdate2.default
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = immutableRenderDecorator;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _shouldComponentUpdate = __webpack_require__(77);

	var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Makes the given component "pure".
	 *
	 * @param object Target Component.
	 */
	function immutableRenderDecorator(Target) {
	  var Wrapper = function (_Component) {
	    _inherits(Wrapper, _Component);

	    function Wrapper() {
	      _classCallCheck(this, Wrapper);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(Wrapper).apply(this, arguments));
	    }

	    _createClass(Wrapper, [{
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(Target, this.props, this.props.children);
	      }
	    }]);

	    return Wrapper;
	  }(_react.Component);

	  Wrapper.prototype.shouldComponentUpdate = _shouldComponentUpdate2.default;

	  return Wrapper;
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/tweenjs/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */

	// Include a performance.now polyfill
	(function () {

		if ('performance' in window === false) {
			window.performance = {};
		}

		// IE 8
		Date.now = (Date.now || function () {
			return new Date().getTime();
		});

		if ('now' in window.performance === false) {
			var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart
			                                                                                    : Date.now();

			window.performance.now = function () {
				return Date.now() - offset;
			};
		}

	})();

	var TWEEN = TWEEN || (function () {

		var _tweens = [];

		return {

			getAll: function () {

				return _tweens;

			},

			removeAll: function () {

				_tweens = [];

			},

			add: function (tween) {

				_tweens.push(tween);

			},

			remove: function (tween) {

				var i = _tweens.indexOf(tween);

				if (i !== -1) {
					_tweens.splice(i, 1);
				}

			},

			update: function (time) {

				if (_tweens.length === 0) {
					return false;
				}

				var i = 0;

				time = time !== undefined ? time : window.performance.now();

				while (i < _tweens.length) {

					if (_tweens[i].update(time)) {
						i++;
					} else {
						_tweens.splice(i, 1);
					}

				}

				return true;

			}
		};

	})();

	TWEEN.Tween = function (object) {

		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;

		// Set all starting values present on the target object
		for (var field in object) {
			_valuesStart[field] = parseFloat(object[field], 10);
		}

		this.to = function (properties, duration) {

			if (duration !== undefined) {
				_duration = duration;
			}

			_valuesEnd = properties;

			return this;

		};

		this.start = function (time) {

			TWEEN.add(this);

			_isPlaying = true;

			_onStartCallbackFired = false;

			_startTime = time !== undefined ? time : window.performance.now();
			_startTime += _delayTime;

			for (var property in _valuesEnd) {

				// Check if an Array was provided as property value
				if (_valuesEnd[property] instanceof Array) {

					if (_valuesEnd[property].length === 0) {
						continue;
					}

					// Create a local copy of the Array with the start value at the front
					_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);

				}

				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (_valuesStart[property] === undefined) {
					continue;
				}

				_valuesStart[property] = _object[property];

				if ((_valuesStart[property] instanceof Array) === false) {
					_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
				}

				_valuesStartRepeat[property] = _valuesStart[property] || 0;

			}

			return this;

		};

		this.stop = function () {

			if (!_isPlaying) {
				return this;
			}

			TWEEN.remove(this);
			_isPlaying = false;

			if (_onStopCallback !== null) {
				_onStopCallback.call(_object);
			}

			this.stopChainedTweens();
			return this;

		};

		this.stopChainedTweens = function () {

			for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
				_chainedTweens[i].stop();
			}

		};

		this.delay = function (amount) {

			_delayTime = amount;
			return this;

		};

		this.repeat = function (times) {

			_repeat = times;
			return this;

		};

		this.yoyo = function (yoyo) {

			_yoyo = yoyo;
			return this;

		};


		this.easing = function (easing) {

			_easingFunction = easing;
			return this;

		};

		this.interpolation = function (interpolation) {

			_interpolationFunction = interpolation;
			return this;

		};

		this.chain = function () {

			_chainedTweens = arguments;
			return this;

		};

		this.onStart = function (callback) {

			_onStartCallback = callback;
			return this;

		};

		this.onUpdate = function (callback) {

			_onUpdateCallback = callback;
			return this;

		};

		this.onComplete = function (callback) {

			_onCompleteCallback = callback;
			return this;

		};

		this.onStop = function (callback) {

			_onStopCallback = callback;
			return this;

		};

		this.update = function (time) {

			var property;
			var elapsed;
			var value;

			if (time < _startTime) {
				return true;
			}

			if (_onStartCallbackFired === false) {

				if (_onStartCallback !== null) {
					_onStartCallback.call(_object);
				}

				_onStartCallbackFired = true;

			}

			elapsed = (time - _startTime) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			value = _easingFunction(elapsed);

			for (property in _valuesEnd) {

				// Don't update properties that do not exist in the source object
				if (_valuesStart[property] === undefined) {
					continue;
				}

				var start = _valuesStart[property] || 0;
				var end = _valuesEnd[property];

				if (end instanceof Array) {

					_object[property] = _interpolationFunction(end, value);

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if (typeof (end) === 'string') {

						if (end.startsWith('+') || end.startsWith('-')) {
							end = start + parseFloat(end, 10);
						} else {
							end = parseFloat(end, 10);
						}
					}

					// Protect against non numeric properties.
					if (typeof (end) === 'number') {
						_object[property] = start + (end - start) * value;
					}

				}

			}

			if (_onUpdateCallback !== null) {
				_onUpdateCallback.call(_object, value);
			}

			if (elapsed === 1) {

				if (_repeat > 0) {

					if (isFinite(_repeat)) {
						_repeat--;
					}

					// Reassign starting values, restart by making startTime = now
					for (property in _valuesStartRepeat) {

						if (typeof (_valuesEnd[property]) === 'string') {
							_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
						}

						if (_yoyo) {
							var tmp = _valuesStartRepeat[property];

							_valuesStartRepeat[property] = _valuesEnd[property];
							_valuesEnd[property] = tmp;
						}

						_valuesStart[property] = _valuesStartRepeat[property];

					}

					if (_yoyo) {
						_reversed = !_reversed;
					}

					_startTime = time + _delayTime;

					return true;

				} else {

					if (_onCompleteCallback !== null) {
						_onCompleteCallback.call(_object);
					}

					for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
						// Make the chained tweens start exactly at the time they should,
						// even if the `update()` method was called way past the duration of the tween
						_chainedTweens[i].start(_startTime + _duration);
					}

					return false;

				}

			}

			return true;

		};

	};


	TWEEN.Easing = {

		Linear: {

			None: function (k) {

				return k;

			}

		},

		Quadratic: {

			In: function (k) {

				return k * k;

			},

			Out: function (k) {

				return k * (2 - k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k;
				}

				return - 0.5 * (--k * (k - 2) - 1);

			}

		},

		Cubic: {

			In: function (k) {

				return k * k * k;

			},

			Out: function (k) {

				return --k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k + 2);

			}

		},

		Quartic: {

			In: function (k) {

				return k * k * k * k;

			},

			Out: function (k) {

				return 1 - (--k * k * k * k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k;
				}

				return - 0.5 * ((k -= 2) * k * k * k - 2);

			}

		},

		Quintic: {

			In: function (k) {

				return k * k * k * k * k;

			},

			Out: function (k) {

				return --k * k * k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k * k * k + 2);

			}

		},

		Sinusoidal: {

			In: function (k) {

				return 1 - Math.cos(k * Math.PI / 2);

			},

			Out: function (k) {

				return Math.sin(k * Math.PI / 2);

			},

			InOut: function (k) {

				return 0.5 * (1 - Math.cos(Math.PI * k));

			}

		},

		Exponential: {

			In: function (k) {

				return k === 0 ? 0 : Math.pow(1024, k - 1);

			},

			Out: function (k) {

				return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

			},

			InOut: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if ((k *= 2) < 1) {
					return 0.5 * Math.pow(1024, k - 1);
				}

				return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

			}

		},

		Circular: {

			In: function (k) {

				return 1 - Math.sqrt(1 - k * k);

			},

			Out: function (k) {

				return Math.sqrt(1 - (--k * k));

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return - 0.5 * (Math.sqrt(1 - k * k) - 1);
				}

				return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

			}

		},

		Elastic: {

			In: function (k) {

				var s;
				var a = 0.1;
				var p = 0.4;

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}

				return - (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));

			},

			Out: function (k) {

				var s;
				var a = 0.1;
				var p = 0.4;

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}

				return (a * Math.pow(2, - 10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);

			},

			InOut: function (k) {

				var s;
				var a = 0.1;
				var p = 0.4;

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}

				if ((k *= 2) < 1) {
					return - 0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
				}

				return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

			}

		},

		Back: {

			In: function (k) {

				var s = 1.70158;

				return k * k * ((s + 1) * k - s);

			},

			Out: function (k) {

				var s = 1.70158;

				return --k * k * ((s + 1) * k + s) + 1;

			},

			InOut: function (k) {

				var s = 1.70158 * 1.525;

				if ((k *= 2) < 1) {
					return 0.5 * (k * k * ((s + 1) * k - s));
				}

				return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

			}

		},

		Bounce: {

			In: function (k) {

				return 1 - TWEEN.Easing.Bounce.Out(1 - k);

			},

			Out: function (k) {

				if (k < (1 / 2.75)) {
					return 7.5625 * k * k;
				} else if (k < (2 / 2.75)) {
					return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
				} else if (k < (2.5 / 2.75)) {
					return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
				} else {
					return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
				}

			},

			InOut: function (k) {

				if (k < 0.5) {
					return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
				}

				return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.Linear;

			if (k < 0) {
				return fn(v[0], v[1], f);
			}

			if (k > 1) {
				return fn(v[m], v[m - 1], m - f);
			}

			return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

		},

		Bezier: function (v, k) {

			var b = 0;
			var n = v.length - 1;
			var pw = Math.pow;
			var bn = TWEEN.Interpolation.Utils.Bernstein;

			for (var i = 0; i <= n; i++) {
				b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
			}

			return b;

		},

		CatmullRom: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.CatmullRom;

			if (v[0] === v[m]) {

				if (k < 0) {
					i = Math.floor(f = m * (1 + k));
				}

				return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

			} else {

				if (k < 0) {
					return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
				}

				if (k > 1) {
					return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
				}

				return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

			}

		},

		Utils: {

			Linear: function (p0, p1, t) {

				return (p1 - p0) * t + p0;

			},

			Bernstein: function (n, i) {

				var fc = TWEEN.Interpolation.Utils.Factorial;

				return fc(n) / fc(i) / fc(n - i);

			},

			Factorial: (function () {

				var a = [1];

				return function (n) {

					var s = 1;

					if (a[n]) {
						return a[n];
					}

					for (var i = n; i > 1; i--) {
						s *= i;
					}

					a[n] = s;
					return s;

				};

			})(),

			CatmullRom: function (p0, p1, p2, p3, t) {

				var v0 = (p2 - p0) * 0.5;
				var v1 = (p3 - p1) * 0.5;
				var t2 = t * t;
				var t3 = t * t2;

				return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

			}

		}

	};

	// UMD (Universal Module Definition)
	(function (root) {

		if (true) {

			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return TWEEN;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

		} else if (typeof module !== 'undefined' && typeof exports === 'object') {

			// Node.js
			module.exports = TWEEN;

		} else if (root !== undefined) {

			// Global variable
			root.TWEEN = TWEEN;

		}

	})(this);


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _fixedDataTable = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Stateless component which render the aggregation data for the footer value formated.
	 *
	 * Example usage via from a `Column`:
	 * ```
	 * const MyColumn = (
	 *     <Column
	 *        footer={
	 *            <FooterCell
	 *				data={aggregated-data}
	 *				colData={current-column-data} //  {name: -, field: -, formater: -, ...}
	 *			/>
	 *        }
	 *        ...
	 *     />
	 * );
	 * ```
	 */
	var FooterCell = function FooterCell(props) {
	  var value = props.data.get(props.colData.aggregationField, null);
	  var operator = (value || value == 0) && props.colData.aggregationOperator ? props.colData.aggregationOperator : null;
	  var formattedValue = value && props.colData.formatter ? props.colData.formatter(value, props.colData, {}) : value;

	  return _react2['default'].createElement(
	    _fixedDataTable.Cell,
	    { className: "propertable-footer-cell" },
	    _react2['default'].createElement(
	      'div',
	      { className: 'footer-value' },
	      formattedValue
	    ),
	    _react2['default'].createElement(
	      'div',
	      { className: 'footer-aggregation-operator' },
	      operator
	    )
	  );
	};

	exports['default'] = FooterCell;
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var clone = (function() {
	'use strict';

	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	*/
	function clone(parent, circular, depth, prototype) {
	  var filter;
	  if (typeof circular === 'object') {
	    depth = circular.depth;
	    prototype = circular.prototype;
	    filter = circular.filter;
	    circular = circular.circular
	  }
	  // maintain two arrays for circular references, where corresponding parents
	  // and children have the same index
	  var allParents = [];
	  var allChildren = [];

	  var useBuffer = typeof Buffer != 'undefined';

	  if (typeof circular == 'undefined')
	    circular = true;

	  if (typeof depth == 'undefined')
	    depth = Infinity;

	  // recurse this function so we don't reset allParents and allChildren
	  function _clone(parent, depth) {
	    // cloning null always returns null
	    if (parent === null)
	      return null;

	    if (depth == 0)
	      return parent;

	    var child;
	    var proto;
	    if (typeof parent != 'object') {
	      return parent;
	    }

	    if (clone.__isArray(parent)) {
	      child = [];
	    } else if (clone.__isRegExp(parent)) {
	      child = new RegExp(parent.source, __getRegExpFlags(parent));
	      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
	    } else if (clone.__isDate(parent)) {
	      child = new Date(parent.getTime());
	    } else if (useBuffer && Buffer.isBuffer(parent)) {
	      child = new Buffer(parent.length);
	      parent.copy(child);
	      return child;
	    } else {
	      if (typeof prototype == 'undefined') {
	        proto = Object.getPrototypeOf(parent);
	        child = Object.create(proto);
	      }
	      else {
	        child = Object.create(prototype);
	        proto = prototype;
	      }
	    }

	    if (circular) {
	      var index = allParents.indexOf(parent);

	      if (index != -1) {
	        return allChildren[index];
	      }
	      allParents.push(parent);
	      allChildren.push(child);
	    }

	    for (var i in parent) {
	      var attrs;
	      if (proto) {
	        attrs = Object.getOwnPropertyDescriptor(proto, i);
	      }

	      if (attrs && attrs.set == null) {
	        continue;
	      }
	      child[i] = _clone(parent[i], depth - 1);
	    }

	    return child;
	  }

	  return _clone(parent, depth);
	}

	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function clonePrototype(parent) {
	  if (parent === null)
	    return null;

	  var c = function () {};
	  c.prototype = parent;
	  return new c();
	};

	// private utility functions

	function __objToStr(o) {
	  return Object.prototype.toString.call(o);
	};
	clone.__objToStr = __objToStr;

	function __isDate(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Date]';
	};
	clone.__isDate = __isDate;

	function __isArray(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Array]';
	};
	clone.__isArray = __isArray;

	function __isRegExp(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
	};
	clone.__isRegExp = __isRegExp;

	function __getRegExpFlags(re) {
	  var flags = '';
	  if (re.global) flags += 'g';
	  if (re.ignoreCase) flags += 'i';
	  if (re.multiline) flags += 'm';
	  return flags;
	};
	clone.__getRegExpFlags = __getRegExpFlags;

	return clone;
	})();

	if (typeof module === 'object' && module.exports) {
	  module.exports = clone;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(84).Buffer))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(85)
	var ieee754 = __webpack_require__(86)
	var isArray = __webpack_require__(87)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(84).Buffer, (function() { return this; }())))

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function getLens (b64) {
	  var len = b64.length

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=')
	  if (validLen === -1) validLen = len

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4)

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

	  var curByte = 0

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen

	  var i
	  for (i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)]
	    arr[curByte++] = (tmp >> 16) & 0xFF
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(
	      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
	    ))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    )
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    )
	  }

	  return parts.join('')
	}


/***/ },
/* 86 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 87 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var charMap = {
		'a': /[áÁàÀãÃâÂäÄåÅāĀąĄ]/g,
		'e': /[éÉèÈêÊëËēĒėĖęĘ]/g,
		'i': /[îÎíÍìÌïÏīĪįĮ]/g,
		'l': /[łŁ]/g,
		'o': /[ôÔòÒøØōŌóÓõÕöÖ]/g,
		'u': /[ûÛúÚùÙüÜūŪ]/g,
		'c': /[çÇčČćĆ]/g,
		's': /[śŚšŠ]/g,
		'z': /[źŹżŻ]/g,
		'': /[@#~$!º|"·&¬()=?¿¡*\^`´{};[\].\\]/g
	};

	exports['default'] = {
		normalize: function normalize(value) {
			var escapeLess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			var parseToLower = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
			var trim = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			var internalVal = value.toString();

			if (parseToLower && trim) {
				internalVal = internalVal.trim().toLowerCase();
			} else if (parseToLower) {
				internalVal = internalVal.toLowerCase();
			} else if (trim) {
				internalVal = internalVal.trim();
			}

			if (!escapeLess) {
				charMap[''] = /[@#~$!º|"·%&¬()=?¿¡*+\^`´{};:[\].\-/\\]/g;
			}

			for (var c in charMap) {
				try {
					internalVal = internalVal.replace(charMap[c], c);
				} catch (e) {
					console.warn('Normalize error on ', value);
				}
			}

			return internalVal;
		}
	};
	module.exports = exports['default'];

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _BIGGERTHAN$LOWERTHAN;

	var _formatters = __webpack_require__(91);

	var _formatters2 = _interopRequireDefault(_formatters);

	var _moment = __webpack_require__(88);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
	var BETWEENDATES_SEPARATOR = '%-%';

	exports["default"] = (_BIGGERTHAN$LOWERTHAN = {}, _BIGGERTHAN$LOWERTHAN[BIGGERTHAN] = function (value, compareTo) {
		var n1 = _formatters2["default"].number(value) || 0,
		    n2 = _formatters2["default"].number(compareTo) || 0;
		return n1 > n2;
	}, _BIGGERTHAN$LOWERTHAN[LOWERTHAN] = function (value, compareTo) {
		var n1 = _formatters2["default"].number(value) || 0,
		    n2 = _formatters2["default"].number(compareTo) || 0;
		return n1 < n2;
	}, _BIGGERTHAN$LOWERTHAN[AFTERDATE] = function (value, compareTo) {
		return (0, _moment2["default"])(compareTo).isAfter(value);
	}, _BIGGERTHAN$LOWERTHAN[BEFOREDATE] = function (value, compareTo) {
		return (0, _moment2["default"])(compareTo).isBefore(value);
	}, _BIGGERTHAN$LOWERTHAN[BETWEENDATES] = function (value, compareTo) {
		var separator = void 0,
		    d1Start = void 0,
		    d1End = void 0;

		if (!value || !compareTo) return false;
		separator = value.indexOf(BETWEENDATES_SEPARATOR);

		if (separator === -1) {
			return false;
		}

		d1Start = value.substring(0, separator);
		d1End = value.substring(separator + 3);

		return (0, _moment2["default"])(compareTo).isBetween(d1Start, d1End);
	}, _BIGGERTHAN$LOWERTHAN[ONDATE] = function (value, compareTo) {
		return (0, _moment2["default"])(value).isSame(compareTo, 'day');
	}, _BIGGERTHAN$LOWERTHAN[NOTONDATE] = function (value, compareTo) {
		return !(0, _moment2["default"])(value).isSame(compareTo, 'day');
	}, _BIGGERTHAN$LOWERTHAN[NOTEQUALS] = function (value, compareTo) {
		return value !== compareTo;
	}, _BIGGERTHAN$LOWERTHAN[EQUALS] = function (value, compareTo) {
		return value === compareTo;
	}, _BIGGERTHAN$LOWERTHAN[STARTSWITH] = function (value, compareTo) {
		if (!value || !compareTo || !value.length || !compareTo.length) return false;

		var valLength = value.length;
		return compareTo.length >= valLength ? value === compareTo.substring(0, valLength) : false;
	}, _BIGGERTHAN$LOWERTHAN[FINISHWITH] = function (value, compareTo) {
		if (!value || !compareTo || !value.length || !compareTo.length) return false;

		var valLength = value.length,
		    compareLength = compareTo.length;
		return compareTo.length >= value.length ? value === compareTo.substring(compareLength - valLength) : false;
	}, _BIGGERTHAN$LOWERTHAN[CONTAINS] = function (value, compareTo) {
		var result = void 0;

		if (!value || !compareTo) result = false;else result = compareTo.indexOf(value) !== -1;

		return result;
	}, _BIGGERTHAN$LOWERTHAN[NOTCONTAINS] = function (value, compareTo) {
		var result = void 0;

		if (!value || !compareTo) result = false;else result = compareTo.indexOf(value) === -1;

		return result;
	}, _BIGGERTHAN$LOWERTHAN[EMPTY] = function (value, compareTo) {
		var result = void 0;

		if (value !== 'yes' && value !== 'no' || compareTo === null || compareTo.length === undefined) return false;

		if (value === 'yes') {
			result = compareTo.length === 0;
		} else {
			result = compareTo.length > 0;
		}

		return result;
	}, _BIGGERTHAN$LOWERTHAN);
	module.exports = exports['default'];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _moment = __webpack_require__(88);

	var _moment2 = _interopRequireDefault(_moment);

	var _numeral = __webpack_require__(92);

	var _numeral2 = _interopRequireDefault(_numeral);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	exports["default"] = {
		string: function string() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			if (value === null) {
				return null;
			}

			return value.toString();
		},
		number: function number() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			if (value === null || !isNumeric(value)) {
				return null;
			}

			if (typeof value == 'string') {
				value = (0, _numeral2["default"])().unformat(value);
			}

			return (0, _numeral2["default"])(value).format('0,0[.]00');
		},
		date: function date() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			if (value === null) {
				return null;
			}

			var result = (0, _moment2["default"])(value).format('LL');

			if (result == 'Invalid date') {
				return null;
			}

			return result;
		},
		datetime: function datetime() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			if (value === null) {
				return null;
			}

			var result = (0, _moment2["default"])(value).format('LLL');

			if (result == 'Invalid date') {
				return null;
			}

			return result;
		}
	};
	module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * numeral.js
	 * version : 1.5.3
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */

	(function () {

	    /************************************
	        Constants
	    ************************************/

	    var numeral,
	        VERSION = '1.5.3',
	        // internal storage for language config files
	        languages = {},
	        currentLanguage = 'en',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined' && module.exports);


	    /************************************
	        Constructors
	    ************************************/


	    // Numeral prototype object
	    function Numeral (number) {
	        this._value = number;
	    }

	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     */
	    function toFixed (value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	            
	        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
	        // Multiply up by precision, round accurately, then divide and use native toFixed():
	        output = (roundingFunction(value * power) / power).toFixed(precision);

	        if (optionals) {
	            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
	            output = output.replace(optionalsRegExp, '');
	        }

	        return output;
	    }

	    /************************************
	        Formatting
	    ************************************/

	    // determine what type of formatting we need to do
	    function formatNumeral (n, format, roundingFunction) {
	        var output;

	        // figure out what kind of format we are dealing with
	        if (format.indexOf('$') > -1) { // currency!!!!!
	            output = formatCurrency(n, format, roundingFunction);
	        } else if (format.indexOf('%') > -1) { // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (format.indexOf(':') > -1) { // time
	            output = formatTime(n, format);
	        } else { // plain ol' numbers or bytes
	            output = formatNumber(n._value, format, roundingFunction);
	        }

	        // return string
	        return output;
	    }

	    // revert to number
	    function unformatNumeral (n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            bytesMultiplier = false,
	            power;

	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (languages[currentLanguage].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
	                }

	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 0; power <= suffixes.length; power++) {
	                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

	                    if (bytesMultiplier) {
	                        break;
	                    }
	                }

	                // do some math to create our number
	                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

	                // round if we are talking about bytes
	                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
	            }
	        }
	        return n._value;
	    }

	    function formatCurrency (n, format, roundingFunction) {
	        var symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            spliceIndex,
	            output;

	        // check for space before or after currency
	        if (format.indexOf(' $') > -1) {
	            space = ' ';
	            format = format.replace(' $', '');
	        } else if (format.indexOf('$ ') > -1) {
	            space = ' ';
	            format = format.replace('$ ', '');
	        } else {
	            format = format.replace('$', '');
	        }

	        // format the number
	        output = formatNumber(n._value, format, roundingFunction);

	        // position the symbol
	        if (symbolIndex <= 1) {
	            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                output = output.split('');
	                spliceIndex = 1;
	                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
	                    // the symbol appears before the "(" or "-"
	                    spliceIndex = 0;
	                }
	                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
	                output = output.join('');
	            } else {
	                output = languages[currentLanguage].currency.symbol + space + output;
	            }
	        } else {
	            if (output.indexOf(')') > -1) {
	                output = output.split('');
	                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
	                output = output.join('');
	            } else {
	                output = output + space + languages[currentLanguage].currency.symbol;
	            }
	        }

	        return output;
	    }

	    function formatPercentage (n, format, roundingFunction) {
	        var space = '',
	            output,
	            value = n._value * 100;

	        // check for space before %
	        if (format.indexOf(' %') > -1) {
	            space = ' ';
	            format = format.replace(' %', '');
	        } else {
	            format = format.replace('%', '');
	        }

	        output = formatNumber(value, format, roundingFunction);
	        
	        if (output.indexOf(')') > -1 ) {
	            output = output.split('');
	            output.splice(-1, 0, space + '%');
	            output = output.join('');
	        } else {
	            output = output + space + '%';
	        }

	        return output;
	    }

	    function formatTime (n) {
	        var hours = Math.floor(n._value/60/60),
	            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
	            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
	        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
	    }

	    function unformatTime (string) {
	        var timeArray = string.split(':'),
	            seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        } else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }

	    function formatNumber (value, format, roundingFunction) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
	            abbrK = false, // force abbreviation to thousands
	            abbrM = false, // force abbreviation to millions
	            abbrB = false, // force abbreviation to billions
	            abbrT = false, // force abbreviation to trillions
	            abbrForce = false, // force abbreviation
	            bytes = '',
	            ord = '',
	            abs = Math.abs(value),
	            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            min,
	            max,
	            power,
	            w,
	            precision,
	            thousands,
	            d = '',
	            neg = false;

	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        } else {
	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (format.indexOf('(') > -1) {
	                negP = true;
	                format = format.slice(1, -1);
	            } else if (format.indexOf('+') > -1) {
	                signed = true;
	                format = format.replace(/\+/g, '');
	            }

	            // see if abbreviation is wanted
	            if (format.indexOf('a') > -1) {
	                // check if abbreviation is specified
	                abbrK = format.indexOf('aK') >= 0;
	                abbrM = format.indexOf('aM') >= 0;
	                abbrB = format.indexOf('aB') >= 0;
	                abbrT = format.indexOf('aT') >= 0;
	                abbrForce = abbrK || abbrM || abbrB || abbrT;

	                // check for space before abbreviation
	                if (format.indexOf(' a') > -1) {
	                    abbr = ' ';
	                    format = format.replace(' a', '');
	                } else {
	                    format = format.replace('a', '');
	                }

	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + languages[currentLanguage].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }

	            // see if we are formatting bytes
	            if (format.indexOf('b') > -1) {
	                // check for space before
	                if (format.indexOf(' b') > -1) {
	                    bytes = ' ';
	                    format = format.replace(' b', '');
	                } else {
	                    format = format.replace('b', '');
	                }

	                for (power = 0; power <= suffixes.length; power++) {
	                    min = Math.pow(1024, power);
	                    max = Math.pow(1024, power+1);

	                    if (value >= min && value < max) {
	                        bytes = bytes + suffixes[power];
	                        if (min > 0) {
	                            value = value / min;
	                        }
	                        break;
	                    }
	                }
	            }

	            // see if ordinal is wanted
	            if (format.indexOf('o') > -1) {
	                // check for space before
	                if (format.indexOf(' o') > -1) {
	                    ord = ' ';
	                    format = format.replace(' o', '');
	                } else {
	                    format = format.replace('o', '');
	                }

	                ord = ord + languages[currentLanguage].ordinal(value);
	            }

	            if (format.indexOf('[.]') > -1) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }

	            w = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');

	            if (precision) {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }

	                w = d.split('.')[0];

	                if (d.split('.')[1].length) {
	                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
	                } else {
	                    d = '';
	                }

	                if (optDec && Number(d.slice(1)) === 0) {
	                    d = '';
	                }
	            } else {
	                w = toFixed(value, null, roundingFunction);
	            }

	            // format number
	            if (w.indexOf('-') > -1) {
	                w = w.slice(1);
	                neg = true;
	            }

	            if (thousands > -1) {
	                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
	            }

	            if (format.indexOf('.') === 0) {
	                w = '';
	            }

	            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
	        }
	    }

	    /************************************
	        Top Level Functions
	    ************************************/

	    numeral = function (input) {
	        if (numeral.isNumeral(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numeral.fn.unformat(input);
	        }

	        return new Numeral(Number(input));
	    };

	    // version number
	    numeral.version = VERSION;

	    // compare numeral object
	    numeral.isNumeral = function (obj) {
	        return obj instanceof Numeral;
	    };

	    // This function will load languages and then set the global language.  If
	    // no arguments are passed in, it will simply return the current global
	    // language key.
	    numeral.language = function (key, values) {
	        if (!key) {
	            return currentLanguage;
	        }

	        if (key && !values) {
	            if(!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            currentLanguage = key;
	        }

	        if (values || !languages[key]) {
	            loadLanguage(key, values);
	        }

	        return numeral;
	    };
	    
	    // This function provides access to the loaded language data.  If
	    // no arguments are passed in, it will simply return the current
	    // global language object.
	    numeral.languageData = function (key) {
	        if (!key) {
	            return languages[currentLanguage];
	        }
	        
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	        
	        return languages[key];
	    };

	    numeral.language('en', {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            var b = number % 10;
	            return (~~ (number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$'
	        }
	    });

	    numeral.zeroFormat = function (format) {
	        zeroFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.defaultFormat = function (format) {
	        defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };

	    /************************************
	        Helpers
	    ************************************/

	    function loadLanguage(key, values) {
	        languages[key] = values;
	    }

	    /************************************
	        Floating-point helpers
	    ************************************/

	    // The floating-point helper functions and implementation
	    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

	    /**
	     * Array.prototype.reduce for browsers that don't support it
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
	     */
	    if ('function' !== typeof Array.prototype.reduce) {
	        Array.prototype.reduce = function (callback, opt_initialValue) {
	            'use strict';
	            
	            if (null === this || 'undefined' === typeof this) {
	                // At the moment all modern browsers, that support strict mode, have
	                // native implementation of Array.prototype.reduce. For instance, IE8
	                // does not support strict mode, so this check is actually useless.
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }
	            
	            if ('function' !== typeof callback) {
	                throw new TypeError(callback + ' is not a function');
	            }

	            var index,
	                value,
	                length = this.length >>> 0,
	                isValueSet = false;

	            if (1 < arguments.length) {
	                value = opt_initialValue;
	                isValueSet = true;
	            }

	            for (index = 0; length > index; ++index) {
	                if (this.hasOwnProperty(index)) {
	                    if (isValueSet) {
	                        value = callback(value, this[index], index, this);
	                    } else {
	                        value = this[index];
	                        isValueSet = true;
	                    }
	                }
	            }

	            if (!isValueSet) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }

	            return value;
	        };
	    }

	    
	    /**
	     * Computes the multiplier necessary to make x >= 1,
	     * effectively eliminating miscalculations caused by
	     * finite precision.
	     */
	    function multiplier(x) {
	        var parts = x.toString().split('.');
	        if (parts.length < 2) {
	            return 1;
	        }
	        return Math.pow(10, parts[1].length);
	    }

	    /**
	     * Given a variable number of arguments, returns the maximum
	     * multiplier that must be used to normalize an operation involving
	     * all of them.
	     */
	    function correctionFactor() {
	        var args = Array.prototype.slice.call(arguments);
	        return args.reduce(function (prev, next) {
	            var mp = multiplier(prev),
	                mn = multiplier(next);
	        return mp > mn ? mp : mn;
	        }, -Infinity);
	    }        


	    /************************************
	        Numeral Prototype
	    ************************************/


	    numeral.fn = Numeral.prototype = {

	        clone : function () {
	            return numeral(this);
	        },

	        format : function (inputString, roundingFunction) {
	            return formatNumeral(this, 
	                  inputString ? inputString : defaultFormat, 
	                  (roundingFunction !== undefined) ? roundingFunction : Math.round
	              );
	        },

	        unformat : function (inputString) {
	            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
	                return inputString; 
	            }
	            return unformatNumeral(this, inputString ? inputString : defaultFormat);
	        },

	        value : function () {
	            return this._value;
	        },

	        valueOf : function () {
	            return this._value;
	        },

	        set : function (value) {
	            this._value = Number(value);
	            return this;
	        },

	        add : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },

	        subtract : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
	            return this;
	        },

	        multiply : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) * (curr * corrFactor) /
	                    (corrFactor * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },

	        divide : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);            
	            return this;
	        },

	        difference : function (value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }

	    };

	    /************************************
	        Exposing Numeral
	    ************************************/

	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numeral;
	    }

	    /*global ender:false */
	    if (typeof ender === 'undefined') {
	        // here, `this` means `window` in the browser, or `global` on the server
	        // add `numeral` as a global object via a string identifier,
	        // for Closure Compiler 'advanced' mode
	        this['numeral'] = numeral;
	    }

	    /*global define:false */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return numeral;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}).call(this);


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(94)() ? Set : __webpack_require__(95);


/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var set, iterator, result;
		if (typeof Set !== 'function') return false;
		set = new Set(['raz', 'dwa', 'trzy']);
		if (String(set) !== '[object Set]') return false;
		if (set.size !== 3) return false;
		if (typeof set.add !== 'function') return false;
		if (typeof set.clear !== 'function') return false;
		if (typeof set.delete !== 'function') return false;
		if (typeof set.entries !== 'function') return false;
		if (typeof set.forEach !== 'function') return false;
		if (typeof set.has !== 'function') return false;
		if (typeof set.keys !== 'function') return false;
		if (typeof set.values !== 'function') return false;

		iterator = set.values();
		result = iterator.next();
		if (result.done !== false) return false;
		if (result.value !== 'raz') return false;

		return true;
	};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clear          = __webpack_require__(96)
	  , eIndexOf       = __webpack_require__(100)
	  , setPrototypeOf = __webpack_require__(109)
	  , callable       = __webpack_require__(114)
	  , d              = __webpack_require__(115)
	  , ee             = __webpack_require__(127)
	  , Symbol         = __webpack_require__(134)
	  , iterator       = __webpack_require__(140)
	  , forOf          = __webpack_require__(144)
	  , Iterator       = __webpack_require__(165)
	  , isNative       = __webpack_require__(166)

	  , call = Function.prototype.call
	  , defineProperty = Object.defineProperty, getPrototypeOf = Object.getPrototypeOf
	  , SetPoly, getValues, NativeSet;

	if (isNative) NativeSet = Set;

	module.exports = SetPoly = function Set(/*iterable*/) {
		var iterable = arguments[0], self;
		if (!(this instanceof SetPoly)) throw new TypeError('Constructor requires \'new\'');
		if (isNative && setPrototypeOf) self = setPrototypeOf(new NativeSet(), getPrototypeOf(this));
		else self = this;
		if (iterable != null) iterator(iterable);
		defineProperty(self, '__setData__', d('c', []));
		if (!iterable) return self;
		forOf(iterable, function (value) {
			if (eIndexOf.call(this, value) !== -1) return;
			this.push(value);
		}, self.__setData__);
		return self;
	};

	if (isNative) {
		if (setPrototypeOf) setPrototypeOf(SetPoly, NativeSet);
		SetPoly.prototype = Object.create(NativeSet.prototype, { constructor: d(SetPoly) });
	}

	ee(Object.defineProperties(SetPoly.prototype, {
		add: d(function (value) {
			if (this.has(value)) return this;
			this.emit('_add', this.__setData__.push(value) - 1, value);
			return this;
		}),
		clear: d(function () {
			if (!this.__setData__.length) return;
			clear.call(this.__setData__);
			this.emit('_clear');
		}),
		delete: d(function (value) {
			var index = eIndexOf.call(this.__setData__, value);
			if (index === -1) return false;
			this.__setData__.splice(index, 1);
			this.emit('_delete', index, value);
			return true;
		}),
		entries: d(function () { return new Iterator(this, 'key+value'); }),
		forEach: d(function (cb/*, thisArg*/) {
			var thisArg = arguments[1], iterator, result, value;
			callable(cb);
			iterator = this.values();
			result = iterator._next();
			while (result !== undefined) {
				value = iterator._resolve(result);
				call.call(cb, thisArg, value, value, this);
				result = iterator._next();
			}
		}),
		has: d(function (value) {
			return (eIndexOf.call(this.__setData__, value) !== -1);
		}),
		keys: d(getValues = function () { return this.values(); }),
		size: d.gs(function () { return this.__setData__.length; }),
		values: d(function () { return new Iterator(this); }),
		toString: d(function () { return '[object Set]'; })
	}));
	defineProperty(SetPoly.prototype, Symbol.iterator, d(getValues));
	defineProperty(SetPoly.prototype, Symbol.toStringTag, d('c', 'Set'));


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// Inspired by Google Closure:
	// http://closure-library.googlecode.com/svn/docs/
	// closure_goog_array_array.js.html#goog.array.clear

	"use strict";

	var value = __webpack_require__(97);

	module.exports = function () {
		value(this).length = 0;
		return this;
	};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(98);

	module.exports = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _undefined = __webpack_require__(99)(); // Support ES3 engines

	module.exports = function (val) {
	 return (val !== _undefined) && (val !== null);
	};


/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	// eslint-disable-next-line no-empty-function
	module.exports = function () {};


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var numberIsNaN       = __webpack_require__(101)
	  , toPosInt          = __webpack_require__(104)
	  , value             = __webpack_require__(97)
	  , indexOf           = Array.prototype.indexOf
	  , objHasOwnProperty = Object.prototype.hasOwnProperty
	  , abs               = Math.abs
	  , floor             = Math.floor;

	module.exports = function (searchElement /*, fromIndex*/) {
		var i, length, fromIndex, val;
		if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

		length = toPosInt(value(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor(fromIndex);
		else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

		for (i = fromIndex; i < length; ++i) {
			if (objHasOwnProperty.call(this, i)) {
				val = this[i];
				if (numberIsNaN(val)) return i; // Jslint: ignore
			}
		}
		return -1;
	};


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(102)()
		? Number.isNaN
		: __webpack_require__(103);


/***/ },
/* 102 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
		var numberIsNaN = Number.isNaN;
		if (typeof numberIsNaN !== "function") return false;
		return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
	};


/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (value) {
		// eslint-disable-next-line no-self-compare
		return value !== value;
	};


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var toInteger = __webpack_require__(105)

	  , max = Math.max;

	module.exports = function (value) {
	 return max(0, toInteger(value));
	};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var sign = __webpack_require__(106)

	  , abs = Math.abs, floor = Math.floor;

	module.exports = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if ((value === 0) || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(107)()
		? Math.sign
		: __webpack_require__(108);


/***/ },
/* 107 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
		var sign = Math.sign;
		if (typeof sign !== "function") return false;
		return (sign(10) === 1) && (sign(-20) === -1);
	};


/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (value) {
		value = Number(value);
		if (isNaN(value) || (value === 0)) return value;
		return value > 0 ? 1 : -1;
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(110)()
		? Object.setPrototypeOf
		: __webpack_require__(111);


/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";

	var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

	module.exports = function (/* CustomCreate*/) {
		var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
		if (typeof setPrototypeOf !== "function") return false;
		return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint no-proto: "off" */

	// Big thanks to @WebReflection for sorting this out
	// https://gist.github.com/WebReflection/5593554

	"use strict";

	var isObject        = __webpack_require__(112)
	  , value           = __webpack_require__(97)
	  , objIsPrototypeOf = Object.prototype.isPrototypeOf
	  , defineProperty  = Object.defineProperty
	  , nullDesc        = {
		configurable: true,
		enumerable: false,
		writable: true,
		value: undefined
	}
	  , validate;

	validate = function (obj, prototype) {
		value(obj);
		if (prototype === null || isObject(prototype)) return obj;
		throw new TypeError("Prototype must be null or an object");
	};

	module.exports = (function (status) {
		var fn, set;
		if (!status) return null;
		if (status.level === 2) {
			if (status.set) {
				set = status.set;
				fn = function (obj, prototype) {
					set.call(validate(obj, prototype), prototype);
					return obj;
				};
			} else {
				fn = function (obj, prototype) {
					validate(obj, prototype).__proto__ = prototype;
					return obj;
				};
			}
		} else {
			fn = function self(obj, prototype) {
				var isNullBase;
				validate(obj, prototype);
				isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
				if (isNullBase) delete self.nullPolyfill.__proto__;
				if (prototype === null) prototype = self.nullPolyfill;
				obj.__proto__ = prototype;
				if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
				return obj;
			};
		}
		return Object.defineProperty(fn, "level", {
			configurable: false,
			enumerable: false,
			writable: false,
			value: status.level
		});
	}(
		(function () {
			var tmpObj1 = Object.create(null)
			  , tmpObj2 = {}
			  , set
			  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

			if (desc) {
				try {
					set = desc.set; // Opera crashes at this point
					set.call(tmpObj1, tmpObj2);
				} catch (ignore) {}
				if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
			}

			tmpObj1.__proto__ = tmpObj2;
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

			tmpObj1 = {};
			tmpObj1.__proto__ = tmpObj2;
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

			return false;
		})()
	));

	__webpack_require__(113);


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(98);

	var map = { function: true, object: true };

	module.exports = function (value) {
		return (isValue(value) && map[typeof value]) || false;
	};


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

	"use strict";

	var create = Object.create, shim;

	if (!__webpack_require__(110)()) {
		shim = __webpack_require__(111);
	}

	module.exports = (function () {
		var nullObject, polyProps, desc;
		if (!shim) return create;
		if (shim.level !== 1) return create;

		nullObject = {};
		polyProps = {};
		desc = {
			configurable: false,
			enumerable: false,
			writable: true,
			value: undefined
		};
		Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
			if (name === "__proto__") {
				polyProps[name] = {
					configurable: true,
					enumerable: false,
					writable: true,
					value: undefined
				};
				return;
			}
			polyProps[name] = desc;
		});
		Object.defineProperties(nullObject, polyProps);

		Object.defineProperty(shim, "nullPolyfill", {
			configurable: false,
			enumerable: false,
			writable: false,
			value: nullObject
		});

		return function (prototype, props) {
			return create(prototype === null ? nullObject : prototype, props);
		};
	}());


/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign        = __webpack_require__(116)
	  , normalizeOpts = __webpack_require__(122)
	  , isCallable    = __webpack_require__(123)
	  , contains      = __webpack_require__(124)

	  , d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(117)()
		? Object.assign
		: __webpack_require__(118);


/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
	};


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var keys  = __webpack_require__(119)
	  , value = __webpack_require__(97)
	  , max   = Math.max;

	module.exports = function (dest, src /*, …srcn*/) {
		var error, i, length = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(120)() ? Object.keys : __webpack_require__(121);


/***/ },
/* 120 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
		try {
			Object.keys("primitive");
			return true;
		} catch (e) {
			return false;
		}
	};


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(98);

	var keys = Object.keys;

	module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(98);

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	module.exports = function (opts1 /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 123 */
/***/ function(module, exports) {

	// Deprecated

	"use strict";

	module.exports = function (obj) {
	 return typeof obj === "function";
	};


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(125)()
		? String.prototype.contains
		: __webpack_require__(126);


/***/ },
/* 125 */
/***/ function(module, exports) {

	"use strict";

	var str = "razdwatrzy";

	module.exports = function () {
		if (typeof str.contains !== "function") return false;
		return (str.contains("dwa") === true) && (str.contains("foo") === false);
	};


/***/ },
/* 126 */
/***/ function(module, exports) {

	"use strict";

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d        = __webpack_require__(128)
	  , callable = __webpack_require__(114)

	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue         = __webpack_require__(129)
	  , isPlainFunction = __webpack_require__(130)
	  , assign          = __webpack_require__(116)
	  , normalizeOpts   = __webpack_require__(122)
	  , contains        = __webpack_require__(124);

	var d = (module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== "string") {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (isValue(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
			w = contains.call(dscr, "w");
		} else {
			c = w = true;
			e = false;
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	});

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== "string") {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (!isValue(get)) {
			get = undefined;
		} else if (!isPlainFunction(get)) {
			options = get;
			get = set = undefined;
		} else if (!isValue(set)) {
			set = undefined;
		} else if (!isPlainFunction(set)) {
			options = set;
			set = undefined;
		}
		if (isValue(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
		} else {
			c = true;
			e = false;
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 129 */
/***/ function(module, exports) {

	"use strict";

	// ES3 safe
	var _undefined = void 0;

	module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isFunction = __webpack_require__(131);

	var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

	module.exports = function (value) {
		if (!isFunction(value)) return false;
		if (classRe.test(functionToString.call(value))) return false;
		return true;
	};


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isPrototype = __webpack_require__(132);

	module.exports = function (value) {
		if (typeof value !== "function") return false;

		if (!hasOwnProperty.call(value, "length")) return false;

		try {
			if (typeof value.length !== "number") return false;
			if (typeof value.call !== "function") return false;
			if (typeof value.apply !== "function") return false;
		} catch (error) {
			return false;
		}

		return !isPrototype(value);
	};


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isObject = __webpack_require__(133);

	module.exports = function (value) {
		if (!isObject(value)) return false;
		try {
			if (!value.constructor) return false;
			return value.constructor.prototype === value;
		} catch (error) {
			return false;
		}
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(129);

	// prettier-ignore
	var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

	module.exports = function (value) {
		if (!isValue(value)) return false;
		return hasOwnProperty.call(possibleTypes, typeof value);
	};


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(135)() ? Symbol : __webpack_require__(136);


/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';

	var validTypes = { object: true, symbol: true };

	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not (or partially) support it

	'use strict';

	var d              = __webpack_require__(137)
	  , validateSymbol = __webpack_require__(138)

	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
	  , isNativeSafe;

	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}

	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),

		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },
/* 137 */
128,
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(139);

	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return (x[x.constructor.toStringTag] === 'Symbol');
	};


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isIterable = __webpack_require__(141);

	module.exports = function (value) {
		if (!isIterable(value)) throw new TypeError(value + " is not iterable");
		return value;
	};


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isArguments = __webpack_require__(142)
	  , isValue     = __webpack_require__(98)
	  , isString    = __webpack_require__(143);

	var iteratorSymbol = __webpack_require__(134).iterator
	  , isArray        = Array.isArray;

	module.exports = function (value) {
		if (!isValue(value)) return false;
		if (isArray(value)) return true;
		if (isString(value)) return true;
		if (isArguments(value)) return true;
		return typeof value[iteratorSymbol] === "function";
	};


/***/ },
/* 142 */
/***/ function(module, exports) {

	"use strict";

	var objToString = Object.prototype.toString
	  , id = objToString.call(
		(function () {
			return arguments;
		})()
	);

	module.exports = function (value) {
		return objToString.call(value) === id;
	};


/***/ },
/* 143 */
/***/ function(module, exports) {

	"use strict";

	var objToString = Object.prototype.toString, id = objToString.call("");

	module.exports = function (value) {
		return (
			typeof value === "string" ||
			(value &&
				typeof value === "object" &&
				(value instanceof String || objToString.call(value) === id)) ||
			false
		);
	};


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isArguments = __webpack_require__(142)
	  , callable    = __webpack_require__(114)
	  , isString    = __webpack_require__(143)
	  , get         = __webpack_require__(145);

	var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;

	module.exports = function (iterable, cb /*, thisArg*/) {
		var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
		if (isArray(iterable) || isArguments(iterable)) mode = "array";
		else if (isString(iterable)) mode = "string";
		else iterable = get(iterable);

		callable(cb);
		doBreak = function () {
			broken = true;
		};
		if (mode === "array") {
			some.call(iterable, function (value) {
				call.call(cb, thisArg, value, doBreak);
				return broken;
			});
			return;
		}
		if (mode === "string") {
			length = iterable.length;
			for (i = 0; i < length; ++i) {
				char = iterable[i];
				if (i + 1 < length) {
					code = char.charCodeAt(0);
					if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
				}
				call.call(cb, thisArg, char, doBreak);
				if (broken) break;
			}
			return;
		}
		result = iterable.next();

		while (!result.done) {
			call.call(cb, thisArg, result.value, doBreak);
			if (broken) return;
			result = iterable.next();
		}
	};


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isArguments    = __webpack_require__(142)
	  , isString       = __webpack_require__(143)
	  , ArrayIterator  = __webpack_require__(146)
	  , StringIterator = __webpack_require__(164)
	  , iterable       = __webpack_require__(140)
	  , iteratorSymbol = __webpack_require__(134).iterator;

	module.exports = function (obj) {
		if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
		if (isArguments(obj)) return new ArrayIterator(obj);
		if (isString(obj)) return new StringIterator(obj);
		return new ArrayIterator(obj);
	};


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var setPrototypeOf = __webpack_require__(109)
	  , contains       = __webpack_require__(124)
	  , d              = __webpack_require__(147)
	  , Symbol         = __webpack_require__(134)
	  , Iterator       = __webpack_require__(148);

	var defineProperty = Object.defineProperty, ArrayIterator;

	ArrayIterator = module.exports = function (arr, kind) {
		if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
		Iterator.call(this, arr);
		if (!kind) kind = "value";
		else if (contains.call(kind, "key+value")) kind = "key+value";
		else if (contains.call(kind, "key")) kind = "key";
		else kind = "value";
		defineProperty(this, "__kind__", d("", kind));
	};
	if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

	// Internal %ArrayIteratorPrototype% doesn't expose its constructor
	delete ArrayIterator.prototype.constructor;

	ArrayIterator.prototype = Object.create(Iterator.prototype, {
		_resolve: d(function (i) {
			if (this.__kind__ === "value") return this.__list__[i];
			if (this.__kind__ === "key+value") return [i, this.__list__[i]];
			return i;
		})
	});
	defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));


/***/ },
/* 147 */
128,
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var clear    = __webpack_require__(96)
	  , assign   = __webpack_require__(116)
	  , callable = __webpack_require__(114)
	  , value    = __webpack_require__(97)
	  , d        = __webpack_require__(147)
	  , autoBind = __webpack_require__(149)
	  , Symbol   = __webpack_require__(134);

	var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;

	module.exports = Iterator = function (list, context) {
		if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
		defineProperties(this, {
			__list__: d("w", value(list)),
			__context__: d("w", context),
			__nextIndex__: d("w", 0)
		});
		if (!context) return;
		callable(context.on);
		context.on("_add", this._onAdd);
		context.on("_delete", this._onDelete);
		context.on("_clear", this._onClear);
	};

	// Internal %IteratorPrototype% doesn't expose its constructor
	delete Iterator.prototype.constructor;

	defineProperties(
		Iterator.prototype,
		assign(
			{
				_next: d(function () {
					var i;
					if (!this.__list__) return undefined;
					if (this.__redo__) {
						i = this.__redo__.shift();
						if (i !== undefined) return i;
					}
					if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
					this._unBind();
					return undefined;
				}),
				next: d(function () {
					return this._createResult(this._next());
				}),
				_createResult: d(function (i) {
					if (i === undefined) return { done: true, value: undefined };
					return { done: false, value: this._resolve(i) };
				}),
				_resolve: d(function (i) {
					return this.__list__[i];
				}),
				_unBind: d(function () {
					this.__list__ = null;
					delete this.__redo__;
					if (!this.__context__) return;
					this.__context__.off("_add", this._onAdd);
					this.__context__.off("_delete", this._onDelete);
					this.__context__.off("_clear", this._onClear);
					this.__context__ = null;
				}),
				toString: d(function () {
					return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
				})
			},
			autoBind({
				_onAdd: d(function (index) {
					if (index >= this.__nextIndex__) return;
					++this.__nextIndex__;
					if (!this.__redo__) {
						defineProperty(this, "__redo__", d("c", [index]));
						return;
					}
					this.__redo__.forEach(function (redo, i) {
						if (redo >= index) this.__redo__[i] = ++redo;
					}, this);
					this.__redo__.push(index);
				}),
				_onDelete: d(function (index) {
					var i;
					if (index >= this.__nextIndex__) return;
					--this.__nextIndex__;
					if (!this.__redo__) return;
					i = this.__redo__.indexOf(index);
					if (i !== -1) this.__redo__.splice(i, 1);
					this.__redo__.forEach(function (redo, j) {
						if (redo > index) this.__redo__[j] = --redo;
					}, this);
				}),
				_onClear: d(function () {
					if (this.__redo__) clear.call(this.__redo__);
					this.__nextIndex__ = 0;
				})
			})
		)
	);

	defineProperty(
		Iterator.prototype,
		Symbol.iterator,
		d(function () {
			return this;
		})
	);


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue             = __webpack_require__(129)
	  , ensureValue         = __webpack_require__(150)
	  , ensurePlainFunction = __webpack_require__(155)
	  , copy                = __webpack_require__(156)
	  , normalizeOptions    = __webpack_require__(122)
	  , map                 = __webpack_require__(161);

	var bind = Function.prototype.bind
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , define;

	define = function (name, desc, options) {
		var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
		dgs = copy(desc);
		delete dgs.writable;
		delete dgs.value;
		dgs.get = function () {
			if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
			desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
			defineProperty(this, name, desc);
			return this[name];
		};
		return dgs;
	};

	module.exports = function (props/*, options*/) {
		var options = normalizeOptions(arguments[1]);
		if (isValue(options.resolveContext)) ensurePlainFunction(options.resolveContext);
		return map(props, function (desc, name) { return define(name, desc, options); });
	};


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var resolveException = __webpack_require__(151)
	  , is               = __webpack_require__(129);

	module.exports = function (value/*, options*/) {
		if (is(value)) return value;
		return resolveException(value, "Cannot use %v", arguments[1]);
	};


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue       = __webpack_require__(129)
	  , isObject      = __webpack_require__(133)
	  , stringCoerce  = __webpack_require__(152)
	  , toShortString = __webpack_require__(153);

	var resolveMessage = function (message, value) {
		return message.replace("%v", toShortString(value));
	};

	module.exports = function (value, defaultMessage, inputOptions) {
		if (!isObject(inputOptions)) throw new TypeError(resolveMessage(defaultMessage, value));
		if (!isValue(value)) {
			if ("default" in inputOptions) return inputOptions["default"];
			if (inputOptions.isOptional) return null;
		}
		var errorMessage = stringCoerce(inputOptions.errorMessage);
		if (!isValue(errorMessage)) errorMessage = defaultMessage;
		throw new TypeError(resolveMessage(errorMessage, value));
	};


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isValue  = __webpack_require__(129)
	  , isObject = __webpack_require__(133);

	var objectToString = Object.prototype.toString;

	module.exports = function (value) {
		if (!isValue(value)) return null;
		if (isObject(value)) {
			// Reject Object.prototype.toString coercion
			var valueToString = value.toString;
			if (typeof valueToString !== "function") return null;
			if (valueToString === objectToString) return null;
			// Note: It can be object coming from other realm, still as there's no ES3 and CSP compliant
			// way to resolve its realm's Object.prototype.toString it's left as not addressed edge case
		}
		try {
			return "" + value; // Ensure implicit coercion
		} catch (error) {
			return null;
		}
	};


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var safeToString = __webpack_require__(154);

	var reNewLine = /[\n\r\u2028\u2029]/g;

	module.exports = function (value) {
		var string = safeToString(value);
		if (string === null) return "<Non-coercible to string value>";
		// Trim if too long
		if (string.length > 100) string = string.slice(0, 99) + "…";
		// Replace eventual new lines
		string = string.replace(reNewLine, function (char) {
			switch (char) {
				case "\n":
					return "\\n";
				case "\r":
					return "\\r";
				case "\u2028":
					return "\\u2028";
				case "\u2029":
					return "\\u2029";
				/* istanbul ignore next */
				default:
					throw new Error("Unexpected character");
			}
		});
		return string;
	};


/***/ },
/* 154 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (value) {
		try {
			return value.toString();
		} catch (error) {
			try { return String(value); }
			catch (error2) { return null; }
		}
	};


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var resolveException = __webpack_require__(151)
	  , is               = __webpack_require__(130);

	module.exports = function (value/*, options*/) {
		if (is(value)) return value;
		return resolveException(value, "%v is not a plain function", arguments[1]);
	};


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var aFrom  = __webpack_require__(157)
	  , assign = __webpack_require__(116)
	  , value  = __webpack_require__(97);

	module.exports = function (obj/*, propertyNames, options*/) {
		var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
		if (copy !== obj && !propertyNames) return copy;
		var result = {};
		if (propertyNames) {
			aFrom(propertyNames, function (propertyName) {
				if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
			});
		} else {
			assign(result, obj);
		}
		return result;
	};


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(158)()
		? Array.from
		: __webpack_require__(159);


/***/ },
/* 158 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
		var from = Array.from, arr, result;
		if (typeof from !== "function") return false;
		arr = ["raz", "dwa"];
		result = from(arr);
		return Boolean(result && (result !== arr) && (result[1] === "dwa"));
	};


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var iteratorSymbol = __webpack_require__(134).iterator
	  , isArguments    = __webpack_require__(142)
	  , isFunction     = __webpack_require__(160)
	  , toPosInt       = __webpack_require__(104)
	  , callable       = __webpack_require__(114)
	  , validValue     = __webpack_require__(97)
	  , isValue        = __webpack_require__(98)
	  , isString       = __webpack_require__(143)
	  , isArray        = Array.isArray
	  , call           = Function.prototype.call
	  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
	  , defineProperty = Object.defineProperty;

	// eslint-disable-next-line complexity, max-lines-per-function
	module.exports = function (arrayLike /*, mapFn, thisArg*/) {
		var mapFn = arguments[1]
		  , thisArg = arguments[2]
		  , Context
		  , i
		  , j
		  , arr
		  , length
		  , code
		  , iterator
		  , result
		  , getIterator
		  , value;

		arrayLike = Object(validValue(arrayLike));

		if (isValue(mapFn)) callable(mapFn);
		if (!this || this === Array || !isFunction(this)) {
			// Result: Plain array
			if (!mapFn) {
				if (isArguments(arrayLike)) {
					// Source: Arguments
					length = arrayLike.length;
					if (length !== 1) return Array.apply(null, arrayLike);
					arr = new Array(1);
					arr[0] = arrayLike[0];
					return arr;
				}
				if (isArray(arrayLike)) {
					// Source: Array
					arr = new Array(length = arrayLike.length);
					for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
					return arr;
				}
			}
			arr = [];
		} else {
			// Result: Non plain array
			Context = this;
		}

		if (!isArray(arrayLike)) {
			if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
				// Source: Iterator
				iterator = callable(getIterator).call(arrayLike);
				if (Context) arr = new Context();
				result = iterator.next();
				i = 0;
				while (!result.done) {
					value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
					if (Context) {
						desc.value = value;
						defineProperty(arr, i, desc);
					} else {
						arr[i] = value;
					}
					result = iterator.next();
					++i;
				}
				length = i;
			} else if (isString(arrayLike)) {
				// Source: String
				length = arrayLike.length;
				if (Context) arr = new Context();
				for (i = 0, j = 0; i < length; ++i) {
					value = arrayLike[i];
					if (i + 1 < length) {
						code = value.charCodeAt(0);
						// eslint-disable-next-line max-depth
						if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
					}
					value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
					if (Context) {
						desc.value = value;
						defineProperty(arr, j, desc);
					} else {
						arr[j] = value;
					}
					++j;
				}
				length = j;
			}
		}
		if (length === undefined) {
			// Source: array or array-like
			length = toPosInt(arrayLike.length);
			if (Context) arr = new Context(length);
			for (i = 0; i < length; ++i) {
				value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
			}
		}
		if (Context) {
			desc.value = null;
			arr.length = length;
		}
		return arr;
	};


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var objToString = Object.prototype.toString, id = objToString.call(__webpack_require__(99));

	module.exports = function (value) {
		return typeof value === "function" && objToString.call(value) === id;
	};


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var callable = __webpack_require__(114)
	  , forEach  = __webpack_require__(162)
	  , call     = Function.prototype.call;

	module.exports = function (obj, cb /*, thisArg*/) {
		var result = {}, thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, targetObj, index) {
			result[key] = call.call(cb, thisArg, value, key, targetObj, index);
		});
		return result;
	};


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(163)("forEach");


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// Internal method, used by iteration functions.
	// Calls a function for each key-value pair found in object
	// Optionally takes compareFn to iterate object in specific order

	"use strict";

	var callable                = __webpack_require__(114)
	  , value                   = __webpack_require__(97)
	  , bind                    = Function.prototype.bind
	  , call                    = Function.prototype.call
	  , keys                    = Object.keys
	  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

	module.exports = function (method, defVal) {
		return function (obj, cb /*, thisArg, compareFn*/) {
			var list, thisArg = arguments[2], compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);

			list = keys(obj);
			if (compareFn) {
				list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== "function") method = list[method];
			return call.call(method, list, function (key, index) {
				if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// Thanks @mathiasbynens
	// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

	"use strict";

	var setPrototypeOf = __webpack_require__(109)
	  , d              = __webpack_require__(147)
	  , Symbol         = __webpack_require__(134)
	  , Iterator       = __webpack_require__(148);

	var defineProperty = Object.defineProperty, StringIterator;

	StringIterator = module.exports = function (str) {
		if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
		str = String(str);
		Iterator.call(this, str);
		defineProperty(this, "__length__", d("", str.length));
	};
	if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

	// Internal %ArrayIteratorPrototype% doesn't expose its constructor
	delete StringIterator.prototype.constructor;

	StringIterator.prototype = Object.create(Iterator.prototype, {
		_next: d(function () {
			if (!this.__list__) return undefined;
			if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
			this._unBind();
			return undefined;
		}),
		_resolve: d(function (i) {
			var char = this.__list__[i], code;
			if (this.__nextIndex__ === this.__length__) return char;
			code = char.charCodeAt(0);
			if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
			return char;
		})
	});
	defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var setPrototypeOf    = __webpack_require__(109)
	  , contains          = __webpack_require__(124)
	  , d                 = __webpack_require__(115)
	  , Iterator          = __webpack_require__(148)
	  , toStringTagSymbol = __webpack_require__(134).toStringTag

	  , defineProperty = Object.defineProperty
	  , SetIterator;

	SetIterator = module.exports = function (set, kind) {
		if (!(this instanceof SetIterator)) return new SetIterator(set, kind);
		Iterator.call(this, set.__setData__, set);
		if (!kind) kind = 'value';
		else if (contains.call(kind, 'key+value')) kind = 'key+value';
		else kind = 'value';
		defineProperty(this, '__kind__', d('', kind));
	};
	if (setPrototypeOf) setPrototypeOf(SetIterator, Iterator);

	SetIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(SetIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__list__[i];
			return [this.__list__[i], this.__list__[i]];
		}),
		toString: d(function () { return '[object Set Iterator]'; })
	});
	defineProperty(SetIterator.prototype, toStringTagSymbol, d('c', 'Set Iterator'));


/***/ },
/* 166 */
/***/ function(module, exports) {

	// Exports true if environment provides native `Set` implementation,
	// whatever that is.

	'use strict';

	module.exports = (function () {
		if (typeof Set === 'undefined') return false;
		return (Object.prototype.toString.call(Set.prototype) === '[object Set]');
	}());


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/***
	  CUSTOM VERSION from https://github.com/digidem/react-dimensions
	  All credits to Gregor MacLennan
	***/
	var React = __webpack_require__(2);
	var onElementResize = __webpack_require__(168);

	var defaultContainerStyle = {
	  width: '100%',
	  height: '100%',
	  padding: 0,
	  border: 0
	};

	function defaultGetWidth(element) {
	  return element.clientWidth;
	}

	function defaultGetHeight(element) {
	  return element.clientHeight;
	}

	/**
	 * Wraps a react component and adds properties `containerHeight` and
	 * `containerWidth`. Useful for responsive design. Properties update on
	 * window resize. **Note** that the parent element must have either a
	 * height or a width, or nothing will be rendered
	 *
	 * Can be used as a
	 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
	 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
	 * (see examples)
	 *
	 * @param {object} [options]
	 * @param {function} [options.getHeight] A function that is passed an element and returns element
	 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
	 * @param {function} [options.getWidth]  A function that is passed an element and returns element
	 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
	 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
	 * The dimensions of this `div` are what are passed as props to your component. The default style is
	 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
	 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
	 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
	 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
	 * @return {function}                   A higher-order component that can be
	 * used to enhance a react component `Dimensions()(MyComponent)`
	 *
	 * @example
	 * // ES2015
	 * import React from 'react'
	 * import Dimensions from 'react-dimensions'
	 *
	 * class MyComponent extends React.Component {
	 *   render() (
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )
	 * }
	 *
	 * export default Dimensions()(MyComponent) // Enhanced component
	 *
	 * @example
	 * // ES5
	 * var React = require('react')
	 * var Dimensions = require('react-dimensions')
	 *
	 * var MyComponent = React.createClass({
	 *   render: function() {(
	 *     <div
	 *       containerWidth={this.props.containerWidth}
	 *       containerHeight={this.props.containerHeight}
	 *     >
	 *     </div>
	 *   )}
	 * }
	 *
	 * module.exports = Dimensions()(MyComponent) // Enhanced component
	 *
	 */
	module.exports = function Dimensions() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$getHeight = _ref.getHeight,
	      getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight,
	      _ref$getWidth = _ref.getWidth,
	      getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth,
	      _ref$containerStyle = _ref.containerStyle,
	      containerStyle = _ref$containerStyle === undefined ? defaultContainerStyle : _ref$containerStyle,
	      _ref$elementResize = _ref.elementResize,
	      elementResize = _ref$elementResize === undefined ? false : _ref$elementResize;

	  return function (ComposedComponent) {
	    return function (_React$Component) {
	      _inherits(DimensionsHOC, _React$Component);

	      function DimensionsHOC(props) {
	        _classCallCheck(this, DimensionsHOC);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.state = {};
	        return _this;
	      }

	      DimensionsHOC.prototype.updateDimensions = function updateDimensions() {
	        var container = this.refs.container;

	        if (container) {
	          var containerWidth = getWidth(container);
	          var containerHeight = getHeight(container);

	          if (containerWidth !== this.state.containerWidth || containerHeight !== this.state.containerHeight) {
	            this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
	          }
	        }
	      };

	      DimensionsHOC.prototype.onResize = function onResize() {
	        var _this2 = this;

	        if (this.rqf) return;
	        this.rqf = this.getWindow().requestAnimationFrame(function () {
	          _this2.rqf = null;
	          _this2.updateDimensions();
	        });
	      };

	      // If the component is mounted in a different window to the javascript
	      // context, as with https://github.com/JakeGinnivan/react-popout
	      // then the `window` global will be different from the `window` that
	      // contains the component.
	      // Depends on `defaultView` which is not supported <IE9


	      DimensionsHOC.prototype.getWindow = function getWindow() {
	        return this.refs.container ? this.refs.container.ownerDocument.defaultView || window : window;
	      };

	      DimensionsHOC.prototype.componentDidMount = function componentDidMount() {
	        if (!this.refs.container) {
	          throw new Error('Cannot find container div');
	        }
	        this.updateDimensions();
	        if (elementResize) {
	          // Experimental: `element-resize-event` fires when an element resizes.
	          // It attaches its own window resize listener and also uses
	          // requestAnimationFrame, so we can just call `this.updateDimensions`.
	          onElementResize(this.refs.container, this.updateDimensions);
	        } else {
	          this.getWindow().addEventListener('resize', this.onResize.bind(this), false);
	        }
	      };

	      DimensionsHOC.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.getWindow().removeEventListener('resize', this.onResize.bind(this));
	      };

	      /**
	       * Returns the underlying wrapped component instance.
	       * Useful if you need to access a method or property of the component
	       * passed to react-dimensions.
	       *
	       * @return {object} The rendered React component
	       **/


	      DimensionsHOC.prototype.getWrappedInstance = function getWrappedInstance() {
	        return this.refs.wrappedInstance;
	      };

	      DimensionsHOC.prototype.render = function render() {
	        return React.createElement(
	          'div',
	          { style: containerStyle, ref: 'container' },
	          (this.state.containerWidth || this.state.containerHeight) && React.createElement(ComposedComponent, _extends({}, this.state, this.props, {
	            updateDimensions: this.updateDimensions,
	            ref: 'wrappedInstance'
	          }))
	        );
	      };

	      return DimensionsHOC;
	    }(React.Component);
	  };
	};

/***/ },
/* 168 */
/***/ function(module, exports) {

	module.exports = function(element, fn) {
	  var window = this;
	  var document = window.document;

	  var attachEvent = document.attachEvent;
	  if (typeof navigator !== "undefined") {
	    var isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/);
	  }

	  var requestFrame = (function() {
	    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
	        return window.setTimeout(fn, 20);
	      };
	    return function(fn) {
	      return raf(fn);
	    };
	  })();

	  var cancelFrame = (function() {
	    var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
	      window.clearTimeout;
	    return function(id) {
	      return cancel(id);
	    };
	  })();

	  function resizeListener(e) {
	    var win = e.target || e.srcElement;
	    if (win.__resizeRAF__) {
	      cancelFrame(win.__resizeRAF__);
	    }
	    win.__resizeRAF__ = requestFrame(function() {
	      var trigger = win.__resizeTrigger__;
	      trigger.__resizeListeners__.forEach(function(fn) {
	        fn.call(trigger, e);
	      });
	    });
	  }

	  function objectLoad(e) {
	    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
	    this.contentDocument.defaultView.addEventListener('resize', resizeListener);
	  }

	  if (!element.__resizeListeners__) {
	    element.__resizeListeners__ = [];
	    if (attachEvent) {
	      element.__resizeTrigger__ = element;
	      element.attachEvent('onresize', resizeListener);
	    } else {
	      if (getComputedStyle(element).position == 'static') {
	        element.style.position = 'relative';
	      }
	      var obj = element.__resizeTrigger__ = document.createElement('object');
	      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
	      obj.setAttribute('class', 'resize-sensor');
	      obj.__resizeElement__ = element;
	      obj.onload = objectLoad;
	      obj.type = 'text/html';
	      if (isIE) {
	        element.appendChild(obj);
	      }
	      obj.data = 'about:blank';
	      if (!isIE) {
	        element.appendChild(obj);
	      }
	    }
	  }
	  element.__resizeListeners__.push(fn);
	};


/***/ }
/******/ ])));