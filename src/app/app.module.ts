import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//
// import the material design modules
//
import {MaterialModule} from '@angular/material';

//
// import other third party modules
//

//
// import the main app components
//
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";

//
// import all needed services
//
import {SessionService} from "./model/api/session.service";
import {LoginService} from "./model/api/login.service";
import {ProjectsService} from "./model/api/projects.service";
import {SearchService} from "./model/api/search.service";

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
import {SearchComponent} from './view/modules/search/search.component';
import {SimpleSearchComponent} from './view/modules/search/simple-search/simple-search.component';
import {ExtendedSearchComponent} from './view/modules/search/extended-search/extended-search.component';
import {PageNotFoundComponent} from './view/modules/error/page-not-found/page-not-found.component';
import {ApiErrorComponent} from './view/modules/error/api-error/api-error.component';
import {AccessDeniedComponent} from './view/modules/error/access-denied/access-denied.component';
import {ProjectsListComponent} from './view/modules/listing/projects-list/projects-list.component';

import {GravatarDirective} from './view/modules/other/gravatar.directive';
import {OverlayDirective} from './view/modules/other/overlay.directive';
import { ResultsComponent } from './view/modules/listing/results/results.component';


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
        PageNotFoundComponent,
        ApiErrorComponent,
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
        AccessDeniedComponent,
        ResultsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        LoginService,
        ProjectsService,
        SearchService,
        SessionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
