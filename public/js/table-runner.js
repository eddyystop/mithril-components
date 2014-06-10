/* global $ */

var app = {
  controller: function () {
    var table = _getTableData(4, 8);

    this.table = new mc.Table.controller(table);

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
      mc.Table.view(ctrl.table)
    ]);
  }
};

$(document).ready(function () {
  m.module(document.body, app);
});