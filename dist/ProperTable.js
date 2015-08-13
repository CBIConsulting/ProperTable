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

	var _formattersFormatters = __webpack_require__(11);

	var _formattersFormatters2 = _interopRequireDefault(_formattersFormatters);

	__webpack_require__(13);

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

	var _row = __webpack_require__(8);

	var _row2 = _interopRequireDefault(_row);

	var _hcell = __webpack_require__(9);

	var _hcell2 = _interopRequireDefault(_hcell);

	var _cell = __webpack_require__(10);

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
				uniqueId: _underscore2["default"].uniqueId('propertable-')
			};
		},

		getInitialState: function getInitialState() {
			return {
				cols: _jquery2["default"].extend(true, this.props.cols, []),
				data: _jquery2["default"].extend(true, this.props.data, [])
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

		buildCols: function buildCols(cols) {
			var _this = this;

			var plain = this.buildPlainColumns(cols),
			    rows = [];
			var rowcount = 1;

			this.fieldsOrder = [];
			this.columnIndex = {};

			rows = _underscore2["default"].map(plain, function (row) {
				return _underscore2["default"].map(row, function (item) {
					if (typeof item.field != 'undefined' && item.field) {
						_this.fieldsOrder.push(item.field);
						_this.columnIndex[item.field] = item;
					}

					return _reactAddons2["default"].createElement(
						_hcell2["default"],
						_extends({ key: 'header' + item.name }, item),
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

			result = _underscore2["default"].map(data, function (rowdata) {
				var cells = _underscore2["default"].map(_this2.fieldsOrder, function (field) {
					var col = _this2.columnIndex[field];
					var value = rowdata[field];

					if (typeof col.formatter == 'function') {
						value = col.formatter(value, col);
					}

					return _reactAddons2["default"].createElement(
						_cell2["default"],
						{ key: 'ccel-' + curCell++, className: col.className || null },
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

	var _globalize = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"globalize\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _globalize2 = _interopRequireDefault(_globalize);

	var Settings = (function () {
		function Settings() {
			_classCallCheck(this, Settings);

			this.settings = {
				language: "en"
			};
			this.messages = {};
			this.globalize = (0, _globalize2["default"])(this.settings.language);
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
				this.globalize = (0, _globalize2["default"])(this.settings.language);

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
/* 9 */
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

		getDefaultProps: function getDefaultProps() {
			return {
				className: '',
				uniqueId: _underscore2["default"].uniqueId('propertable-hcell-'),
				rowspan: null,
				colspan: null
			};
		},

		render: function render() {
			var className = this.props.className;
			var spans = {};

			if (this.props.rowspan) {
				spans.rowSpan = this.props.rowspan + 1;
			}

			if (this.props.colspan) {
				spans.colSpan = this.props.colspan + 1;
			}

			console.log(this.props.colspan, this.props.rowspan);

			return _reactAddons2["default"].createElement(
				"th",
				_extends({ id: this.props.uniqueId, className: "propertable-hcell " + className }, spans),
				this.props.children
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "hcell.js" + ": " + err.message); } }); } } })(); }

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
		displayName: "cell",

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _moment = __webpack_require__(12);

	var _moment2 = _interopRequireDefault(_moment);

	var _configSettings = __webpack_require__(5);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	var globalize = _configSettings2["default"].globalize;

	exports["default"] = {
		string: function string(value) {
			return value.toString();
		},
		number: function number(value) {
			return globalize.format(value);
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
/* 12 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);