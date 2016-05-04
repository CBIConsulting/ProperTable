'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rowcache = require('../lib/rowcache');

var _rowcache2 = _interopRequireDefault(_rowcache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var NestedCell = function NestedCell(props) {
	var level = props.rawData._level || 1;
	var isExpanded = props.rawData._expanded;
	var indent = [];
	var icon = 'fa-plus-square-o';
	var renderedIcon = null;
	var offset = level - 1;

	if (offset) {
		var extraclass = '';

		if (!props.collapsable) {
			extraclass = ' short';
		}

		for (var i = offset; i > 0; i--) {
			indent.push(_react2['default'].createElement('span', { key: "lvl-" + i, className: "propertable-indent" + extraclass }));
		}
	}

	if (isExpanded) {
		icon = 'fa-minus-square-o';
	}

	if (props.rawData._hasChildren && props.collapsable) {
		renderedIcon = _react2['default'].createElement(
			'a',
			{
				href: '#',
				onClick: function onClick(e) {
					e.preventDefault();
				}
			},
			_react2['default'].createElement('i', { className: "propertable-nested-icon fa " + icon + " fa-fw" })
		);
	}

	return _react2['default'].createElement(
		'div',
		{ className: 'propertable-nested-cell', onClick: function onClick(e) {
				e.stopPropagation();
				props.onClick();
			} },
		indent,
		' ',
		renderedIcon,
		' ',
		props.children
	);
};

exports['default'] = NestedCell;
module.exports = exports['default'];