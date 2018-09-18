import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, KuiAuthenticationModule, LoginFormComponent } from '@knora/authentication';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
//
// import the main app components
//
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//
// import the material design modules
//
import { AppMaterialModule } from './app-material-module';
import 'hammerjs';
//
// import other third party modules
import { AngularSplitModule } from 'angular-split';
//
import { DndModule } from 'ng2-dnd';
//
// import all npm salsah modules
import { KuiCoreModule } from '@knora/core';
import { KuiSearchModule } from '@knora/search';
import { KuiActionModule } from '@knora/action';
//
// import directives, pipes etc.
//
import { ForbiddenNameDirective } from './view/modules/other/forbidden-name.directive';
import { ImageDirective } from './view/modules/other/image.directive';
import { OverlayDirective } from './view/modules/other/overlay.directive';
//
// import all app components
//
import { HeaderComponent } from './view/modules/framework/main-framework/header/header.component';
import { HeaderToolbarComponent } from './view/modules/framework/main-framework/header/header-toolbar/header-toolbar.component';
import { HeaderProjectsComponent } from './view/modules/framework/main-framework/header/header-projects/header-projects.component';
import { FooterComponent } from './view/modules/framework/main-framework/footer/footer.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LoginComponent } from './view/login/login.component';
import { UserComponent } from './view/dashboard/user/user.component';
import { UserProfileComponent } from './view/dashboard/user/user-profile/user-profile.component';
import { UserSettingsComponent } from './view/dashboard/user/user-settings/user-settings.component';
import { ProjectComponent } from './view/dashboard/project/project.component';
import { ProjectProfileComponent } from './view/dashboard/project/project-profile/project-profile.component';
import { ProjectSettingsComponent } from './view/dashboard/project/project-settings/project-settings.component';
import { ProjectTeamComponent } from './view/dashboard/project/project-team/project-team.component';
import { ProjectResourcesComponent } from './view/dashboard/project/project-resources/project-resources.component';
import { ProjectsListComponent } from './view/modules/listing/projects-list/projects-list.component';
import { ResourcesListComponent } from './view/modules/listing/resources-list/resources-list.component';
import { ResourceGridListComponent } from './view/modules/listing/resource-grid-list/resource-grid-list.component';
import { ProjectFormComponent } from './view/modules/form/project-form/project-form.component';
import { ResourceClassFormComponent } from './view/modules/form/resource-class-form/resource-class-form.component';
import { ResourceFormComponent } from './view/modules/form/resource-form/resource-form.component';
import { DocumentationComponent } from './view/documentation/documentation.component';
import { UserProjectsComponent } from './view/dashboard/user/user-projects/user-projects.component';
import { UserCollectionsComponent } from './view/dashboard/user/user-collections/user-collections.component';
import { ProjectAdvancedComponent } from './view/dashboard/project/project-advanced/project-advanced.component';
import { ProgressStepperComponent } from './view/modules/other/progress-stepper/progress-stepper.component';
import { UserFormComponent } from './view/modules/form/user-form/user-form.component';
import { DevelopmentComponent } from './view/test/development/development.component';
import { MessageComponent } from './view/modules/message/message.component';
import { NewResourceClassComponent } from './view/modules/form/new-resource-class/new-resource-class.component';
import { EditResourceClassComponent } from './view/modules/form/edit-resource-class/edit-resource-class.component';
import { SystemComponent } from './view/dashboard/system/system.component';
import { SystemUsersComponent } from './view/dashboard/system/system-users/system-users.component';
import { UsersListComponent } from './view/modules/listing/users-list/users-list.component';
import { FrameworkForListingsComponent } from './view/modules/framework/framework-for-listings/framework-for-listings.component';
import { UserObjectComponent } from './view/modules/object/user-object/user-object.component';
import { MessageDialogComponent } from './view/modules/dialog/message-dialog/message-dialog.component';
import { FormDialogComponent } from './view/modules/dialog/form-dialog/form-dialog.component';
import { ResourceTypesListComponent } from './view/modules/listing/resource-types-list/resource-types-list.component';
import { CollectionsListComponent } from './view/modules/listing/collections-list/collections-list.component';
import { SearchResultsComponent } from './view/search/search-results/search-results.component';
import { ResourceObjectComponent } from './view/modules/object/resource-object/resource-object.component';
import { DndDirective } from './view/modules/other/dnd.directive';
import { ResizeGridDirective } from './view/modules/other/resize-grid.directive';
import { FormCreateComponent } from './view/test/development/form-create/form-create.component';
import { FocusDirective } from './view/modules/other/focus.directive';
import { ConfirmDialogComponent } from './view/modules/dialog/confirm-dialog/confirm-dialog.component';
import { ProjectListsAdminComponent } from './view/dashboard/project/project-lists-admin/project-lists-admin.component';
import { MathJaxDirective } from './view/modules/other/mathjax.directive';
import { ReadTextValueAsHtmlComponent } from './view/properties/read-text-value-as-html/read-text-value-as-html.component';
import { ReadDateValueComponent } from './view/properties/read-date-value/read-date-value.component';
import { ReadLinkValueComponent } from './view/properties/read-link-value/read-link-value.component';
import { ReadTextValueAsStringComponent } from './view/properties/read-text-value-as-string/read-text-value-as-string.component';
import { ReadTextValueAsXmlComponent } from './view/properties/read-text-value-as-xml/read-text-value-as-xml.component';
import { ReadIntegerValueComponent } from './view/properties/read-integer-value/read-integer-value.component';
import { ReadDecimalValueComponent } from './view/properties/read-decimal-value/read-decimal-value.component';
import { ReadTextfileValueComponent } from './view/properties/read-textfile-value/read-textfile-value.component';
import { StillImageOSDViewerComponent } from './view/properties/still-image-osdviewer/still-image-osdviewer.component';
import { ReadGeomValueComponent } from './view/properties/read-geom-value/read-geom-value.component';
import { ReadColorValueComponent } from './view/properties/read-color-value/read-color-value.component';
import { SystemProjectsComponent } from './view/dashboard/system/system-projects/system-projects.component';
import { SystemOntologiesComponent } from './view/dashboard/system/system-ontologies/system-ontologies.component';
import { ProjectOntologiesComponent } from './view/dashboard/project/project-ontologies/project-ontologies.component';
import { OntologiesListComponent } from './view/modules/listing/ontologies-list/ontologies-list.component';
import { UsersListItemComponent } from './view/modules/listing/users-list/users-list-item/users-list-item.component';
import { OntologyFormComponent } from './view/modules/form/ontology-form/ontology-form.component';
import { ReadUriValueComponent } from './view/properties/read-uri-value/read-uri-value.component';
import { ReadBooleanValueComponent } from './view/properties/read-boolean-value/read-boolean-value.component';
import { ReadIntervalValueComponent } from './view/properties/read-interval-value/read-interval-value.component';
import { ReadListValueComponent } from './view/properties/read-list-value/read-list-value.component';
import { TreeModule } from 'angular-tree-component';
import { ListsListComponent } from './view/modules/listing/lists-list/lists-list.component';
import { OntologiesListItemComponent } from './view/modules/listing/ontologies-list/ontologies-list-item/ontologies-list-item.component';
import { InternationalizationComponent } from './view/modules/framework/main-framework/internationalization/internationalization.component';
import { ExistingNameDirective } from './view/modules/other/existing-name.directive';
import { FormTestComponent } from './view/test/development/form-test/form-test.component';
import { UserDataComponent } from './view/modules/form/user-form/user-data/user-data.component';
import { GndDirective } from './view/modules/other/gnd.directive';
import { MatJDNConvertibleCalendarDateAdapterModule } from 'jdnconvertiblecalendardateadapter';
import { BeolComponent } from './view/templates/beol/beol.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { ContactFormComponent } from './view/modules/form/contact-form/contact-form.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { DialogTestComponent } from './view/test/development/dialog-test/dialog-test.component';
import { ObjectDialogComponent } from './view/modules/dialog/object-dialog/object-dialog.component';
import { UserRoleComponent } from './view/modules/form/user-form/user-role/user-role.component';
import { UserPasswordComponent } from './view/modules/form/user-form/user-password/user-password.component';
import { ListFormComponent } from './view/modules/form/list-form/list-form.component';
import { ProjectDataComponent } from './view/modules/form/project-form/project-data/project-data.component';
import { NodeFormComponent } from './view/modules/form/list-form/node-form/node-form.component';
import { LeooComponent } from './view/templates/leoo/leoo.component';
import { ObjectViewerComponent } from './view/modules/object/object-viewer/object-viewer.component';


