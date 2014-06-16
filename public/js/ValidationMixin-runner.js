/* globals m, Solder */

// mixins ======================================================================
var solder = new Solder();
solder.setMixin('validator', ValidationMixin);

// app =========================================================================
var app = {
  // model
  name: m.prop('John'),

  // app
  controller: function () {
    var self = this,
      validators = {
        name: function (name) { return name.length > 3; },
        foo: function (foo) { return typeof foo !== 'string'; }
      };

    solder.injectMixins(['validator'], this); // injects 'this.validator'

    this.name = app.name; // m.prop() thingy
    this.foo = 5; // not a m.prop() thingy

    this.submit = function () {
      this.validator.validate(validators);
      if (!self.validator.hasErrors()) { app.name = self.name; }
    }.bind(this);
  },

  view: function (ctrl) {
    return [
      m('div', 'name (4+ chars)'),
      m('div', [
        m('input' + (ctrl.validator.hasError('name') ? '.error' : ''),
          { value: ctrl.name(), onchange: m.withAttr('value', ctrl.name ) }),
        ctrl.validator.hasError('name') ? m('p.error.error-msg', 'The name must have at least 4 chars.') : '',
      ]),
      m('button', {onclick: ctrl.submit}, 'Submit')
    ];
  }
};

m.module(document.body, app);