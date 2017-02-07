import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//
// import the material design modules
//
import { MaterialModule } from '@angular/material';

//
// import other third party modules
//

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";

import { HeaderComponent } from './view/modules/header/header.component';
import { FooterComponent } from './view/modules/footer/footer.component';
import { StartComponent } from './view/dashboard/start/start.component';
import { UserComponent } from './view/dashboard/user/user.component';
import { LoginComponent } from './view/login/login.component';
import { ProjectComponent } from './view/dashboard/project/project.component';
import { SearchComponent } from './view/modules/search/search.component';
import { SimpleSearchComponent } from './view/modules/search/simple-search/simple-search.component';
import { ExtendedSearchComponent } from './view/modules/search/extended-search/extended-search.component';

import { SessionService } from "./model/api/session.service";
import { LoginService } from "./model/api/login.service";


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
    ExtendedSearchComponent
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
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
