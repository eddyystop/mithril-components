// ValidationMixin =============================================================
function ValidationMixin (ctrl) {
  if (!(this instanceof ValidationMixin)) { return new ValidationMixin(ctrl); }
  this.ctrl = ctrl;
  this.errors = [];
}

ValidationMixin.prototype = {
  clearErrors: function () { this.errors = []; },
  hasErrors: function () { return this.errors.length; },
  hasError: function (key) { return this.errors.indexOf(key) !== -1; },

  validate: function (validations) {
    var ctrl = this.ctrl;
    this.errors = Object.keys(validations).filter(function (key) {
        var value = ctrl[key];
        if (typeof value === 'function') { value = value(); }

        return !validations[key](value);
      }
    );
  },

  checks: window.validator || {} // github.com/chriso/validator.js
};