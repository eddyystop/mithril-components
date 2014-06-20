/*global m */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
  controller: function (tabs, viewsCtrl, activeTab) {
    this.tabs = tabs || [];
    this.viewsCtrl = viewsCtrl || {};
    this.activeTab = activeTab || '';
  },

  view: function (ctrl, opts) {
    opts = opts || {};
    var tabs = normalizeTabs(opts.tabs || ctrl.tabs),
    // default to tab param on URL, then to first tab
      activeTab = opts.activeTab || ctrl.activeTab || m.route.param('tab') || Object.keys(tabs)[0];

    return [
      m('.tabs', [
        m('ul', Object.keys(tabs).map(tab))
      ]),
      tabs[activeTab].view(tabs[activeTab].ctrl)
    ];

    function tab (name) {
      return m('li', [
        m('a',
          { class: activeTab === name ? 'selected' : '', href: '/' + name, config: m.route },
          tabs[name].label
        )
      ]);
    }

    function normalizeTabs (tabs) {
      var norm = {},
        lastCtrl = {};

      Object.keys(tabs).forEach(function (key) { // depends on .keys() returning keys in stored order
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
  }
};