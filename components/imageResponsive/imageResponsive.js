/*global m */

// ImageResponsive =============================================================
var mc = mc || {};

mc.ImageResponsive = {
  controller: function (sources, img) {
    this.sources = sources || [];
    this.img = img || {};
  },

  view: function (ctrl, optsParam) {
    var opts = Object.create(optsParam || {}); // don't change param
    opts.config = mc.ImageResponsive.config(ctrl);

    var sources = opts.sources || ctrl.sources,
      img = opts.img || ctrl.img;

    var children = sources.map(function (source) {
      return m('source', { srcset: source.srcset || '', media: source.media || '' });
    });

    children.push(
      m('img', { srcset: img.srcset || '', alt: img.alt || '' })
    );

    return m('picture' + (opts.selector || ''), opts.attrs || {}, children);
  },

  config: function () {
    return function () {

      // Fire pictureFill event handler (which has a resize throttle)
      var event = new CustomEvent('resize');
      document.dispatchEvent(event);
    };
  }
};