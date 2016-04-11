'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Stateless component which render a cell value formated.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *     <Column
 *        cell={
 *            <CellRenderer
 *				data={all-table-data}
 *				colData={current-column-data} //  {name: -, field: -, formater: -, ...}
 *				col={colData.field}
 *			/>
 *        }
 *        ...
 *     />
 * );
 * ```
 */
var CellRenderer = function CellRenderer(props) {
  var indexed = props.indexed;
  var row = props.data.get(props.rowIndex),
      val = null,
      formatted = null;
  var colData = props.colData;
  var className = colData.className || '';
  var selected = false;
  var rawdata = indexed[row.get(props.idField)];

  if (row) {
    // Get the value of the current column in the row
    val = rawdata[props.col] || null;
    formatted = val;
  }

  // If exist apply a formater function to that value.
  if (typeof colData.formatter == 'function') {
    formatted = colData.formatter(val, colData, rawdata);
  }

  return _react2['default'].createElement(
    _fixedDataTable.Cell,
    { className: "propertable-cell " + className },
    formatted
  );
};

exports['default'] = CellRenderer;
module.exports = exports['default'];