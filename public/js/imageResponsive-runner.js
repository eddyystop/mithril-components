/*global m:false, $:false */

var sources = [
  { srcset: "images/extralarge.jpg", media: "(min-width: 1000px)" },
  { srcset: "images/large.jpg", media: "(min-width: 800px)" },
  { srcset: "images/medium.jpg" }
];

var img = {
  srcset: "images/medium.jpg",
  alt: "A giant stone face at The Bayon temple in Angkor Thom, Cambodia"
};

var app = {
  controller: function () {
    // options provided when component is instantiated
    this.image1 = new mc.ImageResponsive.controller(sources, img);
    // options will be provided when component is rendered
    this.image2 = new mc.ImageResponsive.controller();
  },

  view: function (ctrl) {
    return [
      m('div', mc.ImageResponsive.view(ctrl.image1)),
      m('div', mc.ImageResponsive.view(ctrl.image2, { sources: sources, img: img }))
    ];
  }
};

$(document).ready(function () {
  m.module(document.body, app);
});