/*global m:false */

// TableResponsive =============================================================
var mc = mc || {};

mc.TableResponsive = {
  controller: function (table) {
    this.table = table || [];
  },

  view: function (ctrl, isPlain, selectors, attrs) {
    selectors = selectors || {};
    attrs = attrs || {};

    var selectorParent = selectors._parent || '',
      attrParent = attrs._parent || {},
      cols = ctrl.table[0].length;

    if (!isPlain || isPlain()) {
      return m('table' + selectorParent, attrParent, _tableRows(0, cols));
    } else {
      return m('div.mc-TableResponsive', [
        m('div.scrollable',
          m('table.responsive' + selectorParent, attrParent, _tableRows(1, cols))
        ),
        m('div.pinned',
          m('table' + selectorParent, attrParent, _tableRows(0, 1))
        )
      ]);
    }

    function _tableRows (begin, end) {
      return m('tbody',
        // render rows
        ctrl.table.map(function (row, i) {

          var oddEven = i & 1 ? '_odd' : '_even', // jshint ignore:line
            selector = (selectors._tr || '') + (selectors[oddEven] || '') +
              (selectors[i] || ''),
            attr = extend({}, attrs._tr, attrs[oddEven], attrs[i]);

          return m('tr' + selector, attr,
            // render cells
            row.slice(begin, end).map(function (cell) {
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
