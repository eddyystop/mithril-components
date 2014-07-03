/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
  flavorsSelectors: {
    'bs/nav-tabs': {parent: '.nav.nav-tabs', itemActive: '.active'},
    'bs/nav-pills': {parent: '.nav.nav-pills', itemActive: '.active'},
    'bs/nav-pills.nav-stacked': {parent: '.nav.nav-pills.nav-stacked', itemActive: '.active'},
    'zf/tabs': {parent: '.tabs', item: '.tab-title', itemActive: '.tab-title.active'},
    'zf/tabs.vertical': {parent: '.tabs.vertical', item: '.tab-title', itemActive: '.tab-title.active'}
  },
  flavorsAttrs: {},

  controller: function () { }, // controller need not be called

  view: function (ctrl, options) { // 'ctrl' is not used
    options = options || {};
    var self = this,
      tabOptions = options.tabs,
      tabOptionKeys = Object.keys(tabOptions),
      activeTabName = mc.utils.setParam(options.activeTabName, tabOptionKeys[0] || ''),
      selectors = mc.utils.combineSelectors({},
        this.flavorsSelectors[options.flavor] || {}, options.selectors || {}),
      attrs = mc.utils.extend({},
        this.flavorsAttrs[options.flavor] || {}, options.attrs || {});

    return [
      renderTabs(),
      renderTabContents()
    ];

    function renderTabs () {
      return m('ul' + (selectors.parent || ''), attrs.parent || {},
        tabOptionKeys.map(function (key) {

          var route = mc.utils.resolveChild(tabOptions[key].onclickRedirectTo),
            itemProp = activeTabName() === key ? 'itemActive' : 'item',
            linkProp = activeTabName() === key ? 'linkActive' : 'link',
            label = mc.utils.resolveChild(tabOptions[key].label || key);

          if (route) {
            return m('li' + (selectors[itemProp] || ''), attrs[itemProp] || {},
              m('a' + '[href="' + route +'"]' + (selectors[linkProp] || ''),
                mc.utils.extend({config: m.route}, attrs[linkProp] || {}),
                label)
            );
          } else {
            return m('li' + (selectors[itemProp] || ''), attrs[itemProp] || {},
              m('a' + (selectors[linkProp] || ''),
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