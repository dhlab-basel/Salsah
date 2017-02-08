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

//
// import all app components
//
import {HeaderComponent} from './view/modules/header/header.component';
import {HeaderToolbarComponent} from './view/modules/header/header-toolbar/header-toolbar.component';
import {HeaderProjectsComponent} from './view/modules/header/header-projects/header-projects.component';
import {FooterComponent} from './view/modules/footer/footer.component';
import {StartComponent} from './view/dashboard/start/start.component';
import {LoginComponent} from './view/login/login.component';
import {UserComponent} from './view/dashboard/user/user.component';
import {ProjectComponent} from './view/dashboard/project/project.component';
import {SearchComponent} from './view/modules/search/search.component';
import {SimpleSearchComponent} from './view/modules/search/simple-search/simple-search.component';
import {ExtendedSearchComponent} from './view/modules/search/extended-search/extended-search.component';
import {PageNotFoundComponent} from './view/modules/error/page-not-found/page-not-found.component';
import {ApiErrorComponent} from './view/modules/error/api-error/api-error.component';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {GravatarDirective} from './view/modules/other/gravatar.directive';
import {ProjectsService} from "./model/api/projects.service";
import { ProfileComponent } from './view/dashboard/user/profile/profile.component';
import { SettingsComponent } from './view/dashboard/user/settings/settings.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        StartComponent,
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
        ProfileComponent,
        SettingsComponent
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
        SessionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
