import ProperTable from "../table";
import TestUtils from "react-addons-test-utils";
import React from 'react';
import ReactDOM from 'react-dom';
import clone from 'clone';

describe('ProperTable', () => {

	let wrapper = null;

	beforeEach(function() {
	    wrapper = document.createElement('div');
	});

	it('is available', () => {
		expect(typeof ProperTable !== 'undefined').toBe(true);
	});

	it('correctly updates data', () => {
		let cols = [
			{
				name: 'col1',
				label: 'col1',
				field: 'id',
				formatter: (value) => <span className={"value-cell value-"+value}>{value}</span>
			}
		];
		let firstdata = [{id: 1}, {id: 2}, {id: 3}];
		let newdata = [{id: 2}];
		let extraProps = {
			idField: 'id',
			height: 500,
			width: 500
		};
		let nodes = null;

		let component = ReactDOM.render(<ProperTable
			cols={cols}
			data={firstdata}
			{...extraProps}
		/>, wrapper);
		spyOn(ProperTable.prototype, 'componentDidMount');

		nodes = TestUtils.scryRenderedDOMComponentsWithClass(component, 'value-cell');

		expect(nodes.length).toBe(3);

		component = ReactDOM.render(<ProperTable
			cols={cols}
			data={newdata}
			{...extraProps}
		/>, wrapper);

		expect(ProperTable.prototype.componentDidMount.calls.any()).toBe(false);
		expect(component.state.data.size).toBe(1);
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

			it('allows deselecting', () => {
				let result = null;
				let component = TestUtils.renderIntoDocument(<ProperTable {...testProps} selected={3} afterSelect={
					selection => {
						result = selection;
					}
				}/>);
				let node = TestUtils.findRenderedDOMComponentWithClass(component, 'id_3');

				//TestUtils.Simulate.click(node);
				expect(result).toEqual(testProps.data[2]);
				TestUtils.Simulate.click(node);
				expect(result).toBeFalsy();
			});

			it('keeps selection after refreshing data', () => {
				let result = null;
				let component = ReactDOM.render(<ProperTable {...testProps} afterSelect={
					selection => {
						result = selection;
					}
				}/>, wrapper);
				let node = TestUtils.findRenderedDOMComponentWithClass(component, 'id_3');
				let other = null;

				TestUtils.Simulate.click(node);
				expect(result).toEqual(testProps.data[2]);

				testProps = clone(testProps);

				testProps.data = [{id: 5}, {id: 3}];
				component = ReactDOM.render(<ProperTable {...testProps} afterSelect={
					selection => {
						result = selection;
					}
				}/>, wrapper);

				other = TestUtils.scryRenderedDOMComponentsWithClass(component, 'id_2');
				expect(other.length).toBe(0);

				result = null;
				component.sendSelection();
				expect(result).toEqual(testProps.data[1]);

				expect(component.state.data.size).toBe(2);

				other = TestUtils.findRenderedDOMComponentWithClass(component, 'id_5');
				TestUtils.Simulate.click(other);
				expect(result).toEqual(testProps.data[0]);
			});
		});

		describe('multiple selection', () => {
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
					selectable: 'multiple',
					height: 500,
					width: 500,
					cols: cols,
					data: data
				};

			});

			it('selects multiple rows', () => {
				let result = null;
				let data1 = [], data2 = [];
				let component = TestUtils.renderIntoDocument(<ProperTable {...testProps} afterSelect={
					selection => {
						result = selection;
					}
				}/>);
				let node1 = TestUtils.findRenderedDOMComponentWithClass(component, 'id_3');
				let node2 = TestUtils.findRenderedDOMComponentWithClass(component, 'id_2');

				expect(result).toBe(null);
				TestUtils.Simulate.click(node1);
				TestUtils.Simulate.click(node2);

				expect(result).toEqual([testProps.data[2], testProps.data[1]]);
			});

			it('allows default selected rows', () => {
				let result = null;
				let component = TestUtils.renderIntoDocument(<ProperTable {...testProps} selected={[3,2]} afterSelect={
					selection => {
						result = selection;
					}
				}/>);

				expect(result).toEqual([testProps.data[2], testProps.data[1]]);
			});

			it('allows deselecting', () => {
				let result = null;
				let component = TestUtils.renderIntoDocument(<ProperTable {...testProps} selected={3} afterSelect={
					selection => {
						result = selection;
					}
				}/>);
				let node = TestUtils.findRenderedDOMComponentWithClass(component, 'id_3');

				//TestUtils.Simulate.click(node);
				expect(result).toEqual([testProps.data[2]]);
				TestUtils.Simulate.click(node);
				expect(result).toEqual([]);
			});
		});

	});
});
