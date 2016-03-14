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

	eval("'use strict';\n\nvar _ProperTable = __webpack_require__(1);\n\nvar _ProperTable2 = _interopRequireDefault(_ProperTable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar body = document.getElementById('canvas');\n\nconsole.log(_ProperTable2.default);\n\n$(function () {\n\tvar cols = [{\n\t\tname: 'col1',\n\t\tlabel: 'columna 1',\n\t\tfield: 'col1',\n\t\twidth: 120,\n\t\tformatter: function formatter(value) {\n\t\t\treturn 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';\n\t\t}\n\t}, {\n\t\tname: 'number',\n\t\tlabel: 'A number',\n\t\tfield: 'number',\n\t\tclassName: 'number',\n\t\tformatter: _ProperTable2.default.formatters.number\n\t}, {\n\t\tname: 'nested',\n\t\tlabel: 'columnas anidadas',\n\t\tuniqueId: 'miprueba_de_id',\n\t\tchildren: [{\n\t\t\tname: 'nested1',\n\t\t\tlabel: 'nested1',\n\t\t\tfield: 'nested1',\n\t\t\tsortVal: function sortVal(value) {\n\t\t\t\treturn moment(value).unix();\n\t\t\t},\n\t\t\tformatter: _ProperTable2.default.formatters.date\n\t\t}, {\n\t\t\tname: 'nested2',\n\t\t\tlabel: 'nested2',\n\t\t\tfield: 'nested2'\n\t\t}]\n\t}, {\n\t\tname: 'test',\n\t\tlabel: 'test',\n\t\tfield: 'number',\n\t\tformatter: function formatter(value) {\n\t\t\treturn 'test';\n\t\t}\n\t}];\n\n\tvar data = [];\n\n\tfor (var i = 500; i >= 0; i--) {\n\t\tdata.push({\n\t\t\tcol1: 'added-' + i,\n\t\t\tnested1: moment().add(Math.round(Math.random() * 10000) % 2000, 'days').format('YYYY-MM-DD HH:mm:ss'),\n\t\t\tnested2: 'bar-' + i,\n\t\t\tnumber: Math.round(Math.random() * 1000) % 20 + 1\n\t\t});\n\t};\n\n\tReactDOM.render(React.createElement(_ProperTable2.default.Table, { key: 'testtable', cols: cols, data: data, afterSelect: function afterSelect(data) {\n\t\t\tconsole.log('selected', data);\n\t\t} }), body);\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ../examples/jsx/example.js\n ** module id = 0\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///../examples/jsx/example.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _table = __webpack_require__(2);\n\nvar _table2 = _interopRequireDefault(_table);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n__webpack_require__(4);\n\nexports.default = {\n\tTable: _table2.default\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./jsx/ProperTable.js\n ** module id = 1\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./jsx/ProperTable.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(3);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Table = function (_React$Component) {\n\t_inherits(Table, _React$Component);\n\n\tfunction Table() {\n\t\t_classCallCheck(this, Table);\n\n\t\treturn _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));\n\t}\n\n\t_createClass(Table, [{\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t'hola mundo'\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Table;\n}(_react2.default.Component);\n\nexports.default = Table;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./jsx/components/table.js\n ** module id = 2\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./jsx/components/table.js?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = React;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"React\"\n ** module id = 3\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///external_%22React%22?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n/*****************\n ** WEBPACK FOOTER\n ** ./css/style.scss\n ** module id = 4\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./css/style.scss?");

/***/ }
/******/ ]);