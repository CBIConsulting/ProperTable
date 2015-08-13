const React = require('react/addons');
const Table = require('../table');
const TestUtils = React.addons.TestUtils;
const $ = require('jquery');

describe('Table', () => {
	beforeEach(() => {
	});

	it('renders emptymsg if no column information passed', () => {
		let table = TestUtils.renderIntoDocument(
			<Table />
		);
		let msg = TestUtils.findRenderedDOMComponentWithClass(table, 'empty-msg');

		expect(msg).toBeTruthy();
	});

	it('can have custom classNames', () => {
		let table = TestUtils.renderIntoDocument(
			<Table className="myclassname"/>
		);
		let myclassname = TestUtils.findRenderedDOMComponentWithClass(table, 'myclassname');

		expect(myclassname).toBeTruthy();
	});

	it('can have a custom id', () => {
		let table = TestUtils.renderIntoDocument(
			<Table uniqueId="myid" />
		);
		let id = React.findDOMNode(table).getAttribute('id');

		expect(id).toBe('myid');
	});
});