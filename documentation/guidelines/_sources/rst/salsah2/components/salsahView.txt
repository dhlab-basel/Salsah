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


salsahView
==========

gridView (search results and collections)
-----------------------------------------

We can use the gridView component for search results and the list of collections.

.. figure:: figures/salsahView_grid.png

    salsahView: grid (inspired by the old light table and the LFI news)

listView (search results)
-------------------------

The listView component is for search results

.. figure:: figures/salsahView_list.png

    salsahView: list (inspired by Google’s inbox

tableView (search results of one resource type)
-----------------------------------------------

The tableView component is for search results filtered by on resource type!

.. figure:: figures/salsahView_table.png

    salsahView: table (inspired by Excel)

    From the list view (grid, list or tableView) the user can select more
    than one resource (well known from e-mail applications). In that case,
    an additional header provides some tools to do something with the
    selected resources. If the user selects some resources which are from
    the same resource type, he can edit them by one click. A modal box shows
    the properties of the selected resources. It’s the same process as
    Apple’s iTunes has (s. Fig. [fig:itunes]).

.. figure:: figures/iTunes-edit-selection.png

    Example from iTunes: Selection of some songs; “Get info” opens a modal box, where the user can edit the properties for the whole selection.

resourceView
------------

.. figure:: figures/salsahView_resource.png

    salsahView: default resource card/modal (inspired by the window element of elementary OS)

splitView (compare resources)
-----------------------------

Resource comparison viewer with a maximum of six flexible boxes.

.. figure:: figures/salsahView_split.png

    salsahView: split (inspired by codepen.io)

graphView
---------

Something with D3.js (d3js.org)


dashboardView
-------------

Place for activity thread includes updates from all projects the user is
part of or has subscribed to. Activity thread should also be possible
for user’s activity.
