"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _comparators = require("../comparators");

var _comparators2 = _interopRequireDefault(_comparators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NOTEQUALS = 'notequals';
var EQUALS = "equals";
var BIGGERTHAN = 'bigger';
var LOWERTHAN = 'lower';
var AFTERDATE = 'after';
var BEFOREDATE = 'before';
var BETWEENDATES = 'between';
var STARTSWITH = 'start';
var FINISHWITH = 'finish';
var CONTAINS = 'contains';
var NOTCONTAINS = 'notcontains';
var EMPTY = 'empty';

describe('Comparators', function () {
	it('is available', function () {
		expect(typeof _comparators2["default"] !== 'undefined').toBe(true);
	});

	describe('EQUALS comparator', function () {
		it('nulls', function () {
			var s1 = null,
			    s2 = 'eee';
			var result = _comparators2["default"][EQUALS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('numbers', function () {
			var s1 = 56,
			    s2 = 56;
			var result = _comparators2["default"][EQUALS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings', function () {
			var s1 = '56',
			    s2 = '56';
			var result = _comparators2["default"][EQUALS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('NOTEQUALS comparator', function () {
		it('nulls', function () {
			var s1 = null,
			    s2 = 'eee';
			var result = _comparators2["default"][NOTEQUALS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});

		it('numbers', function () {
			var s1 = 56,
			    s2 = 56;
			var result = _comparators2["default"][NOTEQUALS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('strings', function () {
			var s1 = '56',
			    s2 = '56';
			var result = _comparators2["default"][NOTEQUALS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('BIGGERTHAN comparator', function () {
		it('nulls', function () {
			var s1 = null,
			    s2 = 'eee';
			var result = _comparators2["default"][BIGGERTHAN](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('numbers', function () {
			var s1 = 56,
			    s2 = 56;
			var result = _comparators2["default"][BIGGERTHAN](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('strings', function () {
			var s1 = '600',
			    s2 = '59';
			var result = _comparators2["default"][BIGGERTHAN](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('LOWERTHAN comparator', function () {
		it('nulls', function () {
			var s1 = null,
			    s2 = 'eee';
			var result = _comparators2["default"][LOWERTHAN](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('numbers', function () {
			var s1 = 56,
			    s2 = 59;
			var result = _comparators2["default"][LOWERTHAN](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings', function () {
			var s1 = '600',
			    s2 = '59';
			var result = _comparators2["default"][LOWERTHAN](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('AFTERDATE comparator', function () {
		it('nulls', function () {
			var s1 = null,
			    s2 = 'eee';
			var result = _comparators2["default"][AFTERDATE](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('dates', function () {
			var s1 = '2012-02-08 09:30:26',
			    s2 = '2013-02-08 09:30:26';
			var result = _comparators2["default"][AFTERDATE](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('BEFOREDATE comparator', function () {
		it('nulls', function () {
			var s1 = null,
			    s2 = 'eee';
			var result = _comparators2["default"][BEFOREDATE](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('dates', function () {
			var s1 = '2014-02-08 09:30:26',
			    s2 = '2013-02-08 09:30:26';
			var result = _comparators2["default"][BEFOREDATE](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('BETWEENDATES comparator', function () {
		it('nulls', function () {
			var s1 = null,
			    s2 = 'eee';
			var result = _comparators2["default"][BETWEENDATES](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});

		it('dates', function () {
			var s1 = '2013-02-08 09:30:24%-%2016-02-08 09:30:26',
			    s2 = '2014-02-08 09:30:26';
			var result = _comparators2["default"][BETWEENDATES](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('CONTAINS comparator', function () {
		it('strings', function () {
			var s1 = 'Hello',
			    s2 = 'Hello World';
			var result = _comparators2["default"][CONTAINS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('NOTCONTAINS comparator', function () {
		it('strings', function () {
			var s1 = 'PRT',
			    s2 = 'Hello World';
			var result = _comparators2["default"][NOTCONTAINS](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});
	});

	describe('STARTSWITH comparator', function () {
		it('strings', function () {
			var s1 = 'Hell',
			    s2 = 'Hello World';
			var result = _comparators2["default"][STARTSWITH](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings 2', function () {
			var s1 = 'Wor',
			    s2 = 'Hello World';
			var result = _comparators2["default"][STARTSWITH](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('FINISHWITH comparator', function () {
		it('strings', function () {
			var s1 = 'orld',
			    s2 = 'Hello World';
			var result = _comparators2["default"][FINISHWITH](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings2', function () {
			var s1 = 'Hello',
			    s2 = 'Hello World';
			var result = _comparators2["default"][FINISHWITH](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});
	});

	describe('EMPTY comparator', function () {
		it('strings', function () {
			var s1 = 'yes',
			    s2 = '';
			var result = _comparators2["default"][EMPTY](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings2', function () {
			var s1 = 'no',
			    s2 = '965fd';
			var result = _comparators2["default"][EMPTY](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(true);
		});

		it('strings2', function () {
			var s1 = 'yes',
			    s2 = '965fd';
			var result = _comparators2["default"][EMPTY](s1, s2);

			expect(typeof result === "undefined" ? "undefined" : _typeof(result)).toBe('boolean');
			expect(result).toBe(false);
		});
	});
});