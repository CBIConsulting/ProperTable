import formatters from "../formatters";

describe('Formatters', () => {
	it('is available', () => {
		expect(typeof formatters !== 'undefined').toBe(true);
	});

	describe('string formatter', () => {
		it('renders text', () => {
			let text = 'hello world!';

			expect(formatters.string(text)).toBe('hello world!');
		});

		it('converts numbers to text', () => {
			let num1 = 27;
			let num2 = 27.326;

			let result1 = formatters.string(num1);
			let result2 = formatters.string(num2);

			expect(typeof result1).toBe('string');
			expect(result1).toBe('27');
			expect(typeof result2).toBe('string');
			expect(result2).toBe('27.326');
		});

		it('handles null', () => {
			expect(formatters.string(null)).toBe(null);
		});
	});

	describe('number', () => {
		it('formats numbers', () => {
			let num = -12345.0353;
			let result = formatters.number(num);

			expect(typeof result).toBe('string');
			expect(result).toBe('-12,345.04');
		});

		it('handles invalid input', () => {
			let n1 = 'test', n2 = '23a', n3 = '', n4 = '2,5,3';

			let result1 = formatters.number(n1),
			    result2 = formatters.number(n2),
			    result3 = formatters.number(n3),
			    result4 = formatters.number(n4)

			expect(result1).toBe(null);
			expect(result2).toBe(null);
			expect(result3).toBe(null);
			expect(result4).toBe(null);
		});

		it('handles null', () => {
			expect(formatters.number(null)).toBe(null);
		});
	});

	describe('date', () => {
		it('formats dates', () => {
			let date = "2013-02-08 09:30";
			let result = formatters.date(date);

			expect(typeof result).toBe('string');
			expect(result).toBe('February 8, 2013');
		});

		it('handles invalid dates', () => {
			let date = "hola ke ase";
			let date2 = "February 38, 2013";
			let result = formatters.date(date);
			let result2 = formatters.date(date2);

			expect(result).toBe(null);
			expect(result2).toBe(null);
		});

		it('handles null', () => {
			expect(formatters.date(null)).toBe(null);
		});
	});

	describe('datetime', () => {
		it('formats dates', () => {
			let date = "2013-02-08 09:30";
			let result = formatters.datetime(date);

			expect(typeof result).toBe('string');
			expect(result).toBe('February 8, 2013 9:30 AM');
		});

		it('handles invalid dates', () => {
			let date = "hola ke ase";
			let date2 = "February 38, 2013";
			let result = formatters.datetime(date);
			let result2 = formatters.datetime(date2);

			expect(result).toBe(null);
			expect(result2).toBe(null);
		});

		it('handles null', () => {
			expect(formatters.datetime(null)).toBe(null);
		});
	});
});
