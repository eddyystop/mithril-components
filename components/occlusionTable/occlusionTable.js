/*global m:false */
var mc = mc || {};

mc.occlusionTable = {
  controller: function (table /*fcn|array*/, headerRows /*fcn|numb*/, pinnedCols /*fcn|numb*/) {
    var self = this;
    this.table = typeof table === 'function' ? table : m.prop(table);
    this.headerRows = typeof headerRows === 'function' ? headerRows : m.prop(headerRows || 0);
    this.pinnedCols = typeof pinnedCols === 'function' ? pinnedCols : m.prop(pinnedCols || 0);

    this.init = function () {
      this.isContainerSizeDone = this.isHeaderHeightComputed = this.isRowHeightComputed = this.isScrollHeightDone = false;
      this.headerHeight = this.rowHeight = 16; // any estimate will do as we force a redraw
      this.containerHeight = this.containerWidth = this.bottomScrollHeight = 0;
      this.scrollTop = this.scrollHeight = 0;
      this.colWidths = [];
    };
    this.init();

    //todo put these fcns into prototype

    this.getElSize = function (el) {
      var props = document.defaultView.getComputedStyle(el, '');
      return [parseFloat(props.getPropertyValue('height')), parseFloat(props.getPropertyValue('width'))];
    };

    this.setContainerSize = function (el) {
      self.isContainerSizeDone = true;
      var sizes = self.getElSize(el);
      self.containerHeight = sizes[0];
      self.containerWidth = sizes[1];
    };

    this.setHeaderHeight = function (el) {
      self.isHeaderHeightComputed = true;
      self.headerHeight = self.getElSize(el)[0];
      console.log('--headerHeight=', self.headerHeight);
    };

    this.setRowHeight = function (el) {
      self.isRowHeightComputed = true;
      self.rowHeight = self.getElSize(el)[0];
      console.log('--rowHeight=', self.rowHeight);
    };

    this.setScrollbarSizes = function (el) {
      self.isScrollHeightDone = true;
      self.bottomScrollHeight = el.offsetHeight - el.clientHeight;
      console.log('--bottomScrollHeight=', self.bottomScrollHeight);
      m.redraw(); // this fcn is last event handler to be called
    };

    this.onscroll = function (e) {
      self.scrollTop = e.target.scrollTop;
      self.scrollHeight = e.target.scrollHeight;
    };
  },

  view: function (ctrl, ifReInit /* alpha */, containerHeight /*numb px|null*/, containerWidth /*numb px|str css|null*/, selectors, attrs) {
    containerHeight = containerHeight || ctrl.containerHeight;
    containerWidth = containerWidth || ctrl.containerWidth;
    selectors = selectors || {};
    attrs = attrs || {};
    attrs._item = attrs._item || {};

    if (ifReInit) { ctrl.init(); }

    var headersHeight = ctrl.headerRows() * ctrl.headerHeight;
    var contentNumbRows = ctrl.table().length - ctrl.headerRows();
    var contentRowsHeight = contentNumbRows * ctrl.rowHeight;
    var contentHeight = headersHeight + contentRowsHeight;
    var containerRowsHeight = containerHeight - headersHeight - ctrl.bottomScrollHeight;
    var adjustedScrollTop = ctrl.scrollTop +
      (ctrl.scrollTop * 0.03 * ctrl.scrollTop / (ctrl.scrollHeight || 1)); // scrollTop near reaches scrollHeight
    //console.log('...contentNumbRows=', contentNumbRows, 'containerRowsHeight=', containerRowsHeight, 'scrollTop=', ctrl.scrollTop, 'adjustedScrollTop=', adjustedScrollTop);

    var startDataRow = (adjustedScrollTop / ctrl.rowHeight) | 0;
    var rows = containerRowsHeight / ctrl.rowHeight;
    //console.log ('startDataRow=', startDataRow, 'rows=', rows);

    if (startDataRow + (rows | 0) > contentNumbRows) {
      rows = rows | 0;
      startDataRow = contentNumbRows - rows + 1; // +1 prevents occluded last row
    } else {
      rows = (rows + 0.5) | 0;
    }
    //console.log ('startDataRow=', startDataRow, 'rows=', rows);

    // wrappers
    return m('div' + (selectors._wrapper || ''),
      mc.utils.extend({}, attrs._wrapper || {}, {
        onscroll: ctrl.onscroll,
        config: !ctrl.isContainerSizeDone ? ctrl.setContainerSize : null,
        style: {
          height: typeof containerHeight === 'number' ? containerHeight + 'px' : (containerHeight || null),
          width: typeof containerWidth === 'number' ? containerWidth + 'px' : (containerWidth || null),
          overflow: 'auto', position: 'relative', margin: 0, padding: 0
        }
      }),
      m('div', {
          style: {
            height: (contentHeight - ctrl.scrollTop) + 'px',
            top: ctrl.scrollTop + 'px', position: 'relative'}
        },
        renderTable()
      )
    );

    function renderTable () {
      var cols = ctrl.table()[0].length;
      if (ctrl.pinnedCols()) {

        attrs._parent.style = {height: containerHeight - headersHeight + 'px'};
        return m('div.mc-clipped-table-pinned', [
          m('div.pinned', {style:{height: containerHeight + 'px'}},
            m('table.pinned', attrs._parent || {},
              _tableRows(startDataRow, rows, 0, ctrl.pinnedCols()))
          ),
          m('div.scrollable',
            { config: !ctrl.isScrollHeightDone ? ctrl.setScrollbarSizes : null,
              style:{height: containerHeight + 'px'}
            },
            m('table.data' + (selectors._parent || ''), attrs._parent || {},
              _tableRows(startDataRow, rows, ctrl.pinnedCols(), cols))
          )
        ]);

      } else {

        return m('div.mc-clipped-table', { style:{height: containerHeight + 'px'}},
          m('div',
            { config: !ctrl.isScrollHeightDone ? ctrl.setScrollbarSizes : null,
              style:{height: containerHeight + 'px'}
            },
            m('table' + (selectors._parent || ''), attrs._parent || {},
              _tableRows(startDataRow, rows, 0, cols)
            )
          )
        );
      }
    }

    function _tableRows (startDataRow, rows, startCol, endCol) {
      //console.log('slicer', startDataRow + ctrl.headerRows(), startDataRow + ctrl.headerRows() + rows, ctrl.table().slice(startDataRow, startDataRow + rows).length);
      return m('tbody', [

          // header
          ctrl.table().slice(0, ctrl.headerRows()).map(function (row, i) {
            return m('tr' + (selectors._heading || ''),
              mc.utils.extend({}, attrs._heading, {
                config: !ctrl.isHeaderHeightComputed && i === 0 ? ctrl.setHeaderHeight : null
              }),
              row.slice(startCol, endCol).map(function (cell) {
                return m('th', cell + '');
              })
            );
          }),

          // rows
          ctrl.table().slice(startDataRow + ctrl.headerRows(), startDataRow + ctrl.headerRows() + rows).map(function (row, i) {

            var oddEven = i & 1 ? '_odd' : '_even', // jshint ignore:line
              selector = (selectors._tr || '') + (selectors[oddEven] || '') +
                (selectors[startDataRow + i - 1] || ''),
              attr = mc.utils.extend({}, attrs._tr, attrs[oddEven], attrs[startDataRow + i -1], {
                config: !ctrl.isRowHeightComputed && i === 0 ? ctrl.setRowHeight : null
              });

            return m('tr' + selector, attr,
              // render cells
              row.slice(startCol, endCol).map(function (cell) {
                return m('td', cell + '');
              })
            );
          })
        ]
      );
    }
  }
};