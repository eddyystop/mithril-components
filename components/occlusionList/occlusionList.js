/*global m:false */
var mc = mc || {};

mc.occlusionList = {
  controller: function (data) {
    this.component = new mc.occlusionContainer.controller(function () {
        return new mc.occlusionListSub.controller(data);
    });
  },
  view: function (ctrl, containerHeight, containerWidth, selectors, attrs) {
    return mc.occlusionContainer.view(ctrl.component, containerHeight, containerWidth, function (ctrl) {
      return mc.occlusionListSub.view(ctrl, containerHeight, containerWidth, selectors, attrs);
    });
  }
};

mc.occlusionListSub = {
  controller: function (items) {
    var self = this;
    this.items = items;
    this.isPxPerItemComputed = false;
    this.pxPerItem = 5; // any estimate will do as we force a redraw

    this.occlusion = {};
    this.occlusion.contentsHeight = this.items.length * this.pxPerItem;

    this.setPxPerItem = function (el) {
      var sizes = self.occlusion.getComputedSize(el);
      if (sizes.pxPerItem) {
        self.isPxPerItemComputed = true;
        self.pxPerItem = sizes.pxPerItem;
        self.occlusion.contentsHeight = self.items.length * self.pxPerItem;
      }
      m.redraw();
    };
  },

  view: function (ctrl, containerHeight, containerWidth, selectors, attrs) {
    console.log('sub.view attrs=', attrs);
    selectors = selectors || {};
    attrs = attrs || {};

    var begin = ctrl.occlusion.scrollTop / ctrl.pxPerItem  | 0, // floor, integer
      lines = containerHeight / ctrl.pxPerItem + 0.9 | 0;

    return m('ul' + (selectors._parent || ''), attrs._parent || {},
      ctrl.items.slice(begin, begin + lines).map(function (item, i) {
        attrs._item = attrs._item || {};
        attrs._item.config = !ctrl.isPxPerItemComputed && i === 0 ? ctrl.setPxPerItem : null;
        console.log(attrs);
        return m('li' + (selectors._item || ''), attrs._item || {},
          item);
      })
    );
  }
};