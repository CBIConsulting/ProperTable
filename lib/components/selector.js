'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

var _underscore = require('underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Stateless component which render a Cell which contain a icon like a checkbox that can be clicked.
 * Each time the selector were clicked then a callback from the main class is called which name is onClick.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *     <Column
 *        header={
 *            	<Selector
 *					onClick={this.handleSelectAll.bind(this)}
 *					somethingSelected={true || false}
 *					allSelected={true || false}
 *					isHeader={true}
 *				/>
 *          }
 * 			cell={
 *				<Selector
 *					data={data} // Inmutable js object with upper component data.
 *				/>
 *			}
 *        ...
 *     />
 * );
 * ```
 */
var Selector = function Selector(props) {
	var allSelected = false,
	    somethingSelected = false,
	    content = _react2['default'].createElement('i', { className: 'fa fa-square-o selector-button' });
	var addClass = 'unchecked';
	var selected = false;
	var row = null,
	    id = null;
	var render = null;
	var _onClick = props.onClick;
	var isHeader = props.isHeader;

	// Default callback function
	if (!_onClick) {
		_onClick = function onClick() {};
	}

	if (typeof props.rowIndex != 'undefined') {
		row = props.data.get(props.rowIndex);

		if (!row.get('_isGroup')) {
			id = row.get(props.idField);
		}
	}

	if (typeof props.allSelected !== 'undefined') {
		allSelected = props.allSelected;
	}

	if (typeof props.somethingSelected !== 'undefined') {
		somethingSelected = props.somethingSelected;
	}

	// If something is selected add the class partial to the FontAwesome component <i />
	if (somethingSelected) {
		addClass = 'partial';
	}

	// Then if all elements are selected change the addClass to complete
	if (allSelected) {
		addClass = 'complete';
	}

	// If something is selected but not all then print - into the "check-box"
	if (somethingSelected && !allSelected) {
		content = _react2['default'].createElement('i', { className: 'fa fa-minus-square-o' });
	}

	// If all are selected (header) or the row is selected print a check into the FontAwesome checkbox.
	if (allSelected || row && row._selected) {
		content = _react2['default'].createElement('i', { className: 'fa fa-check-square-o' });
	}

	if (props.selected && id && props.selected.has(id)) {
		content = _react2['default'].createElement('i', { className: 'fa fa-check-square-o' });
	}

	if (isHeader) {
		// It's render inside the sortHeaderCell component
		render = _react2['default'].createElement(
			'div',
			{ className: 'propertable-cell select-cell' },
			_react2['default'].createElement(
				'div',
				{ className: "propertable-selector " + addClass, onClick: function onClick(e) {
						_onClick(e, row);
					} },
				content
			)
		);
	} else {
		var inner = null;

		if (id !== null && id !== undefined) {
			inner = _react2['default'].createElement(
				'div',
				{ className: "propertable-selector " + addClass, onClick: function onClick(e) {
						_onClick(e, row);
					} },
				content
			);
		}

		render = _react2['default'].createElement(
			_fixedDataTable.Cell,
			{ className: 'propertable-cell select-cell' },
			inner
		);
	}

	// Render
	return render;
};

exports['default'] = Selector;
module.exports = exports['default'];