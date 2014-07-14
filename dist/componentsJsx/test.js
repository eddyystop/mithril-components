/** @jsx m */
var msx = msx || {};

msx.test = {
  controller: function () {},

  view: function (ctrl) {
    return [ // -----
      m("html", [
m("body", [
m("div", [
  "Hello",
  m('p', 'Just throwing in some Mithril here')
]),
m("div", [
  m("p", ["This is always here"]),
  qq ? m('', '') : '',
  m("p", ["This is sometimes here"])
])
])
])
    ]; // -----
  }
};