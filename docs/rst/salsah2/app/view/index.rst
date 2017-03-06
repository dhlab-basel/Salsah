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

The Salsah app has only a few main views. They're following the routing settings in app-routing.module.ts (with some exceptions like /search).
We organize the main view components in the folders called dashboard, documentation and login.
The last folder in this structure is for every other module, which should be reusable in all the main components.


Dashboard
=========

..  toctree::
    :maxdepth: 2

    dashboard/project/index
    dashboard/user/index



Documentation
=============

Login
=====


Modules
=======
..  toctree::
    :maxdepth: 2

    modules/header/index
    modules/footer/index
    modules/error/index
