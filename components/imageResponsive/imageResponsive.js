/*global m */

// ImageResponsive =============================================================
var mc = mc || {};

mc.ImageResponsive = {
  controller: function (sources, img) {
    console.log('ImageResponsive.controller');
    this.sources = sources || [];
    this.img = img || {};
  },

  view: function (ctrl, opts) {
    console.log('ImageResponsive.view. opts=', opts);
    opts = opts || {};
    opts.config = mc.ImageResponsive.config(ctrl);

    var children = ctrl.sources.map(function (source) {
      return m('source', { srcset: source.srcset || '', media: source.media || '' });
    });

    children.push(
      m('img', { srcset: ctrl.img.srcset || '', alt: ctrl.img.alt || '' })
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