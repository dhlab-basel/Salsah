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
import {MessageData} from '../../../modules/message/message.component';
import {User} from '../../../../model/webapi/knora';

@Component({
    selector: 'salsah-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    errorMessage: string = undefined;
    user: User = new User();

    developerInfo: MessageData = {
        status: 304,
        statusMsg: 'User profile dashboard',
        statusText: 'TODO: What should be in the user\'s dashboard? List of last edited instances? Social network? List of Projects!?',
        route: 'dashboard/user/user-profile/'
    };

    constructor() {

    }

    ngOnInit() {
        if (sessionStorage.getItem('currentUser') !== null) {
            this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        }

/*
        // get the user name from the url
        this.userName = decodeURIComponent(this._router.url.split('user/')[1]);
        // check the authentication and compare the userName with the auth.user
        this.auth = this._sessionService.checkAuth();
        if(this.auth.userdata.email !== this.userName) {
            // access denied
            this._router.navigateByUrl('/denied');
        }
        else {
            // show user's profile page incl. settings button
        }
*/
        //

        // get the user's profile data incl. collections, history etc.
        // httpGet...
    }

}
