"use strict";

exports.__esModule = true;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _numeral = require("numeral");

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