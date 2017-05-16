import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';

//
// import the main app components
//
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

//
// import the material design modules
//
import {AppMaterialModule} from './app-material-module';
import 'hammerjs';

//
// import other third party modules
//


//
// import all needed services
//
import {LoginService} from './model/services/login.service';
import {ProjectsService} from './model/services/projects.service';
import {ResourceService} from './model/services/resource.service';
import {ResourceTypesService} from './model/services/resource-types.service';
import {SearchService} from './model/services/search.service';
import {SessionService} from './model/services/session.service';
// just to get the basic ontology form the json file
import {BaseOntologyService} from './model/services/base-ontology.service';

//
// import all app components
//
import {HeaderComponent} from './view/modules/header/header.component';
import {HeaderToolbarComponent} from './view/modules/header/header-toolbar/header-toolbar.component';
import {HeaderProjectsComponent} from './view/modules/header/header-projects/header-projects.component';
import {FooterComponent} from './view/modules/footer/footer.component';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {LoginComponent} from './view/login/login.component';
import {UserComponent} from './view/dashboard/user/user.component';
import {UserProfileComponent} from './view/dashboard/user/user-profile/user-profile.component';
import {UserSettingsComponent} from './view/dashboard/user/user-settings/user-settings.component';
import {ProjectComponent} from './view/dashboard/project/project.component';
import {ProjectProfileComponent} from './view/dashboard/project/project-profile/project-profile.component';
import {ProjectSettingsComponent} from './view/dashboard/project/project-settings/project-settings.component';
import {ProjectTeamComponent} from './view/dashboard/project/project-team/project-team.component';
import {ProjectResourcesComponent} from './view/dashboard/project/project-resources/project-resources.component';
import {SearchComponent} from './view/modules/search/search.component';
import {SimpleSearchComponent} from './view/modules/search/simple-search/simple-search.component';
import {ExtendedSearchComponent} from './view/modules/search/extended-search/extended-search.component';

import {ProjectsListComponent} from './view/modules/listing/projects-list/projects-list.component';

import {GravatarDirective} from './view/modules/other/gravatar.directive';
import {OverlayDirective} from './view/modules/other/overlay.directive';
import {ResultsComponent} from './view/modules/listing/results/results.component';
import {ResourceListComponent} from './view/modules/listing/resource-list/resource-list.component';
import {ResourceGridListComponent} from './view/modules/listing/resource-grid-list/resource-grid-list.component';
import {ObjectComponent} from './view/modules/object/object.component';
import {ProjectFormComponent} from './view/modules/form/project-form/project-form.component';
import {UserFormComponent} from './view/modules/form/user-form/user-form.component';
import {ResourceClassFormComponent} from './view/modules/form/resource-class-form/resource-class-form.component';
import {ResourceFormComponent} from './view/modules/form/resource-form/resource-form.component';
import {ReversePipe} from './view/modules/other/reverse.pipe';
import {PropertiesService} from './model/services/properties.service';
import {DocumentationComponent} from './view/documentation/documentation.component';
import {UserProjectsComponent} from './view/dashboard/user/user-projects/user-projects.component';
import {UserCollectionsComponent} from './view/dashboard/user/user-collections/user-collections.component';
import {ProjectAdvancedComponent} from './view/dashboard/project/project-advanced/project-advanced.component';
import {UserService} from './model/services/user.service';
import {ApiService} from './model/services/api.service';
import {KeyPipe} from './view/modules/other/key.pipe';
import {ProgressIndicatorComponent} from './view/modules/other/progress-indicator/progress-indicator.component';
import {ProgressStepperComponent} from './view/modules/other/progress-stepper/progress-stepper.component';
import {AdvancedResourceClassComponent} from './view/modules/form/advanced-resource-class/advanced-resource-class.component';

import { UserSelectComponent } from './view/modules/form/user-select/user-select.component';
import { DevelopmentComponent } from './view/test/development/development.component';

import { MessageComponent } from './view/modules/message/message.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        UserComponent,
        LoginComponent,
        ProjectComponent,
        SearchComponent,
        SimpleSearchComponent,
        ExtendedSearchComponent,
        HeaderToolbarComponent,
        HeaderProjectsComponent,
        DashboardComponent,
        GravatarDirective,
        UserSettingsComponent,
        ProjectSettingsComponent,
        UserProfileComponent,
        ProjectProfileComponent,
        ProjectsListComponent,
        OverlayDirective,
        ResultsComponent,
        ResourceListComponent,
        ResourceGridListComponent,
        ObjectComponent,
        ProjectTeamComponent,
        ProjectResourcesComponent,
        ProjectFormComponent,
        UserFormComponent,
        ResourceClassFormComponent,
        ResourceFormComponent,
        DocumentationComponent,
        UserProjectsComponent,
        UserCollectionsComponent,
        ProjectAdvancedComponent,
        ReversePipe,
        KeyPipe,
        ProgressIndicatorComponent,
        ProgressStepperComponent,
        AdvancedResourceClassComponent,
        UserSelectComponent,
        DevelopmentComponent,
        MessageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        AppMaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    // we need the entryComponents for every component inside of a md-dialog module
    entryComponents: [
        ResourceClassFormComponent,
        UserFormComponent
    ],
    providers: [
        ApiService,
        LoginService,
        ProjectsService,
        PropertiesService,
        ResourceService,
        ResourceTypesService,
        SearchService,
        SessionService,
        BaseOntologyService,
        UserService,
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
