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

.. _LFI-news: https://lfi-online.de/ceemes/de/news/
.. _inbox: http://www.google.com/intl/de/inbox/
.. _codepen: http://codepen.io
.. _mirador: http://projectmirador.org/demo/

.. _listing:

Listing
-------

The listing modules contents every list view element:

.. _project-list:

Project list
^^^^^^^^^^^^
A series of lines for projects.

.. _results:

Results
^^^^^^^

The results module is the main component in search results. It has a sub header (at the bottom of the main :ref:`header`.) including a progress bar.
 The module contains one of the following list view, which the user can switch.


Resource List
"""""""""""""
Just a simple series of line items. The items are resource objects. A click on the item opens it on the right hand side; known from eMail applications. Inspired by Google's inbox_

.. figure:: salsah-resource-list.png
    :scale: 50 %


Resource Grid list
""""""""""""""""""
A two-dimensional list view that arranges cells into grid-based layout. A click on the item opens it on the right hand side; known from eMail applications.

The grid view is inspired by the old light table or the LFI-news_ and much others. We decided to have square cards in the grid and not a masonry style grid.

.. figure:: salsah-resource-grid-list.png
    :scale: 50 %



Resource Table list
"""""""""""""""""""
The table list module is for search results, which have the same resource type! It's not possible to mix video and image resources in one table, because they have different ontologies. The ontology defines the columns.

In the table view we need a special button to open a resource object in full view. In this case it will open in a dialog box (modal).

.. figure:: salsah-resource-table-list.png
    :scale: 50 %


.. HINT::
    In every search results list view it should be possible to select more than one resource. After selecting, the user has various possibilities to do something with those objects: add them to a collection, send them to team members or other users (share), compare them (split-view_) or he can edit the property values at once.
    We can handle the last point similar to the iTunes multiple editor as shown in the following screenshot.

.. figure:: iTunes-edit-selection.png

.. _split-view:

Split view
^^^^^^^^^^
To compare at least two resources (max. 6) we will have the split view module. Inspired by codepen_ and mirador_

.. figure:: salsah-split-view.png


