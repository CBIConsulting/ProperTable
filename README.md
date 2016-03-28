# ProperTable
====================================
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

Component properties:
* cols: Describe columns data [name: colName, field: colField, formated: valFormater(), sortable: false ...]
* data: Data of the table
* afterSort: Function called after the data has been sorted. Return the raw data sorted.
* afterSelect: Function called after select a row. Return the seleted rows.
* selectable: If the rows can be selected or not and if that selection is multiple. Values: True || 'Multiple' || False
* rowHeight: Height of each row in numerical value.
* msgs: Get the translated messages of the current lang. (An example can be found in src/lang)
* selectorWidth: Width of the selector column, checkboxes. (Only if selectable is multible)
* colSortDirs: To sort by default, direction (ASC, DESC, DEF) of the columns. [{name: fieldName,  direction: 'DEF'},{},{}]
* multisort: Multisort allowed or not. True || False
* selected: Rows selected by default. Get an array of ids or an id
* idField: Field that can be used as an id for the default selected rows.

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

