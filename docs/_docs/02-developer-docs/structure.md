---
title: App structure
category: Developer docs
order: 1
---

The Salsah app file structure is organized by angular-cli. We develop our components, directives, pipes and services in two main directories. One directory is called "model", which contains the services (http request) and a second directory is called the "view', which contains all components, directives etc. The structure in both directories is as following:

### Model

#### - services
In this folder were all the http requests to get the data from the Knora api. But they're all moved to an own npm module called [@knora/core](https://www.npmjs.com/package/@knora/core).
There are some services left, which are Salsah app specific and not a part of the core module.

#### - test-data
The data here simulates the api and is used for the service tests.

#### - webapi
In the webapi directory we store interfaces or classes which define the expected data structure from an API. But all the definitions were also moved to the @knora/core module. There's only the definition for Knora V1 left, which is not supported anymore by Salsah and will be deleted in the next few weeks.


### View

#### - dashboard
Here are the dashboards, which are used in the admin interface to administrate users, projects and system data. The components in this folder are part of Salsah admin and will be moved to own Salsah admin app.

#### - documentation
Simple component which shows this documentation.

#### - login
Login form (will be replaced by [@knora/authentication](https://www.npmjs.com/package/@knora/authentication)).

#### - modules
Reusable components for dialog boxes, forms, lists, messages, objects (resource viewer) and search panel. Almost all components in this "modules" folder will be also moved to own knora-ui modules. This could be in [@knora/action](https://www.npmjs.com/package/@knora/action), in [@knora/viewer](https://www.npmjs.com/package/@knora/viewer) or [@knora/search](https://www.npmjs.com/package/@knora/search).


#### - properties
The components in the "properties" folder build gui elements for class properties of an object / a resource. All components in this folder will be moved to [@knora/viewer](https://www.npmjs.com/package/@knora/viewer).

#### - search
A folder which contains components to list search results. These components will be moved to [@knora/viewer](https://www.npmjs.com/package/@knora/viewer) module.

#### - templates
Project-specific templates for own project presentation pages. The content here will be obsolete, when the knora-ui modules are ready and every project can create their own specific application.

#### - test
A simple environment to test single components in a visual and quick way.
