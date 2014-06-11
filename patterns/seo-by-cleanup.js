/**
 * The server prefers to generate a HTML first-page representation for SEO
 * purposes, however Mithril does not reuse server-side generated DOM nodes.
 *
 * This brute force workaround explicitly removes any server-side generated HTML
 * so Mithril can render likely the same page.
 *
 * From @sanderhahn at https://github.com/lhorie/mithril.js/issues/60
 */

var app = {
  controller: function() {
    this.paragraph = 'Client rendered';
  },
  view: function(ctrl) {
    return m('p', ctrl.paragraph);
  }
};

setTimeout(function () {
  var mountAt = document.getElementById('insertion-point');
  removeChildren(mountAt);

  m.module(mountAt, app);
}, 2000);

// remove server generated nodes
function removeChildren (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}