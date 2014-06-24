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
					onclick: function (content, row, col) {
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
* `width` {Integer} width, in pixels, of the column.
* `class` {String}  additional CSS class names to be added to each cell.
* `sortable` {Boolean} The contents of the column can be sorted.

The second argument to the controller is an object with the following properties:

* `url` {String} address of the webservice providing the data to be displayed.  It is passed verbatim to `m.request` to perform a `GET` request.
* `data` {Array} data to be displayed.  If both `url` and `data` are provided, the second prevails.  At least one must be given
* `onclick` {function} listener for a click on a data cell.  The function is called in the context (`this`) of the Datatable instance and will receive:
	* `content` {Any} the content of the cell read from the data store, formatting, if any (not implemented yet) will not affect it.
	* `row` {Object} row within the data store corresponding to the cell.
	* `col` {Object} column definition for the column.
	

View
----

The view must be called within the application view to return the contents to be displayed.  It expects:

* `ctrl` {datatable.controller} reference to its matching controller.
* `options` {Object} object containing various additional properties such as:
	* `caption` {String} Caption to be shown in along the datatable.
	

Datatable uses the icons from [Font Awesome](http://fortawesome.github.io/Font-Awesome/) to indicate sortable columns and the current sort direction, if any.

