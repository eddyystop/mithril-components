/*global m:false */

// ImageResponsive =============================================================
var mc = mc || {};

mc.ImageResponsive = {
  controller: function (sources, img) {
    this.sources = sources || [];
    this.img = img || {};
  },

  view: function (ctrl, overrides) {
    var sources = overrides.sources || ctrl.sources,
      img = overrides.img || ctrl.img;

    var children = sources.map(function (source) {
      return m('source', { srcset: source.srcset || '', media: source.media || '' });
    });
    children.push( m('img', { srcset: img.srcset || '', alt: img.alt || '' }) );

    return m('picture', children);
  }
};