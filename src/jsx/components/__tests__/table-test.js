import ProperTable from "../table";
import ReactTestUtils from "react-addons-test-utils";
import React from 'react';

describe('ProperTable', () => {
	it('is available', () => {
		expect(typeof ProperTable !== 'undefined').toBe(true);
	});

	describe('selection', () => {
		let testcols, testdata, component, selected;

		beforeEach(function(done) {
			selected = null;
			testcols = [
				{
					name: 'id',
					label: 'id',
					field: 'id',
					formatter: (value) => {
						console.log(value);
						console.log('id_'+value);
						return <span ref={'id_'+value} className={"id_"+value} id={"id_"+value}>{value}</span>;
					}
				}
			];
			testdata = [];

			for (let i = 0; i <= 100; i++) {
				testdata.push({id: 100});
			};

			component = ReactTestUtils.renderIntoDocument(<ProperTable
				cols={testcols}
				data={testdata}
				afterSelect={(s) => {
					selected = s;
				}}
			/>);

			setTimeout(done, 1000);
		});

		it('has single selection', (done) => {
			let selected = null;


			//let node = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'id_3');

			console.log(document.getElementById('id_3'));
			//ReactTestUtils.Simulate.click(node);

			expect(selected).toEqual({
				id: 3
			});
			done();
		});
	});
});
