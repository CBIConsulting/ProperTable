'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotObject = require('dot-object');

var _dotObject2 = _interopRequireDefault(_dotObject);

var _underscore = require('underscore');

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

	_createClass(RowCache, [{
		key: 'init',
		value: function init() {
			var base = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

			cache = base;

			return this;
		}
	}, {
		key: 'read',
		value: function read(key) {
			var k = parseKey(key);
			return _dotObject2['default'].pick(k, cache);
		}
	}, {
		key: 'write',
		value: function write(key, value) {
			var k = parseKey(key);
			var writable = {};

			writable[k] = value;
			writable = _dotObject2['default'].object(writable);

			cache = (0, _underscore.extend)(cache, writable);

			return this;
		}
	}, {
		key: 'flush',
		value: function flush() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

			if (key) {
				var k = parseKey(key);
				_dotObject2['default'].remove(k, cache);
			} else {
				this.init();
			}

			return this;
		}
	}]);

	return RowCache;
}();

var rowcache = new RowCache();

exports['default'] = rowcache;
module.exports = exports['default'];