import ProperTable from "../table";
import TestUtils from "react-addons-test-utils";
import React from 'react';

describe('ProperTable', () => {
	it('is available', () => {
		expect(typeof ProperTable !== 'undefined').toBe(true);
	});

	describe('column definitions', () => {
		it('executes formatter', () => {
			let executed = false;
			let component = TestUtils.renderIntoDocument(<ProperTable
				cols={[{name: 'col1', label: 'col1', field: 'id', formatter: (value) => {
					executed = true;

					return 'hola';
				}}]}
				data={[{
					id: 1
				}]}
			/>);

			expect(executed).toBe(true);
		});
	});

	describe('selection', () => {

	});
});
