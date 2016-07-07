"use strict";

exports.__esModule = true;

var _BIGGERTHAN$LOWERTHAN;

var _formatters = require("../formatters/formatters");

var _formatters2 = _interopRequireDefault(_formatters);

var _moment = require("moment");

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