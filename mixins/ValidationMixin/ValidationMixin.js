// ValidationMixin =============================================================
function ValidationMixin (ctrl) {
  if (!(this instanceof ValidationMixin)) { return new ValidationMixin(ctrl); }
  this.self = this;
  this.ctrl = ctrl;
  this.errors = [];
}

ValidationMixin.prototype = {
  clearErrors: function () { this.errors = []; },
  hasErrors: function () { return this.errors.length; },
  hasError: function (key) { return this.errors.indexOf(key) !== -1; },

  validate: function (validations) {
    var self = this;
    this.errors = Object.keys(validations).filter(function (key) {
      return !validations[key](self._resolveKey(key));
    });
    return this.errors.length;
  },

  validateValue: function (key, validations) {
    var i = this.errors.indexOf(key);
    if (i !== -1) { this.errors.splice(i, 1); }
    var result = validations[key](this._resolveKey(key));
    if (!result) this.errors.push(key);
    return result;
  },

  _resolveKey: function (key) {
    var value = this.ctrl[key];
    return typeof value === 'function' ? value() : value;
  },

  checks: window.validator || {} // github.com/chriso/validator.js
};