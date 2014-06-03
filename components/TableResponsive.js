/*global m, $, mc */

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

    // always a plain table
    this.tableScrollable1 = new mc.TableResponsive.controller(table);

    // responsive table, breaking at 767px
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

 m.module(document.body, app);
 */

// TableResponsive =============================================================
var mc = mc || {};

mc.TableResponsive = {
  controller: function (table, opts, selector, attrs) {
    this.table = table || [];
    this.opts = opts || {};
    this.selector = selector || '';
    this.attrs = attrs || {};
  },

  view: function (ctrl) {

    if (!ctrl.opts.isPlain || ctrl.opts.isPlain()) {
      return _plainTable(ctrl.table, ctrl.selector, ctrl.attrs);
    } else {
      return m('div.mc-TableResponsive', [
        m('div.scrollable',
          _scrollableTable(ctrl.table, '.responsive' + ctrl.selector, ctrl.attrs)),
        m('div.pinned',
          _pinnedTable(ctrl.table, ctrl.selector, ctrl.attrs))
      ]);
    }

    function _plainTable (table, selector, attrs) {
      return m('table' + selector, attrs,
        _tableCols(table, 0, table[0].length));
    }

    function _pinnedTable (table, selector, attrs) {
      return m('table' + selector, attrs,
        _tableCols(table, 0, 1));
    }

    function _scrollableTable (table, selector, attrs) {
      return m('table' + selector, attrs,
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
