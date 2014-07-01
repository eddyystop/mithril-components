# [table](https://github.com/eddyystop/mithril-components/tree/master/components/table)

A simple table.

##### Alternatives

If you want to scroll the table horizontally, 
if you want the table width to react to the width of the media,
or if you need pinned columns, consider
[tableResponsive](../tableResponsive).

## Sample usage
#### Results (with Bootstrap 3.2)
![table sample](sample.png)

#### Run it
Point browser at /mithril-components/public/table.html .

#### Code
```
<link href="vendor/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">

<script src="js/vendor/mithril.js"></script>
<script src="../components/utils/mcUtils.js"></script>
<script src="../components/table/table.js"></script>
<script>

var app = {
controller: function () {
  var table = [
    ['Header 1 aaaaaaaaaa', 'Header 2', 'Header 3', 'Header 4', 'Header 5', 'Header 6', 'Header 7'],
    ['row 1 cell 1 aaaaaaaaaa', '(row 1, col 2)', '(row 1, col 3)', '(row 1, col 4)', '(row 1, col 5)', '(row 1, col 6)', '(row 1, col 7)'],
    ['row 2 cell 1 aaaaaaaaaa', '(row 2, col 2)', '(row 2, col 3)', '(xxxxxxxxxxxx)', '(row 2, col 5)', '(row 2, col 6)', '(row 2, col 7)'],
    ['row 3 cell 1 aaaaaaaaaa', '(row 3, col 2)', '(row 3, col 3)', '(row 3, col 4)', '(row 3, col 5)', '(row 3, col 6)', '(row 3, col 7)'],
    ['row 4 cell 1 aaaaaaaaaa', '(row 4, col 2)', '(row 4, col 3)', '(row 4, col 4)', '(row 4, col 5)', '(row 4, col 6)', '(row 4, col 7)']
  ];
  table[2][3] = [m('span','(row 2, col 4)'), m('span.badge', 'New')];
  
  this.table1 = new mc.Table.controller(table);
  this.table2 = new mc.Table.controller(m.prop(table));
},

view: function (ctrl) {
  var selectors2 = {
    parent: '.myTable',
    tr: '.myTr',
    even: '.myTrEven',
    odd: '.myTrOdd',
    '2': '.myTrRow2'
  };
  var attrs2 = {
    parent: {style: {color: 'red'}},
    odd: {style: {backgroundColor: 'pink'}},
    '2': {style: {color: 'green', backgroundColor: 'yellow'}}
  };

  return m('.container', [
    m('p'),
    mc.Table.view(ctrl.table1, {startCol:2, cols: 3, selectors: {parent: '.table .table-bordered .table-striped'}}),
    m('p'),
    mc.Table.view(ctrl.table2, {selectors: selectors2, attrs: attrs2})
  ]);
}
};

m.module(document.body, app);
```

## Controller
```
controller: function () {
  this.table = m.prop([ [...], [...], ... ]);
  this.component = new mc.table.controller(table);
}
```

* `table {fcn | array of arrays}` 
The table to display. 
It is or returns an array of rows, each row containing column cells.
The number of columns in the table is taken from the first row.
    * `cell {str | numb | fcn | m() | array of m()}` the cell value.
    A fcn is called.

## View
```
view: function (ctrl) {
  return mc.select.view(ctrl, options);
}
```

* `ctrl {obj}` is the controller.
* `options {obj}` contains the following optional properties:
    * `startRow { numb | default 0 }` the starting row to display (base 0).
    * `rows { numb | defaults to last row }` number of rows to display.
    * `startCol { numb | default 0 }` the starting column to display (base 0).
    * `cols { numb | defaults to last column }` number of cols to display.
    * `selectors {obj}` are the Mithril selectors attached to various elements in the table.
    * `attrs {obj}` are the Mithril attrs attached to various elements in the table.

`selectors` and `attrs` specify the Mithril selectors and attrs to be attached to 
different locations in the structure, e.g. `parent: '.table .table-bordered .table-striped'`

The locations are:
* `parent` The < table>.
* `tr` Every < tr>.
* `even` Even row < tr>.
* `odd` Odd row < tr>.
* `{number}` The < tr> of that row number (base 0).