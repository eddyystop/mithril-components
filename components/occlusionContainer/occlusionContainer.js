/*global m:false */
var mc = mc || {};

mc.occlusionContainer = {
  controller: function (contentsController) {
    this.contentsController = contentsController();

    var oc = this.contentsController.occlusion;
    if (!oc || !oc.contentsHeight) { throw new Error('occlusionContainer\'s subcomponent controller must define this.occlusion.contentsHeight'); }
    oc.getComputedSize = getComputedSize;
    oc.scrollTop = 0;
    oc.scrollHeight = 0;

    this.onscroll = function (e) {
      oc.scrollTop = e.target.scrollTop;
      oc.scrollHeight = e.target.scrollHeight;
    };

    function getComputedSize (el) {
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
    }
  },

  view: function (ctrl, containerHeight, containerWidth, contentsView) {
    var oc = ctrl.contentsController.occlusion;

    return m('div',{
        onscroll: ctrl.onscroll,
        style: {
          height: containerHeight + 'px',
          width: typeof containerWidth === 'number' ? containerWidth + 'px' : (containerWidth || null),
          overflow: 'auto', position: 'relative', margin: 0, padding: 0
        }
      },
      m('div', {
          style: {
            height: (oc.contentsHeight - oc.scrollTop) + 'px',
            top: oc.scrollTop + 'px', position: 'relative'}
        },
        contentsView(ctrl.contentsController, containerHeight, containerWidth)
      )
    );
  }
};