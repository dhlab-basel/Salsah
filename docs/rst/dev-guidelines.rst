..  Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
    Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
    This file is part of SALSAH.
    SALSAH is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    SALSAH is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    You should have received a copy of the GNU Affero General Public
    License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.

.. Index for genindex.html
.. index::
    Buttons

.. Links
.. _Knora: http://knora.org
.. _Angular_CLI: http://cli.angular.io
.. _WebStorm_editor:


.. Main document content

====================
Developer Guidelines
====================

Dear Developer, this guideline should help you and us to have always a similar code and file structure. Both definition are defined on the following pages.


--------------
Code structure
--------------
We're all developing salsah with Angular_CLI_ and the WebStorm_editor_ by JetBrains. This editor (but also many others) is able to work with the .editorconfig file in the Salsah root directory. It's a configuration definition for the typescript- and the scss-lint tools. The following recommendations are important:

General we're using spaces instead of tabs (indent_style) with a size of 4 (indent_size). The styling files, where we're using scss (sass), have an exception of the indent size, namely 2.

Typescript Code Styling
We're following the TSLint recommendation. Please set your editor configuration as described there. It helps on reformat code (one cool function in WebStorm). Some important points are:

* use single quotes always
*



Please set the TS punctuation settings to "use single quotes always"

In TS and HTML files the


--------------
File structure
--------------
The file structure in the salsah app has only a few main folders.
    src
    |__ app
        |__ model
        |    |__ services
        |    |__ webapi
        |__ view
                |__ dashboard
                |__ documentation
                |__ login
                |__ modules
                |__ search
          |__ [+ all app configuration files]



***************
Main components
***************




*******
Modules
*******

Create own, reusable modules (Tutorial: https://medium.com/@ngl817/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e_ )

Creating a feature module
https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html_



*******
Buttons
*******

Buttons Shouldn’t Have a Hand Cursor (https://blog.marvelapp.com/buttons-shouldnt-hand-cursor/?ref=webdesignernews.com_ )
