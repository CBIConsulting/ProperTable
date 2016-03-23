import React from 'react';
import {Cell} from 'fixed-data-table';
/**
 * Stateless component which render a Cell which contain a icon like a checkbox that can be clicked.
 * Each time the selector were clicked then a callback from the main class is called which name is onClick.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *     <Column
 *        header={
 *            	<Selector
 *					onClick={this.handleSelectAll.bind(this)}
 *					somethingSelected={true || false}
 *					allSelected={true || false}
 *				/>
 *          }
 * 			cell={
 *				<Selector
 *					data={data} // Inmutable js object with upper component data.
 *				/>
 *			}
 *        ...
 *     />
 * );
 * ```
 */
const Selector = (props) => {
	let allSelected = false, somethingSelected = false, content = <i className="fa fa-square-o selector-button"/>;
	let addClass = 'unchecked';
	let selected = false;
	let row = null;
	let onClick = props.onClick;

	// Default callback function
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

	// If something is selected add the class partial to the FontAwesome component <i />
	if (somethingSelected) {
		addClass = 'partial';
	}

	// Then if all elements are selected change the addClass to complete
	if (allSelected) {
		addClass = 'complete';
	}

	// If something is selected but not all then print - into the "check-box"
	if (somethingSelected && !allSelected) {
		content = <i className="fa fa-minus-square-o"/>;
	}

	// If all are selected (header) or the row is selected print a check into the FontAwesome checkbox.
	if (allSelected || row && row._selected) {
		content = <i className="fa fa-check-square-o"/>;
	}

	// Render
	return (
		<Cell className="propertable-cell select-cell" onClick={(e) => {
			onClick(e, row);
		}}>
			<div className={"propertable-selector "+addClass}>{content}</div>
		</Cell>
	);
};

export default Selector;