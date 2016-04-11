"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _table = require("../table");

var _table2 = _interopRequireDefault(_table);

var _reactAddonsTestUtils = require("react-addons-test-utils");

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _clone = require("clone");

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('ProperTable', function () {

	var wrapper = null;

	beforeEach(function () {
		wrapper = document.createElement('div');
	});

	it('is available', function () {
		expect(typeof _table2["default"] !== 'undefined').toBe(true);
	});

	it('correctly updates data', function () {
		var cols = [{
			name: 'col1',
			label: 'col1',
			field: 'id',
			formatter: function formatter(value) {
				return _react2["default"].createElement(
					"span",
					{ className: "value-cell value-" + value },
					value
				);
			}
		}];
		var firstdata = [{ id: 1 }, { id: 2 }, { id: 3 }];
		var newdata = [{ id: 2 }];
		var extraProps = {
			idField: 'id',
			height: 500,
			width: 500
		};
		var nodes = null;

		var component = _reactDom2["default"].render(_react2["default"].createElement(_table2["default"], _extends({
			cols: cols,
			data: firstdata
		}, extraProps)), wrapper);
		spyOn(_table2["default"].prototype, 'componentDidMount');

		nodes = _reactAddonsTestUtils2["default"].scryRenderedDOMComponentsWithClass(component, 'value-cell');

		expect(nodes.length).toBe(3);

		component = _reactDom2["default"].render(_react2["default"].createElement(_table2["default"], _extends({
			cols: cols,
			data: newdata
		}, extraProps)), wrapper);

		expect(_table2["default"].prototype.componentDidMount.calls.any()).toBe(false);
		expect(component.state.data.size).toBe(1);
	});

	describe('column definitions', function () {
		it('executes formatter', function () {
			var executed = false;
			var component = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_table2["default"], {
				cols: [{ name: 'col1', label: 'col1', field: 'id', formatter: function formatter(value) {
						executed = true;

						return value;
					} }],
				data: [{
					id: 1
				}]
			}));

			expect(executed).toBe(true);
		});
	});

	describe('selection', function () {
		describe('single selection', function () {
			var testProps = {};

			beforeEach(function () {
				var cols = [{
					name: 'col1',
					label: 'col1',
					field: 'id',
					formatter: function formatter(value) {
						return _react2["default"].createElement(
							"span",
							{ id: "id_" + value, className: "id_" + value },
							value
						);
					}
				}];
				var data = [];

				for (var i = 0; i < 10; i++) {
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

			it('selects a single row', function () {
				var result = null;
				var component = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { afterSelect: function afterSelect(selection) {
						result = selection;
					} })));
				var node = _reactAddonsTestUtils2["default"].findRenderedDOMComponentWithClass(component, 'id_3');

				expect(result).toBe(null);
				_reactAddonsTestUtils2["default"].Simulate.click(node);
				expect(result).toEqual(testProps.data[2]);
			});

			it('allows default selected row', function () {
				var result = null;
				var component = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { selected: 3, afterSelect: function afterSelect(selection) {
						result = selection;
					} })));

				expect(result).toEqual(testProps.data[2]);
			});

			it('allows deselecting', function () {
				var result = null;
				var component = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { selected: 3, afterSelect: function afterSelect(selection) {
						result = selection;
					} })));
				var node = _reactAddonsTestUtils2["default"].findRenderedDOMComponentWithClass(component, 'id_3');

				//TestUtils.Simulate.click(node);
				expect(result).toEqual(testProps.data[2]);
				_reactAddonsTestUtils2["default"].Simulate.click(node);
				expect(result).toBeFalsy();
			});

			it('keeps selection after refreshing data', function () {
				var result = null;
				var component = _reactDom2["default"].render(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { afterSelect: function afterSelect(selection) {
						result = selection;
					} })), wrapper);
				var node = _reactAddonsTestUtils2["default"].findRenderedDOMComponentWithClass(component, 'id_3');
				var other = null;

				_reactAddonsTestUtils2["default"].Simulate.click(node);
				expect(result).toEqual(testProps.data[2]);

				testProps = (0, _clone2["default"])(testProps);

				testProps.data = [{ id: 5 }, { id: 3 }];
				component = _reactDom2["default"].render(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { afterSelect: function afterSelect(selection) {
						result = selection;
					} })), wrapper);

				other = _reactAddonsTestUtils2["default"].scryRenderedDOMComponentsWithClass(component, 'id_2');
				expect(other.length).toBe(0);

				result = null;
				component.sendSelection();
				expect(result).toEqual(testProps.data[1]);

				expect(component.state.data.size).toBe(2);

				other = _reactAddonsTestUtils2["default"].findRenderedDOMComponentWithClass(component, 'id_5');
				_reactAddonsTestUtils2["default"].Simulate.click(other);
				expect(result).toEqual(testProps.data[0]);
			});
		});

		describe('multiple selection', function () {
			var testProps = {};

			beforeEach(function () {
				var cols = [{
					name: 'col1',
					label: 'col1',
					field: 'id',
					formatter: function formatter(value) {
						return _react2["default"].createElement(
							"span",
							{ id: "id_" + value, className: "id_" + value },
							value
						);
					}
				}];
				var data = [];

				for (var i = 0; i < 10; i++) {
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

			it('selects multiple rows', function () {
				var result = null;
				var data1 = [],
				    data2 = [];
				var component = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { afterSelect: function afterSelect(selection) {
						result = selection;
					} })));
				var node1 = _reactAddonsTestUtils2["default"].findRenderedDOMComponentWithClass(component, 'id_3');
				var node2 = _reactAddonsTestUtils2["default"].findRenderedDOMComponentWithClass(component, 'id_2');

				expect(result).toBe(null);
				_reactAddonsTestUtils2["default"].Simulate.click(node1);
				_reactAddonsTestUtils2["default"].Simulate.click(node2);

				expect(result).toEqual([testProps.data[2], testProps.data[1]]);
			});

			it('allows default selected rows', function () {
				var result = null;
				var component = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { selected: [3, 2], afterSelect: function afterSelect(selection) {
						result = selection;
					} })));

				expect(result).toEqual([testProps.data[2], testProps.data[1]]);
			});

			it('allows deselecting', function () {
				var result = null;
				var component = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_table2["default"], _extends({}, testProps, { selected: 3, afterSelect: function afterSelect(selection) {
						result = selection;
					} })));
				var node = _reactAddonsTestUtils2["default"].findRenderedDOMComponentWithClass(component, 'id_3');

				//TestUtils.Simulate.click(node);
				expect(result).toEqual([testProps.data[2]]);
				_reactAddonsTestUtils2["default"].Simulate.click(node);
				expect(result).toEqual([]);
			});
		});
	});
});