/*global m:false */

// TableResponsive =============================================================
var mc = mc || {};

mc.TableResponsive = {
  controller: function (table) {
    this.table = mc.utils.setParam(table);
    console.log('Tableresponsive.table=', typeof this.table, this.table())
  },

  view: function (ctrl, options) {
    options = options || {};
    var isPlain = typeof options.isPlain === 'undefined' ? true : options.isPlain,
      startRow = options.startRow || 0,
      rows = options.rows || (ctrl.table().length - startRow),
      pinnedCols = Math.min(options.pinnedCols || 1, 1),
      selectors = options.selectors || {},
      attrs = options.attrs || {},
      cols = ctrl.table()[0].length;

    if (typeof isPlain === 'function' ? isPlain() : isPlain) {
      return renderPlainTable();
    } else {
      return renderResponsiveTable();
    }

    function renderPlainTable () {
      return m('div.mc-clipped-table' + (selectors.wrapper || ''), attrs.wrapper || {},
        m('div',
          m('table' + (selectors.parent || ''), attrs.parent || {},
            renderTable(startRow, rows, 0, cols)
          )
        )
      );
    }

    function renderResponsiveTable () {
      return m('div.mc-clipped-table-pinned' + (selectors.wrapper || ''), attrs.wrapper || {}, [
        m('div.pinned',
          m('table.pinned' + (selectors.parent || ''), attrs.parent || {},
            renderTable(startRow, rows, 0, pinnedCols))
        ),
        m('div.scrollable',
          m('table.data' + (selectors.parent || ''), attrs.parent || {overflow: 'scroll',  'overflow-y': 'hidden'},
            renderTable(startRow, rows, pinnedCols, cols))
        )
      ]);
    }

    function renderTable (startDataRow, rows, startCol, endCol) {
      return m('tbody', [
          // rows
          ctrl.table().slice(startDataRow, startDataRow + rows + 1).map(function (row, i) {

            var oddEven = i & 1 ? 'odd' : 'even', // jshint ignore:line
              selector = (selectors.tr || '') + (selectors[oddEven] || '') +
                (selectors[i] || ''),
              attr = mc.utils.extend({}, attrs.tr, attrs[oddEven], attrs[i]);

            return m('tr' + selector, attr,
              // render cells
              row.slice(startCol, endCol).map(function (cell) {
                return m('td', mc.utils.resolveChild(cell));
              })
            );
          })
        ]
      );
    }
  }
};
