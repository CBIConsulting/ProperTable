import formatters from "../formatters/formatters";
import moment from "moment";

const NOTEQUALS = 'notequals';
const EQUALS = "equals";
const BIGGERTHAN = 'bigger';
const LOWERTHAN = 'lower';
const AFTERDATE = 'after';
const BEFOREDATE = 'before';
const BETWEENDATES = 'between';
const ONDATE = 'on';
const NOTONDATE = 'noton';
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
		return  moment(value).isAfter(compareTo);
	},
	[BEFOREDATE]: (value, compareTo) => {
		return moment(value).isBefore(compareTo);
	},
	[BETWEENDATES]: (value, compareTo) => {
		let separator, d1Start, d1End;

		if (!value || !compareTo) return false;
		separator = value.indexOf('%-%');

		if (separator === -1) {
			return false;
		}

		d1Start = value.substring(0, separator + 1);
		d1End = value.substring(separator + 3);

		return moment(compareTo).isBetween(d1Start, d1End);
	},
	[ONDATE]: (value, compareTo) => {
		return moment(value).isSame(compareTo, 'day');
	},
	[NOTONDATE]: (value, compareTo) => {
		return !moment(value).isSame(compareTo, 'day');
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