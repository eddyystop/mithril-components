/* global $ */

var app = {
  controller: function () {

    var sources = [
      { srcset: "images/extralarge.jpg", media: "(min-width: 1000px)" },
      { srcset: "images/large.jpg", media: "(min-width: 800px)" },
      { srcset: "images/medium.jpg" }
    ];

    var img = { srcset: "examples/images/medium.jpg",
      alt: "A giant stone face at The Bayon temple in Angkor Thom, Cambodia" };

    this.image = new mc.ImageResponsive.controller(sources, img);
  },

  view: function (ctrl) {
    return m('div', mc.ImageResponsive.view(ctrl.image));
  }
};

$(document).ready(function () {
  m.module(document.body, app);
});