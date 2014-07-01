# [occlusionList](https://github.com/eddyystop/mithril-components/tree/master/components/occlusionList)

occlusionList renders lists which may scroll vertically.

occlusionControl works well with lists having a very large number of items, 
as its renders only those items then visible. (Its also fine for small numbers of items!)

## Sample usage
#### Results (with Bootstrap 3.2)
![occlusionList sample](sample.png)

#### Run it
Point browser at /mithril-components/public/occlusionList.html .

#### Code
```
<link href="vendor/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">

<script src="js/vendor/mithril.js"></script>
<script src="../components/utils/mcUtils.js"></script>
<script src="../components/occlusionList/occlusionList.js"></script>

app = {
  // model
  items: (function () {
    var r = [
      'Free Domain Name Registration',
      'Free Window Space hosting',
      'Number of Images',
      [m('span.badge', 'New'), m('span','24*7 support')],
      'Renewal cost per year',
      [m('span.badge', 'New'), m('span','Discount offer')]
    ];
    for (var i = 0; i < 15; i += 1) { r.push('extra item ' + 1); }
    return r;
  }()),

    // app
    controller: function () {
      this.ctrlList = new mc.occlusionList.controller(app.items);
    },
    view: function (ctrl) {
      return [
        m('p', ''),
        m('.container',
          m('.row',
            mc.occlusionList.view(ctrl.ctrlList, 250, '250px')
        ))
      ];
    }
};

m.module(document.body, app);
```

## Controller
```
controller: function () {
  this.component = new mc.occlusionList.controller(items)
}
```

* `table {fcn | array of {str | m() | array of m()} }` 
The item list or a function returning the item list.
The list items may b e strings, an m() call, or an array of m() calls.

## View
```
view: function (ctrl) {
  return mc.occlusionList.view(ctrl, containerHeight, containerWidth, selectors, attrs);
}
```

* `ctrl {obj}` is the controller.
* `containerHeight {numb px | str CSS | null default CSS}` is the display height of the table.
A numeric value specifies the size in px.
A string contains a valid CSS height property value.
If null, the height is that rendered as a result of all the CSS styling.
* `containerWeight {numb px | str CSS | null default CSS}` is the display width of the table..
A numeric value specifies the size in px.
A string contains a valid CSS width property value.
If null, the width is that rendered as a result of all the CSS styling.
* `selectors {obj}` are the Mithril selectors attached to various elements in the table.
* `attrs {obj}` are the Mithril attrs attached to various elements in the table.

`selectors` and `attrs` specify the Mithril selectors and attrs to be attached to 
different parts of the table, e.g. {_wrapper: 'table0', _odd:'.oddRow', _even:'.evenRow'}

The locations are:
* `_wrapper` The outermost < div> wrapping the list.
* `_parent` The < ul> tag for the list.
* `_item` The < li> for an item. 