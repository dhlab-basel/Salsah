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
    model
    service
    http request
    api request
    interfaces

.. Links
.. _json2typescript: http://github.com/dhlab/json2typescript

.. _model:

*********
App MODEL
*********

The app model folder contains two subfolders:

Services
========
The main "http get" and "http post" methods are defined in the api.service.ts file. All other services (get projects, get resources etc.) can reuse the generic methods.


Webapi
======
For the Json object mapping and type checking, we're implemented the json2typescript_ package.

json2typescript is a small package containing a helper class that maps JSON objects to an instance of a TypeScript class. After compiling to JavaScript, the result will still be an instance of this class.

All interfaces are defined and stored in a folder below model/webapi/. The idea is to define different interfaces for the various APIs which will be used.
