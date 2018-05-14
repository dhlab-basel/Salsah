---
title: App structure
category: Developer Hints
order: 1
---

The Salsah app file structure is organized by angular-cli. We develop our components, directives, pipes and services in two main directories. One directory is called "model", which contains all services (http request) for the api and the second directory is the "view', which contains all components. The structure in both directories is as following:

### Model

#### - services
To get the data from the Knora webapi or the send data to the api, we have the following services, which will be replaced by the general [knora-gui](https://npmjs.com/~knora) service modules.

**ApiService** is the main service, which is used by AuthenticationService, ProjectsService, UsersService etc.

#### - test-data
The data here simulates the api and is used for the service tests.

#### - webapi
In the webapi directory we store interfaces or classes which define the expected data structure from an API. The main webapi is Knora. If you want connect Salsah with other APIs, you should store the interfaces here in a separate subdirectory.

##### JSON-LD Conversion

Knora API v2 serializes data as JSON-LD. The data received from Knora has to be converted to internal structures.

**Resource Response and Search Results**

For data representing resources, a `ReadResourcesSequence` has to be constructed, representing one or more resources with their properties.
Given a full resource request or a list of search results, the module `ConvertJSONLD` converts them from JSON-LD to an instance of `ReadResourcesSequence`.
Before passing the JSON-LD data to `ConvertJSONLD`, the prefixes have to be expanded using the JSON-LD processor.

```typescript
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
}
```

`ReadResourcesSequence` represents the resources as an array of `ReadResource`. Each property is represented as an instance of the (abstract) interface `ReadPropertyItem`.
For the different value types, an implementation of `ReadPropertyItem` is provided.

**Ontology Information**

When processing the representation of resources, entity Iris are collected and retrieved from Knora via the service `OntologyCacheService`.
After expanding the Iris as shown above, the resources entity Iris can be collected and the definitions requested:

```typescript
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
```

An instance of `OntologyInformation` contains the resource class definitions and the properties the resource classes have cardinalities for.
To facilitate this process and minimize the number of requests to be sent to Knora, the ``OntologyCacheService`` gets whole ontologies from Knora each time it encounters an unknown entity and caches them.
Once stored in  the cache, the `OntologyCacheService` can serve the information without doing an additional request to Knora.



### View

#### - dashboard
Here are the dashboards, which are used in the admin interface administrate user, project and system data.

#### - documentation
Simple component which shows this documentation.

#### - login
Login form (will be replaced with a knora-gui module).

#### - modules
Reusable components for dialog boxes, forms, lists, messages, objects (resource viewer) and search panel. All of the components in the modules are smaller modules and are reused in the most of the dashboard components. They will almost all replaced by own knora-gui modules. The idea is to export the components and directives from here to own modules, which will be published on [npm](https://npmjs.com/~knora).

#### - properties
The components in the properties build gui elements for class properties of an object / resource. The directory should be in the modules and will be replaced by knora-gui modules as well.

#### - search
The component for the search results. 

#### - templates
Project-specific templates for own project presentation pages. This will be obsolete, when we implement the knora-gui modules.

#### - test
Test component environment to test single components in a quick way.
