/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
  controller: function () { }, // controller need not be called

  view: function (ctrl, options) { // 'ctrl' is not used
    options = options || {};
    var self = this,
      tabOptions = options.tabs || {},
      selectors = options.selectors || {},
      attrs = options.attrs || {},
      cssSelectors = {},
      tabOptionKeys = Object.keys(tabOptions),
      activeTabName = mc.utils.setParam(options.activeTabName, tabOptionKeys[0] || '');

    if (options.css === 'bs') {
      cssSelectors = {parent: '.nav.nav-tabs', item: '', itemActive: '.active'};
    }

    return [
      renderTabs(),
      renderTabContents()
    ];

    function renderTabs () {
      return m('ul' + (cssSelectors.parent || '') + (selectors.parent || ''),
        tabOptionKeys.map(function (key) {

          var route = mc.utils.resolveChild(tabOptions[key].onclickRedirectTo),
            itemProp = activeTabName() === key ? 'itemActive' : 'item',
            itemSelectors = (cssSelectors[itemProp] || '') + (selectors[itemProp] || ''),
            linkProp = activeTabName() === key ? 'linkActive' : 'link',
            linkSelectors = (cssSelectors[linkProp] || '') + (selectors[linkProp] || ''),
            label = mc.utils.resolveChild(tabOptions[key].label || key);

          if (route) {
            return m('li' + itemSelectors,
              m('a' + '[href="' + route +'"]' + linkSelectors,
                mc.utils.extend({config: m.route}, attrs[linkProp] || {}),
                label)
            );
          } else {
            return m('li' + itemSelectors,
              m('a' + linkSelectors,
                mc.utils.extend({onclick: onchangeTab.bind(self, key)}, attrs[linkProp] || {}),
                label)
            );
          }
        }));
    }

    function renderTabContents () {
      var tabOption = tabOptions[activeTabName()];
      return tabOption && tabOption.render ? tabOption.render() : [];
    }

    function onchangeTab  (tabName) {
      activeTabName(tabName);
      if (tabOptions[tabName] && tabOptions[tabName].onclick) { tabOptions[tabName].onclick(); }
    }
  }
};