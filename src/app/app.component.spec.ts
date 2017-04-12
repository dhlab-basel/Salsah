/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./view/modules/header/header.component";
import {FooterComponent} from "./view/modules/footer/footer.component";
import {RouterModule} from "@angular/router";
import {SearchComponent} from "./view/modules/search/search.component";
import {HeaderToolbarComponent} from "./view/modules/header/header-toolbar/header-toolbar.component";
import {
    MdCoreModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MdInputModule,
    MdSelectModule,
    MdMenuModule,
    MdToolbarModule,
    MdListModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdDialogModule,
    MdTooltipModule
} from '@angular/material';

import {ReversePipe} from "./view/modules/other/reverse.pipe";
import {FormGroupDirective, FormsModule, FormControl} from "@angular/forms";
import {SimpleSearchComponent} from "./view/modules/search/simple-search/simple-search.component";
import {ExtendedSearchComponent} from "./view/modules/search/extended-search/extended-search.component";
import {GravatarDirective} from "./view/modules/other/gravatar.directive";
import {ProjectComponent} from "./view/dashboard/project/project.component";
import {ProjectProfileComponent} from "./view/dashboard/project/project-profile/project-profile.component";
import {ProjectTeamComponent} from "./view/dashboard/project/project-team/project-team.component";
import {ProjectResourcesComponent} from "./view/dashboard/project/project-resources/project-resources.component";
import {ProjectAdvancedComponent} from "./view/dashboard/project/project-advanced/project-advanced.component";
import {UserComponent} from "./view/dashboard/user/user.component";
import {UserProfileComponent} from "./view/dashboard/user/user-profile/user-profile.component";
import {LoginComponent} from "./view/login/login.component";
import {PageNotFoundComponent} from "./view/modules/error/page-not-found/page-not-found.component";
import {ApiErrorComponent} from "./view/modules/error/api-error/api-error.component";
import {HeaderProjectsComponent} from "./view/modules/header/header-projects/header-projects.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {UserSettingsComponent} from "./view/dashboard/user/user-settings/user-settings.component";
import {ProjectSettingsComponent} from "./view/dashboard/project/project-settings/project-settings.component";
import {ProjectsListComponent} from "app/view/modules/listing/projects-list/projects-list.component";
import {OverlayDirective} from "./view/modules/other/overlay.directive";
import {AccessDeniedComponent} from "./view/modules/error/access-denied/access-denied.component";
import {ResultsComponent} from "app/view/modules/listing/results/results.component";
import {ResourceListComponent} from "./view/modules/listing/resource-list/resource-list.component";
import {ResourceGridListComponent} from "./view/modules/listing/resource-grid-list/resource-grid-list.component";
import {ObjectComponent} from "./view/modules/object/object.component";
import {ProjectFormComponent} from "./view/modules/form/project-form/project-form.component";
import {UserFormComponent} from "./view/modules/form/user-form/user-form.component";
import {ResourceClassFormComponent} from "./view/modules/form/resource-class-form/resource-class-form.component";
import {ResourceFormComponent} from "./view/modules/form/resource-form/resource-form.component";
import {DocumentationComponent} from "./view/documentation/documentation.component";
import {UserProjectsComponent} from "./view/dashboard/user/user-projects/user-projects.component";
import {UserCollectionsComponent} from "./view/dashboard/user/user-collections/user-collections.component";
import {KeyPipe} from "./view/modules/other/key.pipe";
import {ProgressIndicatorComponent} from "./view/modules/other/progress-indicator/progress-indicator.component";
import {ProgressStepperComponent} from "app/view/modules/other/progress-stepper/progress-stepper.component";
import {AdvancedResourceClassComponent} from "app/view/modules/form/advanced-resource-class/advanced-resource-class.component";
import {DeveloperHintComponent} from "./view/modules/error/developer-hint/developer-hint.component";
import {ApiService} from "./model/services/api.service";
import {LoginService} from "./model/services/login.service";
import {ProjectsService} from "app/model/services/projects.service";
import {PropertiesService} from "./model/services/properties.service";
import {ResourceService} from "app/model/services/resource.service";
import {ResourceTypesService} from "./model/services/resource-types.service";
import {SearchService} from "./model/services/search.service";
import {SessionService} from "./model/services/session.service";
import {BaseOntologyService} from "app/model/services/base-ontology.service";
import {UserService} from "./model/services/user.service";
import {HttpModule} from "@angular/http";

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
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
                DeveloperHintComponent,
                FormGroupDirective
            ],
            imports: [
                RouterModule,
                FormsModule,
                HttpModule,
                MdCoreModule,
                MdCheckboxModule,
                MdAutocompleteModule,
                MdInputModule,
                MdSelectModule,
                MdMenuModule,
                MdToolbarModule,
                MdListModule,
                MdGridListModule,
                MdCardModule,
                MdTabsModule,
                MdButtonModule,
                MdButtonToggleModule,
                MdChipsModule,
                MdIconModule,
                MdProgressSpinnerModule,
                MdProgressBarModule,
                MdDialogModule,
                MdTooltipModule,
                FormControl
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
                UserService
            ],
        });
        TestBed.compileComponents();
    });

    it('should modify the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app works!'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app works!');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('app works!');
    }));
});
