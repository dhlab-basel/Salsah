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

**********************
Install the Salsah app
**********************

.. toctree::
    :maxdepth: 2


Prerequisites
=============

.. _Node: http://nodejs.org/en/download/
.. _NPM: https://www.npmjs.com
.. _Angular-cli: https://github.com/angular/angular-cli
.. _GitHub: https://github.com/dhlab-basel/salsah

We're developing the Salsah app with Angular-cli, which requires Node_ 4 or higher with NPM_ 4 or higher.
(Update NPM to the latest version with ``npm install -g npm@latest``)


Install Angular-cli_
--------------------

::

    npm install -g angular-cli@1.0.0-beta.24


If there are some permission issues, try to fix the writing rights in node with `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}``


Clone the Salsah code from GitHub_
----------------------------------
After cloning the Salsah code, install the node packages from the Salsah root directory with

::

    npm install

Start the Salsah app
====================
With ``ng serve`` the Salsah app starts as a dev server. Navigate to `localhost:4200 <http://localhost:4200>`_. The app will automatically reload if you change any of the source files.

It could happen, that ng can't resolve some specific packages. In that case install angular-cli direct in the salsah app:
``npm install -g angular-cli@1.0.0-beta.24``



Issues with angular-cli?
========================

If there are still other issues, please check the following instructions:

Check ``npm config list -l`` for option ``legacy-bundling = false``

::

    npm config list -l | grep legacy-bundling

If this option is set to ``true`` (what forces node-modules to be installed within nested directories), use the ``--legacy-bundling`` flag when installing angular-cli or globally set back your npm config to its default behaviour (``npm set legacy-bundling=false``). See this `Stackoverflow article concerning legacy-bundling <http://stackoverflow.com/a/35227212>`_.

Installing package dependencies
-------------------------------

After forking the Salsah code, you have to install the node package dependencies:

Check ``npm config get production``

If ``production`` is set to ``true`` (= production environment), running ``npm install`` will skip ``devDependencies`` of your ``package.json``. This is not recommended because you will have to install all ``devDependencies`` seperately (see this `Stackoverflow article <http://stackoverflow.com/a/35098833>`_).

Run ``npm install`` inside your Salsah project folder as described above.


