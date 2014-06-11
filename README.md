# [mithril-components] (https://github.com/eddyystop/mithril-components)

Components, patterns and sample code for
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

### SEO / server rendered DOM

- ```seo-by-noscript``` - Server serves first page within a noscript tag.
- ```seo-by-cleanup``` - Remove server generated DOM so Mithril can re-render the first page.
- [Proof of concept] (https://github.com/lhorie/mithril.js/issues/60#issuecomment-41177111)
for Mithril itself to handle this requirement efficiently.


## License
Copyright (c) 2014 John Szwaronek (<johnsz9999@gmail.com>).
Distributed under the MIT license. See LICENSE.md for details.