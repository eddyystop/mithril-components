/* global $ */

ValidationMixin = {
  errors: [],
  clearErrors: function () { this.errors = []; },
  hasErrors: function () { return this.errors.length; },
  hasError: function (key) { return this.errors.indexOf(key) !== -1; },

  validate: function () {
    var self = this;
    this.errors = Object.keys(this.validators).filter(function (key) {
      var validator = self.validators[key],
        value = self[key]();
      return !validator(value);
    });
  }
};

var app = {
  // model
  name: m.prop('John'),

  // app
  controller: function () {
    // mixin
    var self = this;
    Object.keys(ValidationMixin).forEach(function (key) {
      self[key] = ValidationMixin[key];
    });

    this.name = app.name;
    this.validators = {
      name: function (name) { return name.length > 3; }
    };

    this.submit = function () {
      self.validate();
      if (!self.hasErrors()) { app.name = self.name; }
    }.bind(this);
  },

  view: function (ctrl) {
    return [
      m('div', 'name (4+ chars)'),
      m('input' + (ctrl.hasError('name') ? '.error' : ''), { value: ctrl.name(), onchange: m.withAttr('value', ctrl.name ) }),
      m('button', {onclick: ctrl.submit}, 'Submit')
    ];
  }
};

// views will be re-rendered when mc.Select.view's onchange is triggered.
$(document).ready(function () {
  m.module(document.body, app);
});