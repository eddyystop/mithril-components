/*global m:false */

// Button ======================================================================

mc.Button = {
  // options: <events> onclick
  controller: function (options) {
    this.onclick = function (el) {
      if (options.onclick) { options.onclick(el); }
    }.bind(this);
  },

  // options: <props> flavor, selectors, label, href, inputType
  // selectors: .btn-default -primary -success -info -warning -danger -link
  // selectors: .btn-lg -sm -xs
  // selectors: .btn-block
  // selectors: .active .disabled
  view: function (ctrl, options) {
    var flavors = {
      default: '.btn-default',
      nav: '.navbar-btn',
      'nav-right': '.navbar-btn.navbar-right'
    };

    if (options.href) {
      return m('a.btn' +
          (options.selectors || '') + (flavors[options.flavor] || flavors.default),
        {href: options.href, config: m.route()},
          options.label || ''
      );
    } else {
      if (options.inputType) {
        return m('input[type=' + options.inputType + '].btn' +
            (options.selectors || '') + (flavors[options.flavor] || flavors.default),
          {onclick: ctrl.onclick, value: options.label || ''}
        );
      } else {
        return m('button[type=button].btn' +
            (options.selectors || '') + (flavors[options.flavor] || flavors.default),
          {onclick: ctrl.onclick},
            options.label || ''
        );
      }
    }
  }
};