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
    var self = this;

    solder.injectMixins(['validator'], this); // injects 'this.validator'
    var v = this.validator.checks;

    var validations = {
      name: function (name) { return v.isLength(self.name(),4, 10); },
      foo: function (foo) { return typeof foo !== 'string'; }
    };

    this.name = app.name; // m.prop() thingy
    this.foo = 5; // not a m.prop() thingy

    this.submit = function () {
      this.validator.validate(validations);
      if (!self.validator.hasErrors()) { app.name = self.name; }
    }.bind(this);
  },

  view: function (ctrl) {
    return [
      m('div', 'name (4+ chars)'),
      m('div', [
        m('input' + (ctrl.validator.hasError('name') ? '.error' : ''),
          { value: ctrl.name(), onchange: m.withAttr('value', ctrl.name ) }),
        ctrl.validator.hasError('name') ? m('p.error.error-msg', 'The name must be 4 to 10 chars.') : ''
      ]),
      m('button', {onclick: ctrl.submit}, 'Submit')
    ];
  }
};

m.module(document.body, app);