// Loads the application configuration file during application startup
import {AppConfig} from './app.config';
export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.loadAppConfig();
}

// Translate: AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        UserComponent,
        LoginComponent,
        ProjectComponent,
        HeaderToolbarComponent,
        HeaderProjectsComponent,
        DashboardComponent,
        ImageDirective,
        UserSettingsComponent,
        ProjectSettingsComponent,
        UserProfileComponent,
        ProjectProfileComponent,
        ProjectsListComponent,
        OverlayDirective,
        ResourcesListComponent,
        ResourceGridListComponent,
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
        ProgressStepperComponent,
        MathJaxDirective,
        DevelopmentComponent,
        MessageComponent,
        ReadTextValueAsHtmlComponent,
        ReadDateValueComponent,
        ReadLinkValueComponent,
        ReadTextValueAsStringComponent,
        ReadTextValueAsXmlComponent,
        ReadIntegerValueComponent,
        ReadDecimalValueComponent,
        StillImageOSDViewerComponent,
        NewResourceClassComponent,
        ProjectListsAdminComponent,
        EditResourceClassComponent,
        SystemComponent,
        SystemUsersComponent,
        SystemProjectsComponent,
        SystemOntologiesComponent,
        ReadGeomValueComponent,
        ReadColorValueComponent,
        UsersListComponent,
        FrameworkForListingsComponent,
        UserObjectComponent,
        MessageDialogComponent,
        ForbiddenNameDirective,
        FormDialogComponent,
        ResourceTypesListComponent,
        CollectionsListComponent,
        SearchResultsComponent,
        ResourceObjectComponent,
        DndDirective,
        ResizeGridDirective,
        FormCreateComponent,
        FocusDirective,
        ConfirmDialogComponent,
        ProjectOntologiesComponent,
        OntologiesListComponent,
        UsersListItemComponent,
        OntologyFormComponent,
        ReadUriValueComponent,
        ReadBooleanValueComponent,
        ReadIntervalValueComponent,
        ReadListValueComponent,
        ListsListComponent,
        OntologiesListItemComponent,
        FormTestComponent,
        UserDataComponent,
        InternationalizationComponent,
        ExistingNameDirective,
        ExistingNameDirective,
        BeolComponent,
        GndDirective,
        InternationalizationComponent,
        ContactFormComponent,
        DialogTestComponent,
        ObjectDialogComponent,
        UserRoleComponent,
        UserPasswordComponent,
        ListFormComponent,
        ProjectDataComponent,
        ReadTextfileValueComponent,
        NodeFormComponent,
        LeooComponent,
        ObjectViewerComponent
    ],
    imports: [
        BrowserModule,
        KuiCoreModule.initializeApp({
            name: AppConfig.settings.appName,
            api: AppConfig.settings.apiURL,
            media: AppConfig.settings.iiifURL,
            app: AppConfig.settings.appURL
        }),
        KuiSearchModule,
        KuiActionModule,
        KuiAuthenticationModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        AppMaterialModule,
        MatJDNConvertibleCalendarDateAdapterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TreeModule,
        DndModule.forRoot(),
        HttpClientModule,
        AngularFireModule.initializeApp(AppConfig.settings.firebase),
        InfiniteScrollModule,
        RecaptchaModule.forRoot(),
        AngularSplitModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    // we need the entryComponents for every component inside of a mat-dialog module
    entryComponents: [
        ConfirmDialogComponent,
        FormDialogComponent,
        MessageDialogComponent,
        ObjectDialogComponent,
        LoginFormComponent,
        ResourceClassFormComponent // deprecated!!
    ],
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig],
            multi: true
        },
        AngularFirestore,
        {
            provide: APP_BASE_HREF,
            useValue: '/' },
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
                siteKey: '6LdmmUoUAAAAAPZ4Z_1xYEIwEgI1d9YdjlZKmVkV',
            } as RecaptchaSettings,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
