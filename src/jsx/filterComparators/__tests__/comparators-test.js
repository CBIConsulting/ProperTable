import comparators from "../comparators";

const NOTEQUALS = 'notequals';
const EQUALS = "equals";
const BIGGERTHAN = 'bigger';
const LOWERTHAN = 'lower';
const AFTERDATE = 'after';
const BEFOREDATE = 'before';
const BETWEENDATES = 'between';
const STARTSWITH = 'start';
const FINISHWITH = 'finish';
const CONTAINS = 'contains';
const NOTCONTAINS = 'notContains';
const EMPTY = 'empty';

describe('Comparators', () => {
	it('is available', () => {
		expect(typeof comparators !== 'undefined').toBe(true);
	});

	describe('EQUALS comparator', () => {
		it('nulls', () => {
			let s1 = null, s2 = 'eee';
			let result = comparators[EQUALS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('numbers', () => {
			let s1 = 56, s2 = 56;
			let result = comparators[EQUALS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings', () => {
			let s1 = '56', s2 = '56';
			let result = comparators[EQUALS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('NOTEQUALS comparator', () => {
		it('nulls', () => {
			let s1 = null, s2 = 'eee';
			let result = comparators[NOTEQUALS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});

		it('numbers', () => {
			let s1 = 56, s2 = 56;
			let result = comparators[NOTEQUALS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('strings', () => {
			let s1 = '56', s2 = '56';
			let result = comparators[NOTEQUALS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('BIGGERTHAN comparator', () => {
		it('nulls', () => {
			let s1 = null, s2 = 'eee';
			let result = comparators[BIGGERTHAN](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('numbers', () => {
			let s1 = 56, s2 = 56;
			let result = comparators[BIGGERTHAN](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('strings', () => {
			let s1 = '600', s2 = '59';
			let result = comparators[BIGGERTHAN](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('LOWERTHAN comparator', () => {
		it('nulls', () => {
			let s1 = null, s2 = 'eee';
			let result = comparators[LOWERTHAN](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('numbers', () => {
			let s1 = 56, s2 = 59;
			let result = comparators[LOWERTHAN](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings', () => {
			let s1 = '600', s2 = '59';
			let result = comparators[LOWERTHAN](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('AFTERDATE comparator', () => {
		it('nulls', () => {
			let s1 = null, s2 = 'eee';
			let result = comparators[AFTERDATE](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('dates', () => {
			let s1 = '2013-02-08 09:30:26', s2 = '2012-02-08 09:30:26';
			let result = comparators[AFTERDATE](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('BEFOREDATE comparator', () => {
		it('nulls', () => {
			let s1 = null, s2 = 'eee';
			let result = comparators[BEFOREDATE](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('dates', () => {
			let s1 = '2013-02-08 09:30:26', s2 = '2014-02-08 09:30:26';
			let result = comparators[BEFOREDATE](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('BETWEENDATES comparator', () => {
		it('nulls', () => {
			let s1 = null, s2 = 'eee';
			let result = comparators[BETWEENDATES](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});

		it('dates', () => {
			let s1 = '2013-02-08 09:30:2%-%2016-02-08 09:30:26', s2 = '2014-02-08 09:30:26';
			let result = comparators[BETWEENDATES](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('CONTAINS comparator', () => {
		it('strings', () => {
			let s1 = 'Hello', s2 = 'Hello World';
			let result = comparators[CONTAINS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('NOTCONTAINS comparator', () => {
		it('strings', () => {
			let s1 = 'PRT', s2 = 'Hello World';
			let result = comparators[NOTCONTAINS](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('STARTSWITH comparator', () => {
		it('strings', () => {
			let s1 = 'Hell', s2 = 'Hello World';
			let result = comparators[STARTSWITH](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings 2', () => {
			let s1 = 'Wor', s2 = 'Hello World';
			let result = comparators[STARTSWITH](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('FINISHWITH comparator', () => {
		it('strings', () => {
			let s1 = 'orld', s2 = 'Hello World';
			let result = comparators[FINISHWITH](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings2', () => {
			let s1 = 'Hello', s2 = 'Hello World';
			let result = comparators[FINISHWITH](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('EMPTY comparator', () => {
		it('strings', () => {
			let s1 = 'yes', s2 = '';
			let result = comparators[EMPTY](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings2', () => {
			let s1 = 'no', s2 = '965fd';
			let result = comparators[EMPTY](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings2', () => {
			let s1 = 'yes', s2 = '965fd';
			let result = comparators[EMPTY](s1, s2);

			expect(typeof result).toBe('boolean');
			expect(result).toBe(false);
		});
	});
});