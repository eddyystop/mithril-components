/*global m:false */
var mc = mc || {};

mc.occlusionContainer = {
  controller: function (options) {
    this.contentsController = options.contentsController();
    this.contentsView = options.contentsView;

    var oc = this.contentsController.occlusion;
    if (!oc || !oc.contentsHeight) { throw new Error('occlusionContainer\'s subcomponent controller must define this.occlusion.contentsHeight'); }
    oc.containerHeight = options.containerHeight;
    oc.containerWidth = options.containerWidth;
    oc.scrollTop = 0;
    oc.scrollHeight = 0;

    this.onscroll = function (e) {
      oc.scrollTop = e.target.scrollTop;
      oc.scrollHeight = e.target.scrollHeight;
    };
  },

  view: function (ctrl) {
    var oc = ctrl.contentsController.occlusion;

    return m('div',
      {   onscroll: ctrl.onscroll,
        style: {
          height: oc.containerHeight + 'px',
          width: typeof oc.containerWidth === 'number' ? oc.containerWidth + 'px' : (oc.containerWidth || null),
          overflow: 'auto', position: 'relative', margin: 0, padding: 0
        }
      },
      m('div', {style: {
          height: (oc.contentsHeight - oc.scrollTop) + 'px',
          top: oc.scrollTop + 'px', position: 'relative'}
        },
        ctrl.contentsView(ctrl.contentsController)
      )
    );
  }
};