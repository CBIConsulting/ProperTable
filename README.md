# ProperTable

[![Build Status](https://travis-ci.org/CBIConsulting/ProperTable.svg)](https://travis-ci.org/CBIConsulting/ProperTable)

A Proper data table for React based on famous fixed-data-table from Facebook. This components add some functionality to the react-data-table of Facebook. The table was designed to handle thousands of rows of data without sacrificing performance even when it's sorted by some different columns at the same time.

The component is heavily opinionated and requires some external dependencies to be used in the browser.

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



The compiled and compressed ProperTable distribution file can be found in the dist folder along with the css file. Add the default stylesheet `dist/propertable.min.css`, then import it into any module.

## Live Demo
##### [Code](https://github.com/CBIConsulting/ProperTable/tree/gh-pages/examples/jsx/example.js)
##### [Demo](http://cbiconsulting.github.io/ProperTable/)

##External dependencies
* React and React DOM
* Underscore
* moment

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

### Component properties

* cols: Describe columns data. (Array)
 	* name: Internal name. (String)
 	* field: Describe field data. {id, number, nestedField...} (String)
 	* label: Label in the column header. Could be an html tag, a string...
 	* fixed: If the column is fixed on horizontal scroll or not (Boolean)
 	* className: CSS class to add on columns header and each cell.(String)
 	* width: Column width in numerical value. Default 100 (Integer)
 	* sortable: If the column is sortable or not (Boolean)
 	* uniqueId: An unique id for the Column. (Integer)
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
* rowHeight: Height of each row in numerical value. (Integer)
* lang: Lang of the component. Default 'ENG'
* msgs: Get the translated messages of the current lang. (An example can be found in src/lang)
	* Default:
	```javascript
		{
			'ENG': {
				loading: 'loading...',
				empty: 'No data found'
			}
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
* columnFilterComponent: React Component to be rendered on click column header icon. Gets data, sort, column selection... [HeaderCell](https://github.com/CBIConsulting/ProperTable/tree/dev/src/jsx/components/headerCell.js)
	*All data sent to the component:
	```javascript
		<props.filterComponent
	        data={props.data} // Initial data Inmutable
	        rawdata={props.rawdata} // Raw data Inmutable
	        indexed={props.indexed} // initial Indexed Obj (indexed by)
	        selection={col.selection}
	        idField={col.field} // Field used as primary key or id
	        displayField={col.field}
	        lang={props.lang}
	        sort={col.sortDir}
	        uniqueId={props.uniqueId}
	        rowFormater={props.formatter}

	        // Your component must have this functions, one that return the new column selection, other one that return the new sort direction
	        // and last one if you want a button to clean this column filter. The last one applys a selection and then the sort direction of the
	        // second parameter.

	        afterSelect={afterSelect} // function afterSelect(selectionArray);
	        afterSort={afterSort} 	  // function afterSort(sortDirection);
	        afterClear={afterClear}   // function afterSort(selection, sortDirection) -> afterClear([], 'DEF')
	    />
	```
* sortIcons: An array like the const SortIcons in HeaderCell file to use instead [HeaderCell](https://github.com/CBIConsulting/ProperTable/tree/dev/src/jsx/components/headerCell.js)
* iconColor: Color of the icon to open the column filter (if that exist) in the header of column. This color is used on open / filtered or sorted.
* iconDefColor: Color of the icon to open the column filter (if that exist) in the header of column. This color is used when filter component get close and the column is not filtered or sorted.
* restartOnClick: Restart the sort and filter (if the column has a Column Filter Component) of each column. It should be either a react element (in this case it has to have id (best) or className (add events to all elements with same class aswell)) or a Js element (JS element document.getElementById('btn')).
	* Ex:
	```javascript
		render() {
			let btnWithId, btnWithClassName, btnOutSide;
			btnWithId = <button  id='btn-clear' className="btn btn-primary" type="button"> Clear Filter & Sort</button>;
			btnWithClassName = <button className="btn btn-primary clear" type="button"> Clear Filter & Sort</button>;
			btnOutSide = document.getElementById('btn'); // An element rendered outside the current Component

			return (
				<div style={{width: '100%', height: '100%'}}>
					{btnWithId || btnWithClassName}
					<Table
						key={this.props.key}
						idField={this.props.idField}
						uniqueId={3}
						rowHeight={40}
						selectable={this.props.selectable}
						cols={this.props.cols}
						data={this.props.data}
						restartOnClick={btnWithId || btnWithClassName || btnOutSide}
					/>
				</div>
			);
		}
	```

### Basic Example
------------

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

