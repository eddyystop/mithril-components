/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
	controller: function (tabSelector, action) {
		this.tabSelector = tabSelector || function () {
      console.log('controller this.Selector. return=', m.route.param('tab'))
			return m.route.param('tab');
		};
		this.action = action;
	},

	view: function (ctrl, tabs, selectors, attrs) {
		selectors = selectors || {};
		attrs = attrs || {};

		var tabSelector = ctrl.tabSelector,
			activeTab = (typeof tabSelector === 'function' ? tabSelector() : tabSelector) || Object.keys(tabs)[0];
		tabs = normalizeTabs(tabs);

		return [
			m('div' + (selectors._parent || ''), attrs._parent || {},
				m('ul', Object.keys(tabs).map(renderTab))
			),
			tabs[activeTab].view(tabs[activeTab].ctrl)
			];

		function renderTab (name) {
			var selected = activeTab === name,
				selector = (selected && selectors._activeAnchor ?
					selectors._activeAnchor : selectors._anchor) || '',
				attrParam = (selected && attrs._activeAnchor ?
					attrs._activeAnchor : attrs._anchor) || '',
				attr = mc.utils.extend({}, attrParam || {}, {
          href: '/' + name,
          config: !ctrl.action && m.route
        });

			if (ctrl.action) {
				attr.onclick = function (e) {
					if (e.ctrlKey || e.metaKey || e.which === 2) return;
					e.preventDefault();
					ctrl.action(e.currentTarget.getAttribute('href').substr(1), e);
				};
			}

			return m('li' + (selectors._item || ''), attrs._item || {},
				m('a' + selector, attr, tabs[name].label || '')
			);
		}

		function normalizeTabs(tabs) {
			var norm = {},
				lastCtrl = ctrl || {};

			Object.keys(tabs).forEach(function (key) { // depends on .keys() returning keys in order defined
				var tab = tabs[key];
				if (typeof tab === 'function') {
					norm[key] = {
						view: tab,
						ctrl: lastCtrl,
						label: key
					};
				} else {
					if (tab.ctrl) { lastCtrl = tab.ctrl; }
					norm[key] = {
						view: tab.view,
						ctrl: lastCtrl,
						label: tab.label || key
					};
				}
			});

			return norm;
		}
	}
};