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
import {Session, Authenticate} from "./model/webapi/knora";
import {SessionService} from "./model/services/session.service";
import {ApiServiceResult} from "./model/services/api-service-result";
import {ApiServiceError} from "./model/services/api-service-error";

function getDocument(): any {
    return document;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    session: Session = new Session();
    auth: Authenticate = new Authenticate();

    constructor(
        private _sessionService: SessionService
    ){}

    ngOnInit() {
        this._sessionService.getSession()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.session = result.getBody(Session);
                },
                (error: ApiServiceError) => {
                    // the authentication (services session) is not valid!
                    // log out the user:
                    // a) remove all the session cookies
                    getDocument().cookie = "sid=;expires=-1";
                    getDocument().cookie = "KnoraAuthentication=;expires=-1";
                    // b) remove the local storage authentication values
                    localStorage.removeItem('auth');
                    this.auth = this._sessionService.checkAuth();
                }
            );
    }
}
