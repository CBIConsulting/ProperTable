import React from 'react';
import {Cell} from 'fixed-data-table';
import _ from 'underscore';
import Portal from './portal';
import TWEEN from 'tween.js';

//REQUEST ANIMATION FRAME POLYFILL
;(function() {
  'use strict';

    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());


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
const SortHeaderCell = props => {
  let sortDir = props.sortDir || null, sortable = props.sortable;
  let children = props.children || null;
  let sortIcon = null, columnFilter = null;
  let userClass = props.userClassName || '';
  let className = sortable ? "propertable-header-cell sortable " + userClass : "propertable-header-cell not-sortable " + userClass;

  // Check for custom icons array and if the column is sortable
  if (!_.isNull(sortDir) && sortable) {
    if (_.isNull(props.sortIcons) || _.isUndefined(props.sortIcons)) { //default sort icons
      sortIcon = _.isNull(props.filterComponent) ? SortIcons[sortDir] : ColumnFilterIcons['DEF'];
    } else { // custom sort icons
      sortIcon = props.sortIcons[sortDir];
    }
  } else {
    sortIcon = _.isNull(props.filterComponent) ? SortIcons['DEF'] : ColumnFilterIcons['DEF'];
  }

  // Check if the columns have complex filter to be rendered behind the column
  if (props.filterComponent && sortable) {
    sortIcon = buildColumnFilter(props, sortIcon);
  }

  return (
    <div key={props.uniqueId + '-column-header'}>
      <Cell
        key={props.uniqueId + '-column-header-cell'}
        className={className + '_header'}
        onClick={(e) => {
          if (!props.filterComponent) {
            onSortChange(e, props, sortable);
          }
        }}
        {...props}
      >
        {children} &nbsp; {sortIcon}
      </Cell>
    </div>
  );
};

/**
 *  Possible Sort Types Default || ASC || DESC
 */
const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
  DEF: 'DEF'
};

/**
 *  Asociated Icons when it's sorting
 */
const SortIcons = {
  ASC: <i key="asc-icon" className="fa fa-long-arrow-up"/>,
  DESC: <i key="desc-icon" className="fa fa-long-arrow-down"/>,
  DEF: null
};

/**
 *  Icons for column filter
 */
const ColumnFilterIcons = {
  DEF: <i key="def-icon" className="fa fa-caret-square-o-down"/>
};

/**
 * Build and return the complex filter received in params
 *
 * @param {object} props      The props of the component
 * @param {object} sortIcon   Icon to open / close
 * @return {object}           The filter to be rendered
 */
const buildColumnFilter = (props, icon) => {
    let component, afterSelect, afterSort, afterClear, data = [], dataElementsSet = new Set(), field, isSortedOrFiltered = false;

    afterSelect = (selection) => {
      if (typeof props.columnFilter === 'function') {
        props.columnFilter(props.col, selection);
      }
    };

    afterSort = (direction) => {
       if (typeof props.onSortChange === 'function') {
        props.onSortChange(props.columnKey, direction);
      }
    };

    afterClear = (selection, direction) => { // must be ([], 'DEF')
       if (typeof props.columnFilter === 'function') {
        props.columnFilter(props.col, selection, props.columnKey, direction);
      }
    };

    if (props.sortDir !== 'DEF' || props.selection.length > 0) isSortedOrFiltered = true;

    component = (
      <props.filterComponent
        data={props.data} // Initial data Inmutable
        rawdata={props.rawdata} // Raw data Inmutable
        indexed={props.indexed} // initial Indexed Obj
        selection={props.selection}
        idField={props.col}
        displayField={props.col}
        lang={props.lang}
        sort={props.sortDir}
        rowFormater={props.columnFormater}
        uniqueId={props.uniqueId}
        afterSelect={afterSelect}
        afterSort={afterSort}
        afterClear={afterClear}
      />
    );

    return (
      <Portal
          key={props.uniqueId + '-column-header-component'}
          className={'propertable column-complex-filter'}
          beforeClose={beforeClose}
          closeOnEsc
          closeOnOutsideClick
          onOpen={onOpen}
          openByClickOn={icon}
          iconColor={props.iconColor}
          iconDefColor={props.iconDefColor}
          isSortedOrFiltered={isSortedOrFiltered}
          style={{opacity: 0, position: 'fixed'}}
        >
        {component}
      </Portal>
    );
};

/**
 * Get the next sort direction to sort the current column.
 *
 * @param {string}  sortDir  Current sort direction.
 * @return {string}  nextSortDir  Next sort direction.
 */
const nextSortDirection = sortDir => {
    if (sortDir) { // Second sort
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
const onSortChange = (e, props, sortable) => {
  e.preventDefault();
   // If you use a complex filter by column then it will be rendered under the header and has it's own methods
  if (sortable && typeof props.columnFilter !== 'function') {
      if (typeof props.onSortChange === 'function') {
        props.onSortChange(props.columnKey, nextSortDirection(props.sortDir));
      }
  }
};

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

/**
 * On open Portal. Animation
 */
function onOpen(node) {
  requestAnimationFrame(animate);

  new TWEEN.Tween({opacity: 0})
    .to({opacity: 1}, 300)
    .onUpdate(function() {
      node.style.opacity = this.opacity;
    }).start();
}

/**
 * Before close Portal. Animation
 */
function beforeClose(node, removeFromDom) {
  new TWEEN.Tween({opacity: 1})
    .to({opacity: 0}, 500)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function() {
      node.style.opacity = this.opacity;
    })
    .onComplete(removeFromDom)
    .start();
}

export default SortHeaderCell;