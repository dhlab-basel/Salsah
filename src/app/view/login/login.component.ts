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
import {LoginService} from "../../model/services/login.service";
import {Authenticate} from "../../model/webapi/knora/";

function getDocument(): any {
    return document;
}



@Component({
    selector: 'salsah-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    isLoading: boolean = false;

    loginErrorUser: boolean = false;
    loginErrorPw: boolean = false;
    loginErrorServer: boolean = false;

    /*
     TODO: language packages: login
     */
    public login = {
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


    public signup = {
        title: "New to Salsah?",
        subtitle: "Sign up to avail all of our services",
        button: "Contact us on how"
    };
    // end of language package for login
    //

    constructor(
        private _route: ActivatedRoute,
        private _loginService: LoginService) {
    }

    ngOnInit() {

    }

    onSubmit(lf: any): void {

        this._loginService.login(lf.email, lf.password).subscribe(
            (result: ApiServiceResult) => {

                this.isLoading = true;

                let authentication: Authenticate = result.getBody(Authenticate);

                getDocument().cookie = "sid=" + authentication.sid;
                getDocument().cookie = "KnoraAuthentication=" + authentication.sid;

                localStorage.setItem('auth', JSON.stringify(authentication));

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

    }

}
