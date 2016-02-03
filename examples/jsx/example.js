let body = document.getElementById('canvas');
/* global $, ProperTable, moment, React */
$(() => {
	ProperTable.Settings.set({
		language: 'en'
	});

	var cols = [
		{
			name: 'col1',
			label: 'columna 1',
			field: 'col1',
			width: 120,
			formatter: function() {
				return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
			}
		},
		{
			name: 'number',
			label: 'A number',
			field: 'number',
			className: 'number',
			formatter: ProperTable.formatters.number
		},
		{
			name: 'number2',
			label: 'A number',
			field: 'number',
			className: 'number',
			formatter: value => ProperTable.formatters.number(value+1)
		},
		{
			name: 'nested',
			label: 'columnas anidadas',
			uniqueId: 'miprueba_de_id',
			children: [
				{
					name: 'nested1',
					label: 'nested1',
					field: 'nested1',
					sortVal: function(value) {
						return moment(value).unix();
					},
					formatter: ProperTable.formatters.date
				},
				{
					name: 'nested2',
					label: 'nested2',
					field: 'nested2'
				}
			]
		},
		{
			name: 'test',
			label: 'test',
			field: 'number',
			formatter: function() {
				return 'test';
			}
		}
	];

	var data = [];

	for (var i = 500; i >= 0; i--) {
		data.push({
			col1: 'added-'+i,
			nested1: moment().add((Math.round(Math.random() * 10000) % 2000), 'days').format('YYYY-MM-DD HH:mm:ss'),
			nested2: 'bar-'+i,
			number: (Math.round(Math.random() * 1000) % 20) + 1
		});
	}

	React.render(<ProperTable.Table key={'testtable'} cols={cols} data={data} afterSelect={function(data) {
		console.log('selected', data);
	}} />, body);
});
