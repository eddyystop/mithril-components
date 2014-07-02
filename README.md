# [mithril-components] (https://github.com/eddyystop/mithril-components)

Components, mixins, patterns and code for
[mithril] (https://github.com/lhorie/mithril.js).

## Installation
```sh
bower install git://github.com/eddyystop/mithril-components
```

## Running examples

Many examples may be run without the server. Just run the HTML file.

Others require the node.js server.
You can install it from ```http://nodejs.org/```.
Then load the this repo's dependencies with ```npm install```.

Start the server with ```node app.js``` and point your
browser to ```http://localhost:3000/public/FormMixin.html``` for example. 

## Components

You may extract the files you need with a build tool,
or you may use the front-end packaging tool
[component] (https://github.com/component/component).

### UI Components

- ```select``` - Simple select.
[(Sample usage.)](/public/select.html)
[(Results.)](/components/select/sample.png)
[(Source and readme.)](/components/select)
- ```select2``` - [Select replacement.] (https://github.com/ivaynberg/select2) 
Supports searching, remote data, and infinite scrolling. jQuery based.
- ```table``` - Simple table.
[(Sample usage.)](/public/table.html)
[(Results.)](/components/table/sample.png)
[(Source and readme.)](/components/table)
- ```tableResponsive``` - Responsive table.
[(Sample usage.)](/public/tableResponsive.html)
[(Results.)](/components/tableResponsive/sample.png)
[(Source and readme.)](/components/tableresponsive)
- ```datatable``` - Table with sortable columns, AJAX population, 
row selection and multi-row, nested headings.
[(Sample usage.)](/public/datatable.html)
[(Results.)](/components/datatable/sample.png)
[(Source and readme.)](/components/datatable)
- ```imageResponsive``` - [Responsive image polyfill] 
(https://github.com/scottjehl/picturefill)  for < picture > and more.
[(Sample usage.)](/public/imageResponsive.html)
[(Results.)](/components/imageResponsive/sample.png)
[(Source and readme.)](/components/imageresponsive)
- ```tabs``` - Tab control. Renders active view. Routing via m.route().
[(Sample usage.)](/public/tabs.html)
[(Results.)](/components/tabs/sample.png)
[(Source and readme.)](/components/tabs)

#### Occlusion components

Occlusion implementations helps you implement efficient components that render 
only what is visible on the screen. 
They are useful for large tables, large lists, infinite scrolling, 
deferring rendering of below-the-fold content, and parallax sites.

- ```occlusionList``` - Simple list, rendering only what is visible.
[(Sample usage.)](/public/occlusionList.html)
[(Results.)](/components/occlusionList/sample.png)
[(Source and readme.)](/components/occlusionList)
- ```occlusionTable``` - Table which scrolls vertically and horizontally.
Optional header rows always displayed. Pinned columns always appear.
Responsive to width changes from CSS media queries.
[(Sample usage.)](/public/occlusionTable.html)
[(Results.)](/components/occlusionTable/sample.jpg)
[(Source and readme.)](/components/occlusionTable)

## Mixins
Mixin ```ValidationMixin``` resides in ```mixins/ValidationMixins/```.
Docs are in the ```readme```.
A working example, if any, is located at ```public/ValidationMixin.html```.

- ```mixins/Solder.js``` - A simple dependency injector for mixins. 
Mixin extension is supported.
- ```Solder-extend``` - Extending a mixin with new features.
- ```ValidationMixin``` - A data validator, for one field or the entire form. 
Can be used to display error messages as user is entering data, e.g. onchange. 
Integrated with [validator.js](https://github.com/chriso/validator.js).
- ```FormMixin``` - Adds support for forms, with or without a < form >.
Example requires the server.

## Patterns
Pattern ```seo-by-cleanup``` resides in ```patterns/seo-by-cleanup.js``` .
A working example, if any, is located at ```public/seo-by-cleanup.html```

### Basic

- ```service-error-handling``` - Handle web-server and app errors

### Services - just throwing things inline for now 

- ```progress bars``` - How to show a progress bar.

```
var Thing = {
  list: function(options) {
    return m.request({method: "GET", url: "/thing", config: function(xhr) { xhr.onprogress = options.progress }})
  }
}
Thing.list({progress: function(e) { console.log("progress: ", e) }})
```
- ```run m.request in background``` - Do not wait for completion to trigger an update of the view.
https://github.com/lhorie/mithril.js/pull/62
```
m.request({method: "GET", url: "/foo", background: true})
    .then(m.redraw); //force redraw
```
- ```abort request ``` - Abort a running request (https://github.com/lhorie/mithril.js/issues/63)
```
var transport = m.prop();
m.request({method: "GET", url: "/foo", config: transport}); // transport <- xhr
transport().abort();
```

#### More obscure

- ```attach XHR to m.request promise chain``` - (https://github.com/lhorie/mithril.js/issues/63)
```
function requestWithXhr(options) {
  var xhr
  options.config = function(x) {xhr = x};
  var req = m.request(options);
  req.xhr = xhr;
  return req;
}
ChainedAndXhrPromise(requestWithXhr(args))
  .then(foo)
  .then(bar)
  .xhr.agawjkgahwjkg
```

### SEO / server rendered first page

- ```seo-by-noscript``` - Server serves SEO the first page within a noscript tag.
- ```seo-by-cleanup``` - Remove server generated DOM so Mithril can re-render the first page.
- One [Proof of concept] (https://github.com/lhorie/mithril.js/issues/60#issuecomment-41177111)
for Mithril itself to handle this efficiently.
- A different [Proof of concept] (https://groups.google.com/forum/#!topic/mithriljs/pxpj2MMIRYs)

## Code

### First page loading

- [Script-injected "async scripts" considered harmful] 
(https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/)
- [Mobile Analysis in PageSpeed Insights]
(https://developers.google.com/speed/docs/insights/mobile)
and [Optimizing the Critical Path Rendering]
(https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present#slide=id.p19)
- [Detecting Critical Above-the-fold CSS]
(http://paul.kinlan.me/detecting-critical-above-the-fold-css/)
and [PaulKinlan / criticalcss.html]
(https://gist.github.com/PaulKinlan/6283739),
and [PaulKinlan / criticalcss-bookmarklet-devtool-snippet.js]
(https://gist.github.com/PaulKinlan/6284142)
- [When is a stylesheet really loaded?]
(http://www.phpied.com/when-is-a-stylesheet-really-loaded/),
and [Calculating a selector's specificity]
(http://www.w3.org/TR/CSS21/cascade.html#specificity)
- [eddyystop/first-page-loader]
(https://github.com/eddyystop/first-page-loader)

## License
Copyright (c) 2014 John Szwaronek (<johnsz9999@gmail.com>).
Distributed under the MIT license. See LICENSE.md for details.