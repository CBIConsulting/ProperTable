import React from 'react';
import {Cell} from 'fixed-data-table';

const CellRenderer = (props) => {
	let row = props.data.get(props.rowIndex), val = null, formatted = null;
	let colData = props.colData;
	let selected = false;

	if (row) {
		val = row.get(props.col);

		if (val && typeof val.toJSON == 'function') {
			val = val.toJSON();
		}

		formatted = val;

		selected = row.get('_selected');
	}

	if (typeof colData.formatter == 'function') {
		formatted = colData.formatter(val, colData, row.toJSON());
	}

	return <Cell className="propertable-cell">
		{formatted}
	</Cell>;
};

export default CellRenderer;