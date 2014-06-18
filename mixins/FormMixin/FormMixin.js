/* globals m */

// FormMixin ===================================================================
function FormMixin (ctrl) {
  if (!(this instanceof FormMixin)) { return new FormMixin(ctrl); }
  this._formState = 'editable';
  this._xhrStatus = 0;
  this._formError = null;
}

FormMixin.prototype = {
  _FORM_NOT_EDITABLE: 'Form must be in an editable state to be submitted.',

  setEditable: function () { this._formState = 'editable'; },
  _setSubmitting: function () { this._formState = 'submitting'; },
  _setSubmitted: function () { this._formState = 'submitted'; },

  isEditable: function () { return this._formState === 'editable'; },
  isSubmitting: function () { return this._formState === 'submitting'; },
  isSubmitted: function () { return this._formState === 'submitted'; },

  getXhrStatus: function () { return this._xhrStatus; },

  setError: function (formError) { this._formError = formError; },
  getError: function () { return this._formError; },

  submitForm: function (options, success, failure) {
    var self = this;
    if (!self.isEditable()) { throw new Error(self._FORM_NOT_EDITABLE); }

    self._setSubmitting();
    self.setError(null);

    options.extract = options.extract || function (xhr) {
      self._xhrStatus = xhr.status;
      var isJson = "\"[{".indexOf(xhr.responseText.charAt(0)) !== -1; // fragile but fast
      return isJson ? xhr.responseText : JSON.stringify(xhr.responseText);
    };

    m.request(options).then(
      function () {
        self._setSubmitted();
      },
      function (err) {
        self.isEditable();
        self.setError(err);
      }
    ).then(success, failure);
  }
};