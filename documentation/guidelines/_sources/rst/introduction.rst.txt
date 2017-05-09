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
    Salsah v1
    Knora
    Sipi

.. Links
.. _Knora: http://knora.org
.. _Sipi: https://github.com/dhlab-basel/Sipi
.. _IIIF: http://iiif.io/

.. Main document content

************
Introduction
************

The idea of SALSAH -- as a virtual research platform -- is to help researchers to handle a project, to organize the
team and to work with digital sources. At the end it should be possible to present the data and the results on an own
web publication platform.

SALSAH is just a graphical user interface which uses primary the restFul API of Knora_ --  a software framework for storing, sharing, and working with primary sources and data in the humanities.
Images and videos will be handled by the Sipi_ server -- a media converter and server based on IIIF_.

This document is a guideline for Salsah developers, which like to help improving the user interface.

Just a few words about the Salsah history and the basic idea.

Research project workflow
=========================

A research project starts with an idea and the research question. It's the beginning of the conceptual phase where the
researcher has to define his sources and methods and where he forms a team. The main work is the second part, where the
team works with the data and the sources: Collecting, organizing and evaluating. At the end of the project stands the
publication of the data and results.

.. figure:: ./figures/research-project-analog.png
    :scale: 75 %
    :align: center

    Research project workflow (from left to right) in an analogous way.


SALSAH is based on a similar workflow concept. The version 1 (salsah.org - 2016-10-18) has an administrator area (salsah.org/admin) where the user can define his project and sources. The team works on the main URL salsah.org. he path /projectname is reserved for the project presentation/publication webpage.

.. figure:: ./figures/research-project-salsah1.png
    :scale: 75 %
    :align: center

    SALSAH 1 with admin area (concept), work space (research) and project page (publication).


The new Salsah
==============

For SALSAH version 2 we're planning a different structure: The admin and the workspace interface would be on the same
app route. The access to the admin area (projectSettings) depends on the user's rights. The project publication page
can reuse the existing modules from SALSAH. But at the moment it's not clear how the URL structure will look like.
http://dasch.org/[project]/[uuid] or http://project.knora.org/[uuid]

The Data and Service Center for the Humanities (DaSCH) will use the SALSAH user interface. The DaSCH is implementing a
distributed architecture with local or domain specific nodes which form a distributed peer-to-peer network. Resources
can be made available to the other nodes at the discretion of each individual node. Authentication and user access is
also organised in a distributed manner where each node has control whom it "trusts". In the near future, the Switch
"Swiss edu-ID" will be used. For more information about Knora and the DaSCH: read the paper by Lukas Rosenthaler:
Data and Service Center for the Humanities -- A National Service Architecture, July 2016.
