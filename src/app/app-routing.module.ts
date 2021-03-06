/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressIndicatorComponent } from '@knora/action';
import { AuthGuard } from '@knora/authentication';
import { DashboardComponent } from './view/dashboard/dashboard.component';

import { ProjectAdvancedComponent } from './view/dashboard/project/project-advanced/project-advanced.component';
import { ProjectListsAdminComponent } from './view/dashboard/project/project-lists-admin/project-lists-admin.component';

import { ProjectOntologiesComponent } from './view/dashboard/project/project-ontologies/project-ontologies.component';
import { ProjectProfileComponent } from './view/dashboard/project/project-profile/project-profile.component';
import { ProjectResourcesComponent } from './view/dashboard/project/project-resources/project-resources.component';
import { ProjectSettingsComponent } from './view/dashboard/project/project-settings/project-settings.component';
import { ProjectTeamComponent } from './view/dashboard/project/project-team/project-team.component';

import { ProjectComponent } from './view/dashboard/project/project.component';
import { SystemOntologiesComponent } from './view/dashboard/system/system-ontologies/system-ontologies.component';
import { SystemProjectsComponent } from './view/dashboard/system/system-projects/system-projects.component';
import { SystemUsersComponent } from './view/dashboard/system/system-users/system-users.component';
import { SystemComponent } from './view/dashboard/system/system.component';
import { UserComponent } from './view/dashboard/user/user.component';
import { DocumentationComponent } from './view/documentation/documentation.component';

import { LoginComponent } from './view/login/login.component';
import { ContactFormComponent } from './view/modules/form/contact-form/contact-form.component';
import { NewResourceClassComponent } from './view/modules/form/new-resource-class/new-resource-class.component';
import { ProjectFormComponent } from './view/modules/form/project-form/project-form.component';
import { UserFormComponent } from './view/modules/form/user-form/user-form.component';
import { MessageComponent } from './view/modules/message/message.component';
import { ObjectViewerComponent } from './view/modules/object/object-viewer/object-viewer.component';
import { ProgressStepperComponent } from './view/modules/other/progress-stepper/progress-stepper.component';
import { SearchResultsComponent } from './view/search/search-results/search-results.component';
import { DevelopmentComponent } from './view/test/development/development.component';
import { DialogTestComponent } from './view/test/development/dialog-test/dialog-test.component';
import { FormCreateComponent } from './view/test/development/form-create/form-create.component';
import { FormTestComponent } from './view/test/development/form-test/form-test.component';


const appRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: DashboardComponent
    },
    {
        // Public user profile
        path: 'user/:uid', component: UserComponent
    },
    {
        // User profile = Dashboard for logged in users
        path: 'profile', component: UserComponent, canActivate: [AuthGuard],
    },
    {
        // User settings
        path: 'settings', component: UserComponent, canActivate: [AuthGuard],
    },
    {
        // User projects
        path: 'projects', component: UserComponent, canActivate: [AuthGuard],
    },
    {
        // User collections
        path: 'collections', component: UserComponent, canActivate: [AuthGuard],
    },
    {
        path: 'search/:mode/:q',
        component: SearchResultsComponent
    },
    {
        path: 'object/:rid',
        component: ObjectViewerComponent
    },
    {
        path: 'contact',
        component: ContactFormComponent
    },
    {
        path: 'project/:pid', component: ProjectComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '', component: ProjectProfileComponent
            },
            {
                path: 'settings', component: ProjectSettingsComponent
            },
            {
                path: 'team', component: ProjectTeamComponent
            },
            {
                path: 'ontologies', component: ProjectOntologiesComponent,
            },
            // {
            //     path: 'ontology/:oid',
            //     children: [
            //         {
            //             path: '', component: ProjectOntologiesComponent
            //         }
            //     ]
            // },
            {
                path: 'resources', component: ProjectResourcesComponent
            },
            {
                path: 'lists', component: ProjectListsAdminComponent
            },
            {
                path: 'advanced', component: ProjectAdvancedComponent
            },
            {
                path: '**',
                component: MessageComponent,
                data: { status: 404 }
            }
        ]
    },
    {
        path: 'system', component: SystemComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '', redirectTo: 'projects', pathMatch: 'full'
            },
            {
                path: 'users', component: SystemUsersComponent
            },
            {
                path: 'projects', component: SystemProjectsComponent
            },
            {
                path: 'ontologies', component: SystemOntologiesComponent
            },
            {
                path: '**',
                component: MessageComponent,
                data: { status: 404 }
            }
        ]
    },
    {
        // create new project
        path: 'new', component: ProjectFormComponent
    },
    {
        path: 'documentation', component: DocumentationComponent
    },
    {
        path: 'denied',
        component: MessageComponent,
        data: { status: 403 }
    },
    {
        path: 'dev', component: DevelopmentComponent,
        children: [
            {
                path: 'progress-stepper',
                component: ProgressStepperComponent
            },
            {
                path: 'progress-indicator',
                component: ProgressIndicatorComponent
            },
            {
                path: 'form/:name', component: FormCreateComponent,
                children: [
                    {
                        path: '', redirectTo: 'project', pathMatch: 'full'
                    },
                    {
                        path: 'user', component: UserFormComponent
                    }
                ]
            },
            {
                path: 'form-test', component: FormTestComponent
            },
            {
                path: 'new-res-class',
                component: NewResourceClassComponent
            },
            {
                path: 'message',
                component: MessageComponent,
                data: { status: 400 }
            },
            {
                path: 'dialog',
                component: DialogTestComponent
            },
            {
                path: 'new-user',
                component: UserFormComponent
            }
        ]
    },
    {
        path: '**',
        component: MessageComponent,
        data: { status: 404 }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
