import React from 'react';
import cache from '../lib/rowcache';

const NestedCell = (props) => {
	let level = props.rawData._level || 1;
	let isExpanded = props.expanded;
	let indent = [];
	let icon = 'fa-plus-square-o';
	let renderedIcon = null;
	let offset = level - 1;

	if (offset) {
		let extraclass = '';

		if (!props.collapsable) {
			extraclass = ' short';
		}

		for (let i = offset; i > 0; i--) {
			indent.push(<span key={"lvl-"+i} className={"propertable-indent"+extraclass} />);
		}
	}

	if (isExpanded) {
		icon = 'fa-minus-square-o';
	}

	if (props.rawData._hasChildren && props.collapsable) {
		renderedIcon = <i className={"propertable-nested-icon fa "+icon+" fa-fw"} />;
	}

	return <div className="propertable-nested-cell" onClick={(e) => {
		e.stopPropagation();
		props.onClick();
	}}>
		{indent} {renderedIcon} {props.children}
	</div>;
};

export default NestedCell;