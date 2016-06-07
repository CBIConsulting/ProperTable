import moment from "moment";
import numeral from "numeral";

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
	string: function(value = null) {
		if (value === null) {
			return null;
		}

		return value.toString();
	},
	number: function(value = null) {
		if (value === null || !isNumeric(value)) {
			return null;
		}

		if (typeof value == 'string') {
			value = numeral().unformat(value);
		}

		return numeral(value).format('0,0[.]00');
	},
	date: function(value = null) {
		if (value === null) {
			return null;
		}

		let result = moment(value).format('LL');

		if (result == 'Invalid date') {
			return null;
		}

		return result;
	},
	datetime: function(value = null) {
		if (value === null) {
			return null;
		}

		let result = moment(value).format('LLL');

		if (result == 'Invalid date') {
			return null;
		}

		return result;
	},
	toUnix: function(value = null) {
		if (value === null) {
			return null;
		}

		let result = moment(value).unix();

		if (result == 'Invalid date') {
			return null;
		}

		return result;
	},
};
