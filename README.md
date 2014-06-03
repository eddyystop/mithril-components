# [mithril-components] (https://github.com/eddyystop/mithril-components)

Components, patterns and sample code for lhorie/mithril.js 
[mithril] (https://github.com/lhorie/mithril.js).

A new-born work in progress.

## How to install
```sh
bower install mithril-components
    or
bower install git://github.com/eddyystop/mithril-components
```

## UI Components
- [Table - responsive] (#table-responsive) - A responsive table.


## Docs

### <a name="UI"></a>UI Components


***


### <a name="table-responsive"></a>Responsive table

```js
$(window).on('resize', function () {
  m.startComputation();
  m.endComputation();
});
  
var app = {
  controller: function () {
    var table = [ ['heading 1', 'heading 2', 'heading 3'], [1, 2, 3], [...] ];

    // a plain table
    this.tableScrollable1 = new mc.TableResponsive.controller(table);

    // a table responsive to viewport width
    this.tableScrollable2 = new mc.TableResponsive.controller(table, {
      isPlain: function () { return $(window).width() >= 767; }
    });
  },

  view: function (ctrl) {
    return m('div', [
      mc.TableResponsive.view(ctrl.tableScrollable1),
      mc.TableResponsive.view(ctrl.tableScrollable2)
    ]);
  }
};
  
m.module(document.body, app);
```


## License
Copyright (c) 2014 John Szwaronek (<johnsz9999@gmail.com>).
Distributed under the MIT license. See LICENSE.md for details.