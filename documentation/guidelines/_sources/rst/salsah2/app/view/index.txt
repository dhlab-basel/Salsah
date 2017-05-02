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


========
App VIEW
========

The Salsah app has only a few main view components. They're following the routing setup in app-routing.module.ts (with some exceptions e.g. /search).
We organize the main view components in the folders called dashboard, documentation and login.
The last sub-folder in the view is for every other module, which should be reusable in all the main components.


Dashboard Components
====================

..  toctree::
    :maxdepth: 3

    dashboard/project/index
    dashboard/user/index



Documentation Component
=======================

.. toctree::
    :maxdepth: 3

    documentation/index

Login Component
===============

.. toctree::
    :maxdepth: 3

    login/index


Modules
=======
..  toctree::
    :maxdepth: 3

    modules/header/index
    modules/footer/index
    modules/error/index
    modules/search/index
    modules/listing/index
    modules/form/index
    modules/object/index
    modules/properties/index
    modules/others/index
