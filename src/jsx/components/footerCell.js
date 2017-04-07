import React from 'react';
import {Cell} from 'fixed-data-table';

/**
 * Stateless component which render the aggregation data for the footer value formated.
 *
 * Example usage via from a `Column`:
 * ```
 * const MyColumn = (
 *     <Column
 *        footer={
 *            <FooterCell
 *				data={aggregated-data}
 *				colData={current-column-data} //  {name: -, field: -, formater: -, ...}
 *			/>
 *        }
 *        ...
 *     />
 * );
 * ```
 */
const FooterCell = (props) => {
	const value = props.data.get(props.colData.aggregationField, null);
	const operator = ((value || value == 0) && props.colData.aggregationOperator) ? props.colData.aggregationOperator : null;
	const formattedValue = value && props.colData.formatter ? props.colData.formatter(value, props.colData, {}) : value;

	return (
		<Cell className={"propertable-footer-cell"}>
			<div className="footer-value">
				{formattedValue}
			</div>
			<div className="footer-aggregation-operator">
				{operator}
			</div>
		</Cell>
	);
};

export default FooterCell;