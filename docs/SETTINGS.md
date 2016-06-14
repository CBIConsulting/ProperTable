# Filtering Settings Explanation

## Filters
The colFilters property of the table must be an object that contain objects indexed by the column name. Each element should have this structure:
```javascript
	columnName: {
		type: 'selection', // 'selection' or 'operation'
		operationValue: 34, // Operation value. Ex: 'Jhon Snow'
		operationType: 'bigger', // Operation type. Ex: 'equals', 'contains'...
		selection: ['Jhon Snow', 'Jhon Smith', 'Walter White']
	}
```
By default the type will be selection, so you can set only the selection property, in case you set the type to 'operation' then the operationValue and operationType are mandatory properties. The operation type its one of then:
```javascript
	// For numbers
	const BIGGERTHAN = 'bigger';
	const LOWERTHAN = 'lower';

	// For Dates. Use moment.js
	const AFTERDATE = 'after';
	const BEFOREDATE = 'before';
	const BETWEENDATES = 'between';
	const ONDATE = 'on';
	const NOTONDATE = 'noton';

	// For strings
	const STARTSWITH = 'start';
	const FINISHWITH = 'finish';
	const CONTAINS = 'contains';
	const NOTCONTAINS = 'notContains';
	const NOTEQUALS = 'notequals';
	const EQUALS = "equals";

	// For everything. The operation value must be yes or no in this case
	const EMPTY = 'empty';
```
If you want to know how this filter works or you have a good idea to improve the filters take a look [Filter Comparators](https://github.com/CBIConsulting/ProperTable/tree/dev/src/filterComparators/comparators.js)

##Column Settings
The property getColumnSettings it's a function that get the column settings (array) when it changes internally and first time the table get rendered. It's usefull when you have a filter component in the columnFilterComponent and you want to change filters outside aswell. Updating the colFilters property not cause a rerender if the filter doesn't change. The structure of colSettings is like:
```javascript
column   // Column name
field  // Field of the column, same as in cols property.
direction  // Sort direction
sorted  // If it's sorted or not (Boolean)
multisort // Multisort allowed
sortable // If this column could be sorted or filtered (boolean)
filterType // 'selection' or 'operation' Default 'selection'
selection // Selected values
operationFilterType // Type of filter, contains, equals, after...
operationFilterValue // Value of operation filter if filterType it's operation
indexedData // Data indexed by column name
data // Full data as an Inmutable object
```
It's highly recomended to use the react addon [Inmutability Helper](https://facebook.github.io/react/docs/update.html) for update or change the colFilters or colSortDirs. A full example of use could be found next:

```javascript
class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

			...

			colSettings: null,
			colSortDirs: {},
			colFilters: {}
		}
	}

	getColSettings(colSettings) {
		let colFT, mustUpdate;
		let colFilters = this.state.colFilters;
		let colSort =  this.state.colSortDirs;
		let createColFilters = _.size(colFilters) === 0;

		colSettings.forEach(col => {
			if (!colSort[col.column]) { // If doesn exist then create it
				colSort[col.column] = col.direction;
			} else if (colSort[col.column] !== col.direction) { // If exist and sort direction has changed then update it.
				colSort = React.addons.update(colSort, {
					[col.column]: {$set: col.direction}
				});
			}

			if (createColFilters) {
				colFilters[col.column] = {
					type: col.filterType,
					operationValue: col.operationFilterValue,
					operationType: col.operationFilterType,
					selection: col.selection
				};
			} else {
				colFT = colFilters[col.column];
				mustUpdate = (col.filterType !== colFT.type) || (col.operationFilterValue !== colFT.operationValue) || (col.operationFilterType !== colFT.operationType);
				mustUpdate = mustUpdate || (col.selection.length !== colFT.selection.length);

				if (mustUpdate) {
					colFilters = React.addons.update(colFilters, {
						[col.column]: {
							type: {$set: col.filterType},
							operationValue: {$set: col.operationFilterValue},
							operationType: {$set: col.operationFilterType},
							selection: {$set: col.selection},
						}
					});
				}
			}
		});

		this.setState({
			colSettings: colSettings,
			colSortDirs: colSort,
			colFilters: colFilters
		});
	}

	render() {
		return (
			<ProperTable.Table

				...

				getColSettings={this.getColSettings}
				colSortDirs={this.state.colSortDirs}
				colFilters={this.state.colFilters}
			/>
		)
	}
}

```
