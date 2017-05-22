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
import {Location} from '@angular/common';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ApiServiceResult} from "../../../model/services/api-service-result";
import {ApiServiceError} from "../../../model/services/api-service-error";
import {UserService} from "../../../model/services/user.service";
import {User, UserProfile} from "../../../model/webapi/knora/";


@Component({
    selector: 'salsah-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    isLoading: boolean = true;
    errorMessage: string = undefined;

    // the userProfile of the logged in user
    ownProfile: UserProfile = new UserProfile();

    // a userProfile that we get with the user id, if it's defined in the route
    userProfile: UserProfile = new UserProfile();

    // showOwnProfile is a boolean; set it to true if ownProfile is the same as userProfile
    showOwnProfile: boolean = false;

    // which route is active?
    route: string;

    // access denied?
    accessDenied: boolean = true;


    //    user: User = new User();

    //    userRoute: string = '/users/';

//    user: User = new User();




    firstTabClass: string = 'active';

    cur_user: string = undefined;

    menu: any = [
        {
            name: '',
            route: '/profile'
        },
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

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _userService: UserService) {
    }

    ngOnInit() {

        this.route = this._router.url;

        // a) do we have a logged in user? ownProfile = null || UserProfile;
        if(JSON.parse(localStorage.getItem('ownProfile')) !== null) this.userProfile = JSON.parse(localStorage.getItem('ownProfile'));


        // we're using the user component for two routes:
        // a) /user/[uid] as a public dashboard of a user
        // b) /profile, /projects, /collections, /settings as dashboard sub modules for the logged in user
        if(this.route.indexOf('user') >= 0) {
            // the route is a case of a)!
            // if the uid (user id = email) is the same as the one of the logged in user, go to url /profile
            // else: get the user data by email and show the user's profile
            this._route.params.subscribe((params: Params) => {
                if (params['uid']) {
                    if(this.userProfile.userData !== undefined) this.showOwnProfile = params['uid'] === this.userProfile.userData.email;
                    if(!this.showOwnProfile) {
                        this._userService.getUser(params['uid'])
                            .subscribe(
                                (result: ApiServiceResult) => {
                                    this.userProfile = result.getBody(User).userProfile;
                                    this.isLoading = false;
                                },
                                (error: ApiServiceError) => {
                                    this.errorMessage = <any>error;
                                }
                            );
                    }
                    else {
                        // showOwnProfile is true; navigate to the logged in user profile
                        this._router.navigateByUrl('/profile');
                    }
                }

            });
        }
        else {
            // the route is one of the variant b)
            // if a user isn't logged in, go to the /login page
            if(this.userProfile.userData === undefined) {
                // there's no logged-in user and the route doesn't match a user id (uid)
                this.showOwnProfile = false;

                // go to the login page and bring the user back to this page after successful login
                let goToUrl: string = '/login';
                if (this._router.url !== '/') goToUrl += '?h=' + encodeURIComponent(this._router.url);
                this._router.navigateByUrl(goToUrl);
                //                window.location.replace(goToUrl);
            }
            else {
                this.showOwnProfile = true;
                this.isLoading = false;
            }
        }



/*


        if(this.ownProfile !== null && this.userProfile.userData !== undefined) {
            // an active user is logged in and the userProfile was filled in b)
            // set the showOwnProfile to true if ownProfile is the same as the userProfile

        }

        console.log(this.ownProfile);
        console.log(this.userProfile);


        console.log(this._router);

        this._route.params.subscribe((params: Params) => {

        });


        if (JSON.parse(localStorage.getItem('ownProfile')) !== null) {
            // a user is logged in; get his user profile from localStorage


        }


        // which route do we have? /user/[email] --> show users profile (it can be public!)
        this._route.params.subscribe((params: Params) => {
            if (params['uid']) {
                this.cur_user = params['uid'];
            }
            else {
                if (this.ownProfile !== null) {
//                    console.log(JSON.parse(localStorage.getItem('ownProfile')));
                    this.cur_user = this.ownProfile.userData.email;
//                    this.showOwnProfile = true;
                }
                else {
                    // there's no logged-in user and the route doesn't match a user id (uid)
                    // go to the login page and bring the user back to this page after successful login
                    let goToUrl: string = '/login';
                    if (this._router.url !== '/') goToUrl += '?h=' + encodeURIComponent(this._router.url);
                    window.location.replace(goToUrl);
//                    this._sessionService.checkAuth(true);
                }
            }
/*
            if (this.cur_user) {
                // the current user email is defined; so get the user profile ...
                this._userService.getUser(this.cur_user)
                    .subscribe(
                        (result: ApiServiceResult) => {
                            this.user = result.getBody(User);
                            this.isLoading = false;
                            localStorage.setItem('userProfile', JSON.stringify(
                                this.user
                            ));
                            this.menu[0].name = this.user.userProfile.userData.firstname + ' ' + this.user.userProfile.userData.lastname;

                        },
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;
                            localStorage.removeItem('userProfile');
                        }
                    );
            }
*/

//            this.firstTabClass = (this._router.url === this.projectRoute ? 'active' : undefined);


//        });
//        });


    }

    disableFirstTab() {
        this.firstTabClass = undefined;
    }

    enableFirstTab() {
        this.firstTabClass = 'active';
    }

}
