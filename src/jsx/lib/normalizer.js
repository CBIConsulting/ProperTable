const charMap =  {
	'a': /[áÁàÀãÃâÂäÄåÅāĀąĄ]/g,
	'e': /[éÉèÈêÊëËēĒėĖęĘ]/g,
	'i': /[îÎíÍìÌïÏīĪįĮ]/g,
	'l': /[łŁ]/g,
	'o': /[ôÔòÒøØōŌóÓõÕöÖ]/g,
	'u': /[ûÛúÚùÙüÜūŪ]/g,
	'c': /[çÇčČćĆ]/g,
	's': /[śŚšŠ]/g,
	'z': /[źŹżŻ]/g,
	'' : /[@#~$!º|"·&¬()=?¿¡*\^`´{};[\].\\]/g,
}

export default {
	normalize: function (value, escapeLess = true, parseToLower = true, trim = true) {
		let internalVal = value.toString();

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

		for(let char in charMap){
			try{
				internalVal = internalVal.replace(charMap[char], char);
			} catch(e) {
				console.warn('Normalize error on ', value);
			}
		}

		return internalVal;
	}
}