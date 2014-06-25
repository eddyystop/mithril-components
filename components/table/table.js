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
        // render rows
        ctrl.table.map(function (row, i) {

          var oddEven = i & 1 ? '_odd' : '_even', // jshint ignore:line
            selector = (selectors._tr || '') + (selectors[oddEven] || '') +
              (selectors[i] || ''),
            attr = extend({}, attrs._tr, attrs[oddEven], attrs[i]);

          return m('tr' + selector, attr,
            // render cells
            row.map(function (cell) {
              return m(i ? 'td' : 'th', cell + ''); // Mithril only supports strings
            })
          );
        })
      );
    }

    function extend (to /* arguments */) {
      Array.prototype.slice.call(arguments, 1).forEach(function (obj) {
        if (typeof obj === 'object') {
          Object.keys(obj).forEach(function (key) { to[key] = obj[key]; });
        }
      });
      return to;
    }
  }
};
