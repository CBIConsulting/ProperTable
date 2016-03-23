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
			let testProps = {};

			beforeEach(() => {
				let cols = [{
					name: 'col1',
					label: 'col1',
					field: 'id',
					formatter: (value) => {
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
					idField: 'id',
					height: 500,
					width: 500,
					cols: cols,
					data: data
				};

			});

			it('selects a single row', () => {
				let result = null;
				let component = TestUtils.renderIntoDocument(<ProperTable {...testProps} afterSelect={
					selection => {
						result = selection;
					}
				}/>);
				let node = TestUtils.findRenderedDOMComponentWithClass(component, 'id_3');

				expect(result).toBe(null);
				TestUtils.Simulate.click(node);
				expect(result).toEqual(testProps.data[2]);
			});

			it('allows default selected row', () => {
				let result = null;
				let component = TestUtils.renderIntoDocument(<ProperTable {...testProps} selected={3} afterSelect={
					selection => {
						result = selection;
					}
				}/>);

				expect(result).toEqual(testProps.data[2]);
			});
		});

	});
});
