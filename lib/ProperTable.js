"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _table = require("./components/table");

var _table2 = _interopRequireDefault(_table);

var _treetable = require("./components/treetable");

var _treetable2 = _interopRequireDefault(_treetable);

var _formatters = require("./formatters/formatters");

var _formatters2 = _interopRequireDefault(_formatters);

var _messages = require("./lang/messages");

var _messages2 = _interopRequireDefault(_messages);

var _reactDimensions = require("react-dimensions");

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (process.env.APP_ENV === 'browser') {
	require("../css/style.scss");
}

exports["default"] = {
	Table: (0, _reactDimensions2["default"])()(_table2["default"]),
	TreeTable: (0, _reactDimensions2["default"])()(_treetable2["default"]),
	formatters: _formatters2["default"],
	lang: _messages2["default"]
};
module.exports = exports['default'];