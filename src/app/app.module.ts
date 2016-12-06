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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//
// import the material design modules
//
import { MaterialModule } from '@angular/material';

//
//  import all components
//
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/framework/header/header.component';
import { VideoObjectComponent } from './components/object/video-object/video-object.component';
import { SimpleSearchComponent } from './components/search/simple-search/simple-search.component';
import { SearchComponent } from './components/search/search.component';
import { ExtendedSearchComponent } from './components/search/extended-search/extended-search.component';
import { GridViewComponent } from './components/view/grid-view/grid-view.component';
import { ListViewComponent } from './components/view/list-view/list-view.component';
import { TableViewComponent } from './components/view/table-view/table-view.component';
import { DashboardViewComponent } from './components/view/dashboard-view/dashboard-view.component';
import { PageNotFoundComponent } from './components/framework/page-not-found/page-not-found.component';
import { ResultsViewComponent } from './components/view/results-view/results-view.component';

//
// import all services
//
import { SearchService } from './services/search.service';
import { CenterElementDirective } from './directives/center-element.directive';


//
// define all routes
//
const appRoutes: Routes = [
    {
        path: '',
        component: DashboardViewComponent
    },
    {
        path: 'search/:query', // /:view',
        component: ResultsViewComponent    // default view for search results
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        VideoObjectComponent,
        SimpleSearchComponent,
        SearchComponent,
        ExtendedSearchComponent,
        GridViewComponent,
        ListViewComponent,
        TableViewComponent,
        DashboardViewComponent,
        PageNotFoundComponent,
        ResultsViewComponent,
        CenterElementDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        SearchService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
