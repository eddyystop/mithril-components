/*global m:false */
var mc = mc || {};

mc.Datatable = {
	controller: function (cols, config) {
		this.cols = cols;
		this.config = config = config || {};


		if (config.url) {
			this.data = m.request({
				url: config.url,
				method: 'GET'
			});
		}
		if (config.data) {
			this.data = (typeof config.data == 'function' ? config.data : m.prop(config.data));
		}

		this.sort = function (target) {
			var key = target.parentNode.getAttribute('data-colkey'),
				col = this.activeCols[key];
			if (this.lastSorted && this.lastSorted != key) {
				this.activeCols[this.lastSorted]._sorted = 'none';
			}
			var reverse = (col._sorted == 'asc' ? -1 : 1);
			this.data(this.data().sort(function (a, b) {
				a = a[key];
				b = b[key];
				return (a == b ? 0 : (a < b ? -1 : 1) * reverse);
			}));
			col._sorted = (reverse > 0 ? 'asc' : 'desc');
			this.lastSorted = key;
			m.render(this._tableEl, mc.Datatable.contentsView(this));
		};

		this.onCellClick = function (target) {
			while (target.nodeName != 'TD' && target.nodeName != 'TABLE') target = target.parentNode;
			if (target.nodeName == 'TABLE') return;
			
			var colIndex = target.cellIndex,
				col = this.dataRow[colIndex],
				rowIndex = target.parentNode.sectionRowIndex,
				row = this.data()[rowIndex];
			
			m.startComputation();
			var ret = this.config.onCellClick.call(this, row[col.key], row, col);
			m.endComputation();
			return ret;
		};

		this.onclick = function (e) {
			var target = e.target;
			if (target.nodeName == 'I' && /\bfa\-sort/.test(target.className)) return this.sort(target);
			if (typeof this.config.onCellClick == 'function') {
				return this.onCellClick(target);
			}
		}.bind(this);

		this.setWidth = function (attrs, width) {
			if (!width) return;
			if (/^\d+$/.test(width)) width += 'px';
			if (!attrs.style) attrs.style = '';
			if (width) attrs.style += 'width:' + width + ';';
		};
	},
	view: function (ctrl, options) {
		var cols = ctrl.cols;
		ctrl.viewOptions = options;

		if (!ctrl.data()) {
			return m('div', 'Sorry, no data to display');
		}
		options = options || {};
		options.classNames = options.classNames || {};

		var attrs = {
			class: options.classNames.table || 'datatable',
			// onclick: ctrl.onclick
			config: function (el, isOld) {
				if (isOld) return;
				el.addEventListener('click', ctrl.onclick);
				ctrl._tableEl = el;
				m.render(el,  mc.Datatable.contentsView(ctrl));
			}

		};

		ctrl.setWidth(attrs, options.width);

		return m(
			'table',
			attrs
		);
	
		 
	},
	contentsView: function (ctrl) {
		var cols = ctrl.cols,
			options = ctrl.viewOptions;
		return [
			this.headView(ctrl, cols, options),
			this.bodyView(ctrl, cols, options, ctrl.data()),
			this.captionView(ctrl, options)
		];
	},
	headView: function (ctrl, cols, options) {
		var matrix = [],
			rowNum = 0,
			dataRow = [];
		var calcDepth = function (maxDepth, col) {
			var depth = 0;
			if (!matrix[rowNum]) {
				matrix[rowNum] = [];
			}
			matrix[rowNum].push(col);
			if (col.children) {
				col._colspan = col.children.length;
				rowNum++;
				depth = col.children.reduce(calcDepth, 0) + 1;
				rowNum--;
				depth = Math.max(maxDepth, depth);
			} else {
				dataRow.push(col);
			}
			col._depth = depth;
			return depth;
		};



		var maxDepth = cols.reduce(calcDepth, 0);
		ctrl.dataRow = dataRow;
		var activeCols = {};
		dataRow.forEach(function (col) {
			activeCols[col.key] = col;
		});
		ctrl.activeCols = activeCols;

		var buildHeaderRow = function (row, rowNum) {
			var buildHeaderCell = function (col) {
				var attrs = {};
				if (col._colspan && col._colspan > 1) attrs.colspan = col._colspan;
				if (col.class) attrs.class = col.class; 
				if (!col._depth) {
					attrs['data-colKey'] = col.key;
					ctrl.setWidth(attrs, col.width);
					if (rowNum < maxDepth) attrs.rowspan = maxDepth - rowNum + 1;
					if (col._sorted && col._sorted != 'none') attrs.class = options.classNames.sorted || 'sorted';
				}

				return m(
					'th',
					attrs, [
						(!col._depth && col.sortable ? m(
							'i.fa', {
								class: {
									asc: 'fa-sort-asc',
									desc: 'fa-sort-desc',
									none: 'fa-sort'
								}[col._sorted || 'none']
							}
						) : ''),
						m.trust(' '),
						col.label || col.key
					]
				);
			};

			return m(
				'tr',
				row.map(buildHeaderCell)
			);
		};
		return m('thead', matrix.map(buildHeaderRow));
	},


	bodyView: function (ctrl, cols, options, data) {

		var buildDataRow = function (row, rowIndex) {
			var buildDataCell = function (col) {
				var value = row[col.field || col.key],
					attrs = {};

				if (typeof col.formatter == 'function') {
					value = col.formatter.call(ctrl, value, row, col, attrs);
				}
				if (!attrs.class) attrs.class = '';
				if (col._sorted && col._sorted != 'none') attrs.class += ' ' + (options.classNames.sorted || 'sorted');
				if (col.class) attrs.class += ' ' + col.class;

				if (!attrs.class) delete attrs.class;
				return m(
					'td',
					attrs,
					value
				);
			};
			var recordId = ctrl.config.recordId
			return m(
				'tr', {
					'data-record-id': (recordId ? row[recordId] : rowIndex),
					class: (rowIndex & 1 ? options.classNames.odd || 'odd' : options.classNames.even || 'even')
				},
				ctrl.dataRow.map(buildDataCell)
			);
		};
		return m('tbody', data.map(buildDataRow));
	},
	captionView: function (ctrl, options) {
		if (options.caption) return m('caption', options.caption);
	},
};