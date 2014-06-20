/* globals m, Solder */

// mixins ======================================================================
var solder = new Solder();
solder.setMixin('validator', ValidationMixin);
solder.setMixin('form', FormMixin);

// app =========================================================================
var app = {
  controller: function () {
    var self = this;

    solder.injectMixins(['validator', 'form'], this); // injects this.validator & this.form
    var v = this.validator.checks;

    var validations = {
      name: function (nameValue) { return v.isLength(nameValue,4, 10); }, // name refers to this.name
      dept: function (deptValue) { return v.isLength(deptValue, 1); }
    };

    this.name = m.prop('John');
    this.dept = m.prop('dev');

    this.check = function (attr, key) {
      return function (e) {
        m.withAttr(attr, self[key])(e);
        self.validator.validateValue(key, validations);
      };
    };

    this.submit = function (e) {
      e.preventDefault();
      e.stopPropagation();

      // validate
      this.validator.validate(validations);
      if (!self.validator.hasErrors()) {
        // post
        this.form.submitForm(
          {
            method: 'POST', url: '/form',
            data: { name: this.name(), dept: this.dept() },
            contentType: 'application/json; charset=utf-8'
          },
          function (obj) { log('success', obj); },
          function (str) { log('failure', str); }
        );
      }
    }.bind(this);

    function log (str, load) {
      console.log(str + '. form.state=', self.form._formState, 'status=', self.form._xhrStatus, 'error=', self.form._formError);
      console.log('load=', load);
    }
  },

  view: function (ctrl) {
    return m('form', [ // <form> is optional
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
      m('button[type=button]', { onclick: ctrl.submit, disabled: !ctrl.form.isEditable() }, 'Submit [type=button]'),
      m('button[type=submit]', { onclick: ctrl.submit, disabled: !ctrl.form.isEditable() }, 'Submit [type=submit]'),
      postStatus()
    ]);

    function postStatus () {
      var status = '';
      if (ctrl.form.getError()) { status = 'An error has occurred. Please try again.'; }
      else if (ctrl.form.isSubmitting()) { status = 'Processing ...'; }
      else if (ctrl.form.isSubmitted()) { status = 'Data updated.'; }
      return m('p', status);
    }
  }
};

m.module(document.body, app);