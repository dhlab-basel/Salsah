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
    Angular
    Angular-cli
    Angular-material
    Node
    NPM
    Start
    Install

.. Links
.. _Knora: http://knora.org
.. _Digital Humanities Lab: http://dhlab.unibas.ch
.. _University of Basel: http://unibas.ch
.. _Swiss Academy of Humanities and Social Sciences: http://sagw.ch`
.. _GNU Affero General Public License: http://www.gnu.org/licenses/agpl-3.0.en.html

.. _Node: http://nodejs.org/en/download/
.. _NPM: https://www.npmjs.com
.. _Angular: http://angular.io
.. _Angular-cli: http://cli.angular.io
.. _Material Design for Angular: http://material.angular.io
.. _GitHub: https://github.com/dhlab-basel/salsah

.. Main document content

***********
Get started
***********

Salsah (System for Annotation and Linkage of Sources in Arts and Humanities) is a generic graphical user interface for Knora_.

It is developed by the `Digital Humanities Lab`_ at the `University of Basel`_, and is supported by the `Swiss Academy of Humanities and Social Sciences`_.

Salsah is free software, released under the `GNU Affero General Public License`_.



Prerequisites
=============

Node and NPM
------------

We develop the Salsah app with Angular_ (v4), especially with Angular-cli_, which requires Node_ 6 or higher and NPM_ 4 or higher. Update NPM to the latest version with ``npm install -g npm@latest``.

We develop Salsah with Angular-cli_ version 1.0.0 (will be updated from time to time!),, which requires Node_ 6.9.0 or higher, together with NPM_ 3 or higher.

Angular-cli
-----------
::

    npm install -g @angular/cli

If there are some permission issues, try to fix them by change the rights in node with `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}``

Salsah app
==========

Installation
------------

After cloning the Salsah code from GitHub_, install the node packages from the Salsah root directory with

::

    npm install


Start
-----

With

::

    ng serve

the Salsah app starts on http://localhost:4200

It could happen, that ng can't resolve some specific packages and the app doesn't start. In that case the install process did not install the developer packages. Install them with

::

    npm install --only=dev



