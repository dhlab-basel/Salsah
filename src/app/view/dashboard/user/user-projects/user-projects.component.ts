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

@Component({
    selector: 'salsah-user-projects',
    templateUrl: './user-projects.component.html',
    styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {

    @Input('user') user: UserProfile;

    ownProfile: UserProfile;

    constructor() {
    }

    ngOnInit() {
        console.log('Hallo Welt');
        console.log(JSON.parse(localStorage.getItem('ownProfile')));
        this.ownProfile = (JSON.parse(localStorage.getItem('ownProfile')) ? JSON.parse(localStorage.getItem('ownProfile')) : '');
    }

}
