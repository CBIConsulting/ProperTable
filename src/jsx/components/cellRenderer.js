import React from 'react';
import {Cell} from 'fixed-data-table';

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
	let row = props.data.get(props.rowIndex), val = null, formatted = null;
	let colData = props.colData;
	let selected = false;

	if (row) {
		// Get the value of the current column in the row
		val = row.get(props.col);

		// If val it's an Inmutable object then get the json value.
		if (val && typeof val.toJSON == 'function') {
			val = val.toJSON();
		}

		formatted = val;

		selected = row.get('_selected');
	}

	// If exist apply a formater function to that value.
	if (typeof colData.formatter == 'function') {
		formatted = colData.formatter(val, colData, row.toJSON());
	}

	return <Cell className="propertable-cell">
		{formatted}
	</Cell>;
};

export default CellRenderer;