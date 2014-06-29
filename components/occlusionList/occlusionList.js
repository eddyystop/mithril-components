/*global m:false */
var mc = mc || {};

mc.occlusionList = {
  controller: function (items) {
    var self = this;
    this.items = items;
    this.isPxPerItemComputed = false;
    this.pxPerItem = 16; // any estimate will do as we force a redraw
    this.contentsHeight = this.items.length * this.pxPerItem;
    this.scrollTop = 0;
    this.scrollHeight = 0;

    //todo put these fcns into prototype

    this.getElSize = function (el) {
      var props = document.defaultView.getComputedStyle(el, '');
      return [parseFloat(props.getPropertyValue('height')), parseFloat(props.getPropertyValue('width'))];
    };

    this.setPxPerItem = function (el) {
      var height = self.getElSize(el)[0];
      console.log(el)
      console.log('height=', height)
      if (height) {
        self.isPxPerItemComputed = true;
        self.pxPerItem = height;
        self.contentsHeight = self.items.length * self.pxPerItem;
        m.redraw();
      }
    };

    this.onscroll = function (e) {
      self.scrollTop = e.target.scrollTop;
      self.scrollHeight = e.target.scrollHeight;
    };
  },

  view: function (ctrl, containerHeight, containerWidth, selectors, attrs) {
    selectors = selectors || {};
    attrs = attrs || {};
    attrs._item = attrs._item || {};

    var begin = ctrl.scrollTop / ctrl.pxPerItem  | 0, // floor, integer
      lines = containerHeight / ctrl.pxPerItem + 0.9 | 0;

    // wrappers
    return m('div' + (selectors._wrapper || ''),
      mc.utils.extend({}, attrs._wrapper || {}, {
        onscroll: ctrl.onscroll,
        style: {
          height: containerHeight + 'px',
          width: typeof containerWidth === 'number' ? containerWidth + 'px' : (containerWidth || null),
          overflow: 'auto', position: 'relative', margin: 0, padding: 0
        }
      }),
      m('div', {
          style: {
            height: (ctrl.contentsHeight - ctrl.scrollTop) + 'px',
            top: ctrl.scrollTop + 'px', position: 'relative'}
        },

        // list
        m('ul' + (selectors._parent || ''), attrs._parent || {},
          ctrl.items.slice(begin, begin + lines).map(function (item, i) {
            return m('li' + (selectors._item || ''),
              mc.utils.extend({}, attrs._items, {
                config: !ctrl.isPxPerItemComputed && i === 0 ? ctrl.setPxPerItem : null
              }),
              item);
          })
        )
      )
    );
  }
};