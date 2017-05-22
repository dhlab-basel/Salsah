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


Object
------

salsahObjects are just a few GUI elements for the various resource types depending on media and file type: text, image, video, audio

For every salsahObject we have to build one component. Some of them can have sub-modules as well.

Every salsah (resource) object needs his own viewer environment with default, but also specific tools.
The default tools are as following:

-  **close** and **resize** the resource card; fullscreen and back to
   card size; (minimize? add the resource to one field (of 6) in the
   split view.)

-  **change the view**: switch to the graph viewer or to the collection
   object, if the object is stored in a collection (link object).

-  **share/add**: share the resource with friends or use the URI
   somewhere else (depends on the resource rights) / add the resource to
   a collection package (sth. like a playlist in music apps) – we’re
   using the collection also for links between at least two resources.

-  **edit** (incl. delete) the resource (depends on the resource and
   property rights).


.. _empyt:

Empty object
^^^^^^^^^^^^

The empty object is an object without a media file; it has only metadata
and the default tools as described above.

.. _image:

Image
^^^^^

The image object has additional tools like: zoom, quality changer,
rotate, mirror, transcriber, regions marker

.. _document:

Document
^^^^^^^^

The document object is for pdf, latex or rtf, but also word etc. We’re
not able to display all the different document types – in that case, we
offer a download button. The additional tools depending on the document
viewer. But we need (+/-) zoom, quality changer, rotate, mirror,
transcriber, regions marker.

.. _video:

Video
^^^^^

The moving image needs some more tools: timeline with preview,
navigation (play, pause, stop, forward and rewind), scroll through,
change quality, sequence marker (start/end), frame extraction,
transcriber (incl. musical notation), transcription import (subtitle
files e.g. srt)

Inspired by existing tools: Transcribe, f4, ELAN, MaxQData

.. figure:: salsah-object-video.png
    :scale: 50 %

video Object (top left) embedded in the sequence_ transcription tool

.. _audio:

Audio
^^^^^

The audioObject could be similar to the videoObject. Perhaps we need an
extra object for musical notes (musicNotationObject ?)

.. _collection:

Collection
^^^^^^^^^^
The collectionObject is a special GUI element. We can use it for every object type which should connect various salsah objects.

Link
""""
A link is a collection of at least two resource objects.
The collection connects various salsahObjects (resources). We can reuse the salsahCollection component for links and resource annotations as well. Every user should be able to create a collection and he can share it with others (share with the whole project team or with single user).

Book
""""
The book is a special collectionObject with a navigation
tool (sth. like timeline) incl. page preview and flick through. The
single page includes the tools from the imageObject.

.. _region:

Region
^^^^^^

Two-dimensional area on images or documents.

.. _sequence:

Sequence
^^^^^^^^

Similar to the region, but for time based media objects like video and audio.




