/*global m */

// Select ======================================================================
var mc = mc || {};

mc.Select = {
  controller: function (value) {
    this.value = typeof value === 'function' ? value : m.prop(value);
  },

  view: function (ctrl, options) {
    options = options || {};
    var items = options.items || {},
      caption = options.caption || '',
      selectors = options.selectors || {},
      attrs = options.attrs || {};

    var attrsParent = attrs._parent || {};
    attrsParent.onchange = attrsParent.onchange || m.withAttr('value', ctrl.value);
    attrsParent.value = attrsParent.value || ctrl.value;


    return m('select' + (selectors.parent || ''),
      mc.utils.extend({}, attrs.parent || {}, {
        value: ctrl.value(),
        onchange: attrs.parent && attrs.parent.onchange ? attrs.parent.onchange : m.withAttr('value', ctrl.value)
      }),
      [
        caption ? m('option', caption) : '',
        Object.keys(items).map(composeItem)
      ]
    );

    function composeItem(key) {
      console.log(items[key]);
      return m('option' + (selectors.item || '') + (selectors[key] || ''),
        mc.utils.extend({}, attrs[key] || {}, {
          value: key,
          selected: key === ctrl.value()
        }),
        mc.utils.resolveChild(items[key])
      );
    }
  }
};
