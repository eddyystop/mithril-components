/*global m, $ */

// Select ======================================================================
var mc = mc || {};

mc.Select = {
  controller: function (value, options, caption) {

    this.value = typeof value === 'function' ? value : m.prop(value);
    this.options = options || {};
    this.caption = caption || '';
  },

  view: function (ctrl, optsParam) {
    var opts = Object.create(optsParam || {}); // don't change param
    opts.attrs = opts.attrs || {};
    opts.attrs.onchange = m.withAttr('value', ctrl.value);
    opts.attrs.value = ctrl.value();

    var caption = opts.caption || ctrl.caption,
      options = opts.options || ctrl.options || [];

    return m('select' + (opts.selector || ''), opts.attrs, [
        caption ? m('option', { value: '' }, caption) : '',
        Object.keys(options).map(composeOption)
      ]
    );

    function composeOption(key) {
      return m('option', { value: key, selected: key == (ctrl.value() + '') }, options[key] + ''); // jshint ignore:line
    }
  }
};
