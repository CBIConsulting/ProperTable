'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _messages = require('../lang/messages');

var _messages2 = _interopRequireDefault(_messages);

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _cellRenderer = require('./cellRenderer');

var _cellRenderer2 = _interopRequireDefault(_cellRenderer);

var _sortHeaderCell = require('./sortHeaderCell');

var _sortHeaderCell2 = _interopRequireDefault(_sortHeaderCell);

var _binarysearch = require('binarysearch');

var _binarysearch2 = _interopRequireDefault(_binarysearch);

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

var _reactImmutableRenderMixin = require('react-immutable-render-mixin');

var _rowcache = require('../lib/rowcache');

var _rowcache2 = _interopRequireDefault(_rowcache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Set = require('es6-set');

/**
 * Component properties.
 *
 * cols: Describe columns data [name: colName, field: colField, formated: valFormater(), sortable: false ...]
 * data: Data of the table
 * afterSort: Function called after the data has been sorted. Return the rawdata sorted.
 * afterSelect: Function called after select a row. Return the seleted rows.
 * selectable: If the rows can be selected or not, and if that selection is multiple. Values: true || 'Multiple' || false
 * rowHeight: Height of each row in numerical value.
 * msgs: Get the translated messages of the current lang.
 * selectorWidth: Width of the selector column, checkboxes.
 * colSortDirs: To sort by default, direction (ASC, DESC, DEF(default)) of the columns. [{name: fieldName,  direction: 'DEF'},{},{}]
 * multisort: Multisort allowed or not. True || False
 * selected: Rows selected by default. Get an array of ids or an id
 * idField: Field that can be used as an id for the default selected rows.
 */
function defaultProps() {
	return {
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
		msgs: _messages2['default'],
		selectorWidth: 27,
		colSortDirs: null,
		multisort: false
	};
}

/**
 * Check if the table has nested columns. Columns inside other columns. In that case this component will render the single columns as a
 * column inside a ColumnGroup even if the column has not childrens.
 *
 * @param (array)		cols  	Describe columns
 * @return (boolean)	result	True if has nested columns or false otherwhise
 */
function hasNested(cols) {
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
}

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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProperTable).call(this, props));

		var initialData = _this.prepareData();
		// Get initial columns sort
		var initialColSort = _this.prepareColSort();

		_this.state = {
			cols: _immutable2['default'].fromJS(_this.props.cols),
			colSortDirs: initialColSort.colSortDirs,
			colSortVals: initialColSort.sortValues,
			data: initialData.data,
			indexed: initialData.indexed,
			initialIndexed: initialData.initialIndexed,
			rawdata: initialData.rawdata,
			sizes: _immutable2['default'].fromJS({}),
			allSelected: false,
			selection: new Set()
		};
		return _this;
	}

	_createClass(ProperTable, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			// Sort the table if the sort direction of one or more columns are diferent than default and set the selection
			this.applyDefault();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			var propschanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.props, nextProps);
			var statechanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.state, nextState);
			var somethingchanged = propschanged || statechanged;

			if (propschanged) {
				var colsChanged = nextProps.cols.length != this.props.cols.length || !_underscore2['default'].isEqual(nextProps.cols, this.props.cols);
				var dataChanged = nextProps.data.length != this.props.data.length || !_underscore2['default'].isEqual(nextProps.data, this.props.data);
				var colSortData = null,
				    preparedData = null;

				// If data and columns change the colSortDirs and all data states must be updated. Then apply default (sort table
				// and set selection if it has been received). If both change It's almost the same as rebuild the component. Almost everything changes
				if (colsChanged || dataChanged) {
					_rowcache2['default'].flush('formatted');

					if (dataChanged) {
						// The most probably case
						preparedData = this.prepareData(nextProps, nextState);

						this.setState({
							data: preparedData.data,
							indexed: preparedData.indexed,
							initialIndexed: preparedData.initialIndexed,
							rawdata: preparedData.rawdata
						}, this.sortTable(nextState.colSortDirs, false));
					} else if (colsChanged && dataChanged) {
						preparedData = this.prepareData(nextProps, nextState);
						colSortData = this.prepareColSort(nextProps);

						this.setState({
							colSortDirs: colSortData.colSortDirs,
							colSortVals: colSortData.colSortVals,
							cols: _immutable2['default'].fromJS(nextProps.cols),
							data: preparedData.data,
							indexed: preparedData.indexed,
							initialIndexed: preparedData.initialIndexed,
							rawdata: preparedData.rawdata
						}, this.sortTable(colSortData.colSortDirs, false));
					} else if (colsChanged) {
						colSortData = this.prepareColSort(nextProps);

						this.setState({
							colSortDirs: colSortData.colSortDirs,
							colSortVals: colSortData.colSortVals,
							cols: _immutable2['default'].fromJS(nextProps.cols)
						}, this.applyDefault(nextState.colSortDirs, nextProps)); // apply selection and sort
					}

					return false;
				} else if (nextProps.selected) {
					this.setDefaultSelection(nextProps);

					return false;
				}
			}

			return somethingchanged;
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			this.checkSelectionChange(nextProps, nextState);
		}

		/**
   * Apply default selection and sort table.
   *
   * @param (array)	colSortDirs Sort settings of each column. From current or next state (case the props data/cols change)
   * @param (array)	props 		Component props (or nextProps)
   */

	}, {
		key: 'applyDefault',
		value: function applyDefault() {
			var colSortDirs = arguments.length <= 0 || arguments[0] === undefined ? this.state.colSortDirs : arguments[0];
			var props = arguments.length <= 1 || arguments[1] === undefined ? this.props : arguments[1];

			this.uniqueId = props.uniqueId || _underscore2['default'].uniqueId('propertable-');
			this.sortTable(colSortDirs, false);
			this.setDefaultSelection(props);
		}

		/**
   * Prepare the data received by the component for the internal working.
   * @param  (array)	props 	Component props (or nextProps)
   * @param  (array)	state 	Component state (or nextState)
   * @return (array)	-rawdata: The same data as the props.
   *					-indexed: Same as rawdata but indexed by the properId
   *					-data: Parsed data to add some fields necesary to internal working.
   */

	}, {
		key: 'prepareData',
		value: function prepareData() {
			var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
			var state = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];

			// The data will be inmutable inside the component
			var data = _immutable2['default'].fromJS(props.data),
			    index = 0;
			var indexed = {},
			    parsed = [],
			    selectedarr = [];
			var keyField = this.props.idField;

			if (props.selected) {
				if (!_underscore2['default'].isArray(props.selected)) {
					selectedarr = [props.selected];
				} else {
					if (props.selectable == 'multiple') selectedarr = props.selected;else selectedarr = [props.selected[0]];
				}
			} else {
				if (state && state.selection) {
					state.selection.forEach(function (id) {
						selectedarr.push(id);
					});
				}
			}

			selectedarr = new Set(selectedarr);

			// Parsing data to add new fields (selected or not, properId, rowIndex)
			parsed = data.map(function (row) {
				if (!row.get(keyField, false)) {
					row = row.set(keyField, _underscore2['default'].uniqueId());
				}

				var id = row.get(keyField);

				if (!row.get('_selected', false)) {
					row = row.set('_selected', false);
				}

				if (selectedarr.has(id)) {
					row = row.set('_selected', true);
				}

				row = row.set('_rowIndex', index++);

				return row;
			});

			// Prepare indexed data.
			indexed = _underscore2['default'].indexBy(parsed.toJSON(), keyField);

			return {
				rawdata: data,
				data: parsed,
				indexed: indexed,
				initialIndexed: (0, _clone2['default'])(indexed)
			};
		}

		/**
   *	Set the default selection if that exist in props
   *
   * @param (array)	props 	Component props (or nextProps)
   */

	}, {
		key: 'setDefaultSelection',
		value: function setDefaultSelection() {
			var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

			if (props.selected) {
				var selected = props.selected,
				    selection = undefined;

				if (selected.length == 0) {
					selection = new Set();
				} else {
					if (!_underscore2['default'].isArray(selected)) {
						selection = new Set([selected.toString()]);
					} else {
						if (props.selectable == 'multiple') selection = new Set(selected.toString().split(','));else selection = new Set([selected[0].toString()]);
					}
				}

				this.triggerSelection(selection, false); // false -> don't send the selection
			}
		}

		/**
   * Prepare the columns sort data to all columns and the array of functions to parse the data of each column before sorting.
   *
   * @return (array)	-colSortDirs: Sort settings of each column.
   *					-sortValues: Array of functions to parse the data of a column before use it to sort (ex. Date -> function(val){return dateToUnix(val)})
   */

	}, {
		key: 'prepareColSort',
		value: function prepareColSort() {
			var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

			var colSortDirs = props.colSortDirs,
			    cols = props.cols;
			var sort = [],
			    multisort = props.multisort;
			var direction = null,
			    sortable = null,
			    colData = null;
			var sortData = this.buildColSortDirs(cols); // Build the initial colsortdirs using the cols array.

			// If the component doesn't receive the colSortDirs array with a diferent direction than default then set to
			// colSortDirs the default values.
			if (_underscore2['default'].isNull(colSortDirs)) {
				colSortDirs = sortData.colSortDirs;
			}

			// Through each element of the colSortDirs builded data build the colSortDirs with the default directions received,
			// setting a position (position of priority to sort (it will be modified after click on the diferent columns)), if
			// the column is sortable or not and if the Table has multisort or just only single.
			for (var i = 0; i <= sortData.colSortDirs.length - 1; i++) {
				colData = sortData.colSortDirs[i];
				direction = colData.direction;
				sortable = colData.sortable !== null ? colData.sortable : true;

				colSortDirs.forEach(function (element) {
					if (element.column == colData.column) direction = element.direction;
				});

				sort.push({
					column: colData.column, // Column name
					field: colData.field,
					direction: direction,
					position: i + 1,
					sorted: false,
					multisort: multisort, // single (false) (in this case only one at a time can be sorted) or multisort (true - all true)
					sortable: sortable
				});
			}

			// Ordering by selected rows. Virtual column
			if (props.selectable == 'multiple') {
				sort.push({
					column: 'selector-multiple-column', // Column name
					field: '_selected',
					direction: 'DEF',
					position: sortData.colSortDirs.length + 1, // Last
					sorted: false,
					multisort: multisort,
					sortable: true
				});
			}

			return {
				colSortDirs: sort,
				sortValues: sortData.sortVals
			};
		}

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

	}, {
		key: 'buildColSortDirs',
		value: function buildColSortDirs(cols) {
			var _this2 = this;

			var colSortDirs = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
			var sortVals = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			cols.forEach(function (element) {
				if (!element.children) {
					var sortable = _underscore2['default'].isUndefined(element.sortable) ? null : element.sortable;

					sortVals[element.name] = element.sortVal || function (val) {
						return val;
					}; // Function to iterate

					colSortDirs.push({
						column: element.name,
						field: element.field,
						direction: 'DEF',
						sortable: sortable
					});
				} else {
					_this2.buildColSortDirs(element.children, colSortDirs, sortVals);
				}
			});

			if (this.props.selectable == 'multiple') {
				sortVals['selector-multiple-column'] = function (val) {
					return val;
				};
			}

			return {
				colSortDirs: colSortDirs,
				sortVals: sortVals
			};
		}

		/**
   * Function called each time the user click on the header of a column, then apply a sortBy function in that column.
   * After that, update the state of the component
   *
   * @param {String} 		columnKey 	The name of the column which will be resort.
   * @param {String} 		sortDir 	The direction of the sort. ASC || DESC || DEF(AULT)
   */

	}, {
		key: 'onSortChange',
		value: function onSortChange(columnKey, sortDir) {
			var newData = null;
			var colSortDirs = this.updateSortDir(columnKey, sortDir);

			this.sortTable(colSortDirs);
		}

		/**
   * Receive the column name and a sort direction and change the direction of that column, then set the proper position
   * of all the columns (just if the Table have multisorting allowed). The position will be used to set which columns
   * will be sorted first. If there are some columns with sortDir ASC or DESC the data will be sorted in function of
   * what element was clicked before.
   *
   * @param {String} 		columnKey 	The name of the column which will be resort.
   * @param {String} 		sortDir 	The direction of the sort. ASC || DESC || DEF(AULT)
   * @return {array}		colSortDirs Updated colSortDirs array.
   */

	}, {
		key: 'updateSortDir',
		value: function updateSortDir(columnKey, sortDir) {
			var colSortDirs = this.state.colSortDirs || [],
			    position = 1;

			// Single sorting.
			if (!this.props.multisort) {
				for (var i = 0; i <= colSortDirs.length - 1; i++) {
					if (colSortDirs[i].column == columnKey) {
						colSortDirs[i].direction = sortDir;
						colSortDirs[i].multisort = true;
					} else {
						colSortDirs[i].direction = 'DEF';
						colSortDirs[i].multisort = false;
					}
				}
			} else {
				// Multisort
				var initialPos = 0,
				    index = 0;

				for (var _i = 0; _i <= colSortDirs.length - 1; _i++) {
					// If some columns were sorted before then the position of the sorted columns wont be changed, so the initial
					// position will be the next. If 2 columns are already sorted and we sort by a new one then the position of this
					// last column will be 3 and will change to 2 or 1 if the sorted columns back to default.
					if (colSortDirs[_i].sorted) initialPos++;

					if (colSortDirs[_i].column == columnKey) {
						colSortDirs[_i].direction = sortDir; // Set the new direction
						position = colSortDirs[_i].position; // Save the current position
						index = _i;

						// If the sort direction is not default and the column isn't already sorted then add one to the initial position
						// and set the column to sorted. Otherwise if the sort direction is default set it to unsorted.
						if (sortDir != 'DEF' && !colSortDirs[_i].sorted) {
							initialPos++;
							colSortDirs[_i].sorted = true;
						} else if (sortDir == 'DEF') {
							colSortDirs[_i].sorted = false;
						}
					}
				}

				// Change the priority position to sort of the elements.
				for (var _i2 = 0; _i2 <= colSortDirs.length - 1; _i2++) {

					// When the position of the current element is lower than the position of the changed element and bigger or equals to the
					// initial position to change.
					if (colSortDirs[_i2].position < position && colSortDirs[_i2].position >= initialPos) {
						// Move element to the next position only if the new sort direction wasn't default, in that case keep the element in the same
						// sorting priority position.
						if (colSortDirs[_i2].direction == 'DEF') colSortDirs[_i2].position = colSortDirs[_i2].position + 1;
					}
				}

				// After change the sort position priority of the other elements if the new position is lower than the current position set new position.
				if (initialPos < colSortDirs[index].position) colSortDirs[index].position = initialPos;
			}
			return colSortDirs;
		}

		/**
   * Receive the current colSortDirs state, sort it by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
   *
   * @param 	{array}		colSortDirs Sort settings of each column
   * @param 	{boolean}	sendSorted 	If the sorted data must be sent or not
   * @return 	{array}		-colSortDirs: Sorted colSortDirs
   *						-data: Sorted data to be updated in the component state.
   */

	}, {
		key: 'sortTable',
		value: function sortTable(colSortDirs) {
			var sendSorted = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			var data = this.state.data;

			colSortDirs = _underscore2['default'].sortBy(colSortDirs, function (element) {
				return element.position;
			}).reverse();

			data = this.sortColumns(data, colSortDirs);

			if (sendSorted) {
				this.setState({
					data: data.data,
					indexed: data.indexed,
					colSortDirs: colSortDirs
				}, this.sendSortedData(data.data));
			} else {
				this.setState({
					data: data.data,
					indexed: data.indexed,
					colSortDirs: colSortDirs
				});
			}
		}

		/**
   * Receive the current colSortDirs state, sort it by its position from lower to bigger and then apply a sort to the Table data using that column sort data.
   *
   * @param 	{array}		data 		Data to be render in the Table
   * @param 	{array}		colSortDirs Sort settings of each column. Sorted by its .position
   * @return 	{array}		sortedData 	Sorted data to be updated in the component state.
   */

	}, {
		key: 'sortColumns',
		value: function sortColumns(data, colSortDirs) {
			var _this3 = this;

			var sortedData = data,
			    indexed = _underscore2['default'].clone(this.state.indexed);
			var sortVals = this.state.colSortVals,
			    sortVal = null;
			var defaultSort = true,
			    element = null,
			    position = null;

			colSortDirs.forEach(function (element) {
				// The colums could be all true (multisort) or just one of them at a time (all false but the column that must be sorted)
				if (element.direction != 'DEF' && element.multisort && element.sortable) {
					sortVal = sortVals[element.column];

					sortedData = sortedData.sortBy(function (row, rowIndex, allData) {
						return sortVal(row.get(element.field));
					}, function (val1, val2) {
						if (val1 == val2) {
							return 0;
						} else if (element.direction == 'ASC') {
							return val1 > val2 ? 1 : -1;
						} else if (element.direction == 'DESC') {
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
					return row.get('_rowIndex');
				}, function (val1, val2) {
					return val1 > val2 ? 1 : val1 == val2 ? 0 : -1;
				});
			}

			// Update index into indexed data.
			sortedData.map(function (element, index) {
				indexed[element.get(_this3.props.idField)]._rowIndex = index;
			});

			return {
				data: sortedData,
				indexed: indexed
			};
		}

		/**
   * Recursive function that build the nested columns. If the column has childrens then call itself and put the column into
   * a ColumnGroup.
   *
   * @param 	{array}		colData 	Data to be parsed
   * @param 	{boolean}	isChildren	Is a children of another column or not
   * @param 	{boolean}	hasNested	The whole table has nested columns or not
   * @return 	{object}	col 		The builded column or tree of columns
   */

	}, {
		key: 'parseColumn',
		value: function parseColumn(colData) {
			var _this4 = this;

			var isChildren = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
			var hasNested = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

			var col = null,
			    colname = null,
			    sortDir = 'DEF',
			    sortable = null,
			    className = null,
			    extraProps = {
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

				if (typeof colData.flex != 'undefined') {
					extraProps.flexGrow = colData.flex;
				}
			}

			if (typeof colData.fixed !== 'undefined') {
				extraProps.fixed = colData.fixed;
			}

			if (typeof colData.isResizable !== 'undefined') {
				extraProps.isResizable = colData.isResizable;
			}

			// If this column doesn't have childrens then build a column, otherwise build a ColumnGroup and call the method recursively
			// setting the result inside this columns group.
			if (typeof colData.children == 'undefined' || !colData.children.length) {

				// Get the initial dir of this column
				this.state.colSortDirs.forEach(function (element) {
					if (element.column === colname) sortDir = element.direction;
				});

				// If this column can be sort or not.
				sortable = _underscore2['default'].isUndefined(colData.sortable) ? true : colData.sortable;

				col = _react2['default'].createElement(_fixedDataTable.Column, _extends({
					columnKey: colname,
					key: colname + '-column',
					header: _react2['default'].createElement(_sortHeaderCell2['default'], {
						onSortChange: this.onSortChange.bind(this),
						sortDir: sortDir,
						children: colData.label,
						sortable: sortable,
						userClassName: className
					}),
					cell: _react2['default'].createElement(_cellRenderer2['default'], { idField: this.props.idField, indexed: this.state.indexed, data: this.state.data, colData: colData, col: colData.field }),
					allowCellsRecycling: true,
					align: 'center'
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
				var inner = colData.children.map(function (c) {
					return _this4.parseColumn(c, true);
				});

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
		}

		/**
   * Build the table calling the parsecolumn() method for each column in props.cols and saving it to an array to be render into
   * a react fixed-datatable Table. If multiple rows can be selected then build a column with checkboxes to show which rows are seleted.
   *
   * @return {array} 	columns 	Array with all the columns to be rendered.
   */

	}, {
		key: 'buildTable',
		value: function buildTable() {
			var _this5 = this;

			var columns = [],
			    isNested = hasNested(this.state.cols),
			    selColumn = null;

			if (this.props.selectable == 'multiple') {
				var somethingSelected = this.state.selection.size > 0;
				var sortDir = 'DEF';
				var selectedSet = null;

				if (this.props.selected) {
					if (!_underscore2['default'].isArray(this.props.selected)) {
						selectedSet = new Set([this.props.selected]);
					} else {
						selectedSet = new Set(this.props.selected);
					}
				} else {
					selectedSet = this.state.selection;
				}

				this.state.colSortDirs.forEach(function (element) {
					if (element.column === 'selector-multiple-column') sortDir = element.direction;
				});

				selColumn = _react2['default'].createElement(_fixedDataTable.Column, {
					columnKey: 'selector-multiple-column',
					key: _underscore2['default'].uniqueId('selector-'),
					header: _react2['default'].createElement(
						_sortHeaderCell2['default'],
						{
							className: '',
							onSortChange: this.onSortChange.bind(this),
							sortDir: sortDir,
							sortable: true
						},
						_react2['default'].createElement(_selector2['default'], {
							onClick: this.handleSelectAll.bind(this),
							somethingSelected: somethingSelected,
							allSelected: this.state.allSelected,
							isHeader: true
						})
					),
					cell: _react2['default'].createElement(_selector2['default'], {
						data: this.state.data,
						selected: selectedSet,
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
				columns.push(_this5.parseColumn(col.toJSON(), false, isNested));
			});

			return columns;
		}

		/**
   * Set all columns to selected or to not selected. Callback for the onclick of the Selector component, in the top of the table, in
   * the case that the Table allows multiple selection.
   *
   * @param {object}	e  	Event which call the function.
   */

	}, {
		key: 'handleSelectAll',
		value: function handleSelectAll(e) {
			e.preventDefault();

			if (this.props.selectable) {
				var allSelected = this.state.allSelected;
				var newSelection = [];
				var selection = null;

				if (!allSelected) {
					newSelection = _underscore2['default'].keys(this.state.indexed);
				}

				selection = new Set(newSelection);

				this.triggerSelection(selection);
			}
		}

		/**
   * Toogle the selected state of a column. Callback for the onRowClick of the react fixed-dataTable.
   *
   * @param {object}	e  			Event which call the function
   * @param {integer}	rowIndex  	Index of the clicked row.
   */

	}, {
		key: 'handleRowClick',
		value: function handleRowClick(e, rowIndex) {
			e.preventDefault();

			var clickedId = this.state.data.get(rowIndex).get(this.props.idField);

			if (this.props.selectable) {
				this.toggleSelected(clickedId.toString());
			}
		}

		/**
   * Toogle the selected state of the column that has the same properId as in the parameters.
   *
   * @param {integet}	id  	Virtual field added to each row data on componnent's create
   */

	}, {
		key: 'toggleSelected',
		value: function toggleSelected(id) {
			var selection = new Set(this.state.selection);

			if (selection.has(id)) {
				selection['delete'](id); // Returns a copy of the array with the instance with that properId deleted.
			} else {
					if (this.props.selectable == 'multiple') {
						selection.add(id);
					} else {
						selection = new Set([id]);
					}
				}

			this.triggerSelection(selection); // Set the new selection to the components state.
		}

		/**
   * Before the components update set the updated selection data to the components state.
   *
   * @param {object}	nextProps	The props that will be set for the updated component
   * @param {object}	nextState	The state that will be set for the updated component
   */

	}, {
		key: 'checkSelectionChange',
		value: function checkSelectionChange(nextProps, nextState) {
			if (nextProps.selectable == 'multiple') {
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
		}

		/**
   * Method called before the components update to set the new selection to states component and update the data
   *
   * @param {array}	newSelection	The new selected rows (Set object)
   * @param {array}	newAllSelected	If the new state has all the rows selected
   */

	}, {
		key: 'updateSelectionData',
		value: function updateSelectionData(newSelection) {
			var _this6 = this;

			var newAllSelected = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			var newIndexed = _underscore2['default'].clone(this.state.indexed);
			var oldSelection = this.state.selection;
			var rowid = null,
			    selected = null,
			    rdata = null,
			    curIndex = null,
			    newData = this.state.data,
			    rowIndex = null;

			if (this.props.selectable != 'multiple') {
				var oldId = oldSelection.values().next().value || null;

				if (!_underscore2['default'].isNull(oldId)) {
					newIndexed[oldId]._selected = false; // Update indexed data
					rowIndex = newIndexed[oldId]._rowIndex; // Get data index
					rdata = newData.get(rowIndex).set('_selected', false); // Change the row in that index
					newData = newData.set(rowIndex, rdata); // Set that row in the data object
				}

				if (!_underscore2['default'].isNull(newSelection)) {
					newIndexed[newSelection]._selected = true; // Update indexed data
					rowIndex = newIndexed[newSelection]._rowIndex; // Get data index
					rdata = newData.get(rowIndex).set('_selected', true); // Change the row in that index
					newData = newData.set(rowIndex, rdata); // Set that row in the data object
				}
			} else if (!newAllSelected && newSelection.size > 0) {
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

					newIndexed[changedId]._selected = _selected; // Update indexed data
					rowIndex = newIndexed[changedId]._rowIndex; // Get data index
					rdata = newData.get(rowIndex).set('_selected', _selected); // Change the row in that index
					newData = newData.set(rowIndex, rdata); // Set that row in the data object
				} else {
						// Change all data
						newData = newData.map(function (row) {
							rowid = row.get(_this6.props.idField);
							selected = newSelection.has(rowid.toString());
							rdata = row.set('_selected', selected);
							curIndex = newIndexed[rowid];

							if (curIndex._selected != selected) {
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
		}

		/**
   * In case that the new selection array be different than the selection array in the components state, then update
   * the components state with the new data.
   *
   * @param {array}	newSelection	The selected rows
   * @param {boolean}	sendSelection 	If the selection must be sent or not
   */

	}, {
		key: 'triggerSelection',
		value: function triggerSelection() {
			var newSelection = arguments.length <= 0 || arguments[0] === undefined ? new Set() : arguments[0];
			var sendSelection = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			if (sendSelection) {
				this.setState({
					selection: newSelection,
					allSelected: newSelection.size >= this.state.data.size
				}, this.sendSelection);
			} else {
				this.setState({
					selection: newSelection,
					allSelected: newSelection.size >= this.state.data.size
				});
			}
		}

		/**
   * If the method afterSelect in the components props has a function then call it sending the selected rows in rawdata.
   */

	}, {
		key: 'sendSelection',
		value: function sendSelection() {
			var _this7 = this;

			var newSelection = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

			if (typeof this.props.afterSelect == 'function') {
				(function () {
					var _state = _this7.state;
					var selection = _state.selection;
					var initialIndexed = _state.initialIndexed;
					var rawdata = _state.rawdata;

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

					if (_this7.props.selectable === true && !_underscore2['default'].isUndefined(output[0])) {
						output = output[0];
					}

					_this7.props.afterSelect(output, selectionArray);
				})();
			}
		}

		/**
   * If the method afterSort in the components props has a function then call it sending the sorted data in the rawdata.
   */

	}, {
		key: 'sendSortedData',
		value: function sendSortedData(data) {
			var _this8 = this;

			if (typeof this.props.afterSort == 'function') {
				(function () {
					var _state2 = _this8.state;
					var initialIndexed = _state2.initialIndexed;
					var rawdata = _state2.rawdata;

					var output = [];

					output = data.map(function (row) {
						var rowIndex = initialIndexed[row.get(_this8.props.idField)]._rowIndex;

						return rawdata.get(rowIndex);
					});

					_this8.props.afterSort(output.toJSON());
				})();
			}
		}

		/**
   * Add a custom class to each row of the table. If that row is selected then add one more class to apply different css to seleted
   * rows.
   *
   * @param {integer}	index	Index of the row which will get the new classes.
   */

	}, {
		key: 'getRowClassName',
		value: function getRowClassName(index) {
			var addClass = 'propertable-row';
			var selected = this.state.data.get(index).get('_selected');
			var id = this.state.data.get(index).get(this.props.idField);
			var selectedSet = null;

			if (!selected) {
				if (this.props.selected) {
					if (!_underscore2['default'].isArray(this.props.selected)) {
						selectedSet = new Set([this.props.selected]);
					} else {
						selectedSet = new Set(this.props.selected);
					}
				} else {
					if (this.state.selection) {
						selectedSet = this.state.selection;
					}
				}

				selected = selectedSet && selectedSet.has(id.toString());
			}

			if (selected) {
				addClass += ' selected';
			}

			return addClass;
		}
	}, {
		key: 'onResize',
		value: function onResize(width, column) {
			var sizes = this.state.sizes;
			var newsizes = sizes.set(column, width);

			this.setState({ sizes: newsizes });
		}
	}, {
		key: 'render',
		value: function render() {
			var content = _react2['default'].createElement(
				'div',
				{ className: 'propertable-empty' },
				this.props.msgs.empty
			);
			var tableContent = null;

			if (this.state.data && this.state.data.size) {
				tableContent = this.buildTable();

				content = _react2['default'].createElement(
					_fixedDataTable.Table,
					_extends({
						ref: 'fixeddatatable',
						key: this.uniqueId + '-table',
						width: this.props.containerWidth || 100,
						height: this.props.containerHeight || 100,
						headerHeight: this.props.rowHeight,
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
			}

			return _react2['default'].createElement(
				'div',
				{ id: this.uniqueId, className: 'propertable ' + this.props.className },
				content
			);
		}
	}]);

	return ProperTable;
}(_react2['default'].Component);

ProperTable.defaultProps = defaultProps();

exports['default'] = ProperTable;
module.exports = exports['default'];