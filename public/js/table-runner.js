/*global m:false, $:false */

var app = {
  controller: function () {
    var table = [
      ['Header 1 aaaaaaaaaa', 'Header 2', 'Header 3', 'Header 4', 'Header 5', 'Header 6', 'Header 7'],
      ['row 1 cell 1 aaaaaaaaaa', '(row 1, col 2)', '(row 1, col 3)', '(row 1, col 4)', '(row 1, col 5)', '(row 1, col 6)', '(row 1, col 7)'],
      ['row 2 cell 1 aaaaaaaaaa', '(row 2, col 2)', '(row 2, col 3)', '(row 2, col 4)', '(row 2, col 5)', '(row 2, col 6)', '(row 2, col 7)'],
      ['row 3 cell 1 aaaaaaaaaa', '(row 3, col 2)', '(row 3, col 3)', '(row 3, col 4)', '(row 3, col 5)', '(row 3, col 6)', '(row 3, col 7)'],
      ['row 4 cell 1 aaaaaaaaaa', '(row 4, col 2)', '(row 4, col 3)', '(row 4, col 4)', '(row 4, col 5)', '(row 4, col 6)', '(row 4, col 7)']
    ];

    this.table1 = new mc.Table.controller(table);
    this.table2 = new mc.Table.controller(table);
  },

  view: function (ctrl) {
    var selectors2 = {
      _parent: '.myClass#myId',
      _tr: '.myTr',
      _even: '.myTrEven',
      '2': '.myTrRow2'
    };
    var attrs2 = {
      _parent: {style: {color: 'red'}},
      _odd: {style: {backgroundColor: 'pink'}},
      '0': {style: {color: 'blue'}},
      '2': {style: {color: 'green', backgroundColor: 'yellow'}}
    };

    return m('div', [
      mc.Table.view(ctrl.table1),
      m('p'),
      mc.Table.view(ctrl.table2, selectors2, attrs2)
    ]);
  }
};

$(document).ready(function () {
  m.module(document.body, app);
});