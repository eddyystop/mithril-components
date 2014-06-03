# [mithril-components] (https://github.com/eddyystop/mithril-components)

Components, patterns and sample code for lhorie/mithril.js 
[mithril] (https://github.com/lhorie/mithril.js).

A new-born work in progress.

## How to install
```sh
bower install mithril-components
    or
bower install git://github.com/eddyystop/mithril-components
```

## UI Components
- [Table - responsive] (#table-responsive) - A responsive table.


## Docs

### <a name="UI"></UI Components


***


### <a name="table-responsive"></a>Responsive table

#### 1. Load external CSS files
```
     <style>
         table th{
             font-weight:bold;
         }
         table td,
         table th {
             padding: 9px 10px;
             text-align: left;
         }
 
         table.responsive {
             margin-bottom:0;
         }
         .pinned {
             position: absolute;
             left: 0;
             top: 0;
             background: #fff;
             width: 35%;
             overflow: hidden;
             overflow-x: scroll;
             border-right: 1px solid #ccc;
             border-left: 1px solid #ccc;
         }
         .pinned table {
             border-right: none;
             border-left: none;
             width: 100%;
         }
         .pinned table th,
         .pinned table td {
             white-space: nowrap;
         }
         .pinned td:last-child {
             border-bottom: 0;
         }
         div.mc-TableResponsive {
             position: relative;
             margin-bottom: 20px;
             overflow: hidden;
             border-right: 1px solid #ccc;
         }
         div.mc-TableResponsive div.scrollable table {
             margin-left:35%;
         }
         div.mc-TableResponsive div.scrollable {
             overflow: scroll;
             overflow-y: hidden;
         }
         table.responsive td,
         table.responsive th {
             position: relative;
             white-space: nowrap;
             overflow: hidden;
         }
     </style>
```

```js
  $(window).on('resize', function () {
    m.startComputation();
    m.endComputation();
  });
  
  var app = {
    controller: function () {
      var table = _getTableData(4, 8);

      this.tableScrollable1 = new mc.TableResponsive.controller(table);

      this.tableScrollable2 = new mc.TableResponsive.controller(table, {
        isPlain: function () { return $(window).width() >= 767; }
      });

      function _getTableData (rows, cols) {
        var table = [],
          row = [];

        for (var j = 1; j <= cols; j += 1) {
          row.push('Header ' + j + (j === 1 ? ' aaaaaaaaaa' : ''));
        }
        table.push(row);

        for (var i = 1; i <= rows; i += 1) {
          row = [];
          for (j = 1; j <= cols; j += 1) {
            row.push('row ' + i + ', cell ' + j  + (j === 1 ? ' aaaaaaaaaa' : ''));
          }
          table.push(row);
        }

        return table;
      }
    },

    view: function (ctrl) {
      return m('div', [
        mc.TableResponsive.view(ctrl.tableScrollable1),
        mc.TableResponsive.view(ctrl.tableScrollable2)
      ]);
    }
  };
```
Start downloading in parallel any CSS files not already downloaded.
We do not wait for the downloads to complete.

```js
PJAX.requireCss([
    '/concat/production.css',
    '/css/vendor/pjax-responsive-tables.css'
], handler );
```


## License
Copyright (c) 2014 John Szwaronek (<johnsz9999@gmail.com>).
Distributed under the MIT license. See LICENSE.md for details.