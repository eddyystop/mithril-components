/*global m:false */

// Table =======================================================================
var mc = mc || {};

mc.Table = {
  controller: function (table) {
    this.table = mc.utils.setParam(table);
  },

  view: function (ctrl, options) {
    options = options || {};
    var startRow = options.startRow || 0,
      rows = options.rows || (ctrl.table().length - startRow),
      startCol = options.startCol || 0,
      endCol = (options.cols ? startCol + options.cols : ctrl.table()[0].length) - 1,
      selectors = options.selectors || {},
      attrs = options.attrs || {};

    return m('table' + (selectors.parent || ''), attrs.parent || {},
      renderTable(startRow, rows, startCol, endCol)
    );

    function renderTable (startDataRow, rows, startCol, endCol) {
      return m('tbody',
        // render rows
        ctrl.table().slice(startDataRow, startDataRow + rows + 1).map(function (row, i) {

          var oddEven = i & 1 ? 'odd' : 'even',
            selector = (selectors.tr || '') + (selectors[oddEven] || '') +
              (selectors[i] || ''),
            attr = mc.utils.extend({}, attrs.tr, attrs[oddEven], attrs[i]);

          return m('tr' + selector, attr,
            row.slice(startCol, endCol + 1).map(function (cell) {
              //render cells
              return m(i ? 'td' : 'th', mc.utils.resolveChild(cell));
            })
          );
        })
      );
    }
  }
};
