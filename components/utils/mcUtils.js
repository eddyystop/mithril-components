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

/*
mc.utils.getComputedHeight = function getComputedHeight (el) {
  var r = {}, props, len;

  if (document.all) { // old IE
    // this is not tested for IE
    props = el.currentStyle;
    r.height = parseFloat(props.height);
    r.paddingTop = parseFloat(props.paddingTop);
    r.paddingBottom = parseFloat(props.paddingBottom);
    r.marginTop = parseFloat(props.marginTop);
    r.marginBottom = parseFloat(props.marginBottom);

  } else { // modern
    props = document.defaultView.getComputedStyle(el, '');
    r.height = parseFloat(props.getPropertyValue('height'));
    r.paddingTop = parseFloat(props.getPropertyValue('padding-top'));
    r.paddingBottom = parseFloat(props.getPropertyValue('padding-bottom'));
    r.marginTop = parseFloat(props.getPropertyValue('margin-top'));
    r.marginBottom = parseFloat(props.getPropertyValue('margin-bottom'));
  }

  // bottom & top margins collapse together
  r.pxHeight = r.height + r.paddingTop + r.paddingBottom + Math.max(r.marginTop, r.marginBottom);
  //console.log('----getComputedHeight=', r.pxHeight, r.height, r.paddingTop, r.paddingBottom, r.marginTop, r.marginBottom);
  return r;
};

mc.utils.getComputedWidth = function getComputedWidth(el) {
  var r = {}, props, len;

  if (document.all) { // old IE
    // this is not tested for IE
    props = el.currentStyle;
    r.width = parseFloat(props.height);
    r.paddingLeft = parseFloat(props.paddingLeft);
    r.paddingRight = parseFloat(props.paddingRight);
    r.marginLeft = parseFloat(props.marginLeft);
    r.marginRight = parseFloat(props.marginRight);

  } else { // modern
    props = document.defaultView.getComputedStyle(el, '');
    r.width = parseFloat(props.getPropertyValue('width'));
    r.paddingLeft = parseFloat(props.getPropertyValue('padding-left'));
    r.paddingRight = parseFloat(props.getPropertyValue('padding-right'));
    r.marginLeft = parseFloat(props.getPropertyValue('margin-left'));
    r.marginRight = parseFloat(props.getPropertyValue('margin-right'));
  }

  // left & right margins collapse together
  r.pxWidth = r.width + r.paddingLeft + r.paddingRight + Math.max(r.marginLeft, r.marginRight);
  return r;
};
*/