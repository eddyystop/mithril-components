/* global $ */
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

$(document).ready(function () {
  m.module(document.body, app);
});