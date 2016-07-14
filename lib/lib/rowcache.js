'use strict';

exports.__esModule = true;

var _dotObject = require('dot-object');

var _dotObject2 = _interopRequireDefault(_dotObject);

var _underscore = require('underscore');

var _deepmerge = require('deepmerge');

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
		var base = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, RowCache);

		this.init(base);
	}

	RowCache.prototype.init = function init() {
		var base = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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
		var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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