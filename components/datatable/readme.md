A simple Datatable control
==========================

Allows the display of tabular information as a simple table.

Features
--------

* Table description separate from data
* Data source can be local array or remote webservice
* Columns definition array allows to
	* Select data to display
	* enable column sorting
	* set column width
	* add CSS classNames
* Table configuration allows to
	* set caption
	* set table width
	* set function to respond to click events on data cells
	
Usage
-----

	var app = {

		controller: function () {

			this.datatable = new mc.Datatable.controller(
				// Columns definition:
				[
					{key:"Empty"},
					{key:"Numbers", children:[
						{key:"SKU", label:"SKU", sortable:true},
						{key:"Quantity", sortable:true, class:'right-aligned'}
					]},
					{key:"Text", children:[
						{key:"Item", sortable:true},
						{key:"Description", sortable:true, width:200}
					]}
				],
				// Other configuration:
				{
					// Address of the webserver supplying the data
					url:'data/stock.json',

					// Handler of click event on data cell
					// It receives the relevant information already resolved
					onCellClick: function (content, row, col) {
						console.log(content, row, col);
					}
				}
			);
		},

		view: function (ctrl) {
			return mc.Datatable.view(ctrl.datatable,  {
				caption:'this is the caption'
			});
		}
	};

Controller
----------

The controller must be called within the application controller with two arguments:

* `colDefs` {Array} Definition of the columns to be displayed.
* `options` {Object} Various other options.


The table is described, mostly, by its columns definition `colDefs`.  It is an array of column descriptions. 
Which and in what order the data is displayed is determined by the `colDefs`.
There might be more fields in the data than columns displayed and there might be more columns than data displayed.

Column headers can be nested to any depth by using the `children` property on the grouping header.  Only the terminal nodes in the `colDefs` correspond to data. 

A column definition may contain the following properties:

* `key` {String} (mandatory): a unique key used to refer to the column.
* `label` {String} the text to show at the column header.  Defaults to the `key`.
* `children` {Array}  array if further columns definitions nested under this table header.
* `field` {String} name of the property in the data containing the text to be shown.
* `width` {Integer | CSS with spec} width of the column.  If a plain number, it will assumed to be in pixels.
* `class` {String}  additional CSS class names to be added to each cell. This applies to the header cells as well as to the data cells.  Be sure to use the tagName along the className (`td.myClassName` or `th.myClassName`) in the CSS style sheet when defining the styles for each.
* `sortable` {Boolean} the contents of the column can be sorted.
* `formatter` {Function} function to format the value to be shown. It should return the value formatted for display. It will be called in the context (`this`) of the Datatable instance and will receive the following arguments:
	* `value` {Any} value from the data store.
	* `row` {Object} row to which the cell belongs.
	* `col` {Object} column definition.
	* `attrs` {Object} empty object later to be used to set the attributes on the cell.

The second argument to the controller is an object with the following properties:

* `url` {String} address of the webservice providing the data to be displayed.  It is passed verbatim to `m.request` to perform a `GET` request.
* `data` {Array} data to be displayed.  If both `url` and `data` are provided, the second prevails.  At least one must be given
* `onCellClick` {function} listener for a click on a data cell.  The function is called in the context (`this`) of the Datatable instance and will receive:
	* `content` {Any} the content of the cell read from the data store, formatting, if any (not implemented yet) will not affect it.
	* `row` {Object} row within the data store corresponding to the cell.
	* `col` {Object} column definition for the column.
* `recordId` {String} If present, it should be the name of the field within the record that serves as a primary id for the record.  Each TR element in the data section of the table will have a `data-record-id` attribute set to the value of this key. Defaults to `id`.   If the records have no value for that property (either the given or the default `id`) unique numbers will be asigned to them.
* `rowSelect` {Object} Enables row selection and notification of changes.  It has the following sub-properties:
	* `multiple` {Boolean}  Determines whether multiple row selection is enabled or not. Defaults to false.
	* `callback` {Function} Function that will receive an array of `recordId` values corresponding to the selected records.

