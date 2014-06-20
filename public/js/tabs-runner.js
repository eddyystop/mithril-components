/* global $ */
var app = {
  name: m.prop('John'),
  dept: m.prop('dev'),
  list: m.prop([
    { "author": "Albert Camus",
      "quote": "Those who lack the courage will always find a philosophy to justify it."
    },
    { "author": "Plato",
      "quote": "You can discover more about a person in an hour of play than in a year of conversation."
    },
    { "author": "Ludwig Wittgenstein",
      "quote": "If people never did silly things nothing intelligent would ever get done."
    }
  ]),

  controller: function () {
    console.log('controller name=', app.name());
    this.tabs = new mc.Tabs.controller({
      list: { view: app.listView, ctrl: this, legend: 'theList' },
      settings: { view: app.settingsView },
      about: app.aboutView
    });

    this.name = m.prop(app.name());
    this.dept = m.prop(app.dept());
    this.list = m.prop(app.list());
  },

  view: function (ctrl) {
    return mc.Tabs.view(ctrl.tabs);
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
      m('input',
        { value: ctrl.name(),
          onchange: m.withAttr('value', app.name) }),
      m('div', 'department'),
      m('input',
        { value: ctrl.dept(), onchange: m.withAttr('value', app.dept) })
    ]);
  },
  aboutView: function (ctrl) {
    return m(
      ".about", [
        "Add a quote in JSON",
        m("hr"),
        m("textarea", { rows: 10, cols: 80,
            onchange: function () { app.list(JSON.parse(this.value)); } },
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
