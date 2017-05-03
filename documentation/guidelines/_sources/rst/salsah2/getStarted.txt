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

***********
Get started
***********

.. toctree::
    :maxdepth: 2


Prerequisites
=============

.. _Node: http://nodejs.org/en/download/
.. _NPM: https://www.npmjs.com
.. _Angular-cli: http://cli.angular.io
.. _GitHub: https://github.com/dhlab-basel/salsah

We develop the Salsah app with Angular-cli_, which requires Node_ 6.9.0 or higher, together with NPM_ 3 or higher.
Update NPM to the latest version with ``npm install -g npm@latest`` and install Angular-cli globally:

::

    npm install -g @angular/cli

If there are some permission issues, try to fix them by change the rights in node with `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}``

Clone the Salsah code from GitHub_ and install the Angular-cli locally and the node package dependencies. Go to the Salsah root and execute the following commands:

::

    npm install --save-dev @angular/cli@1.0.0-rc.1

    npm install


Run the Salsah app
==================
With ``ng serve`` the Salsah app starts as a dev server. Navigate to `localhost:4200 <http://localhost:4200>`_. The app will automatically reload if you change any of the source files.




