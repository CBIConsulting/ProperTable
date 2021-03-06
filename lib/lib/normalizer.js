'use strict';

exports.__esModule = true;
var charMap = {
	'a': /[áÁàÀãÃâÂäÄåÅāĀąĄ]/g,
	'e': /[éÉèÈêÊëËēĒėĖęĘ]/g,
	'i': /[îÎíÍìÌïÏīĪįĮ]/g,
	'l': /[łŁ]/g,
	'o': /[ôÔòÒøØōŌóÓõÕöÖ]/g,
	'u': /[ûÛúÚùÙüÜūŪ]/g,
	'c': /[çÇčČćĆ]/g,
	's': /[śŚšŠ]/g,
	'z': /[źŹżŻ]/g,
	'': /[@#~$!º|"·&¬()=?¿¡*\^`´{};[\].\\]/g
};

exports['default'] = {
	normalize: function normalize(value) {
		var escapeLess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		var parseToLower = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
		var trim = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

		var internalVal = value.toString();

		if (parseToLower && trim) {
			internalVal = internalVal.trim().toLowerCase();
		} else if (parseToLower) {
			internalVal = internalVal.toLowerCase();
		} else if (trim) {
			internalVal = internalVal.trim();
		}

		if (!escapeLess) {
			charMap[''] = /[@#~$!º|"·%&¬()=?¿¡*+\^`´{};:[\].\-/\\]/g;
		}

		for (var c in charMap) {
			try {
				internalVal = internalVal.replace(charMap[c], c);
			} catch (e) {
				console.warn('Normalize error on ', value);
			}
		}

		return internalVal;
	}
};
module.exports = exports['default'];