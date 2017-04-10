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

import {Component, OnInit} from '@angular/core';
import {SessionService} from "./model/services/session.service";
import {ApiServiceResult} from "./model/services/api-service-result";
import {ApiServiceError} from "./model/services/api-service-error";
import {Session} from "./model/webapi/knora/";



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    session: Session = new Session();
    activeSession: boolean;

    constructor(
        private _sessionService: SessionService
    ){}

    ngOnInit() {
        this._sessionService.getSession().subscribe(
            (result: ApiServiceResult) => {
                this.session = result.getBody(Session);
                this.activeSession = this._sessionService.checkSession(this.session);
//                console.log(this.session);
            },
            (error: ApiServiceError) => {
                console.log(error);
            }
        );







    }
}
