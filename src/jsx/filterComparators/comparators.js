import formatters from "../formatters/formatters";

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

export default {
	// FOR NUMBER FIELDS
	[BIGGERTHAN]: (value, compareTo) => {
		let n1 = formatters.number(value) || 0, n2 = formatters.number(compareTo) || 0;
		return n1 > n2;
	},
	[LOWERTHAN]: (value, compareTo) => {
		let n1 = formatters.number(value) || 0, n2 = formatters.number(compareTo) || 0;
		return n1 < n2;
	},
	// FOR DATE FIELDS
	[AFTERDATE]: (value, compareTo) => {
		let d1 = formatters.toUnix(value) || 0, d2 = formatters.toUnix(compareTo) || 0;
		return d1 > d2;
	},
	[BEFOREDATE]: (value, compareTo) => {
		let d1 = formatters.toUnix(value) || 0, d2 = formatters.toUnix(compareTo) || 0;
		return d1 < d2;
	},
	[BETWEENDATES]: (value, compareTo) => {
		let separator, d1Start, d1End, d2;

		if (!value || !compareTo) return false;
		separator = value.indexOf('%-%');

		if (separator === -1) {
			return false;
		}

		d1Start = formatters.toUnix(value.substring(0, separator + 1)) || 0;
		d1End = formatters.toUnix(value.substring(separator + 3)) || 0;
		d2 = formatters.toUnix(compareTo) || 0;
		return d1Start <= d2 && d1End >= d2;
	},
	// FOR OTHER FIELD TYPES
	[NOTEQUALS]: (value, compareTo) => {
		return value !== compareTo;
	},
	[EQUALS]: (value, compareTo) => {
		return value === compareTo;
	},
	[STARTSWITH]: (value, compareTo) => {
		if (!value || !compareTo || !value.length || !compareTo.length) return false;

		let valLength = value.length;
		return compareTo.length >= valLength ? value === compareTo.substring(0, valLength) : false;
	},
	[FINISHWITH]: (value, compareTo) => {
		if (!value || !compareTo || !value.length || !compareTo.length) return false;

		let valLength = value.length, compareLength = compareTo.length;
		return compareTo.length >= value.length ? value === compareTo.substring(compareLength - valLength) : false;
	},
	[CONTAINS]: (value, compareTo) => {
		let result;

		if (!value || !compareTo) result = false;
		else result = compareTo.indexOf(value) !== -1;

		return result;
	},
	[NOTCONTAINS]: (value, compareTo) => {
		let result;

		if (!value || !compareTo) result = false;
		else result = compareTo.indexOf(value) === -1;

		return result;
	},
	[EMPTY]: (value, compareTo) => {
		let result;

		if ((value !== 'yes' && value !== 'no') || compareTo === null || compareTo.length === undefined)  return false;

		if (value === 'yes') {
			result = compareTo.length === 0;
		} else {
			result = compareTo.length > 0;
		}

		return result;
	},
}