A property getter/setter can be passed as a listener to the onCellClick event if only the cell contents is required, as the rest of the arguments would simply be ignored.

View
----

The view must be called within the application view to return the contents to be displayed.  It expects:

* `ctrl` {datatable.controller} reference to its matching controller.
* `options` {Object} object containing various additional properties such as:
	* `caption` {String} caption to be shown in along the datatable.
	* `width` {Integer | CSS width spec} sets the width of the table.  If a number, it will be assumed to be in pixels. 
	* `classNames` {Object} overrides for various CSS class names:
		* `table` {String} class name for the table element. Default: 'datatable'.
		* `even` {String} class name for the TR element of even-numbered rows. Default: 'even'.
		* `odd` {String} class name for the TR element of odd-numbered rows. Default: 'odd'.
		* `sorted` {String} class name for the TH and TD elements of the currently sorted column.  Default 'sorted'.
	

Datatable uses the icons from [Font Awesome](http://fortawesome.github.io/Font-Awesome/) to indicate sortable columns and the current sort direction, if any.

Cell Formatting
---------------

A formatter can create contents for a column that has no value in the data store.  The formatter function will receive an `undefined` `value` but may return a value to display based on the data in other fields in the row, for example:

	formatter: function (value, row, col, attrs) {
		return row.firstName + ' ' + row.lastName;
	}

It may also help to extract a value deep down in the object hierarchy of the received data.  

	formatter: function (value, row, col, attrs) {
		return value.firstName + ' ' + value.lastName;
	}


The formatter has access to the column definition where the user can store extra information to help the formatter. In order to avoid compatibility issues with future features, it is recommended that custom user data in the columns definition be prefixed with the `'$'` sign since datatable already uses `'_'` for internal properties.

The formatter also receives an empty object which will be later used in the creation of the TD element. The user may set the attributes on the cell, for example:

	formatter: function (value, row, col, attrs) {
		if (value < 0) attrs.style = 'background-color: red';
		return (Math.round(value * 10000) / 100) + '%';
	}

Datatable will further add CSS class names to those attributes, the user is free to add classnames but note that certain attributes might be overridden by Datatable's own styles.  Either proper prioritization or the `!important` attribute might be required to make a style visible.  Using the `style` attribute does have priority over styles set by CSS stylesheets and Datatable doesn't use it.

Pre-prossesing the received data
--------------------------------

Datatable expects the data to be a plain array of objects with its properties containing the values to be displayed.  If the data is not in this format or if it needs any conversion, it is best not to tell the Datatable to fetch the data by using the `url` configuration property.  Instead, the `data` property can accept either an array or a promise as returned by a call to `m.request`. That request can process the data as described in **Unwrapping Response Data** in the Web Services section of Mithirl's User Guide.

Sorting
-------

Columns are sorted based on the values in the data store, not their displayed values. Dates and numbers will be sorted according to how they are represented in the received data.   If numbers are sent as strings of digits, they will be sorted alphabetically by their string representation, i.e.: '1', '11', '2', '299', '3'.  

In such cases, it is recommended to pre-process the data as indicated in the previous section.

Columns with values generated by a formatter with no underlying value in the data store cannot be formatted.  

Row Selection
-------------

Row selection is enabled by the `rowSelect` configuration property in the controller.   It should contain at least the `callback` property pointing to a function that receives the list of `recordId`s of the selected rows.  The function can be a property getter/setter.  If the `multiple` property is true, multiple row selection is enabled.

To make row selection possible, it is expected that records will have some means to uniquely identify each one.  By default, it is assumed that a field named `id` will be the primary identifier of the record.  The developer may change this unique identifier by providing the `recordId` property indicating the name of the field containing the unique id.  If the given field has no value, Datatable will assign a sequential number to each row, which will be unique for each page, that is, for the duration of the application.

The callback will receive an array containing the `recordId`s of the selected rows.  
