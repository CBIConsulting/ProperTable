"use strict";

exports.__esModule = true;

var _table = require("./components/table");

var _table2 = _interopRequireDefault(_table);

var _portal = require("./components/portal");

var _portal2 = _interopRequireDefault(_portal);

var _formatters = require("./formatters/formatters");

var _formatters2 = _interopRequireDefault(_formatters);

var _messages = require("./lang/messages");

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (process.env.APP_ENV === 'browser') {
	// require("../css/style.scss");
}

exports["default"] = {
	Table: _table2["default"],
	Portal: _portal2["default"],
	formatters: _formatters2["default"],
	lang: _messages2["default"]
};
module.exports = exports['default'];