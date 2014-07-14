/*global m:false */

// NavSearch ===================================================================

mc.NavSearch = {
  // options: <props> searchValue() <events> onsubmit
  controller: function (options) {
    this.searchValue = mc.utils.coerceToMprop(options.searchValue || '');
    this.onsubmit = function () {
      options.onsubmit(this.searchValue());
    }.bind(this);
  },

  // options: <props> label, placeholder, btnLabel, flavor
  view: function (ctrl, options) {
    var flavors = {
      nav: '.navbar-form',
      'nav-right': '.navbar-form.navbar-right'
    };

    return m('form' + (flavors[options.flavor] || flavors.nav), [
        m('.form-group', [
          options.label ? m('label.sr-only', options.label) : null,
          m('input[type=text].form-control',
            { value: ctrl.searchValue(),
              onchange: m.withAttr('value', ctrl.searchValue),
              placeholder: options.placeholder || 'Search'
            }
          )
        ]),
        m('button[type=button].btn btn-default',
          {onclick: ctrl.onsubmit.bind(null, ctrl.searchValue())},
            options.btnLabel || 'Submit'
        )
      ]
    );
  }
};