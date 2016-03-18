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

					return value;
				}}]}
				data={[{
					id: 1
				}]}
			/>);

			expect(executed).toBe(true);
		});
	});

	describe('selection', () => {
		describe('single selection', () => {
			let testProps = {}, component;

			beforeEach(() => {
				let cols = [{
					name: 'col1',
					label: 'col1',
					field: 'id',
					formatter: (value) => {
						console.log(value);
						return <span id={"id_"+value} className={"id_"+value}>{value}</span>;
					}
				}];
				let data = [];

				for (let i = 0; i < 10; i++) {
					data.push({
						id: i + 1
					});
				};

				testProps = {
					cols: cols,
					data: data
				};

				component = TestUtils.renderIntoDocument(<ProperTable {...testProps} />)
			});

			it('selects a single row', () => {
			//	let node = TestUtils.findRenderedDOMComponentWithClass(component, 'id_3');
				console.log(component, document.getElementById('id_1'));
			});
		});
	});
});
