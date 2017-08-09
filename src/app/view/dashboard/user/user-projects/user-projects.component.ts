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

import {UserProfile} from '../../../../model/webapi/knora/';
import {ProjectFormComponent} from '../../../modules/form/project-form/project-form.component';
import {MdDialog} from '@angular/material';

@Component({
    selector: 'salsah-user-projects',
    templateUrl: './user-projects.component.html',
    styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {

    @Input('user') user: UserProfile;

    ownProfile: UserProfile = JSON.parse(localStorage.getItem('ownProfile'));

    /* TODO: rewrite the attribute settings in framework-for-listings
    list: any = {
        title: 'My projects',
        type: 'project',
        data: this.ownProfile.projects_info
    };
    */

    add: any = {
        title: 'Create new project',
        description: 'bla bla bla ... not yet implemented'
    };
    list: string = 'project';
    title: string = 'My projects';
    listdata: any = this.ownProfile.projects_info;

    constructor() {
    }

    ngOnInit() {
//        this.ownProfile = JSON.parse(localStorage.getItem('ownProfile'));

    }


}

