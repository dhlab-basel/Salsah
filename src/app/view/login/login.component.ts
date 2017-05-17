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
import {ActivatedRoute} from "@angular/router";
import {ApiServiceResult} from "../../model/services/api-service-result";
import {ApiServiceError} from "../../model/services/api-service-error";
import {SessionService} from "../../model/services/session.service";
import {Session, UserProfile} from "../../model/webapi/knora/";
import {User} from "../../model/webapi/knora/v1/users/user";
import {ProjectItem} from "../../model/webapi/knora/v1/projects/project-item";


function getDocument(): any {
    return document;
}



@Component({
    selector: 'salsah-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    errorMessage: any;
    isLoading: boolean = false;

    loginErrorUser: boolean = false;
    loginErrorPw: boolean = false;
    loginErrorServer: boolean = false;

//    session: Session = new Session();
//    userProfile: UserProfile = new UserProfile();
//    sessionId: string = undefined;

    /*
     TODO: language packages: login
     */
    login = {
        title: "Already have an account?",
        name: "Username",
        pw: "Password",
        button: "Login",
        remember: "Remember me",
        forgot_pw: "Forgot password?",
        error: {
            failed: "Password or username is wrong",
            server: "There's an error with the server connection. Try it again later or inform the Knora Team"
        }
    };

    signup = {
        title: "New to Salsah?",
        subtitle: "Sign up to avail all of our services",
        button: "Contact us on how"
    };
    // end of language package for login
    //

    constructor(
        private _route: ActivatedRoute,
        private _sessionService: SessionService) {
    }

    ngOnInit() {

    }

    onSubmit(lf: any): void {

        this._sessionService.login(lf.email, lf.password)
            .subscribe(
                (result: ApiServiceResult) => {

                    let session: Session = result.getBody(Session);

                    getDocument().cookie = "sid=" + session.sid;
                    getDocument().cookie = "KnoraAuthentication=" + session.sid;

                    // we had an issue to store the object array from projects_info; it was always empty
                    // so let's create a "real" array of user's projects and add it again to the userProfile
                    let usersProjects: ProjectItem[] = [];
                    for (let k in session.userProfile.projects_info) {
                        if (session.userProfile.projects_info.hasOwnProperty(k)) {
                            console.log(session.userProfile.projects_info[k]);
                            usersProjects.push(session.userProfile.projects_info[k]);
                        }
                    }
                    session.userProfile.projects_info = usersProjects;

                    // now we can store the userProfile as ownProfile locally
                    localStorage.setItem('ownProfile', JSON.stringify(session.userProfile));

                    // after successful login, we want to go back to the previous page e.g. search incl. query
                    // for this case, we stored the previous url parameters in the current login url as query params
                    //
                    let goToUrl: string = '/';
                    this._route.queryParams.subscribe(
                        data => goToUrl = (data['h'] === undefined ? '/' : data['h'])
                    );

                    window.location.replace(goToUrl);

                },
                (error: ApiServiceError) => {
                    if(error.status === 0) {
                        this.loginErrorUser = false;
                        this.loginErrorPw = false;
                        this.loginErrorServer = true;
                    }
                    if(error.status === 401) {
                        this.loginErrorUser = false;
                        this.loginErrorPw = true;
                        this.loginErrorServer = false;
                    }
                    if(error.status === 404) {
                        this.loginErrorUser = true;
                        this.loginErrorPw = false;
                        this.loginErrorServer = false;
                    }
                    this.errorMessage = <any>error;
                }
            );

/*
        this._loginService.login(lf.email, lf.password).subscribe(
            (result: ApiServiceResult) => {

                this.isLoading = true;

                let authentication: Authenticate = result.getBody(Authenticate);

                let session: Session = result.getBody(Session);

                console.log(session.userProfile);

                getDocument().cookie = "sid=" + authentication.sid;
                getDocument().cookie = "KnoraAuthentication=" + authentication.sid;

                localStorage.setItem('ownProfile', JSON.stringify(session.userProfile));

                //
                // after successful login, we want to go back to the previous page e.g. search incl. query
                // for this case, we stored the previous url parameters in the current login url as query params
                //
                let goToUrl: string = '/';
                this._route.queryParams.subscribe(
                    data => goToUrl = (data['h'] === undefined ? '/' : data['h'])
                );

                window.location.replace(goToUrl);

            },
            (error: ApiServiceError) => {
                if(error.status === 0) {
                    this.loginErrorUser = false;
                    this.loginErrorPw = false;
                    this.loginErrorServer = true;
                }
                if(error.status === 401) {
                    this.loginErrorUser = false;
                    this.loginErrorPw = true;
                    this.loginErrorServer = false;
                }
                if(error.status === 404) {
                    this.loginErrorUser = true;
                    this.loginErrorPw = false;
                    this.loginErrorServer = false;
                }

            }
        );
        */

    }

}
