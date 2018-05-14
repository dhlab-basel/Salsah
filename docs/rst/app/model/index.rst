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



.. _app_model:

=========
app/model
=========

This direcotry contains all files to get and send data from and to the webapi.

--------
services
--------
In the sub directory called services, you will find all http services.

------
webapi
------

In the webapi directory we store interfaces or classes which define the expected data structure from an API. The main webapi is Knora. If you want connect Salsah with other APIs, you should store the interfaces here in a separate subdirectory.

JSON-LD Conversion
------------------
Knora API v2 serializes data as JSON-LD. The data received from Knora has to be converted to internal structures.

Resource Response and Search Results
====================================
For data representing resources, a ``ReadResourcesSequence`` has to be constructed, representing one or more resources with their properties.
Given a full resource request or a list of search results, the module ``ConvertJSONLD`` converts them from JSON-LD to an instance of ``ReadResourcesSequence``.
Before passing the JSON-LD data to ``ConvertJSONLD``, the prefixes have to be expanded using the JSON-LD processor.

::

    declare let require: any;
    let jsonld = require('jsonld');

    ...

    (result: ApiServiceResult) => {
        let promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        let promise = promises.compact(result.body, {});

        promise.then((compacted) => {

            const resourceSeq: ReadResourcesSequence =
                ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

        }, function (err) {

            console.log('JSONLD of full resource request could not be expanded:' + err);

        });

``ReadResourcesSequence`` represents the resources as an array of ``ReadResource``. Each property is represented as an instance of the (abstract) interface ``ReadPropertyItem``.
For the different value types, an implementation of ``ReadPropertyItem`` is provided.

Ontology Information
====================
When processing the representation of resources, entity Iris are collected and retrieved from Knora via the service ``OntologyCacheService``.
After expanding the Iris as shown above, the resources entity Iris can be collected and the definitions requested:

::

    // get resource class Iris from response
    let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

    // request ontology information about resource class Iris (properties are implied)
    this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
        (resourceClassInfos: OntologyInformation) => {
            // resourceClassInfos contains the information about the resources classes
            // and the properties it has cardinalities for
        },
        (err) => {

            console.log('cache request failed: ' + err);
        });

An instance of ``OntologyInformation`` contains the resource class definitions and the properties the resource classes have cardinalities for.
To facilitate this process and minimize the number of requests to be sent to Knora, the ``OntologyCacheService`` gets whole ontologies from Knora each time it encounters an unknown entity and caches them.
Once stored in  the cache, the ``OntologyCacheService`` can serve the information without doing an additional request to Knora.
