# occlusionControl

The occlusionControl helps you implement efficient components that render 
only what is visible on screen.

You may, for example, use the occlusion control to implement virtual scrolling for tables, 
which presents a vertically scrolling table, 
scrolling the full height of the table, 
but rendering only the rows which are necessary for the visible display, 
leading to a huge performance increase.
 
This component provides a capability that is relevant for things like infinite scrolling, 
deferring rendering of below-the-fold content to help breaking the mobile 1000ms barrier,
and making parallax sites snappy.


## Sample usage
```
// Display the list items visible
var occlusionList = {
  controller: function (items, pxPerItem) {
    this.items = items;
    this.pxPerItem = pxPerItem;

    this.occlusion = {};
    this.occlusion.contentsHeight = this.items.length * this.pxPerItem;
    // The occlusionControl injects the following into this.occlusion:
    // .containerHeight, .containerWidth, .scrollTop, .scrollHeight
  },

  view: function (ctrl) {
    var begin = ctrl.occlusion.scrollTop / ctrl.pxPerItem  | 0, // floor, integer
      lines = ctrl.occlusion.containerHeight / ctrl.pxPerItem + 0.9 | 0;

    return m('ul', ctrl.items.slice(begin, begin + lines).map(function (item) {
        return m('li', item);
      })
    );
  }
};

app = {
  controller: function () {
    this.component = new mc.occlusionContainer.controller({
      containerHeight: 250, // px
      containerWidth: '250px', // string, optional
      contentsController: function () {
        return new occlusionList.controller(items(), 38);
      },
      contentsView: function (ctrl) {
        return occlusionList.view(ctrl);
      }
    });
  },
  view: function (ctrl) {
    return mc.occlusionContainer.view(ctrl.component);
  }
};

function items () {
  var list = [];
  for (var i = 0; i < 1000; i += 1) {
    list.push('row ' + i);
  }
  return list;
}

m.module(document.body, app);
```

## Controller
```
controller: function () {
  this.component = new mc.occlusionContainer.controller(options);
}
```

```options``` defines the size of the container,
and the controller which renders its contents.

* ```containerHeight``` {number px, required} is the height of the container.
* ```containerWidth``` {(number px)|(string CSS), optional} is the width of the container.
A number is in px; a string is a valid CSS ```width``` property.
* ```contentsController``` {function, required} returns the instantiated controller for the contents.
Any params required by that controller may be passed to it here.
* ```contentsController``` {function, required} calls the view for the contents
and returns the results.
Any params required by that view may be passed to it here.

## View
```
view: function (ctrl) {
  return mc.occlusionContainer.view(ctrl.component);
}
```

* ```ctrl``` {object, required} is the controller for the occlusionController.
 
## Controller for the contents

This controller must define the height of the contents (in px) as ```this.occlusion.contentsHeight```
since the occlusionContainer needs this to properly configure the initial scrollbar.
```
this.occlusion = {};
this.occlusion.contentsHeight = this.items.length * this.pxPerItem;
```

The occlusionController will inject the following properties into this.occlusion:

* ```containerHeight``` {number px} as passed to occlusionContainer.controller.
* ```containerWidth``` {(number px)|(string CSS), optional} as passed to occlusionContainer.controller.
* ```scrollTop``` {number px} how far the top of the visible area is from the top of the virtual scrollable area.
* ```scrollHeight``` {number px} the height of the virtual scrollable area.

## View for the contents

If the contents consist of repeating rows, the content controller should have a ```pxPerItem``` parameter,
the height, in px, of one row. It will need that to calculate ```contentsHeight```,
the height of the virtual scrollable area.

The view can now calculate the first visible row and the number of visible rows in the container
```
var begin = ctrl.occlusion.scrollTop / ctrl.pxPerItem  | 0, // floor, integer
  lines = ctrl.occlusion.containerHeight / ctrl.pxPerItem + 0.9 | 0;
```

Alternatively, the view can use the ratio ```scrollTop / scrollHeight``` to calculate
which row it should start rendering with.
However no ratio will calculate how many rows can be displayed in the container.