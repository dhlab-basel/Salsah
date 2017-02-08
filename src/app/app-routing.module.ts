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

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {LoginComponent} from "./view/login/login.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./view/modules/error/page-not-found/page-not-found.component";


const appRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: DashboardComponent
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}