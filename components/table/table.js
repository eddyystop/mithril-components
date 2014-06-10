/*global m, $ */

// Table =======================================================================
var mc = mc || {};

mc.Table = {
  controller: function (table) {
    this.table = table || [];
  },

  view: function (ctrl, opts) {
    opts = opts || {};

    return _plainTable(ctrl.table, opts.selector, opts.attrs);

    function _plainTable (table, selector, attrs) {
      return m('table' + (selector || ''), attrs || {},
        m('tbody',
          table.map(function (row, i) {
            return m('tr',
              row.map(function (cell) {
                return m(i ? 'td' : 'th', cell + ''); //todo mithril does not allow type number
              })
            );
          })
        )
      );
    }
  }
};
