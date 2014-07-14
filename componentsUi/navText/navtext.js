/*global m:false */

// NavText =====================================================================

mc.NavText = {
  controller: function () {},

  // options: <props> label, href, linkLabel
  view: function (ctrl, options) {
    var flavors = {
      nav: '.navbar-text',
      'nav-right': '.navbar-text.navbar-right'
    };

    return m('p' + (flavors[options.flavor] || flavors.nav), [
        m('span', options.label || ''),
        options.href ? m('a.navbar-link', ' ' + (options.linkLabel || '')) : null
      ]
    );
  }
};