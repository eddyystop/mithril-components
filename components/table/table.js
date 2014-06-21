/*global m:false */

// Table =======================================================================
var mc = mc || {};

mc.Table = {
  controller: function (table) {
    this.table = table || [];
  },

  view: function (ctrl, selectors, attrs) {
    selectors = selectors || {};
    attrs = attrs || {};

    return m('table' + (selectors._parent || ''), attrs._parent || {},
      _tableRows()
    );

    function _tableRows () {
      return m('tbody',
        ctrl.table.map(function (row, i) {

          var oddEven = i & 1 ? '_odd' : '_even', // jshint ignore:line
            selector = (selectors._tr || '') + (selectors[oddEven] || '') +
              (selectors[i] || ''),
            attr = {};

          if (attrs._tr) { merge(attr, attrs._tr); }
          if (attrs[oddEven]) { merge(attr, attrs[oddEven]); }
          if (attrs[i]) { merge(attr, attrs[i]); }

          return m('tr' + selector, attr,

            // render cells
            row.map(function (cell) {
              return m(i ? 'td' : 'th', cell + ''); // Mithril only supports strings
            })
          );
        })
      );
    }

    function merge (to, from) {
      for (var key in from) { to[key] = from[key]; }  // jshint ignore:line
    }
  }
};
