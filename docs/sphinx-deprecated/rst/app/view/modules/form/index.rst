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
    form
    edit
    new
    ontology editor

.. Links
.. _resource-class: ../../modules/form/index.html#resource-class-form


.. _form:

Form components
===============

In all cases, where we need a form, we can reuse the defined forms here or we have to develop a new form component, which will be placed here.
In the most cases we can use and reuse a form for create but also for editing stuff.

.. NOTE::
    Create and edit depends always on the user's rights!


.. _project-form:

Project form
------------
Create new projects or edit existing projects

.. _resource-class-form:

Resource class form
-------------------
This form is used to create a new resource class (ontology). At the moment we have a base ontology data structure stored in /src/app/model/test-data/baseOntology.json . It's a base and default structure for just a few media types. In the most cases, a user will use this ontology creator. Btw the structure is always expandable, because we create (copy) the ontology for each project.

.. figure:: resource-class-form-1.png
    :scale: 50 %
    :align: center

.. _resource-form:

Resource form
^^^^^^^^^^^^^

Add new resource instance

.. _user-form:

User form
^^^^^^^^^

Create new user or edit existing users


.. _collection-form:

Collection form
^^^^^^^^^^^^^^^


