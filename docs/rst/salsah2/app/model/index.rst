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

.. _json2typescript: https://github.com/dhlab-basel/json2typescript

App MODEL
=========

api (Services)
--------------

The main "http get" and "http post" methods are defined in the api.service.ts file. All other services (get projects, get resources etc.) can reuse these generic methods.


classes (Interfaces)
--------------------
For the Json object mapping and type checking, we're using the json2typescript_ package.

json2typescript is a small package containing a helper class that maps JSON objects to an instance of a TypeScript class. After compiling to JavaScript, the result will still be an instance of this class.





