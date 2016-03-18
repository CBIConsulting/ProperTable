import React from 'react';
import {Cell} from 'fixed-data-table';

const Selector = (props) => {
	let allSelected = false, somethingSelected = false, content = <i className="fa fa-square-o selector-button"/>;
	let addClass = 'unchecked';
	let selected = false;
	let row = null;
	let onClick = props.onClick;

	if (!onClick) {
		onClick = () => {};
	}

	if (typeof props.rowIndex != 'undefined') {
		row = props.data.get(props.rowIndex).toJSON();
	}

	if (typeof props.allSelected !== 'undefined') {
		allSelected = props.allSelected;
	}

	if (typeof props.somethingSelected !== 'undefined') {
		somethingSelected = props.somethingSelected;
	}

	if (somethingSelected) {
		addClass = 'partial';
	}

	if (allSelected) {
		addClass = 'complete';
	}

	if (somethingSelected && !allSelected) {
		content = <i className="fa fa-minus-square-o"/>;
	}

	if (allSelected || row && row._selected) {
		content = <i className="fa fa-check-square-o"/>;
	}

	if (row && row._selected) {
		selected = true;
	}

	return <Cell className="propertable-cell select-cell"><div className={"propertable-selector "+addClass} onClick={(e) => {
		onClick(e, row);
	}}>{content}</div></Cell>;
};

export default Selector;