/*global m:false */
var mc = mc || {};

mc.occlusionTable = {
  controller: function (table /*fcn*/, headerRows /*fcn|numb*/) {
    var self = this;
    this.table = table;
    this.headerRows = headerRows ? headerRows : m.prop(0);
    this.isPxPerHeaderComputed = false;
    this.isPxPerItemComputed = false;
    this.pxPerHeader = 16;
    this.pxPerItem = 16;
    this.contentsHeight = function () {
      return ((this.table().length - this.headerRows()) * this.pxPerItem) +
        (this.headerRows() * this.pxPerHeader);  // any estimate will do as we force a redraw
    };
    this.scrollTop = 0;
    this.scrollHeight = 0;

    this.setPxPerHeader = function (el) {
      console.log('calc header');
      var sizes = mc.utils.getComputedSize(el);
      if (sizes.pxPerItem) {
        self.isPxPerHeaderComputed = true;
        self.pxPerHeader = sizes.pxPerItem;
      }
    };

    this.setPxPerItem = function (el) {
      console.log('calc item');
      var sizes = mc.utils.getComputedSize(el);
      if (sizes.pxPerItem) {
        self.isPxPerItemComputed = true;
        self.pxPerItem = sizes.pxPerItem;
        m.redraw();
      }
    };

    this.onscroll = function (e) {
      self.scrollTop = e.target.scrollTop;
      self.scrollHeight = e.target.scrollHeight;
    };
  },

  view: function (ctrl, containerHeight /*fcn*/, containerWidth /*fcn*/, selectors, attrs) {
    selectors = selectors || {};
    attrs = attrs || {};
    attrs._item = attrs._item || {};

    var begin = Math.max( ctrl.scrollTop / ctrl.pxPerItem  | 0, ctrl.headerRows() ),
      lines = ((containerHeight()- ctrl.headerRows() * ctrl.pxPerHeader) / ctrl.pxPerItem + 0.9 | 0) - ctrl.headerRows();
    console.log('begin=', begin, 'lines=', lines);

    // wrappers
    return m('div' + (selectors._wrapper || ''),
      mc.utils.extend({}, attrs._wrapper || {}, {
        onscroll: ctrl.onscroll,
        style: {
          height: containerHeight() + 'px',
          width: typeof containerWidth() === 'number' ? containerWidth() + 'px' : (containerWidth() || null),
          overflow: 'auto', position: 'relative', margin: 0, padding: 0
        }
      }),
      m('div', {
          style: {
            height: (ctrl.contentsHeight() - ctrl.scrollTop) + 'px',
            top: ctrl.scrollTop + 'px', position: 'relative'}
        },

        // table
        m('table' + (selectors._parent || ''), attrs._parent || {},
          _tableRows(begin, lines)
        )
      )
    );

    function _tableRows (begin, lines) {
      return m('tbody', [

          // header
          ctrl.table().slice(0, ctrl.headerRows()).map(function (row, i) {
            return m('tr' + (selectors._heading || ''),
              mc.utils.extend({}, attrs._heading, {
                config: !ctrl.isPxPerHeaderComputed && i === 0 ? ctrl.setPxPerHeader : null
              }),
              row.map(function (cell) {
                return m('th', cell + '');
              })
            );
          }),

          // rows
          ctrl.table().slice(begin, begin + lines).map(function (row, i) {

            var oddEven = i & 1 ? '_odd' : '_even', // jshint ignore:line
              selector = (selectors._tr || '') + (selectors[oddEven] || '') +
                (selectors[i] || ''),
              attr = mc.utils.extend({}, attrs._tr, attrs[oddEven], attrs[i], {
                config: !ctrl.isPxPerItemComputed && i === 0 ? ctrl.setPxPerItem : null
              });

            return m('tr' + selector, attr,
              // render cells
              row.map(function (cell) {
                return m('td', cell + ''); // Mithril only supports strings
              })
            );
          })
        ]
      );
    }
  }
};