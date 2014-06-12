# [mithril-components] (https://github.com/eddyystop/mithril-components)

Components, patterns and code for
[mithril] (https://github.com/lhorie/mithril.js).

## Installation
```sh
bower install git://github.com/eddyystop/mithril-components
```

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

## Patterns
Pattern ```seo-by-cleanup``` resides in ```patterns/seo-by-cleanup.js``` .
A working example, if any, is located at ```public/seo-by-cleanup.html```

### Basic

- ```service-error-handling``` - Handle web-server and app errors

### SEO / server rendered first page

- ```seo-by-noscript``` - Server serves SEO the first page within a noscript tag.
- ```seo-by-cleanup``` - Remove server generated DOM so Mithril can re-render the first page.
- [Proof of concept] (https://github.com/lhorie/mithril.js/issues/60#issuecomment-41177111)
for Mithril itself to handle tsituation efficiently.

## Code

### First page loading

- [Script-injected "async scripts" considered harmful] 
(https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/)
- [Mobile Analysis in PageSpeed Insights]
(https://developers.google.com/speed/docs/insights/mobile)
- [Optimizing the Critical Path Rendering]
(https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present#slide=id.p19)
- [Detecting Critical Above-the-fold CSS]
(http://paul.kinlan.me/detecting-critical-above-the-fold-css/),
[PaulKinlan / criticalcss.html]
(https://gist.github.com/PaulKinlan/6283739),
[PaulKinlan / criticalcss-bookmarklet-devtool-snippet.js]
(https://gist.github.com/PaulKinlan/6284142)
- [Calculating a selector's specificity]
(http://www.w3.org/TR/CSS21/cascade.html#specificity)
- [When is a stylesheet really loaded?]
(http://www.phpied.com/when-is-a-stylesheet-really-loaded/)
- [eddyystop/first-page-loader]
(https://github.com/eddyystop/first-page-loader)

## License
Copyright (c) 2014 John Szwaronek (<johnsz9999@gmail.com>).
Distributed under the MIT license. See LICENSE.md for details.