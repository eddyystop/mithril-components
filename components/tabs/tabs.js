/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
  controller: function () { }, // controller need not be called

  view: function (ctrl, activeTabName, tabOptions) { // 'ctrl' is not used
    activeTabName = mc.utils.setParam(activeTabName, '');
    tabOptions = tabOptions || {};
    var self = this;

    return [
      renderTabs(),
      renderTabContents()
    ];

    function renderTabs () {
      return m('ul.nav.nav-tabs', Object.keys(tabOptions).map(function (key) { //todo

        var label = tabOptions[key].label || key,
          route = tabOptions[key].onclickRedirectTo;

        if (route) {
          return m('li', {class: activeTabName() === key ? 'active' : ''}, //todo
            m('a' + '[href="' + route +'"]', //todo
              {config: m.route}, label)
          );
        } else {
          return m('li', {class: activeTabName() === key ? 'active' : ''},
            m('a', {onclick: onchangeTab.bind(self, key)}, label)
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