# ProperTable
------------
[![Build Status](https://travis-ci.org/CBIConsulting/ProperTable.svg)](https://travis-ci.org/CBIConsulting/ProperTable)

A Proper data table for React based on famous fixed-data-table from Facebook. This components add some functionality to the react-data-table of Facebook. The table was designed to handle thousands of rows of data without sacrificing performance even when it's sorted by some different columns at the same time.


Used technologies:  

- React
- ES6
- Webpack
- Babel
- Node
- Compass
- Jasmine
- Karma


Features of ProperTable:

* Fixed Column/s on scrolling
* Rows selection with callback (return selected rows data) 
* Sorting (single column, multiple column sorting)
* Cell Formating
* Column Resizing (Fill the container, if the content is bigger than the container then show a horizontal scrollbar)
* Default Sorting allowed
* Default Selected rows allowed
* From FixedDataTable:
  * Fixed headers and footer
  * Both fixed and scrollable columns
  * Handling huge amounts of data
  * Variable row heights (with adaptive scroll positions)
  * Column resizing
  * Performant scrolling
  * Customizable styling
  * Jumping to a row or column
  * Controlled scroll API allows touch support


  
The compile and compressed ProperTable distribution file can be found in the dist folder along with the css file. Add the default stylesheet `dist/propertable.min.css`, then import it into any module.



## Preview
![screen shot 2016-03-29 at 10 30 00] (examples/screenshots/example_2.png "Example with some tables and different configurations") 


## How to start

Run:  
```
npm install
npm start
```

Check your http://localhost:8080/ or  `open http://localhost:8080/`

## How to test

`npm test`

### Basic Example
------------

#### Component properties

* cols: Describe columns data. (Array)
 	* name: Internal name. (String)
 	* field: Describe field data. {id, number, nestedField...} (String)
 	* label: Label in the column header. Could be an html tag, a string... 
 	* className: CSS class to add on columns header and each cell.(String)
 	* width: Column width in numerical value. Default 100 (Integer)
 	* sortable: If the column is sortable or not (Boolean)
 	* uniqueId: An unique id for the Table. (Integer)
 	* formatter: Parser for the cell data before render. (Function)
 		* Ex: 
 		```javascript
			formatter: function(value) {
				return ProperTable.formatters.number(value+1);
			}
		```
	* sortVal: Parser for the column cells before sort. (Function)
		* Ex: 
		```javascript
			sortVal: function(value) {
				return value.toString();
			}
		```
	* children: Children column of the current column. Should have the same structure as a column (Array)
* data: Data of the table (Array)
* afterSort: Function called after the data has been sorted. Return the raw data sorted.
	* Ex:
	```javascript
		afterSort={function(data) {
			console.log('Sorted data: ', data);
		}}
	```
* afterSelect: Function called after select a row. Return the seleted rows.
	* Ex:
	```javascript
		afterSelect={function(data) {
			console.log('Selected rows: ', data);
		}}
	```
* selectable: If the rows (all table) can be selected or not and if that selection is multiple. Values: True || 'Multiple' || False
* rowHeight: Height of each row in numerical value. (Integer
* msgs: Get the translated messages of the current lang. (An example can be found in src/lang)
	* Default:
	```javascript
		{
			loading: 'loading...',
			empty: 'No data found'
		};
	```
* selectorWidth: Width of the selector column, checkboxes. (Only if selectable is multible)
* colSortDirs: To be sorted by default, direction (ASC, DESC, DEF) of the columns. (DEF -> Default)
	* Ex:
	```javascript
		[
			{
				name: column_1, // Column name  
				direction: 'ASC'
			},
			{
				name: column_2,  
				direction: 'DEF'
			}
		]
	```
* selected: Rows selected by default. Get an array of ids or an single id
* idField: Field that can be used as an id for the default selected rows.
	* Ex:
	```javascript
		const cols = [
			{
				name: 'id',
				label: 'ID',
				field: 'id',
				width: 50
			},
			{
				name: 'col1',
				...
		<ProperTable idField="id" selected={[3,5,23]}.../>
	```
* multisort: Multisort allowed or not. (Boolean)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ProperTable from 'ProperTable';

const cols = [
  {
    name: 'col1',
    label: <span>A number</span>,
    field: 'number',
    fixed: true
  },
  {
		name: 'nested',
		label: 'Nested Columns',
		children: [
			{
				name: 'nested1',
				label: 'nested1',
				field: 'nested1',
				sortable: false,
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
	}
];

// Table data
const data = [];

for (var i = 10; i > 0; i--) {
  data.push({
    col1: 'col-' + i,
    nested1: '2016-05-16 02:00:0' + i),
    nested2: 'abc' + i
  });
}

// Render your table
ReactDOM.render(
  <ProperTable.Table
    key='TableKey'
    uniqueId={1}
    rowHeight={40}
    cols={cols}
    data={data}
    afterSelect={
      function(rows) {
        console.log('selected', rows);
      }
    }
    afterSort={
      function(data) {
        console.log('sorted data', data);
      }
    }
  />,
  document.getElementById('example')
);
```

Contributions
------------

Use [GitHub issues](https://github.com/CBIConsulting/ProperTable/issues) for requests.

Changelog
---------

Changes are tracked as [GitHub releases](https://github.com/CBIConsulting/ProperTable/releases).

