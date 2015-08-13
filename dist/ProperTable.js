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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _componentsTable = __webpack_require__(1);

	var _componentsTable2 = _interopRequireDefault(_componentsTable);

	var _configSettings = __webpack_require__(5);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	var _formattersFormatters = __webpack_require__(13);

	var _formattersFormatters2 = _interopRequireDefault(_formattersFormatters);

	__webpack_require__(15);

	exports["default"] = {
		Settings: _configSettings2["default"],
		Table: _componentsTable2["default"],
		formatters: _formattersFormatters2["default"]
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ProperTable.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _configSettings = __webpack_require__(5);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	var _row = __webpack_require__(10);

	var _row2 = _interopRequireDefault(_row);

	var _hcell = __webpack_require__(11);

	var _hcell2 = _interopRequireDefault(_hcell);

	var _cell = __webpack_require__(12);

	var _cell2 = _interopRequireDefault(_cell);

	function countChildren(cell) {
		var ccount = 0,
		    haschildren = false;

		if (cell.children && cell.children.length) {
			haschildren = !!_underscore2["default"].find(cell.children, function (child) {
				return child.children && child.children.length;
			});

			if (!haschildren) {
				return cell.children.length;
			} else {
				_underscore2["default"].each(cell.children, function (child) {
					if (child.children && child.children.length) {
						ccount += countChildren(child);
					}
				});

				return cell.children.length + ccount;
			}
		}

		return null;
	}

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "table",

		getDefaultProps: function getDefaultProps() {
			return {
				className: '',
				cols: [],
				data: [],
				uniqueId: _underscore2["default"].uniqueId('propertable-'),
				afterSort: null
			};
		},

		getInitialState: function getInitialState() {
			return {
				cols: _jquery2["default"].extend(true, this.props.cols, []),
				data: _jquery2["default"].extend(true, this.props.data, []),
				sort: null
			};
		},

		buildPlainColumns: function buildPlainColumns(cols) {
			var rows = [],
			    row = [],
			    crow = [],
			    nextrow = cols,
			    levels = 0;
			var haschildren = false;

			while (nextrow && nextrow.length) {
				levels++;
				row = [];
				crow = nextrow;
				nextrow = [];
				haschildren = !!_underscore2["default"].find(crow, function (cell) {
					return cell.children && cell.children.length;
				});

				row = _underscore2["default"].map(crow, function (cell) {
					if (cell.children && cell.children.length) {
						_underscore2["default"].each(cell.children, function (child) {
							nextrow.push(child);
						});
					}

					return _jquery2["default"].extend(true, cell, {
						level: levels,
						colspan: countChildren(cell)
					});
				});

				rows.push(row);
			}

			rows = _underscore2["default"].map(rows, function (row) {
				var cells = _underscore2["default"].map(row, function (cell) {
					if (!cell.children || !cell.children.length) {
						cell.rowspan = levels - cell.level || null;
					}

					return cell;
				});

				return cells;
			});

			return rows;
		},

		handleSort: function handleSort(direction, col) {
			var field = col.field || null;
			var data = _jquery2["default"].extend(true, {}, this.state.data);

			if (field) {
				if (!direction) {
					data = _jquery2["default"].extend(true, {}, this.props.data);
					this.setState({
						data: data,
						sort: null
					});
				} else {
					data = _underscore2["default"].sortBy(data, function (item) {
						var val = item[field];

						if (col.sortVal && typeof col.sortVal == 'function') {
							val = col.sortVal(val);
						}

						console.log(item[field], val);

						return val;
					});

					if (direction == 'desc') {
						data.reverse();
					}

					this.setState({
						data: data,
						sort: {
							field: field,
							direction: direction
						}
					});
				}
			}
		},

		buildCols: function buildCols(cols) {
			var _this = this;

			var plain = this.buildPlainColumns(cols),
			    rows = [];
			var rowcount = 1;

			this.fieldsOrder = [];
			this.columnIndex = {};

			rows = _underscore2["default"].map(plain, function (row) {
				return _underscore2["default"].map(row, function (item) {
					item.sorted = false;

					if (typeof item.field != 'undefined' && item.field) {
						_this.fieldsOrder.push(item.field);
						_this.columnIndex[item.field] = item;

						if (_this.state.sort && item.field == _this.state.sort.field) {
							item.sorted = _this.state.sort.direction;
						}
					}

					return _reactAddons2["default"].createElement(
						_hcell2["default"],
						_extends({ onSort: _this.handleSort, key: 'header' + item.name }, item),
						item.label
					);
				});
			});

			return _underscore2["default"].map(rows, function (row) {
				return _reactAddons2["default"].createElement(
					_row2["default"],
					{ key: 'header-row-' + rowcount++ },
					row
				);
			});
		},

		buildDataRows: function buildDataRows(data) {
			var _this2 = this;

			var result = null,
			    rdata = [],
			    curCell = 1,
			    curRow = 1;
			var defaults = {
				visible: true,
				sortable: true
			};

			result = _underscore2["default"].map(data, function (rowdata) {
				var cells = _underscore2["default"].map(_this2.fieldsOrder, function (field) {
					var col = _this2.columnIndex[field];
					var value = rowdata[field];

					if (typeof col.formatter == 'function') {
						value = col.formatter(value, col);
					}

					return _reactAddons2["default"].createElement(
						_cell2["default"],
						{ key: 'ccel-' + curCell++, className: col.className || '', col: col },
						value
					);
				});

				return _reactAddons2["default"].createElement(
					_row2["default"],
					{ key: 'crow-' + curRow++ },
					cells
				);
			});

			return result;
		},

		render: function render() {
			var className = this.props.className;
			var cols = [];
			var rows = [];

			if (!this.state.cols.length) {
				return _reactAddons2["default"].createElement(
					"div",
					{ className: "propertable " + className, id: this.props.uniqueId },
					_reactAddons2["default"].createElement(
						"div",
						{ className: "empty-msg" },
						_reactAddons2["default"].createElement(
							"p",
							null,
							_configSettings2["default"].msg('emptymsg')
						)
					)
				);
			}

			cols = this.buildCols(this.state.cols);
			rows = this.buildDataRows(this.state.data);

			return _reactAddons2["default"].createElement(
				"div",
				{ id: this.props.uniqueId, className: "propertable " + className },
				_reactAddons2["default"].createElement(
					"table",
					{ className: "table table-condensed table-bordered table-hover table-responsive propertable-table" },
					_reactAddons2["default"].createElement(
						"thead",
						{ ref: "head" },
						cols
					),
					_reactAddons2["default"].createElement(
						"tbody",
						null,
						rows
					)
				)
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "table.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _i18nLanguages = __webpack_require__(6);

	var _i18nLanguages2 = _interopRequireDefault(_i18nLanguages);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _numeral = __webpack_require__(8);

	var _numeral2 = _interopRequireDefault(_numeral);

	__webpack_require__(9);

	var Settings = (function () {
		function Settings() {
			_classCallCheck(this, Settings);

			this.settings = {
				language: "es"
			};
			this.messages = {};
			this.numeral = _numeral2["default"];
			this.setLang(this.settings.language);
		}

		_createClass(Settings, [{
			key: "set",
			value: function set(settings) {
				var newsettings = _jquery2["default"].extend(true, this.settings, settings);

				if (newsettings.lang != this.settings.lang) {
					this.setLang(newsettings.lang);
				}

				this.settings = newsettings;

				return this.settings;
			}
		}, {
			key: "setLang",
			value: function setLang() {
				var lang = arguments.length <= 0 || arguments[0] === undefined ? "en" : arguments[0];
				var msgs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

				var newmsgs = {};

				if (typeof _i18nLanguages2["default"][lang] !== 'undefined') {
					newmsgs = _jquery2["default"].extend(true, this.messages, _i18nLanguages2["default"][lang]);
				}

				if (!_underscore2["default"].isEmpty(msgs)) {
					newmsgs = _jquery2["default"].extend(true, newmsgs, msgs);
				}

				this.settings.language = lang;
				try {
					_numeral2["default"].language(lang);
				} catch (err) {
					console.warn('unable to set numeral language to ' + lang);
				}

				this.messages = newmsgs;
			}
		}, {
			key: "msg",
			value: function msg(index) {
				return this.messages[index] || index;
			}
		}]);

		return Settings;
	})();

	var instance = new Settings();

	exports["default"] = instance;
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "settings.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _en = __webpack_require__(7);

	var _en2 = _interopRequireDefault(_en);

	exports["default"] = {
		en: _en2["default"]
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "languages.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = {
		emptymsg: "There are no data for the table"
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "en.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	/*! 
	 * numeral.js language configuration
	 * language : belgium-dutch (be-nl)
	 * author : Dieter Luypaert : https://github.com/moeriki
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal  : ','
	        },
	        abbreviations: {
	            thousand : 'k',
	            million  : ' mln',
	            billion  : ' mld',
	            trillion : ' bln'
	        },
	        ordinal : function (number) {
	            var remainder = number % 100;
	            return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
	        },
	        currency: {
	            symbol: '€ '
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('be-nl', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : simplified chinese
	 * author : badplum : https://github.com/badplum
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: '千',
	            million: '百万',
	            billion: '十亿',
	            trillion: '兆'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: '¥'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('chs', language);
	    }
	}());

	/*!
	 * numeral.js language configuration
	 * language : czech (cs)
	 * author : Anatoli Papirovski : https://github.com/apapirovski
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'tis.',
	            million: 'mil.',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function () {
	            return '.';
	        },
	        currency: {
	            symbol: 'Kč'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('cs', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : danish denmark (dk)
	 * author : Michael Storgaard : https://github.com/mstorgaard
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mio',
	            billion: 'mia',
	            trillion: 'b'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: 'DKK'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('da-dk', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : German in Switzerland (de-ch)
	 * author : Michael Piefel : https://github.com/piefel (based on work from Marco Krage : https://github.com/sinky)
	 */ 
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: 'CHF'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('de-ch', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium
	 * author : Marco Krage : https://github.com/sinky
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('de', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : english united kingdom (uk)
	 * author : Dan Ristic : https://github.com/dristic
	 */
	(function () {
	    var language = {
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
	            symbol: '£'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('en-gb', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : spanish Spain
	 * author : Hernan Garcia : https://github.com/hgarcia
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            var b = number % 10;
	            return (b === 1 || b === 3) ? 'er' :
	                (b === 2) ? 'do' :
	                    (b === 7 || b === 0) ? 'mo' :
	                        (b === 8) ? 'vo' :
	                            (b === 9) ? 'no' : 'to';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('es', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : spanish
	 * author : Hernan Garcia : https://github.com/hgarcia
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            var b = number % 10;
	            return (b === 1 || b === 3) ? 'er' :
	                (b === 2) ? 'do' :
	                (b === 7 || b === 0) ? 'mo' : 
			(b === 8) ? 'vo' :
			(b === 9) ? 'no' : 'to';
	        },
	        currency: {
	            symbol: '$'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('es', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : Estonian
	 * author : Illimar Tambek : https://github.com/ragulka
	 *
	 * Note: in Estonian, abbreviations are always separated
	 * from numbers with a space
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: ' tuh',
	            million: ' mln',
	            billion: ' mld',
	            trillion: ' trl'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('et', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : Finnish
	 * author : Sami Saada : https://github.com/samitheberber
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'M',
	            billion: 'G',
	            trillion: 'T'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('fi', language);
	    }
	}());

	/*!
	 * numeral.js language configuration
	 * language : french (Canada) (fr-CA)
	 * author : Léo Renaud-Allaire : https://github.com/renaudleo
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'M',
	            billion: 'G',
	            trillion: 'T'
	        },
	        ordinal : function (number) {
	            return number === 1 ? 'er' : 'e';
	        },
	        currency: {
	            symbol: '$'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('fr-CA', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : french (fr-ch)
	 * author : Adam Draper : https://github.com/adamwdraper
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: '\'',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal : function (number) {
	            return number === 1 ? 'er' : 'e';
	        },
	        currency: {
	            symbol: 'CHF'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('fr-ch', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : french (fr)
	 * author : Adam Draper : https://github.com/adamwdraper
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal : function (number) {
	            return number === 1 ? 'er' : 'e';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('fr', language);
	    }
	}());
	/*!
	 * numeral.js language configuration
	 * language : Hungarian (hu)
	 * author : Peter Bakondy : https://github.com/pbakondy
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'E',  // ezer
	            million: 'M',   // millió
	            billion: 'Mrd', // milliárd
	            trillion: 'T'   // trillió
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: ' Ft'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('hu', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : italian Italy (it)
	 * author : Giacomo Trombi : http://cinquepunti.it
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'mila',
	            million: 'mil',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            return 'º';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('it', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : japanese
	 * author : teppeis : https://github.com/teppeis
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: '千',
	            million: '百万',
	            billion: '十億',
	            trillion: '兆'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: '¥'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('ja', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : netherlands-dutch (nl-nl)
	 * author : Dave Clayton : https://github.com/davedx
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: '.',
	            decimal  : ','
	        },
	        abbreviations: {
	            thousand : 'k',
	            million  : 'mln',
	            billion  : 'mrd',
	            trillion : 'bln'
	        },
	        ordinal : function (number) {
	            var remainder = number % 100;
	            return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
	        },
	        currency: {
	            symbol: '€ '
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('nl-nl', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : polish (pl)
	 * author : Dominik Bulaj : https://github.com/dominikbulaj
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'tys.',
	            million: 'mln',
	            billion: 'mld',
	            trillion: 'bln'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: 'PLN'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('pl', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : portuguese brazil (pt-br)
	 * author : Ramiro Varandas Jr : https://github.com/ramirovjr
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'mil',
	            million: 'milhões',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            return 'º';
	        },
	        currency: {
	            symbol: 'R$'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('pt-br', language);
	    }
	}());
	/*! 
	 * numeral.js language configuration
	 * language : portuguese (pt-pt)
	 * author : Diogo Resende : https://github.com/dresende
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal : function (number) {
	            return 'º';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('pt-pt', language);
	    }
	}());

	// numeral.js language configuration
	// language : Russian for the Ukraine (ru-UA)
	// author : Anatoli Papirovski : https://github.com/apapirovski
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'тыс.',
	            million: 'млн',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function () {
	            // not ideal, but since in Russian it can taken on 
	            // different forms (masculine, feminine, neuter)
	            // this is all we can do
	            return '.'; 
	        },
	        currency: {
	            symbol: '\u20B4'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('ru-UA', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : russian (ru)
	 * author : Anatoli Papirovski : https://github.com/apapirovski
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'тыс.',
	            million: 'млн',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function () {
	            // not ideal, but since in Russian it can taken on 
	            // different forms (masculine, feminine, neuter)
	            // this is all we can do
	            return '.'; 
	        },
	        currency: {
	            symbol: 'руб.'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('ru', language);
	    }
	}());

	/*!
	 * numeral.js language configuration
	 * language : slovak (sk)
	 * author : Ahmed Al Hafoudh : http://www.freevision.sk
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'tis.',
	            million: 'mil.',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function () {
	            return '.';
	        },
	        currency: {
	            symbol: '€'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('sk', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : thai (th)
	 * author : Sathit Jittanupat : https://github.com/jojosati
	 */
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'พัน',
	            million: 'ล้าน',
	            billion: 'พันล้าน',
	            trillion: 'ล้านล้าน'
	        },
	        ordinal: function (number) {
	            return '.';
	        },
	        currency: {
	            symbol: '฿'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('th', language);
	    }
	}());

	/*! 
	 * numeral.js language configuration
	 * language : turkish (tr)
	 * author : Ecmel Ercan : https://github.com/ecmel, Erhan Gundogan : https://github.com/erhangundogan, Burak Yiğit Kaya: https://github.com/BYK
	 */
	(function () {
	    var suffixes = {
	            1: '\'inci',
	            5: '\'inci',
	            8: '\'inci',
	            70: '\'inci',
	            80: '\'inci',

	            2: '\'nci',
	            7: '\'nci',
	            20: '\'nci',
	            50: '\'nci',

	            3: '\'üncü',
	            4: '\'üncü',
	            100: '\'üncü',

	            6: '\'ncı',

	            9: '\'uncu',
	            10: '\'uncu',
	            30: '\'uncu',

	            60: '\'ıncı',
	            90: '\'ıncı'
	        },
	        language = {
	            delimiters: {
	                thousands: '.',
	                decimal: ','
	            },
	            abbreviations: {
	                thousand: 'bin',
	                million: 'milyon',
	                billion: 'milyar',
	                trillion: 'trilyon'
	            },
	            ordinal: function (number) {
	                if (number === 0) {  // special case for zero
	                    return '\'ıncı';
	                }

	                var a = number % 10,
	                    b = number % 100 - a,
	                    c = number >= 100 ? 100 : null;

	              return suffixes[a] || suffixes[b] || suffixes[c];
	            },
	            currency: {
	                symbol: '\u20BA'
	            }
	        };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('tr', language);
	    }
	}());

	// numeral.js language configuration
	// language : Ukrainian for the Ukraine (uk-UA)
	// author : Michael Piefel : https://github.com/piefel (with help from Tetyana Kuzmenko)
	(function () {
	    var language = {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'тис.',
	            million: 'млн',
	            billion: 'млрд',
	            trillion: 'блн'
	        },
	        ordinal: function () {
	            // not ideal, but since in Ukrainian it can taken on 
	            // different forms (masculine, feminine, neuter)
	            // this is all we can do
	            return ''; 
	        },
	        currency: {
	            symbol: '\u20B4'
	        }
	    };

	    // Node
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
	        this.numeral.language('uk-UA', language);
	    }
	}());


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _configSettings = __webpack_require__(5);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "row",

		mixins: [_reactAddons2["default"].addons.PureRendermixin],

		getDefaultProps: function getDefaultProps() {
			return {
				className: '',
				uniqueId: _underscore2["default"].uniqueId('propertable-row-')
			};
		},

		render: function render() {
			var className = this.props.className;

			return _reactAddons2["default"].createElement(
				"tr",
				{ id: this.props.uniqueId, className: "propertable-row " + className },
				this.props.children
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "row.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _configSettings = __webpack_require__(5);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "hcell",

		mixins: [_reactAddons2["default"].addons.PureRendermixin],

		getDefaultProps: function getDefaultProps() {
			return {
				className: '',
				uniqueId: _underscore2["default"].uniqueId('propertable-hcell-'),
				rowspan: null,
				colspan: null,
				sortable: true,
				sorted: false,
				onSort: null
			};
		},

		handleSort: function handleSort(e) {
			var next = 'asc';

			if (this.props.sorted == 'asc') {
				next = 'desc';
			}

			if (this.props.sorted == 'desc') {
				next = false;
			}

			if (this.props.onSort && typeof this.props.onSort == 'function') {
				this.props.onSort(next, this.props);
			}
		},

		renderSortOptions: function renderSortOptions() {
			var next = 'asc';

			if (this.props.sorted == 'asc') {
				next = 'desc';
			}

			if (this.props.sorted == 'desc') {
				next = false;
			}

			if (!this.props.sortable) {
				return false;
			}

			return _reactAddons2["default"].createElement(
				"button",
				{ className: "btn btn-xs sort sort-" + next, onClick: this.handleSort },
				"sort"
			);
		},

		render: function render() {
			var className = this.props.className;
			var spans = {};
			var sortBtns = this.renderSortOptions();
			var tools = null;

			if (this.props.rowspan) {
				spans.rowSpan = this.props.rowspan + 1;
			}

			if (this.props.colspan) {
				spans.colSpan = this.props.colspan + 1;
			}

			if (this.props.field) {
				tools = _reactAddons2["default"].createElement(
					"div",
					{ className: "htools" },
					sortBtns
				);

				className += ' has-tools';
			}

			return _reactAddons2["default"].createElement(
				"th",
				_extends({ id: this.props.uniqueId, className: "propertable-hcell " + className }, spans),
				_reactAddons2["default"].createElement(
					"div",
					{ className: "hlabel" },
					this.props.children
				),
				tools
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "hcell.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _configSettings = __webpack_require__(5);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "cell",

		mixins: [_reactAddons2["default"].addons.PureRendermixin],

		getDefaultProps: function getDefaultProps() {
			return {
				className: '',
				uniqueId: _underscore2["default"].uniqueId('propertable-hcell-')
			};
		},

		render: function render() {
			var className = this.props.className;

			return _reactAddons2["default"].createElement(
				"td",
				{ id: this.props.uniqueId, className: "propertable-cell " + className },
				this.props.children
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "cell.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _moment = __webpack_require__(14);

	var _moment2 = _interopRequireDefault(_moment);

	var _configSettings = __webpack_require__(5);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	var _numeral = __webpack_require__(8);

	var _numeral2 = _interopRequireDefault(_numeral);

	exports["default"] = {
		string: function string(value) {
			return value.toString();
		},
		number: function number(value) {
			if (typeof value == 'string') {
				value = (0, _numeral2["default"])().unformat(value);
			}

			return (0, _numeral2["default"])(value).format('0,0[.]00');
		},
		date: function date(value) {
			return (0, _moment2["default"])(value).format('LL');
		},
		datetime: function datetime(value) {
			return (0, _moment2["default"])(value).format('LLL');
		}
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "formatters.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);