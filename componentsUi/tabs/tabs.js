var mc = mc || {};

mc.Tabs = {
  // options: <props> activeTab(), isDropdownOpen <event> onclickTab
  controller: function (options) {
    console.log('\n.. in mc.Tabs.controller. options=', options);
    options = options || {};
    this.activeTab = mc.utils.coerceToMprop(options.activeTab, '');
    this.isDropdownOpen = options.isDropdownOpen || false;

    this.onclickTab = function (name) {
      console.log('mc.Tabs.controller > onclickTab. name=', name);
      this.isDropdownOpen = false;
      this.activeTab(name);
      if (options.onclickTab) { options.onclickTab(this.activeTab()); }
    }.bind(this);

    this.onclickDropdown = function (name) {
      console.log('mc.Tabs.controller > onclickDropdown. name=', name, 'activeTab=', this.activeTab());
      this.isDropdownOpen = name === this.activeTab() ? !this.isDropdownOpen : true;
      this.activeTab(name);
      console.log(this.isDropdownOpen, this.activeTab());
    }.bind(this);
  },

  // ctrl: <props> activeTab(), isDropdownOpen <events> onclickTab, onclickDropDown
  // options.tab[]: <props> name, label, isActive, isDisabled, redirectTo, dropdown[], alignMenuRight
  view: function (ctrl, options) {
    console.log('\n.. in mc.Tabs.view. options=', options);
    var flavors = {
      tabs: '.nav.nav-tabs',
      pills: '.nav.nav-pills',
      'pills-stacked': '.nav.nav-pills.nav-stacked',
      nav: '.nav.navbar-nav',
      'nav-right': '.nav.navbar-nav.navbar-right'
    };

    return [
      m('ul' + (flavors[options.flavor] || flavors.tabs),
        (options.tabs || []).map(function (tab) {
          var tabsTabCtrl = mc.utils.extend({}, tab, ctrl, { isActive: ctrl.activeTab() === tab.name });
          return !tab.dropdown ? mc.TabsTab.view(tabsTabCtrl) : mc.TabsDropdown.view(tabsTabCtrl);
        })
      )
    ];
  }
};

mc.TabsTab = { //todo merge with Tabs?
  // ctrl: <props> name, label, isActive, isDisabled, redirectTo <events> onclickTab
  view: function (ctrl) {
    console.log('.. in mc.TabsTab.view. ctrl=', ctrl);
    var href = '',
      attr = {};

    if (!ctrl.isDisabled) {
      if (ctrl.redirectTo) {
        href = '[href="' + ctrl.redirectTo + '"]';
        attr = {config : m.route};
      } else {
        attr = {onclick : ctrl.onclickTab.bind(this, ctrl.name)};
      }
    }

    return m('li' + (ctrl.isActive ? '.active' : '') + (ctrl.isDisabled ? '.disabled' : ''),
      m('a' + href, attr, ctrl.label || ctrl.name || '')
    );
  }
};

mc.TabsDropdown = { //todo merge with Tabs?
  // ctrl: <props> name, label, isDropdownOpen, isActive, isDisabled, redirectTo, dropdown[] <events> onclickTab, onclickDropdown
  view: function (ctrl) {
    console.log('.. in mc.TabsDropdown. ctrl=', ctrl);
    return m('li.dropdown' + (ctrl.isDropdownOpen ? '.open' : '') + (ctrl.isActive ? '.active' : '') + (ctrl.isDisabled ? '.disabled' : ''), [
      m('a.dropdown-toggle', {onclick: ctrl.onclickDropdown.bind(self, ctrl.name)}, [
        m('span', (ctrl.label || ctrl.name || '') + ' '),
        m('span.caret')
      ]),
      ctrl.isDropdownOpen ?
        mc.Dropdown.viewMenu({ onclickTab: ctrl.onclickTab }, { dropdown: ctrl.dropdown }) :
        null
    ]);
  }
};

mc.Dropdown = {
  // options: <props> selectedTab(), isDropdownOpen
  controller: function (options) {
    console.log('\n.. in mc.Dropdown.controller. options=', options);
    options = options || {};
    this.selectedTab = mc.utils.coerceToMprop(options.selectedTab, '');
    this.isDropdownOpen = options.isDropdownOpen || false;

    this.onclickTab = function (name) {
      console.log('mc.Dropdown.controller > onclickTab. name=', name);
      this.isDropdownOpen = false;
      this.selectedTab(name);
    }.bind(this);

    this.onclickDropdown = function () {
      console.log('mc.Dropdown.controller > onclickDropdown');
      this.isDropdownOpen = !this.isDropdownOpen;
    }.bind(this);
  },

  // ctrl: <props> isDropDownOpen <events> onclickTab todo onClickDropdown
  // options: name, label, isDisabled, dropdown[]
  view: function (ctrl, options) {
    console.log('\n.. in mc.Dropdown.view. ctrl=', ctrl, 'options=', options);
    return m('.dropdown' + (ctrl.isDropdownOpen ? '.open' : '') + (ctrl.isDisabled ? '.disabled' : ''), [
      m('button.btn.btn-default.dropdown-toggle[type=button]', {onclick: ctrl.onclickDropdown.bind(self, ctrl.name)}, [
        m('span', (options.label || options.name || '') + ' '),
        m('span.caret')
      ]),
      ctrl.isDropdownOpen ? mc.Dropdown.viewMenu({ onclickTab: ctrl.onclickTab }, options) : null
    ]);
  },

  viewTriggerButton: function (ctrl, options) {},

  viewTriggerNav: function (ctrl, options) {},

  // ctrl {}: <events> onclickTab
  // options.dropdown[]: name, label, type, isDisabled, alignRight, redirectTo
  viewMenu: function (ctrl, options) { //todo extract separate?
    console.log('.. in mc.Dropdown.viewMenu. options=', options);
    return m('ul.dropdown-menu' + (options.alignRight ? '.dropdown-menu-right' : ''),
      options.dropdown.map(function (menuItem) {

        console.log(menuItem.type);
        switch (menuItem.type) {
          case 'divider':
            return m('li.divider', {style:{margin: '6px 0'}}, ''); // .divider=9px is not visible
          case 'header':
            return m('li.dropdown-header', {tabindex: '-1'}, menuItem.label || menuItem.name);
          default:
            var tabsTabCtrl = mc.utils.extend({}, menuItem, {
              isActive: false,
              onclickTab: ctrl.onclickTab
            });
            return mc.TabsTab.view(tabsTabCtrl);
        }
      })
    );
  }

};