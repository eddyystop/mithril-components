/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Dropdown = {
  controller: function (options) {
    this.label = options.label;
    this.items = options.items;
    this.onclick = options.onclick;
  },

  view: function (ctrl) {
    return m('.dropdown', [
      m('button.btn.btn-default.btn-dropdown-toggle[type=button]', [
        m('span', ctrl.label + ' '),
        m('span.caret')
      ])
    ]);
  }
};