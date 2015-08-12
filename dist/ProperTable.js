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

	var _configSettings = __webpack_require__(3);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	__webpack_require__(8);

	exports["default"] = {
		Settings: _configSettings2["default"],
		Table: _componentsTable2["default"]
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _configSettings = __webpack_require__(3);

	var _configSettings2 = _interopRequireDefault(_configSettings);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "table",

		getDefaultProps: function getDefaultProps() {
			return {
				className: null,
				cols: [],
				data: []
			};
		},

		getInitialState: function getInitialState() {
			return {
				cols: $.extend(true, this.props.cols, []),
				data: $.extend(true, this.props.data, [])
			};
		},

		render: function render() {
			var className = this.props.className;

			if (!this.state.cols.length) {
				return _reactAddons2["default"].createElement(
					"div",
					{ className: "propertable " + className },
					_reactAddons2["default"].createElement(
						"div",
						{ className: "empty-mst" },
						_reactAddons2["default"].createElement(
							"p",
							null,
							_configSettings2["default"].msg('emptymsg')
						)
					)
				);
			}

			return _reactAddons2["default"].createElement(
				"div",
				{ className: "propertable " + className },
				"Soy una tabla"
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
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _i18nLanguages = __webpack_require__(4);

	var _i18nLanguages2 = _interopRequireDefault(_i18nLanguages);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery = __webpack_require__(7);

	var _jquery2 = _interopRequireDefault(_jquery);

	var Settings = (function () {
		function Settings() {
			_classCallCheck(this, Settings);

			this.settings = {
				language: "en"
			};
			this.messages = {};

			this.setLang(this.settings.lang);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _en = __webpack_require__(5);

	var _en2 = _interopRequireDefault(_en);

	exports["default"] = {
		en: _en2["default"]
	};
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTable/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "languages.js" + ": " + err.message); } }); } } })(); }

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);