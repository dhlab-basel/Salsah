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
    App
    Model
    View


.. Links
.. _Knora: http://knora.org
.. _Sipi: https://github.com/dhlab-basel/Sipi
.. _IIIF: http://iiif.io/
.. _Angular-cli: http://cli.angular.io
.. _model: ./model.html
.. _view: ./view.html

.. _components: https://angular.io/docs/ts/latest/guide/architecture.html#!#components
.. _directives: https://angular.io/docs/ts/latest/guide/architecture.html#!#directives
.. _pipes: https://angular.io/docs/ts/latest/guide/pipes.html
.. _services: https://angular.io/docs/ts/latest/guide/architecture.html#!#services

.. Main document content

.. _file structure:

**************
File structure
**************

One goal of the app development is to work with a sleek and simple file structure. This is possible with the usage of Angular-cli_ (with the ``ng generate`` command), but also with a straight and clear directory organization. The main two directories are model_ and view_ followed by just a few sub folders.

The model_ contains api services_ and json object interface classes.

The view_ contains all template stuff which means angular components_, directives_ and pipes_.

.. TODO: work on the file structure documentation
