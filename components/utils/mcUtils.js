/*global m:false */
var mc = mc || {};
mc.utils = mc.utils || {};

mc.utils.extend = function extend (to /* arguments */) {
  Array.prototype.slice.call(arguments, 1).forEach(function (obj) {
    if (typeof obj === 'object') {
      Object.keys(obj).forEach(function (key) { to[key] = obj[key]; });
    }
  });
  return to;
};

mc.utils.getComputedSize = function getComputedSize (el) {
  var r = {}, props, len;

  if (document.all) { // old IE
    // this is not tested for IE
    props = el.currentStyle;
    r.height = props.height;
    len = r.height.length;
    if (r.height.substr(len - 2) === 'px') { r.heightPx = parseInt(r.height.substr(0, len - 2), 10); }
    r.paddingTop = parseInt(props.paddingTop, 10);
    r.paddingBottom = parseInt(props.paddingBottom, 10);
    r.marginTop = parseInt(props.marginTop, 10);
    r.marginBottom = parseInt(props.marginBottom, 10);

  } else { // modern
    props = document.defaultView.getComputedStyle(el, '');
    r.height = props.getPropertyValue('height');
    len = r.height.length;
    if (r.height.substr(len - 2) === 'px') { r.heightPx = parseInt(r.height.substr(0, len - 2), 10); }
    r.paddingTop = parseInt(props.getPropertyValue('padding-top'), 10);
    r.paddingBottom = parseInt(props.getPropertyValue('padding-bottom'), 10);
    r.marginTop = parseInt(props.getPropertyValue('margin-top'), 10);
    r.marginBottom = parseInt(props.getPropertyValue('margin-bottom'), 10);
  }

  // bottom & top margins collapse together
  r.pxPerItem = r.heightPx + r.paddingTop + r.paddingBottom + Math.max(r.marginTop, r.marginBottom);
  return r;
};