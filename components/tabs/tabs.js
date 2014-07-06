/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
  flavorsSelectors: {
    'bs/': {
      dd: '.dropdown', ddDisabled: '.disabled', ddOpen: '.open',
      ddLink: '.dropdown-toggle', ddCaret: '.caret',
      ddMenu: '.dropdown-menu',
      itemDisabled: '.disabled', itemActive: '.active', item: '',
      itemDivider: '.divider', itemHeader: '.dropdown-header',
      parent: '.nav'},
    'bs/nav-tabs': {parent: '.nav-tabs'},
    'bs/nav-pills': {parent: '.nav-pills'},
    'bs/nav-pills.nav-stacked': {parent: '.nav-pills.nav-stacked'},
    'zf/': {item: '.tab-title', itemActive: '.tab-title.active', parent: '.tabs'},
    'zf/tabs': {},
    'zf/tabs.vertical': {parent: '.vertical'}
  },
  flavorsAttrs: {},

  controller: function (activeTabName) {
    var self = this;
    self.activeTabName = mc.utils.coerceToMprop(activeTabName, '');
    self.openDropdownName = '';

    self.onchangeTab = function (name, isDropdown) {
      console.log('onchangeTab', name, isDropdown, self.openDropdownName);
      if (isDropdown) {
        self.openDropdownName = name === self.openDropdownName ? '' : name;
      } else {
        self.openDropdownName = '';
        self.activeTabName(name);
      }
      console.log(name, isDropdown, self.openDropdownName);
    }.bind(self);
  },

  view: function (ctrl, options) {
    options = options || {};
    var self = this,
      tabs = options.tabs || [],
      selectors = mc.utils.combineSelectors({}, self.flavorsSelectors[options.flavor.substr(0, 3)] || {},
          self.flavorsSelectors[options.flavor] || {}, options.selectors || {}),
      attrs = mc.utils.extend({}, self.flavorsAttrs[options.flavor.substr(0,3)] || {},
          self.flavorsAttrs[options.flavor] || {}, options.attrs || {});

    if (!ctrl.activeTabName()) { self.onchangeTab(tabs[0].name || '', false); }

    // render tabs wrapper
    return m('ul' + (selectors.parent || ''), attrs.parent || {},
      tabs.map(function (tab) {

        if(tab.dropdown) {
          return renderDropdownTab(tab);
        } else {
          return renderStaticTab(tab);
        }
      })
    );

    function renderDropdownTab (tab) {
      var  ddProp = tab.disabled ? 'ddDisabled' : (ctrl.openDropdownName === tab.name ? 'ddOpen' : 'dd'),
        label = mc.utils.resolveChild(tab.label || tab.name) + ' '; // trailing blank needed for BS look

      console.log('renderDropdownTab', ddProp, '...');
      return m('li' + (selectors[ddProp] || ''), attrs[ddProp] || {},
        [
          m('a' + (selectors.ddLink || ''),
            mc.utils.extend({}, attrs.ddLink || {}, {onclick: ctrl.onchangeTab.bind(self, tab.name, true)}),
            [
              m('span', label + ' '),
              m('span' + (selectors.ddCaret || ''), ' ')
            ]
          ),
            ctrl.openDropdownName === tab.name && !tab.disabled ? renderDropdownItems(tab.dropdown) : []
        ]
      );
    }

    function renderDropdownItems (dropdown) {
      console.log('---------renderDropdownItems');
      return m('ul' + (selectors.ddMenu || ''), attrs.ddMenu || {},
        dropdown.map(function (item) {

          console.log(item.label);
          switch (item.type) {
            case 'divider':
              return m('li' + (selectors.itemDivider || ''), {style:{margin: '6px 0'}}, ''); // .divider=9px is not visible
            case 'header':
              return m('li' + (selectors.itemHeader || ''), item.label);
            default:
              return renderStaticTab(item);
          }
        })
      );
    }

    function renderStaticTab (tab) {
      var isActiveTab = ctrl.activeTabName() === tab.name,
        itemProp = tab.disabled ? 'itemDisabled' : (isActiveTab ? 'itemActive' : 'item'),
        linkProp = tab.disabled ? 'linkDisabled' : (isActiveTab ? 'linkActive' : 'link'),
        label = mc.utils.resolveChild(tab.label || tab.name),
        route = mc.utils.resolveChild(tab.redirectTo),
        href = '',
        attr = {};

      console.log('static tab', tab.name, route, tab.disabled, itemProp, linkProp);
      if (!tab.disabled) {
        if (route) {
          href = '[href="' + route + '"]';
          attr = {config : m.route};
        } else {
          attr = {onclick : ctrl.onchangeTab.bind(self, tab.name, false)};
        }
      }

      return m('li' + (selectors[itemProp] || ''), attrs[itemProp] || {},
        m('a' + href + (selectors[linkProp] || ''),
          mc.utils.extend({}, attrs[linkProp] || {}, attr),
          label)
      );
    }
  }
};