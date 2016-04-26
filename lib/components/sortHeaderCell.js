'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Stateless component which render the header cell of a column.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *     <Column
 *        header={
 *            <SortHeaderCell
 *              sortDir={ASC || DESC || DEF}
 *              sortable={true || false}
 *            />
 *              {children (label || Component)}
 *            </SortHeaderCell>
 *        }
 *        ...
 *     />
 * );
 * ```
 */
var SortHeaderCell = function SortHeaderCell(props) {
  var sortDir = props.sortDir || null,
      sortable = props.sortable;
  var children = props.children || null;
  var sortIcon = sortDir && sortable ? SortIcons[sortDir] : SortIcons['DEF'];
  var userClass = props.userClassName || '';
  var className = sortable ? "propertable-header-cell sortable " + userClass : "propertable-header-cell not-sortable " + userClass;

  return _react2['default'].createElement(
    _fixedDataTable.Cell,
    _extends({
      className: className + '_header',
      onClick: function onClick(e) {
        onSortChange(e, props, sortable);
      }
    }, props),
    children,
    '   ',
    sortIcon
  );
};

/**
 *  Possible Sort Types Default || ASC || DESC
 */
var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
  DEF: 'DEF'
};

/**
 *  Asociated Icons when it's sorting
 */
var SortIcons = {
  ASC: _react2['default'].createElement('i', { className: 'fa fa-long-arrow-up' }),
  DESC: _react2['default'].createElement('i', { className: 'fa fa-long-arrow-down' }),
  DEF: null // Default
};

/**
 * Get the next sort direction to sort the current column.
 *
 * @param {string}  sortDir  Current sort direction.
 */
var nextSortDirection = function nextSortDirection(sortDir) {
  if (sortDir) {
    // Second sort
    if (sortDir === SortTypes.DEF) return nextSortDirection(null); // From default start again
    else return sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.DEF; // Third sort. From ASC to DESC then from DESC back to default
  }
  return SortTypes.ASC; // First sort
};

/**
 * Callback called each time the header been clicked. If the column is sortable it will call the upper method with the
 * same name sending the key of the column clicked and the next sort direction. The sort direction change with each click.
 *
 * @param {object}    e         Event which call the function
 * @param {object}    props     Props of the component
 * @param {boolean}   sortable  If the current column is sortable or not
 */
var onSortChange = function onSortChange(e, props, sortable) {
  e.preventDefault();
  if (sortable) {
    if (typeof props.onSortChange === 'function') {
      props.onSortChange(props.columnKey, nextSortDirection(props.sortDir));
    }
  }
};

exports['default'] = SortHeaderCell;
module.exports = exports['default'];