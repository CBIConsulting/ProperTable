'use strict';

var _rowcache = require('../rowcache');

var _rowcache2 = _interopRequireDefault(_rowcache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

describe('rowcache', function () {
	beforeAll(function () {
		_rowcache2['default'].init({
			'r1': {
				'foo': 'bar'
			}
		});
	});

	it('reads', function () {
		var result = _rowcache2['default'].read(['r1', 'foo']);

		expect(result).toBe('bar');
	});

	it('writes', function () {
		var result = _rowcache2['default'].write(['foo', 'bar'], 'biz').read(['foo', 'bar']);

		expect(result).toBe('biz');
	});

	it('flushes key', function () {
		var result = _rowcache2['default'].write(['foo', 'bar'], 'biz').flush(['foo', 'bar']).read(['foo', 'bar']);

		expect(result).toBe(undefined);
		expect(_rowcache2['default'].read(['r1', 'foo'])).toBe('bar');
	});

	it('flushes all', function () {
		var result = _rowcache2['default'].write(['foo', 'bar'], 'biz').flush().read(['foo', 'bar']);

		expect(result).toBe(undefined);
		expect(_rowcache2['default'].read(['r1', 'foo'])).toBe(undefined);
	});
});