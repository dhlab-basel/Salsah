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

.. _geonames: http://geonames.org
.. _ckeditor: http://ckeditor.com

Properties
----------

The "properties" modules are predefined GUI elements for the resource metadata.

.. HINT::
    The GUI elements are important for editing. So, we're using form elements. Perhaps we have to move the properties into the :ref:`form` directory!?


String
^^^^^^
Just a text element. Single or multi line

Number
^^^^^^
For integer or floating point number.
A number element can also be a range "from ... to"

Richtext
^^^^^^^^
Has a toolbar to format text.

Element: textarea or an existing editor. ckeditor_ ?

Date
^^^^
Date selection;
Can be a single date or a period.

Format:

* dd.mm.yyyy
* mm.yyyy
* yyyy

plus the calendar information (Julian, Gregorian etc.)


Time
^^^^
Time selection; Can be a single timestamp or a sequence. In the case of a sequence, we can calculate the duration.

It's possible to set a time in seconds or as a timecode.

Format:
* hh:mm:ss:ff (hours:minutes:seconds:frames)
* ss.ms (seconds in floating point notation with miliseconds)
* ss.ff (seconds in floating point notation with frame number)

Location
^^^^^^^^
The location is connected to geonames_.org

Element: autocomplete (or dropdown, if we still store the already used location in a hierarchical list again)


Resource pointer
^^^^^^^^^^^^^^^^
Link element to another resource. The connected resource can be internal or external.

Element: autocomplete or dropdown


Selection
^^^^^^^^^
Element: dropdown, checkbox or radio buttons


Hierarchical list
^^^^^^^^^^^^^^^^^
Element: dropdown or radio buttons

