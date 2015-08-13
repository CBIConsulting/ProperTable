'use strict';

var body = document.body;

$(function () {
	ProperTable.Settings.set({
		language: 'en'
	});

	var cols = [{
		name: 'col1',
		label: 'columna 1',
		field: 'col1'
	}, {
		name: 'number',
		label: 'A number',
		field: 'number',
		className: 'number',
		formatter: ProperTable.formatters.number
	}, {
		name: 'nested',
		label: 'columnas anidadas',
		uniqueId: 'miprueba_de_id',
		children: [{
			name: 'nested1',
			label: 'nested1',
			field: 'nested1'
		}, {
			name: 'nested2',
			label: 'nested2',
			field: 'nested2'
		}]
	}];

	var data = [{
		col1: 'foo',
		nested1: 'bar1',
		nested2: 'bar2',
		number: 1218579.81356738
	}, {
		col1: 'foo',
		nested1: 'bar1',
		nested2: 'bar2',
		number: 12545
	}, {
		col1: 'foo',
		nested1: 'bar1',
		nested2: 'bar2',
		number: Math.PI
	}];

	React.render(React.createElement(ProperTable.Table, { cols: cols, data: data }), body);
});