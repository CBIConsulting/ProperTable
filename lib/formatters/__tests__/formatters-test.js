'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _formatters = require('../formatters');

var _formatters2 = _interopRequireDefault(_formatters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

describe('Formatters', function () {
	it('is available', function () {
		expect(typeof _formatters2['default'] !== 'undefined').toBe(true);
	});

	describe('string formatter', function () {
		it('renders text', function () {
			var text = 'hello world!';

			expect(_formatters2['default'].string(text)).toBe('hello world!');
		});

		it('converts numbers to text', function () {
			var num1 = 27;
			var num2 = 27.326;

			var result1 = _formatters2['default'].string(num1);
			var result2 = _formatters2['default'].string(num2);

			expect(typeof result1 === 'undefined' ? 'undefined' : _typeof(result1)).toBe('string');
			expect(result1).toBe('27');
			expect(typeof result2 === 'undefined' ? 'undefined' : _typeof(result2)).toBe('string');
			expect(result2).toBe('27.326');
		});

		it('handles null', function () {
			expect(_formatters2['default'].string(null)).toBe(null);
		});
	});

	describe('number', function () {
		it('formats numbers', function () {
			var num = -12345.0353;
			var result = _formatters2['default'].number(num);

			expect(typeof result === 'undefined' ? 'undefined' : _typeof(result)).toBe('string');
			expect(result).toBe('-12,345.04');
		});

		it('handles invalid input', function () {
			var n1 = 'test',
			    n2 = '23a',
			    n3 = '',
			    n4 = '2,5,3';

			var result1 = _formatters2['default'].number(n1),
			    result2 = _formatters2['default'].number(n2),
			    result3 = _formatters2['default'].number(n3),
			    result4 = _formatters2['default'].number(n4);

			expect(result1).toBe(null);
			expect(result2).toBe(null);
			expect(result3).toBe(null);
			expect(result4).toBe(null);
		});

		it('handles null', function () {
			expect(_formatters2['default'].number(null)).toBe(null);
		});
	});

	describe('date', function () {
		it('formats dates', function () {
			var date = "2013-02-08 09:30";
			var result = _formatters2['default'].date(date);

			expect(typeof result === 'undefined' ? 'undefined' : _typeof(result)).toBe('string');
			expect(result).toBe('February 8, 2013');
		});

		it('handles invalid dates', function () {
			var date = "hola ke ase";
			var date2 = "February 38, 2013";
			var result = _formatters2['default'].date(date);
			var result2 = _formatters2['default'].date(date2);

			expect(result).toBe(null);
			expect(result2).toBe(null);
		});

		it('handles null', function () {
			expect(_formatters2['default'].date(null)).toBe(null);
		});
	});

	describe('datetime', function () {
		it('formats dates', function () {
			var date = "2013-02-08 09:30";
			var result = _formatters2['default'].datetime(date);

			expect(typeof result === 'undefined' ? 'undefined' : _typeof(result)).toBe('string');
			expect(result).toBe('February 8, 2013 9:30 AM');
		});

		it('handles invalid dates', function () {
			var date = "hola ke ase";
			var date2 = "February 38, 2013";
			var result = _formatters2['default'].datetime(date);
			var result2 = _formatters2['default'].datetime(date2);

			expect(result).toBe(null);
			expect(result2).toBe(null);
		});

		it('handles null', function () {
			expect(_formatters2['default'].datetime(null)).toBe(null);
		});
	});
});