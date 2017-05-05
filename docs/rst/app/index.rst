..  Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
    Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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




***************
Developer Guide
***************


.. include:: app-structure.rst
.. include:: app-routes.rst






File structure
==============





The app has two main folders: one is the model and the other one is the view.





.. _components: http://nodejs.org/en/download/
.. _json2typescript: http://github.com/dhlab/json2typescript

This is a developer manual and guideline to enhance the new Salsah application.

.. NOTE::
    All used figures are mockup designs or screenshots from an early alpha version of the app. The labels and names in the figures are not the final product texts!


**The app has two main directories:
one for the view modules (components and directives) and one for the model (api services and classes (json object interfaces)).**

App MODEL
=========

services
--------

The main "http get" and "http post" methods are defined in the api.service.ts file. All other services (get projects, get resources etc.) can reuse these generic methods.


webapi
------
For the Json object mapping and type checking, we're implemented the json2typescript_ package.

json2typescript is a small package containing a helper class that maps JSON objects to an instance of a TypeScript class. After compiling to JavaScript, the result will still be an instance of this class.

All interfaces are defined and stored in a folder below model/webapi/. The idea is to define different interfaces for the various APIs which will be used.





App VIEW
========

The Salsah app has only a few main view components. They're following the routing setup in app-routing.module.ts (with some exceptions e.g. /search).
We organize the main view components in the folders called dashboard, documentation and login.
The last sub-folder in the view is for every other module, which should be reusable in all the main components.


Dashboard Components
--------------------

The main dashboard component is in the root of view/dashboard and it's the start page on Salsah. The start page includes the header and footer components, each with his submodules like search, header toolbar with user and add menus.

The dashboard folder has two sub folders for user and project views, each with sub components which will showd in the router-outlet of the

..  toctree::
    :maxdepth: 3

    view/dashboard/project/index
    view/dashboard/user/index


Documentation Component
-----------------------

..  toctree::
    :maxdepth: 3

    view/documentation/index


Login Component
---------------

..  toctree::
    :maxdepth: 3

    view/login/index


Modules (sub components)
------------------------

..  toctree::
    :maxdepth: 4

    view/modules/header/index
    view/modules/footer/index
    view/modules/error/index
    view/modules/search/index
    view/modules/listing/index
    view/modules/form/index
    view/modules/object/index
    view/modules/properties/index
    view/modules/others/index



