import Settings from "../settings";
import _ from "underscore";

describe('Settings', () => {
	it('is available', () => {
		expect(typeof Settings !== 'undefined').toBe(true);
	});

	it('sets settings', () => {
		let result = Settings.set({
			foo: 'bar'
		});

		expect(result.foo).toBe('bar');
		expect(result.language).toBe('en');
	});

	describe('sets messages', () => {
		it('by language config', () => {
			expect(typeof Settings.messages).toBe('object');
			expect(_.isEmpty(Settings.messages)).toBe(false);
			expect(Settings.messages['emptymsg']).toBe('There are no data for the table');
		});

		it('by direct input', () => {
			Settings.setLang('es', {
				emptymsg: 'No hay datos para la tabla'
			});

			expect(Settings.messages['emptymsg']).toBe('No hay datos para la tabla');
		});
	})
});