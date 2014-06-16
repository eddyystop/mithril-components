// ValidationMixin =============================================================
function ValidationMixin (ctrl) {
  if (!(this instanceof ValidationMixin)) { return new ValidationMixin(ctrl); }
  this.ctrl = ctrl;
  this.errors = [];
}

ValidationMixin.prototype = {
  clearErrors : function () { this.errors = []; },
  hasErrors : function () { return this.errors.length; },
  hasError : function (key) { return this.errors.indexOf(key) !== -1; },

  validate : function (validators) {
    var ctrl = this.ctrl;
    this.errors = Object.keys(validators).filter(function (key) {
        var validator = validators[key],
          value = ctrl[key];

        if (typeof value === 'function') { value = value(); }
        return !validator(value);
      }
    );
  }
};