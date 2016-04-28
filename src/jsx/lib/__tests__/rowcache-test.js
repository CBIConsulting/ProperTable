import rowcache from "../rowcache";

describe('rowcache', function() {
	beforeAll(function() {
		rowcache.init({
			'r1': {
				'foo': 'bar'
			}
		});
	});

	it('reads', function() {
		let result = rowcache.read(['r1', 'foo']);

		expect(result).toBe('bar');
	});

	it('writes', function() {
		let result = rowcache.write(['foo', 'bar'], 'biz').read(['foo', 'bar']);

		expect(result).toBe('biz');
	});

	it('flushes key', function() {
		let result = rowcache.write(['foo', 'bar'], 'biz').flush(['foo', 'bar']).read(['foo', 'bar']);

		expect(result).toBe(undefined);
		expect(rowcache.read(['r1', 'foo'])).toBe('bar');
	});

	it('flushes all', function() {
		let result = rowcache.write(['foo', 'bar'], 'biz').flush().read(['foo', 'bar']);

		expect(result).toBe(undefined);
		expect(rowcache.read(['r1', 'foo'])).toBe(undefined);
	});
});