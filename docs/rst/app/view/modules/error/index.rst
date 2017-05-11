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


.. Index for genindex.html
.. index::
    error

.. _403: https://en.wikipedia.org/wiki/HTTP_403
.. _404: https://en.wikipedia.org/wiki/HTTP_404


.. _error:

Error
=====
Here we define error module components. At the moment there are just a few:



.. _access-denied:

AccessDenied
------------
A simple 403_ access denied message.

    ``<salsah-access-denied></salsah-access-denied>``


.. _api-error:

ApiError
--------
A component to show an error message from app/model/services/ap-service-error.ts, if there's an issue with the API.

    ``<salsah-api-error [error]="error"></salsah-api-error>``

    @Input
        error: any


.. _developer-hint:

DeveloperHint
-------------
A component to setup a developer hint in a quick way.

    ``<salsah-developer-hint [message]="message"></salsah-developer-hint>``

    @Input
        message: any


.. _page-not-found:

PageNotFound
------------
A simple 404_ error message.

    ``<salsah-page-not-found></salsah-page-not-found>``



