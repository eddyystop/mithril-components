mc.NavResponsive = {
  controller: function (options) {
    console.log('\n.. in mc.NavResponsive.controller. options=', options);
    options = options || {};
    //this.activeTab = mc.utils.coerceToMprop(options.activeTab, '');
    this.isCollapsedOpen = false;

    this.onclickNavOpen = function () {
      this.isCollapsedOpen = !this.isCollapsedOpen;
    }.bind(this);

    this.activeTab = m.prop('finance');
    this.tabsCtrl = new mc.Tabs.controller({
      activeTab: this.activeTab
    });
  },

  // options: <props> brandLabel, brandUrl
  view: function (ctrl, options) {
    var tabOptions = {
      flavor: 'navbar',
      tabs: [
        { name: 'finance', label: 'Financials' },
        { name: 'foo', label: 'Disabled', isDisabled: true },
        { name: 'staff', label: 'Personnel' },
        { name: 'dropdown', label: 'Dropdown', dropdown: [
          {label: 'Primary actions', type: 'header' },
          {name: 'action1', label: 'Action'},
          {name: 'action2', label: 'Another action', isDisabled: true },
          {type: 'divider' },
          {label: 'Secondary actions', type: 'header' },
          {name: 'action9', label: 'Separated action' },
          {label: 'Exit bar', redirectTo: '/bar'}
        ]},
        { name: 'exit', label: 'Exit /foo', redirectTo:  '/foo' },
        { name: 'exit2', label: 'Exit /bar', redirectTo:  '/bar', isDisabled: true }
      ]
    };

    return m('nav.navbar navbar-default', [
      m('.container-fluid', [

        // Brand name & collapsed nav toggle
        m('.navbar-header', [
          m('button[type=button].navbar-toggle', {onclick: ctrl.onclickNavOpen}, [
            m('span.sr-only', 'Toggle navigation'),
            m('span.icon-bar', ''),
            m('span.icon-bar', ''),
            m('span.icon-bar', '')
          ]),
          m('a.navbar-brand', {href: options.brandUrl}, options.brandLabel)
        ]),

        // navbar contents
        m('.collapse.navbar-collapse' + (ctrl.isCollapsedOpen ? '.in' : ''),
          mc.Tabs.view(ctrl.tabsCtrl, tabOptions)
        )
      ])
    ]);
  }
};
