/* global $ */

// force display of selected value
setInterval(function () {
  m.startComputation();
  m.endComputation();
}, 1000);

var app = {
  car: m.prop('saab'),
  race: m.prop(null),

  controller: function () {
    var options1 = {
      'volvo' : 'Volvo',
      'saab' : 'Saab',
      'mercedes' : 'Mercedes',
      'audi' : 'Audi'
    };

    // options provided when select controlled is instantiated
    this.select1 = new mc.Select.controller(app.car, options1, 'Choose a car');

    // options will be provided when select component is rendered
    this.select2 = new mc.Select.controller(app.race, null, 'Choose a race');
  },

  view: function (ctrl) {
    var options2 = {
      'undead' : 'Undead',
      'orc' : 'Orc',
      'human': 'Human',
      'dwarf': 'Dwarf'
    };

    return m('div', [
      mc.Select.view(ctrl.select1),
      mc.Select.view(ctrl.select2, { options: options2 }),
      m('div', {}, app.car() || 'no car selected'),
      m('div', {}, app.race() || 'no race selected')
    ]);
  }
};

$(document).ready(function () {
  m.module(document.body, app);
});