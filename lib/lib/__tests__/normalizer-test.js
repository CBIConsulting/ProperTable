'use strict';

var _normalizer = require('../normalizer');

var _normalizer2 = _interopRequireDefault(_normalizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

describe('normalizer', function () {

	it('number', function () {
		var result = _normalizer2['default'].normalize(143242358);

		expect(result).toBe('143242358');
	});

	it('string with UPPER', function () {
		var result = _normalizer2['default'].normalize(' Dds dsaSdsdASDSD ');

		expect(result).toBe('dds dsasdsdasdsd');
	});

	it('normalized scapeless', function () {
		var result = _normalizer2['default'].normalize('    Dd:--/&%$"$%%&*Ç*sdsaSd:sdASDç }SD');

		expect(result).toBe('dd:--/%%%csdsasd:sdasdc sd');
	});

	it('normalized not scapeless', function () {
		var result = _normalizer2['default'].normalize('Dd.--/&%$"$%%&*Ç*sdsaSd.sdASD{ç }SD', false);

		expect(result).toBe('ddcsdsasdsdasdc sd');
	});

	it('normalized not scapeless with UPPERs in result', function () {
		var result = _normalizer2['default'].normalize('Dd.--/&%$"$%%&*Ç*sdsaSd.sdASD{ç }SD   ', false, false);

		expect(result).toBe('DdcsdsaSdsdASDc SD');
	});
});