import React from 'react';
import {Cell} from 'fixed-data-table';
import cache from '../lib/rowcache';

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
const CellRenderer = (props) => {
	let indexed = props.indexed;
	let row = props.data.get(props.rowIndex), val = null, formatted = null;
	let colData = props.colData;
	let className = colData.className || '';
	let selected = false;
	let rawdata = indexed[row.get(props.idField)];
	let ckey = null;

	if (row) {
		// Get the value of the current column in the row
		val = rawdata[props.col] || null;
		formatted = val;
	}

	// If exist apply a formater function to that value.
	if (typeof colData.formatter == 'function') {
		ckey = ['formatted', 'tb_'+props.tableId, 'r__'+row.get(props.idField), colData.name];
		formatted = cache.read(ckey);

		if (formatted === undefined) {
			formatted = colData.formatter(val, colData, rawdata);
			cache.write(ckey, formatted);
		}
	}

	return <Cell className={"propertable-cell " + className}>
		{formatted}
	</Cell>;
};

export default CellRenderer;