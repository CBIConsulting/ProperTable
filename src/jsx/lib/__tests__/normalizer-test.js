import normalizer from "../normalizer";

describe('normalizer', function() {

	it('number', function() {
		let result = normalizer.normalize(143242358);

		expect(result).toBe('143242358');
	});

	it('string with UPPER', function() {
		let result = normalizer.normalize(' Dds dsaSdsdASDSD ');

		expect(result).toBe('dds dsasdsdasdsd');
	});

	it('normalized scapeless', function() {
		let result = normalizer.normalize('    Dd.--/&%$"$%%&*Ç*sdsaSd.sdASDç }SD');

		expect(result).toBe('dd.--/csdsasd.sdasdc sd');
	});

	it('normalized not scapeless', function() {
		let result = normalizer.normalize('Dd.--/&%$"$%%&*Ç*sdsaSd.sdASD{ç }SD', false);

		expect(result).toBe('ddcsdsasdsdasdc sd');
	});

	it('normalized not scapeless with UPPERs in result', function() {
		let result = normalizer.normalize('Dd.--/&%$"$%%&*Ç*sdsaSd.sdASD{ç }SD   ', false, false);

		expect(result).toBe('DdcsdsaSdsdASDc SD');
	});
});