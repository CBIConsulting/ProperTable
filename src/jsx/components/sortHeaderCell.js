import React from 'react';
import {Cell} from 'fixed-data-table';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
  DEF: 'DEF'
};

const SortIcons = {
	ASC: <i className="fa fa-long-arrow-up"/>,
	DESC:<i className="fa fa-long-arrow-down"/>,
	DEF: null // Default
};

const reverseSortDirection = sortDir => {
  	if (sortDir) { // Second sort
  		if (sortDir === SortTypes.DEF) return reverseSortDirection(null); // From default start again
  		else return sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.DEF; // Third sort from ASC to DESC then from DESC back to default
  	}
  	return SortTypes.ASC; // First sort
};

const onSortChange = (e, props, sortable) => {
  e.preventDefault();
  if (sortable) {
      if (typeof props.onSortChange === 'function') {
        props.onSortChange(props.columnKey, reverseSortDirection(props.sortDir));
      }
  }
};

const SortHeaderCell = props => {
  let sortDir = props.sortDir || null;
	let sortable = props.sortable;
	let children = props.children || null;
	let sortIcon = sortDir && sortable? SortIcons[sortDir] : SortIcons['DEF'];
  let className = sortable ? "propertable-header-cell sortable" : "propertable-header-cell not-sortable";

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

export default SortHeaderCell;