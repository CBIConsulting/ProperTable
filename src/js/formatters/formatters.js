import moment from "moment";
import Settings from "../config/settings";
import numeral from "numeral";

export default {
	string: function(value) {
		return value.toString();
	},
	number: function(value) {
		if (typeof value == 'string') {
			value = numeral().unformat(value);
		}

		return numeral(value).format('0,0[.]00');
	},
	date: function(value) {
		return moment(value).format('LL');
	},
	datetime: function(value) {
		return moment(value).format('LLL');
	},
};