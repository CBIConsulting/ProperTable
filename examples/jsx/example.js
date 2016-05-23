import ProperTable from "../../src/jsx/ProperTable";
import React from 'react';

let body1 = document.getElementById('canvas1');
let body2 = document.getElementById('canvas2');
let body3 = document.getElementById('canvas3');
let body4 = document.getElementById('canvas4');

// Check updating selected when setting selection from a father component
class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: this.props.selected
		}
	}

	updateSelected(data, selection) {
		console.log('Check update selected on father', data)

		this.setState({
			selected: selection
		});
	}

	render() {
		return (
			<ProperTable.Table
				key='pt1'
				idField={this.props.idField}
				selected={this.state.selected}
				uniqueId={1}
				rowHeight={40}
				cols={this.props.cols}
				data={this.props.data}
				afterSelect={this.updateSelected.bind(this)}
			/>
		)
	}
}

$(function() {
	var cols = [
		{
			name: 'id',
			label: 'ID',
			field: 'id',
			width: 50
		},
		{
			name: 'col1',
			label: 'columna 1',
			field: 'col1'/*,
			width: 400,
			formatter: function() {
				return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
			}*/
		},
		{
			name: 'number',
			label: <span>A number</span>,
			field: 'number',
			className: 'number',
			width: 100,
			formatter: ProperTable.formatters.number
		},
		{
			name: 'number2',
			label: <span>A number</span>,
			field: 'number',
			className: 'number',
			sortable: false,
			width: 100,
			formatter: value => ProperTable.formatters.number(value+1)
		},
		{
			name: 'nested',
			label: 'Def selection',
			uniqueId: 'miprueba_de_id',
			children: [
				{
					name: 'nested1',
					label: 'nested1',
					field: 'nested1',
					sortable: true,
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

	for (var i = 10; i > 0; i--) {
		data.push({
			id: i,
			col1: 'added-'+i,
			nested1: moment().add((Math.round(Math.random() * 10000) % 2000), 'days').format('YYYY-MM-DD HH:mm:ss'),
			nested2: 'bar-'+i,
			number: (Math.round(Math.random() * 1000) % 20) + 1
		});
	}

	const ex3cols = [
		{
			name: 'col1',
			label: 'col1',
			field: 'col1',
			width: 250,
			fixed: true
		},{
			name: 'nested1',
			label: 'nested1',
			field: 'nested1',
			sortable: true,
			sortVal: function(value) {
				return moment(value).unix();
			},
			formatter: ProperTable.formatters.date
		},{
			name: 'col3',
			formatter: ProperTable.formatters.number,
			label: 'col3',
			field: 'col3'
		},{
			name: 'col4',
			formatter: ProperTable.formatters.number,
			label: 'col4',
			field: 'col4'
		},{
			name: 'col5',
			formatter: ProperTable.formatters.number,
			label: 'col5',
			field: 'col5'
		},{
			name: 'col7',
			formatter: ProperTable.formatters.number,
			label: 'col7',
			field: 'col7'
		},{
			name: 'col8',
			formatter: ProperTable.formatters.number,
			label: 'col8',
			field: 'col8'
		},{
			name: 'col9',
			formatter: ProperTable.formatters.number,
			label: 'col9',
			field: 'col9'
		},{
			name: 'col10',
			formatter: ProperTable.formatters.number,
			label: 'col10',
			field: 'col10'
		},{
			name: 'col11',
			formatter: ProperTable.formatters.number,
			label: 'col11',
			field: 'col11'
		},{
			name: 'col12',
			formatter: ProperTable.formatters.number,
			label: 'col12',
			field: 'col12'
		}
	];

	let ex3data = [];
	let k = 0;
	let j = 1;

	for (i = 10000 - 1; i >= 0; i--) {
		let row = {
			id: j++,
			col1: _.uniqueId('row-')
		};

		row['nested1'] =  moment().add((Math.round(Math.random() * 10000) % 2000), 'days').format('YYYY-MM-DD HH:mm:ss');

		for (k = 3; k <= 12; k++) {
			row['col'+k] = i * k;
		}

		ex3data.push(row);
	}

	ReactDOM.render(<App
		key={'testtable'}
		idField="id"
		selected={[3,4]}
		cols={cols}
		data={data}
	/>, body1);

	cols[4].label = "Multiple Sort & Selection";
	ReactDOM.render(<ProperTable.Table key='pt2' idField='id' uniqueId={2} rowHeight={40} multisort={true} cols={cols} data={data} afterSelect={function(data) {
		console.log('selected2', data);
	}} selectable="multiple" />, body2);

	ReactDOM.render(<ProperTable.Table
		key='pt3'
		uniqueId={3}
		rowHeight={40}
		key={'testtable3'}
		cols={ex3cols}
		data={ex3data}
		selectable="multiple"
	/>, body3);

	ReactDOM.render(<ProperTable.TreeTable
		key='pt4'
		collapsable={true}
		uniqueId={4}
		rowHeight={40}
		idField="id"

		key={'testtable3'}
		groupBy='nested1'
		groupCol='col1'
		cols={ex3cols}
		data={ex3data.slice(0, 6)}
		selectable="multiple"
		afterSelect={(data, indexes) => {
			console.log('extselect', data, indexes);
		}}
	/>, body4);
});
