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
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ApiServiceResult} from "../../../model/services/api-service-result";
import {ApiServiceError} from "../../../model/services/api-service-error";
import {UserService} from "../../../model/services/user.service";
import {User, UserProfile, Authenticate} from "../../../model/webapi/knora/";


@Component({
    selector: 'salsah-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    isLoading: boolean = true;

    errorMessage: string = undefined;
//    user: User = new User();

    userRoute: string = '/users/';
    user: User = new User();

    ownProfile: boolean = false;

    firstTabClass: string = 'active';

    cur_user: string = undefined;

    menu: any = [
        {
            name: 'Projects',
            route: '/projects'
        },
        {
            name: 'Collections',
            route: '/collections'
        },
        {
            name: 'Settings',
            route: '/settings'
        }

    ];

    auth: any = {
        user: undefined,
        session: undefined
    };

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService
    ) {
    }

    ngOnInit() {
        console.log(this._router.url);

        this._route.params.subscribe((params: Params) => {
            if(params['uid']) {
                this.cur_user = params['uid'];
            }
            else {
                this.cur_user = JSON.parse(localStorage.getItem('auth')).userProfile.userData.email;
                this.ownProfile = true;
            }

            if(this.cur_user) {
                // the current user email is defined; so get the user profile ...
                this._userService.getUser(this.cur_user)
                    .subscribe(
                        (result: ApiServiceResult) => {
                            this.user = result.getBody(User);
                            this.isLoading = false;
                            localStorage.setItem('user', JSON.stringify(
                                this.user
                            ))
                        },
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;
                            localStorage.removeItem('user');
                        }
                    );
            }
            else {
                // error handling or go to the login page
            }



//            this.firstTabClass = (this._router.url === this.projectRoute ? 'active' : undefined);







        });


    }

    disableFirstTab() {
        this.firstTabClass = undefined;
    }

    enableFirstTab() {
        this.firstTabClass = 'active';
    }

}
