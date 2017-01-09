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


salsahFramework
===============

The main SALSAH app component is the framework module which builds the default layout template with

    - salsahHeader (Fig. \ref{fig:header}) with
        - project selection and settings menu
        - search bar panel incl. simple and extended search
        - import menu (add resources and create collections)
        - documentation menu (link to the documentation and/or cheat sheet)
        - user menu (profile setting, log out etc.)

    - salsahFacetedSearch on the left hand side

    - salsahView as a main container for salsahSearchResults, the graph and resource viewer, dashboard etc. The salsahView would be the frame for the ng2 router-outlet.

    - salsahFooter (?)


.. figure:: figures/salsahFramework.png

    salsahFramework

.. figure:: figures/salsahHeader.png

    salsahHeader


