'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

var _tween = require('tween.js');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

//Const
var SELECTOR_COL_NAME = 'selector-multiple-column'; // Name of the selector column
var DEFAULT_SORT_DIRECTION = 'DEF';
var ASCENDING_SORT_DIRECTION = 'ASC';
var DESCENDING_SORT_DIRECTION = 'DESC';

/**
 *  Possible Sort Types Default || ASC || DESC
 */
var SortTypes = {
  ASC: ASCENDING_SORT_DIRECTION,
  DESC: DESCENDING_SORT_DIRECTION,
  DEF: DEFAULT_SORT_DIRECTION
};

/**
 *  Asociated Icons when it's sorting
 */
var SortIcons = {
  ASC: "fa fa-long-arrow-up",
  DESC: "fa fa-long-arrow-down",
  DEF: null
};

/**
 *  Icons for column filter
 */
var ColumnFilterIcons = {
  DEF: "fa fa-caret-square-o-down",
  NONE: null
};

//REQUEST ANIMATION FRAME POLYFILL
;(function () {
  'use strict';

  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();

/**
 * Stateless component which render the header cell of a column. Also if you send a react component in the props.filterComponent
 * that will be rendered under the column header (when user click). That component must have a function called afterSelect (that
 * get the selection (selected values)) and another one called afterSort that get the new sort direction if that changes, also
 * data (column data, {value: column-values-to-filter, label: column-values-to-display}) and the current selection.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *     <Column
 *        header={
 *            <HeaderCell
 *              sortDir={ASC || DESC || DEF}
 *              sortable={true || false}
 *            />
 *              {children (label || Component)}
 *            </HeaderCell>
 *        }
 *        ...
 *     />
 * );
 * ```
 */
var HeaderCell = function HeaderCell(props) {
  var sortDir = props.sortDir || null,
      sortable = props.sortable;
  var children = props.children || null;
  var sortIcon = null,
      columnFilter = null,
      isSelectorCol = props.columnKey === SELECTOR_COL_NAME ? true : false;
  var userClass = props.userClassName + ' ' + props.columnHeaderClass || '';
  var className = sortable ? "propertable-header-cell sortable " + userClass : "propertable-header-cell not-sortable " + userClass;
  var isSortedOrFiltered = '';

  // Check for custom icons array and if the column is sortable
  if (!_underscore2['default'].isNull(sortDir) && sortable) {
    if (_underscore2['default'].isNull(props.sortIcons) || _underscore2['default'].isUndefined(props.sortIcons)) {
      //default sort icons
      sortIcon = _underscore2['default'].isNull(props.filterComponent) || isSelectorCol ? SortIcons[sortDir] : ColumnFilterIcons[DEFAULT_SORT_DIRECTION];
    } else {
      // custom sort icons
      sortIcon = props.sortIcons[sortDir];
    }
  } else {
    sortIcon = _underscore2['default'].isNull(props.filterComponent) ? SortIcons[DEFAULT_SORT_DIRECTION] : ColumnFilterIcons['NONE'];
  }

  // Check if the columns have complex filter to be rendered behind the column
  if (props.filterComponent && sortable && !isSelectorCol) {
    isSortedOrFiltered = props.isSortedOrFiltered ? ' _isFilteredOrSorted' : '';
    sortIcon = _react2['default'].createElement('i', { className: sortIcon + isSortedOrFiltered });
    sortIcon = buildColumnFilter(props, sortIcon);
  } else {
    sortIcon = _underscore2['default'].isString(sortIcon) ? _react2['default'].createElement('i', { className: sortIcon }) : sortIcon;
  }

  // Change sort direction on click in label when using a complex filter
  if (children && props.filterComponent && !isSelectorCol) {
    children = _react2['default'].createElement(
      'span',
      { onClick: function onClick(e) {
          onSortChange(e, props, sortable);
        } },
      children
    );
  }

  return _react2['default'].createElement(
    'div',
    { key: props.uniqueId + '-column-header' },
    _react2['default'].createElement(
      _fixedDataTable.Cell,
      _extends({
        key: props.uniqueId + '-column-header-cell',
        className: className + ' column-header_header',
        onClick: function onClick(e) {
          if (!props.filterComponent || isSelectorCol) {
            onSortChange(e, props, sortable);
          }
        }
      }, props),
      children,
      '\xA0',
      sortIcon
    )
  );
};

/**
 * Build and return the complex filter received in params
 *
 * @param {object} props      The props of the component
 * @param {object} sortIcon   Icon to open / close
 * @return {object}           The filter to be rendered
 */
var buildColumnFilter = function buildColumnFilter(props, icon) {
  var filter = void 0,
      afterSelect = void 0,
      afterSort = void 0,
      afterClear = void 0;
  var portalWidth = props.filterWidth || 280;

  afterSelect = function afterSelect(selection) {
    if (typeof props.columnFilter === 'function') {
      props.columnFilter(props.columnKey, selection);
    }
  };

  afterSort = function afterSort(direction) {
    if (typeof props.onSortChange === 'function') {
      props.onSortChange(props.columnKey, direction);
    }
  };

  afterClear = function afterClear(selection, direction) {
    // must be ([], 'DEF')
    if (typeof props.columnFilter === 'function') {
      props.columnFilter(props.columnKey, selection, direction);
    }
  };

  var filterPortalCn = ['propertable column-complex-filter', props.headerFilterClassName].filter(function (v) {
    return v;
  }).join(' ');

  filter = _react2['default'].createElement(
    _portal2['default'],
    {
      key: props.uniqueId + '-column-header-component',
      className: filterPortalCn,
      beforeClose: beforeClose,
      closeOnEsc: true,
      closeOnOutsideClick: true,
      onOpen: onOpen,
      openByClickOn: icon,
      iconColor: props.iconColor,
      iconDefColor: props.iconDefColor,
      isSortedOrFiltered: props.isSortedOrFiltered,
      width: portalWidth,
      style: { opacity: 0, position: 'fixed', width: portalWidth }
    },
    _react2['default'].createElement(props.filterComponent, _extends({
      key: props.uniqueId + '-column-header-component-filter',
      data: props.data // Initial data Inmutable
      , rawdata: props.rawdata // Raw data Inmutable
      , indexed: props.indexed // initial Indexed Obj
      , selection: props.selection,
      idField: props.col,
      displayField: props.col,
      lang: props.lang,
      sort: props.sortDir,
      rowFormater: props.columnFormater,
      uniqueId: props.uniqueId,
      afterSelect: afterSelect,
      afterSort: afterSort,
      afterClear: afterClear
    }, props.extaProps))
  );

  return filter;
};

/**
 * Get the next sort direction to sort the current column.
 *
 * @param {string}  sortDir  Current sort direction.
 * @return {string}  nextSortDir  Next sort direction.
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
  // If you use a complex filter by column then it will be rendered under the header and has it's own methods
  if (sortable) {
    if (typeof props.onSortChange === 'function') {
      props.onSortChange(props.columnKey, nextSortDirection(props.sortDir));
    }
  }
};

function animate(time) {
  requestAnimationFrame(animate);
  _tween2['default'].update(time);
}

/**
 * On open Portal. Animation
 */
function onOpen(node) {
  requestAnimationFrame(animate);

  new _tween2['default'].Tween({ opacity: 0 }).to({ opacity: 1 }, 300).onUpdate(function () {
    node.style.opacity = this.opacity;
  }).start();
}

/**
 * Before close Portal. Animation
 */
function beforeClose(node, removeFromDom) {
  new _tween2['default'].Tween({ opacity: 1 }).to({ opacity: 0 }, 500).easing(_tween2['default'].Easing.Cubic.Out).onUpdate(function () {
    node.style.opacity = this.opacity;
  }).onComplete(removeFromDom).start();
}

exports['default'] = HeaderCell;
module.exports = exports['default'];