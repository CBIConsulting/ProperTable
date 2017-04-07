'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Stateless component which render the aggregation data for the footer value formated.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *     <Column
 *        footer={
 *            <FooterCell
 *				data={aggregated-data}
 *				colData={current-column-data} //  {name: -, field: -, formater: -, ...}
 *			/>
 *        }
 *        ...
 *     />
 * );
 * ```
 */
var FooterCell = function FooterCell(props) {
  var value = props.data.get(props.colData.aggregationField, null);
  var operator = (value || value == 0) && props.colData.aggregationOperator ? props.colData.aggregationOperator : null;
  var formattedValue = value && props.colData.formatter ? props.colData.formatter(value, props.colData, {}) : value;

  return _react2['default'].createElement(
    _fixedDataTable.Cell,
    { className: "propertable-footer-cell" },
    _react2['default'].createElement(
      'div',
      { className: 'footer-value' },
      formattedValue
    ),
    _react2['default'].createElement(
      'div',
      { className: 'footer-aggregation-operator' },
      operator
    )
  );
};

exports['default'] = FooterCell;
module.exports = exports['default'];