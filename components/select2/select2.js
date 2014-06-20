/*global m, $ */

// Select ======================================================================
var select2 = {};

select2.config = function(ctrl) {
  return function(element, isInitialized) {
    var el = $(element);

    if (!isInitialized) {
      //set up select2 (only if not initialized already)
      el.select2()
        //this event handler updates the controller when the view changes
        .on("change", function(e) {
          //integrate with the auto-redrawing system...
          m.startComputation();

          //...so that Mithril autoredraws the view after calling the controller callback
          if (typeof ctrl.onchange === "function") ctrl.onchange(el.select2("val"));

          m.endComputation();
          //end integration
        });
    }

    //update the view with the latest controller value
    el.select2("val", ctrl.value);
  };
};

//this view implements select2's `<select>` progressive enhancement mode
select2.view = function(ctrl) {
  return m("select", {config: select2.config(ctrl)}, [
    ctrl.data.map(function(item) {
      return m("option", {value: item.id}, item.name);
    })
  ]);
};
