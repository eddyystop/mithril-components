/* global $ */

// copied for convenience from http://lhorie.github.io/mithril/integration.html
//usage
var dashboard = {};

dashboard.controller = function() {
  //list of users to show
  this.data = [{id: 1, name: "John"}, {id: 2, name: "Mary"}, {id: 3, name: "Jane"}];

  //select Mary
  this.currentUser = this.data[1];

  this.changeUser = function(id) {
    console.log(id);
  };
};

dashboard.view = function(ctrl) {
  return m("div", [
    m("label", "User:"),
    select2.view({data: ctrl.data, value: ctrl.currentUser.id, onchange: ctrl.changeUser})
  ]);
};

// views will be re-rendered when mc.Select.view's onchange is triggered.
$(document).ready(function () {
  m.module(document.body, dashboard);
});