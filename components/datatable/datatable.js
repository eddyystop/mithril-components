/*global m:false */
var mc = mc || {};

mc.Datatable = {
	controller: function (cols, config) {
		this.cols = cols;
		
		
		if (config.url) {
			this.data = m.request({
				url: config.url,
				method: 'GET'
			});
		}
		if (config.data) {
			this.data = m.prop(config.data);
		}
		
		this.onclick = function (e) {
			var target = e.target;
			if (target.nodeName != 'I') return;
			var key = target.parentNode.getAttribute('data-colkey'),
				col = this.activeCols[key];
			if (this.lastSorted && this.lastSorted != key) {
				this.activeCols[this.lastSorted]._sorted = 'none';
			}
			var reverse = (col._sorted == 'asc'?-1:1);
			this.data(this.data().sort(function (a, b) {
				a = a[key];b=b[key];
				return (a == b?0:(a < b ? -1:1)*reverse);
			}));
			col._sorted = (reverse > 0?'asc':'desc');
			this.lastSorted = key;
		}.bind(this);

	},
	view: function (ctrl, options) {
		var cols = ctrl.cols;
		
		options = options || {};
		options.classNames = options.classNames || {};
		
		return m('div', [
			m(
				'table',
				{
					class: options.classNames.table || 'datatable',
					onclick: ctrl.onclick
				},
				[
					this.headView(ctrl, cols, options),
					this.bodyView(ctrl, cols, options, ctrl.data()),
					this.captionView(ctrl, options)
				]
			)
				
		]);
	},
	headView: function (ctrl, cols, options) {
		var matrix = [], rowNum = 0, dataRow = [];
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
		dataRow.forEach(function(col) {
			activeCols[col.key] = col;
		});
		ctrl.activeCols = activeCols;
			
		var buildRow = function (row, rowNum) {
			var buildHeaderCell = function (col) {
				var attrs = {};
				if (col._colspan && col._colspan > 1) attrs.colspan = col._colspan;
				if (!col._depth) {
					attrs['data-colKey'] = col.key;
					if (rowNum < maxDepth) attrs.rowspan = maxDepth - rowNum + 1;
				}
				
				return m(
					'th',
					attrs, [
						(!col._depth && col.sortable ? m(
							'i.fa',
							{
								class: {asc:'fa-sort-asc',desc:'fa-sort-desc',none:'fa-sort'}[col._sorted || 'none']
							}
						) : ''),
						' ',
						col.label || col.key
					]
				);
			};
			
			return m(
				'tr',
				row.map(buildHeaderCell)
			);
		};
		return m('thead', matrix.map(buildRow));
	},
	bodyView: function (ctrl, cols, options, data) {
			
		var buildRow = function (row, index) {
			var buildCell = function (cell) {
				return m(
					'td',
					row[cell.field || cell.key]
				);
			};
			return m(
				'tr',
				{
					class: (index & 1? options.classNames.odd || 'odd':options.classNames.even || 'even')
				},
				ctrl.dataRow.map(buildCell)
			);
		};
		return m('tbody', data.map(buildRow));
	},
	captionView: function (ctrl, options) {
		if (options.caption) return m('caption',options.caption);
	},
};