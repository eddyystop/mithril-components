/* jshint browser:true */
/* global m:false,mc:false */

var app = {
	name: m.prop('John'),
	dept: m.prop('dev'),
	list: m.prop([
		{
			"author": "Albert Camus",
			"quote": "Those who lack the courage will always find a philosophy to justify it."
    },
		{
			"author": "Plato",
			"quote": "You can discover more about a person in an hour of play than in a year of conversation."
    },
		{
			"author": "Ludwig Wittgenstein",
			"quote": "If people never did silly things nothing intelligent would ever get done."
    }
  ]),

	controller: function () {

		this.name = m.prop(app.name());
		this.dept = m.prop(app.dept());
		this.list = m.prop(app.list());

		this.tabsCtrl = new mc.Tabs.controller();
		
		this.activeTab = m.prop('settings');
		this.tabsCtrl1 = new mc.Tabs.controller(this.activeTab, this.activeTab);
		
		var t = 0, self = this;
		setInterval(function () {
			m.startComputation();
			t = (t + 1) % 3;
			self.activeTab(['list','settings','about'][t]);
			m.endComputation();
		}, 2000);
	},

	view: function (ctrl) {
		var tabs = {
			list: {
				view: app.listView,
				ctrl: this,
				label: 'theList'
			},
			settings: {
				view: app.settingsView
			},
			about: app.aboutView
		};

		var selectors = {
			_parent: '.tabs',
			_activeAnchor: '.selected'
		};
		return [
			mc.Tabs.view(ctrl.tabsCtrl, tabs, selectors),
			mc.Tabs.view(ctrl.tabsCtrl1, tabs, selectors)
		];
	},

	listView: function (ctrl) {
		return m('ul.itemlist',
			ctrl.list().map(function (item) {
				return m("li", item.quote + ' - ' + item.author);
			})
		);
	},
	settingsView: function (ctrl) {
		return m('form', [ // <form> is optional
      m('div', 'name (4 to 10 chars)'),
      m('input', {
				value: ctrl.name(),
				onchange: m.withAttr('value', app.name)
			}),
      m('div', 'department'),
      m('input', {
				value: ctrl.dept(),
				onchange: m.withAttr('value', app.dept)
			})
    ]);
	},
	aboutView: function (ctrl) {
		return m(
			".about", [
        "Add a quote in JSON",
        m("hr"),
        m("textarea", {
						rows: 10,
						cols: 80,
						onchange: function () {
							app.list(JSON.parse(this.value));
						}
					},
					JSON.stringify(ctrl.list())
        ),
        m('p', 'If you go to the [list] tab, you will see the changes at once.')
      ]
		);
	}
};

m.route(document.body, '/', {
	'/': app,
	'/:tab': app
});