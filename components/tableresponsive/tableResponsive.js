/*global m, $ */

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
              return m(i ? 'td' : 'th', cell + ''); //todo mithril does not allow type number
            })
          );
        })
      );
    }
  }
};
