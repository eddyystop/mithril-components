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
Component ```tableResponsive``` resides in ```components/tableResponsive/```.
Docs are in the ```readme```.
You may extract the files you need with a build tool,
or you may use the front-end packaging tool
[component] (https://github.com/component/component).

A working example, if any, is located at ```public/tableResponsive.html```.

### UI Components

- ```table``` - Simple table.
- ```select``` - Simple select.
- ```select2``` - [Select replacement.] (https://github.com/ivaynberg/select2) 
Supports searching, remote data, and infinite scrolling. jQuery based.
- ```tableResponsive``` - Responsive table.
- ```imageResponsive``` - [Responsive image polyfill] 
(https://github.com/scottjehl/picturefill)  for < picture > and more.

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

## Services

-```progress bars``` - How to show a progress bar.

```
var Thing = {
  list: function(options) {
    return m.request({method: "GET", url: "/thing", config: function(xhr) { xhr.onprogress = options.progress }})
  }
}
Thing.list({progress: function(e) { console.log("progress: ", e) }})
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