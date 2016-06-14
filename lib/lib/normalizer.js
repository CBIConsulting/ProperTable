'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
	'': /[@#~$!º|"·%&¬()=?¿¡*+\^`´{};:[\]\\]/g
};

exports['default'] = {
	normalize: function normalize(value) {
		var scapeLess = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
		var parseToLower = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
		var trim = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

		var internalVal = value.toString();

		if (parseToLower && trim) {
			internalVal = internalVal.trim().toLowerCase();
		} else if (parseToLower) {
			internalVal = internalVal.toLowerCase();
		} else if (trim) {
			internalVal = internalVal.trim();
		}

		if (!scapeLess) {
			charMap[''] = /[@#~$!º|"·%&¬()=?¿¡*+\^`´{};:[\].\-/\\]/g;
		}

		for (var char in charMap) {
			try {
				internalVal = internalVal.replace(charMap[char], char);
			} catch (e) {
				console.warn('Normalize error on ', value);
			}
		}

		return internalVal;
	}
};
module.exports = exports['default'];