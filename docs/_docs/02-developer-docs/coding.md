---
title: Code style
category: Developer docs
order: 2
---

We develop Salsah with with [angular-cli](https://cli.angular.io) and the [WebStorm editor](https://www.jetbrains.com/webstorm/) by JetBrains. This editor (but also many others) is able to read the .editorconfig file in the Salsah root directory. It’s a configuration definition for the typescript- and the scss-lint tools. The following recommendations are important:

We use spaces instead of tabs (indent_style) with a size of 4 (indent_size). 

There's one exception! For the styling we implemented [Material](https://material.angular.io) and write own style with [sass scss](https://sass-lang.com/guide), which has an indent size of 2.

For the typescript code styling, we’re following the TSLint recommendation. Please set your editor configuration as described there. It helps on reformat code. One important point is to use single quotes always. Please set the TS punctuation settings to “use single quotes always” and for import/export set to the ES6 spaces definition.
