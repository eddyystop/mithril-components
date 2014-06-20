/* globals m, Solder */

// mixins ======================================================================
var solder = new Solder();
solder.setMixin('validator', ValidationMixin);

// app =========================================================================
var app = {
  // model
  name: m.prop('John'),
  dept: m.prop('dev'),

  // app
  controller: function () {
    var self = this;

    solder.injectMixins(['validator'], this); // injects 'this.validator'
    var v = this.validator.checks;

    var validations = {
      name: function (name) { return v.isLength(self.name(),4, 10);},
      dept: function (dept) { return v.isLength(self.dept(), 1); },
      foo: function (foo) { return typeof foo !== 'string'; }
    };

    this.name = app.name; // m.prop() thingy
    this.dept = app.dept;
    this.foo = 5; // not a m.prop() thingy

    this.check = function (attr, key) {
      return function (e) {
        m.withAttr(attr, self[key])(e);
        self.validator.validateValue(key, validations);
      };
    };

    this.submit = function () {
      this.validator.validate(validations);
      if (!self.validator.hasErrors()) { app.name = self.name; }
    }.bind(this);
  },

  view: function (ctrl) {
    return [
      m('div', 'name (4 to 10 chars)'),
      m('div', [
        m('input' + (ctrl.validator.hasError('name') ? '.error' : ''),
          { value: ctrl.name(), onchange: ctrl.check('value', 'name') }),
        ctrl.validator.hasError('name') ? m('p.error.error-msg', 'The name must be 4 to 10 chars.') : ''
      ]),
      m('div', [
        m('input' + (ctrl.validator.hasError('dept') ? '.error' : ''),
          { value: ctrl.dept(), onchange: ctrl.check('value', 'dept') }),
        ctrl.validator.hasError('dept') ? m('p.error.error-msg', 'A department name is required.') : ''
      ]),
      m('button', {onclick: ctrl.submit}, 'Submit')
    ];
  }
};

m.module(document.body, app);