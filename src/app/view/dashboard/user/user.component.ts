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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiServiceError, User, UsersService } from '@knora/core';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'salsah-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    isLoading: boolean = true;
    errorMessage: any = undefined;

    // is there a logged-in user?
    // look at localStorage and the object currentUser with email, token and sysAdmin (?) info
    loggedInUser: any;

    // get userProfile by eMail
    email: string;
    user: User = new User();

    // showOwnProfile is a boolean;
    // set it to true if currentUser.email is the same as userProfile.email
    // resp. the one from the route /user/[uid]
    // if showOwnProfile is false, then the access could be denied on some special routes
    // in that case navigate to the login page
    // incl. the current route as a kind of history url parameter
    showOwnProfile: boolean = false;

    // which route is active? we need it for the submodule switch in the template
    // and for the tab navigation menu
    route: string;
    firstTabClass: string = 'active';

    // tab navigation menu
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

    constructor(private _title: Title,
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UsersService) {
    }

    ngOnInit() {
        sessionStorage.removeItem('currentUser');

        // we're using this user component in two cases/routes:
        // a) /user/[uid] as a public dashboard for every user
        // b) /profile, /projects, /collections, /settings as a dashboard with sub modules for the logged in user
        // which case do we have? first collect some data and compare them to know the right setting

        this.route = this._router.url;  // could be /user/[uid], /profile, /projects, /collections or /settings

        this.loggedInUser = JSON.parse(localStorage.getItem('session'));



        if (this.route.indexOf('user') >= 0) {
            // get the email from the user route parameter
            this._route.params.subscribe((params: Params) => {
                if (params['uid']) {
                    // case a)
                    this.email = params['uid'];
                    this._title.setTitle('Salsah | User profile (' + this.email + ')');
                    if (this.loggedInUser !== null) {
                        // if the loggedInUser exists and this email is the same as
                        // the one in the route then switch to /profile (handled in the template)
                        if (params['uid'] === this.loggedInUser.user.email) {
                            this.showOwnProfile = true;
                            this._router.navigateByUrl('/profile');
                        }
                    }
                }
            });
        } else {
            // case b)
            if (this.loggedInUser !== null) {
                this.email = this.loggedInUser.user.name;
                this.showOwnProfile = true;
                this._title.setTitle('Salsah | User admin (' + this.email + ')');
            }

        }

        if (this.email) {
            this._userService.getUser(this.email)
                .subscribe(
                    (result: User) => {
                        this.user = result;
                        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        sessionStorage.removeItem('currentUser');
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }
    }

}
