// ValidationMixin =============================================================
function ValidationMixin (ctrl) {
  if (!(this instanceof ValidationMixin)) { return new ValidationMixin(ctrl); }
  this.ctrl = ctrl;
  this.errors = [];
}

ValidationMixin.prototype.clearErrors = function () { this.errors = []; };
ValidationMixin.prototype.hasErrors = function () { return this.errors.length; };
ValidationMixin.prototype.hasError = function (key) { return this.errors.indexOf(key) !== -1; };

ValidationMixin.prototype.validate = function () {
  var ctrl = this.ctrl;
  this.errors = Object.keys(ctrl.validators).filter(function (key) {
    var validator = ctrl.validators[key],
      value = ctrl[key];

    if (typeof value === 'function') { value = value(); }
    return !validator(value);
  });
};