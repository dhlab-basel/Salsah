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

import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from "../../../../model/webapi/knora/";
import {MessageData} from '../../../modules/message/message.component';

@Component({
    selector: 'salsah-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

    // @Input('user') user: UserProfile;

    user: UserProfile = new UserProfile();

    developerInfo: MessageData = {
        status: 304,
        statusMsg: "User configuration form",
        statusText: "TODO: Here should be a form to change user specific settings",
        route: "dashboard/user/user-settings/"
    };

    constructor() {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    }

}
