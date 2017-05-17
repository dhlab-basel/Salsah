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
    view
    component
    directive
    pipe
    template

.. Links
.. _routing: ./app-routes.html

.. _view:

********
App VIEW
********

.. NOTE::
    All used figures are mockup designs or screenshots from an early alpha version of the Salsah 2 app. The labels and names in the figures are not the final production ones!


The Salsah app has only a few main view components. They're following the routing_ setup in app-routing.module.ts (with some exceptions e.g. /search).
We organize the main view components in the folders called dashboard, documentation and login.
The last sub-folder in the view is for every other module, which should be reusable in all the main components.

Dashboard components
====================

The main dashboard component is in the root of view/dashboard and it's the start page on Salsah. The start page includes the header and footer components, each with his submodules like search, header toolbar with user and add menus.

The dashboard folder has two sub folders for user and project views, each with sub components which will using in the router-outlet of each main component:

..  toctree::
    :maxdepth: 3

    view/dashboard/project/index
    view/dashboard/user/index

Documentation component
=======================

..  toctree::
    :maxdepth: 3

    view/documentation/index


Login Component
===============

..  toctree::
    :maxdepth: 3

    view/login/index


Modules (sub components)
========================
(in alphabetical order)

..  toctree::
    :maxdepth: 3

    view/modules/footer/index
    view/modules/form/index
    view/modules/header/index
    view/modules/listing/index
    view/modules/message/index
    view/modules/object/index
    view/modules/other/index
    view/modules/properties/index
    view/modules/search/index
