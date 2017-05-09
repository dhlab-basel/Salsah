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
    Routes


.. Links
.. _Knora: http://knora.org
.. _Sipi: https://github.com/dhlab-basel/Sipi
.. _IIIF: http://iiif.io/

.. Main document content
.. _app routes:

**********
App routes
**********

The app routes are defined in app-routing.module.ts which has the following setup:

    - path: /
        component: DashboardComponent
    - path: /login
        component: LoginComponent
    - path: /logout
        component: DashboardComponent


Project dashboard
=================
In Salsah v1 the project dashboard was the /admin interface.
    - path: /project/:pid
        component: ProjectComponent --> This component has a <router-outlet> for sub components; child routes

        - path: /
            component: ProjectComponent --> Project dashboard

        - path: /settings
            component:  ProjectSettingsComponent --> a project admin can setup and edit the project

        - path: /team
            component:  ProjectTeamComponent --> list of project members; a project admin can edit or add new members or groups

        - path: /resources
            component:  ProjectResourcesComponent --> list of resource classes (ontologies) in the project; a project admin can edit or add new ontologies

        - path: /advanced
            component:  ProjectAdvancedComponent --> advanced resource component;

        - path: /*
            component: PageNotFoundComponent --> the wildcard route shows in any other case a 404 error page

User dashboard
==============
    - path: /user/:uid
        component: UserComponent  --> shows a user profile; user dashboard; uid = user iri
    - path: /profile
        component: UserComponent --> shows the user profile of logged in user
    - path: /settings
        component: UserComponent --> here the user can setup and edit his profile
    - path: /projects
        component: UserComponent --> list of projects where the logged in user is a member of
    - path: /collections
        component: UserComponent --> list of collections of the user; new feature in salsah 2

Search results
==============
    - path: /search/:q
        component: ResultsComponent --> list of results with sub components: ResourceListComponent (simple list), ResourceGridListComponent (grid list); q = search query

Object view
===========
    - path: /object/:rid
        component: ObjectComponent --> This component has some sub components which depending on the resource type of the object (image, text, video, audio, etc.); rid = resource iri

Documentation
=============
    - path: /documentation
        component: DocumentationComponent --> at the moment the route shows this documentation; in the future it will be replaced with a wiki style help page

Special routes
==============
    - path: /denied
        component: AccessDeniedComponent --> 403 error page

    - path: /*
        component: PageNotFoundComponent --> the wildcard route shows in any other case a 404 error page

    - path: /dev
        component: DevelopmentComponent --> route for developers to test single components; the developer has to define the child routes as shown in the following two examples:

        - path: /progress-indicator
            component: ProgressIndicatorComponent
        - path: /progress-stepper
            component: ProgressStepperComponent

