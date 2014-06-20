/* I've decided ValidationMixin is more useful than this. */
/* Extracted and extended from http://foundation.zurb.com/docs/components/abide.html */
// http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/
// browsers do display the contents of the title attribute in the inline bubble if it's provided.

// Patterns ====================================================================
function Patterns (ctrl) {
  if (!(this instanceof Patterns)) { return new Patterns(ctrl); }
  this._ctrl = ctrl;

  // Abide patterns ------------------------------------------------------------
  this.alpha = /^[a-zA-Z]+$/;
  this.alpha_numeric  = /^[a-zA-Z0-9]+$/;
  this.integer = /^[-+]?\d+$/;
  this.number = /^[-+]?[1-9]\d*$/;
  // amex, visa, diners
  this.card  = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  this.cvv  = /^([0-9]){3,4}$/;
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
  this.email  = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  this.url = /(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/;
  // abc.de
  this.domain = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
  this.datetime = /([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/;
  // YYYY-MM-DD
  this.date = /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/;
  // HH:MM:SS
  this.time  = /(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/;
  this.dateISO = /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/;
  // MM/DD/YYYY
  this.month_day_year  = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
  // #FFF or #FFFFFF
  this.color = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

  // Other patterns ------------------------------------------------------------
  this._min = function (min) { return min !== undefined ? min + '' : '0'; };
  this._max = function (max) { return max !== undefined ? max + '' : ''; };
  this.alphaLen = function (min, max) {
    return '^[a-zA-Z]{' + this._min(min) + ',' + this._max(max) + '}$';
  };
  this.alpha_numericLen = function (min, max) {
    return '^[a-zA-Z0-9]{' + this._min(min) + ',' + this._max(max) + '}$';
  };
  this.passwordLen = function (min, max) {
    return '(?=^.{' + this._min(min) + ',' + this._max(max) +
      '}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$';
  };
}