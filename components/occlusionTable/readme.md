# [occlusionTable](https://github.com/eddyystop/mithril-components/tree/master/components/occlusionTable)

occlusionTable renders tables which may scroll vertically and horizontally.
Optional header rows are always displayed, as are optional pinned columns.
Both scroll bars always appear when needed, unlike traditional designs. 

The table height and width are preferably defined in the CSS, though they may be set programmatically.
occlusionTable may be used in responsive designs as the table width reacts to CSS media query changes.

occlusionControl works well with tables having a very large number of rows, 
as its renders only the rows which are then visible. (Its also fine for small numbers of rows!)

##### Alternatives

If the table does not have a large number of rows,
or if you don't want to scroll the table both horizontally and vertically,
consider [tableResponsive](../tableResponsive).

## Sample usage
#### Results (shown at 2 CSS media query breakpoints)
![occlusionTable sample](sample.jpg)

#### Run it
Point browser at /mithril-components/public/occlusionTable.html .

#### Code
```
<link href="../components/occlusionTable/occlusionTable.css" rel="stylesheet" type="text/css">

/* occlusionTable ========================================================= */
div#table0, div#table1, div#table2 {
    height: 250px !important;
    width: 750px !important;
}
@media all and (max-width: 800px) {
    div#table0, div#table1, div#table2 {
        width: 650px !important;
    }
}
@media all and (max-width: 700px) {
    div#table0, div#table1, div#table2 {
        width: 450px !important;
    }
}
div.mc-clipped-table-pinned div.scrollable {
    margin-left:35%;
}
div.mc-clipped-table-pinned div.pinned {
    width: 35%;
}

<script src="js/vendor/mithril.js"></script>
<script src="js/vendor/jquery.js"></script>
<script src="../components/utils/mcUtils.js"></script>
<script src="../components/occlusionTable/occlusionTable.js"></script>

  function makeTable (cols) {
    var t = [ ['Header 1 aaaaaaaaaa', 'Header 2', 'Header 3', 'Header 4', 'Header 5', 'Header 6', 'Header 7', 'Header 8', 'Header 9', 'Header 10'].slice(0, cols - 1) ];
    for (var i = 1; i < 501; i += 1) {
      var r = [];
      for (var j = 0; j <= cols; j += 1) {
        r.push('row ' + i + ' cell ' + j + (j === 0 ? ' aaaaaaaaaa' : ''));
      }
      t.push(r);
    }
    return t;
  }
  
  app = {
    // model
    table0: m.prop(makeTable(6)),
    table1: m.prop(makeTable(11)),
    
    // app
    controller: function () {
      this.ctrlTable0 = new mc.occlusionTable.controller(app.table0, m.prop(1));
      this.ctrlTable1 = new mc.occlusionTable.controller(app.table1, m.prop(1));
      this.ctrlTable2 = new mc.occlusionTable.controller(app.table1, m.prop(1), m.prop(1));
    },
    view: function (ctrl) {
      return [
        m('h3', 'Narrow browser window to see tables react twice to width reduction.'),
        m('p'),
        mc.occlusionTable.view(ctrl.ctrlTable0, null, null,
            {_wrapper: '#table0', _parent: '.parentSelector', _heading: '.headingSelector',
              _tr: '.trSelector', _odd: '.oddSelector', _even: '.evenSelector',
              '4': '.row4Selector'
            },
            {_wrapper: {wrapperAttr: ''},  _parent: {parentAttr: ''},  _heading: {style:{backgroundColor:'Aqua', height: '40px'}},
              _tr: {trAttr: ''},  _odd: {style:{backgroundColor:'LightGreen'}},  _even: {style:{backgroundColor:'Khaki'}},
              '4': {style:{backgroundColor:'Red'}}
            }
        ),
        m('p'),
        mc.occlusionTable.view(ctrl.ctrlTable1, null, null, {_wrapper: '#table1', ...}),
        m('p'),
        mc.occlusionTable.view(ctrl.ctrlTable2, null, null, {_wrapper: '#table2', ...}})
      ];
    }
};

m.module(document.body, app);
```

## Controller
```
controller: function () {
  this.component = new mc.occlusionTable.controller(table, headerRows, pinnedCols)
}
```

* `table {fcn | array of arrays}` The table or a function returning the table.
An array of table rows.
The number of columns is computed from the length of the first row..
* `headerRows {fcn | numb | null default 0}`
The number of leading rows which form the column headings.
These rows always appear at the top of the table.
* `pinnedCols {fcn | number | null default 0}`
The number of pinned leading columns. 
These columns always appear at the left of the table.
They do not scroll along with the remaining columns. 

## View
```
view: function (ctrl) {
  return mc.occlusionTable.view(ctrl, containerHeight, containerWidth, selectors, attrs);
}
```

* `ctrl {obj}` is the controller.
* `containerHeight {numb px | str CSS | null default CSS}` is the display height of the table.
A numeric value specifies the size in px.
A string contains a valid CSS height property value.
If null, the height is that rendered as a result of all the CSS styling.
* `containerWeight {numb px | str CSS | null default CSS}` is the display width of the table..
A numeric value specifies the size in px.
A string contains a valid CSS width property value.
If null, the width is that rendered as a result of all the CSS styling.
* `selectors {obj}` are the Mithril selectors attached to various elements in the table.
* `attrs {obj}` are the Mithril attrs attached to various elements in the table.

`selectors` and `attrs` specify the Mithril selectors and attrs to be attached to 
different parts of the table, e.g. {_wrapper: 'table0', _odd:'.oddRow', _even:'.evenRow'}

The locations are:
* `_wrapper` The outermost < div> wrapping the table.
* `_parent` The < table> tags. Note that 2 tables are created when pinned columns are specified.
* `_heading` The < tr> for heading rows.
* `_tr` The < tr> for data rows.
* `_odd` The < tr> for odd numbered data rows.
* `_even` The < tr> for even numbered data rows.
* `{number}` The < tr> for that data row. 

Any `_tr, _even, {number}` values appropriate for a row are combined.

## Styling the table with CSS

It is usually preferable to control table height and width using CSS, 
even though it can be done programmatically.
CSS also gives you the flexibility to make the table width responsive to
media width.
Finally CSS is the only way to specify the relative width allocated to the pinned columns.
 
Idiomatic CSS would be:
````
div#table0 {
    height: 250px !important;
    width: 750px !important;
}
@media all and (max-width: 800px) {
    div#table0 {
        width: 650px !important;
    }
}
div.mc-clipped-table-pinned div.scrollable {
    margin-left:35%;
}
div.mc-clipped-table-pinned div.pinned {
    width: 35%;
}
````

* The table height and width are specified at 2 media widths.
* The pinned columns are allocated 35% of the table width.

All other styling is in `/components/occlusionTable/occlusionTable.css`.