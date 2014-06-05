/*global m, $ */

/**
 * SAMPLE USAGE ================================================================

 <link href="TableResponsive.css" rel="stylesheet" type="text/css">
 <script src="mithril.js"></script>
 <script src="jquery.js"></script> <!-- not a dependency for component -->
 <script src="TableResponsive.js"></script>

 $(window).on('resize', function () {
  m.startComputation();
  m.endComputation();
 });

 var app = {
  controller: function () {
    var table = _getTableData(4, 8);

    this.tableScrollable1 = new mc.TableResponsive.controller(table);
    this.tableScrollable2 = new mc.TableResponsive.controller(table);

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
      // a plain table
      mc.TableResponsive.view(ctrl.tableScrollable1),
      // a table responsive to viewport width
      mc.TableResponsive.view(ctrl.tableScrollable2, {
        isPlain: function () { return $(window).width() >= 767; }
      })
    ]);
  }
 };

 m.module(document.body, app);
 */

// TableResponsive =============================================================
var mc = mc || {};

mc.TableResponsive = {
  controller: function (table) {
    this.table = table || [];
  },

  view: function (ctrl, opts) {
    opts = opts || {};

    if (!opts.isPlain || opts.isPlain()) {
      return _plainTable(ctrl.table, opts.selector, opts.attrs);
    } else {
      return m('div.mc-TableResponsive', [
        m('div.scrollable',
          _scrollableTable(ctrl.table, '.responsive' + (opts.selector || ''), opts.attrs)),
        m('div.pinned',
          _pinnedTable(ctrl.table, opts.selector,opts.attrs))
      ]);
    }

    function _plainTable (table, selector, attrs) {
      return m('table' + (selector || ''), attrs || {},
        _tableCols(table, 0, table[0].length));
    }

    function _pinnedTable (table, selector, attrs) {
      return m('table' + (selector || ''), attrs || {},
        _tableCols(table, 0, 1));
    }

    function _scrollableTable (table, selector, attrs) {
      return m('table' + (selector || ''), attrs || {},
        _tableCols(table, 1, table[0].length));
    }

    function _tableCols (table, begin, end) {
      return m('tbody',
        table.map(function (row, i) {
          return m('tr',
            row.slice(begin, end).map(function (cell) {
              return m(i ? 'td' : 'th', cell + ''); //todo mithril should allow type number
            })
          );
        })
      );
    }
  }
};
