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
    this.validator = ''; // define 'this.validator' solely to stop jshint errors
    solder.injectMixins(['validator'], this); // injects 'this.validator'

    this.name = app.name; // m.prop() thingy
    this.foo = 5; // not a m.prop() thingy
    this.validators = {
      name: function (name) { return name.length > 3; },
      foo: function (foo) { return typeof foo !== 'string'; }
    };

    this.submit = function () {
      this.validator.validate();
      if (!self.validator.hasErrors()) { app.name = self.name; }
    }.bind(this);
  },

  view: function (ctrl) {
    return [
      m('div', 'name (4+ chars)'),
      m('input' + (ctrl.validator.hasError('name') ? '.error' : ''),
        { value: ctrl.name(), onchange: m.withAttr('value', ctrl.name ) }),
      m('button', {onclick: ctrl.submit}, 'Submit')
    ];
  }
};

m.module(document.body, app);