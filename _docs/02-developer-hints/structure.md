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
This folder contains the object interfaces for the mapping of the data to be sure to have the correct and expected type.


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
