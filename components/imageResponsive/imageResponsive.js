/*global m:false */

// ImageResponsive =============================================================
var mc = mc || {};

mc.ImageResponsive = {
  controller: function () { },

  view: function (ctrl, options) {
    var sources = options.sources || {},
      img = options.img || {};

    var children = sources.map(function (source) {
      return m('source', { srcset: source.srcset || '', media: source.media || '' });
    });
    children.push( m('img', { srcset: img.srcset || '', alt: img.alt || '' }) );

    return m('picture', children);
  }
};