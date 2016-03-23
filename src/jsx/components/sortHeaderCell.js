import React from 'react';
import {Cell} from 'fixed-data-table';

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
 *              children={label}
 *              sortable={true || false}
 *            />
 *        }
 *        ...
 *     />
 * );
 * ```
 */
const SortHeaderCell = props => {
  let sortDir = props.sortDir || null, sortable = props.sortable;
  let children = props.children || null;
  let sortIcon = sortDir && sortable? SortIcons[sortDir] : SortIcons['DEF'];
  let className = sortable ? "propertable-header-cell sortable" : "propertable-header-cell not-sortable";
  className = props.className ? props.className : className;

  return (
      <Cell
        className={className}
        onClick={(e) => {
          onSortChange(e, props, sortable);
        }}
        {...props}
      >
        {children} &nbsp; {sortIcon}
      </Cell>
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
  ASC: <i className="fa fa-long-arrow-up"/>,
  DESC:<i className="fa fa-long-arrow-down"/>,
  DEF: null // Default
};

/**
 * Get the next sort direction to sort the current column.
 *
 * @param {string}  sortDir  Current sort direction.
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
  if (sortable) {
      if (typeof props.onSortChange === 'function') {
        props.onSortChange(props.columnKey, nextSortDirection(props.sortDir));
      }
  }
};

export default SortHeaderCell;