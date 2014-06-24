/*global m:false */

// Select ======================================================================
var mc = mc || {};

mc.Tabs = {
	controller: function (tabSelector, action) {
		this.tabSelector = tabSelector || function () {
			return m.route.param('tab');
		};
		this.action = action;
	},

	view: function (ctrl, tabs, selectors, attrs) {
		selectors = selectors || {};
		attrs = attrs || {};

		var tabSelector = ctrl.tabSelector,
			activeTab = (typeof tabSelector == 'function' ? tabSelector() : tabSelector) || Object.keys(tabs)[0];
		tabs = normalizeTabs(tabs, ctrl);

		return [
			m('div' + (selectors._parent || ''), attrs._parent || {},
				m('ul', Object.keys(tabs).map(tab))
			),
			tabs[activeTab].view(tabs[activeTab].ctrl)
			];

		function tab(name) {
			var selected = activeTab === name,
				selector = (selected && selectors._activeAnchor ?
					selectors._activeAnchor : selectors._anchor) || '',
				attrParam = (selected && attrs._activeAnchor ?
					attrs._activeAnchor : attrs._anchor) || '',
				attr = {};

			if (attrParam) {
				merge(attr, attrParam);
			}
			merge(attr, {
				href: '/' + name,
				config: !ctrl.action && m.route
			});

			if (ctrl.action) {
				attr.onclick = function (e) {
					if (e.ctrlKey || e.metaKey || e.which == 2) return;
					e.preventDefault();
					ctrl.action(e.currentTarget.getAttribute('href').substr(1), e);
				};
			}

			return m('li' + (selectors._item || ''), attrs._item || {},
				m('a' + selector, attr, tabs[name].label || '')
			);
		}

		function normalizeTabs(tabs, ctrl) {
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
					if (tab.ctrl) {
						lastCtrl = tab.ctrl;
					}
					norm[key] = {
						view: tab.view,
						ctrl: lastCtrl,
						label: tab.label || key
					};
				}
			});

			return norm;
		}


		function merge(to, from) {
			for (var key in from) {
				to[key] = from[key];
			}
		}
	}
};