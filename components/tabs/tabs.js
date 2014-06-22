/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
  controller: function (tabs, activeTab) {
    this.tabs = tabs || [];
    this.activeTab = activeTab || '';
  },

  view: function (ctrl, selectors, attrs, overrides) {
    selectors = selectors || {};
    attrs = attrs || {};
    overrides = overrides || {};

    var tabs = normalizeTabs(overrides.tabs || ctrl.tabs, ctrl),
      activeTab = overrides.activeTab || ctrl.activeTab ||
        m.route.param('tab') || Object.keys(tabs)[0];

    return [
      m( 'div' + (selectors._parent || ''), attrs._parent || {},
        m('ul', Object.keys(tabs).map(tab))
      ),
      tabs[activeTab].view(tabs[activeTab].ctrl)
    ];

    function tab (name) {
      var selected = activeTab === name,
        selector = (selected && selectors._activeAnchor ?
          selectors._activeAnchor : selectors._anchor) || '',
        attr = extend({}, { href: '/' + name, config: m.route },
          (selected && attrs._activeAnchor ? attrs._activeAnchor : attrs._anchor)
        );

      return m('li' + (selectors._item || ''), attrs._item || {},
        m('a' + selector, attr, tabs[name].label)
      );
    }

    function normalizeTabs (tabs, ctrl) {
      var norm = {},
        lastCtrl = ctrl || {};

      Object.keys(tabs).forEach(function (key) { // depends on .keys() returning keys in order defined
        var tab = tabs[key];
        if (typeof tab === 'function') {
          norm[key] = { view: tab, ctrl: lastCtrl, label: key };
        } else {
          if (tab.ctrl) { lastCtrl = tab.ctrl; }
          norm[key] = { view: tab.view, ctrl: lastCtrl, label: tab.label || key};
        }
      });

      return norm;
    }

    function extend (to /* arguments */) {
      Array.prototype.slice.call(arguments, 1).forEach(function (obj, i) {
        if (typeof obj === 'object') {
          for (var key in obj) { // jshint ignore:line
            if (obj[key]) { to[key] = obj[key]; } // jshint ignore:line
          }
        }
      });
      return to;
    }
  }
};