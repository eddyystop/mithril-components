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

  // options: <props> brandLabel, brandUrl, alignRight
  view: function (ctrl, options) {
    var flavors = {
      default: '.navbar.navbar-default',
      'fixed-top': '.navbar.navbar-default.navbar-fixed-top', // needs style: body { padding-top: 70px }
      'fixed-bottom': '.navbar.navbar-default.navbar-fixed-bottom', // needs style: body { padding-bottom: 70px }
      'static-top': '.navbar.navbar-default.navbar-static-top',
      inverse: '.navbar.navbar-default.navbar-inverse',
      'fixed-top-inverse': '.navbar.navbar-default.navbar-fixed-top.navbar-inverse', // needs style: body { padding-top: 70px }
      'fixed-bottom-inverse': '.navbar.navbar-default.navbar-fixed-bottom.navbar-inverse', // needs style: body { padding-bottom: 70px }
      'static-top-inverse': '.navbar.navbar-default.navbar-static-top.navbar-inverse'
      };

    return m('nav' + (flavors[options.flavor] || flavors.default), [
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
          options.viewContents()
        )
      ])
    ]);
  }
};
