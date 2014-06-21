/*global m */

// Select ======================================================================
var mc = mc || {};

mc.Select = {
  controller: function (value, options, caption) {

    this.value = typeof value === 'function' ? value : m.prop(value);
    this.options = options || {};
    this.caption = caption || '';
  },

  view: function (ctrl, selectors, attrs, overrides) {
    selectors = selectors || {};
    attrs = JSON.parse(JSON.stringify(attrs || {})); // fastest way to clone
    overrides = overrides || {};

    var attrsParent = attrs._parent || {};
    attrsParent.onchange = attrsParent.onchange || m.withAttr('value', ctrl.value);
    attrsParent.value = attrsParent.value || ctrl.value;

    var caption = overrides.caption || ctrl.caption,
      options = overrides.options || ctrl.options;

    return m('select' + (selectors._parent || ''), attrsParent, [
        caption ? m('option', caption) : '',
        Object.keys(options).map(composeOption)
      ]
    );

    function composeOption(key) {
      var attrsOption = attrs[key] || {};
      attrsOption.value = key;
      attrsOption.selected = key === (attrsParent.value() + '');
      return m('option' + (selectors[key] || ''), attrsOption, options[key] + '');
    }
  }
};
