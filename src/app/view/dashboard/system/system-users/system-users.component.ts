/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
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
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {UserService} from '../../../../model/services/user.service';
import {UsersList, UserProfile} from '../../../../model/webapi/knora/';
import {MdDialog} from '@angular/material';
import {UserData} from '../../../../model/webapi/knora/v1/users/user-data';

@Component({
    selector: 'salsah-system-users',
    templateUrl: './system-users.component.html',
    styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent implements OnInit {

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // this component makes a http request (service)
    // if something's going wrong, we need an error message "container"
    errorMessage: string = undefined;

    // list of users
    usersList: UsersList = new UsersList();
    // and a user's list for sorting
//    users: any = [];

    // user profile
//    user: User;

    // table columns header
    displayedColumns = ['Gravatar', 'Prename', 'Lastname', 'eMail'];

    // the sub module of this component can contain
    // a) a form to create a new user and add it to the project
    newUserIsActive: boolean = false;
    // OR
    // b) a form to edit an existing user
    editUserIsActive: boolean = false;
    // we need to know, which one is active

    // definition of the position for the preview (main module) and the detail view (sub module)
    position = {
        preview: 'left',            // top
        detail: 'right'             // bottom
    };

    // the size of the main module. It is large by default.
    // if the the new resource module or the edit resource module is active,
    // the size changes
    size: string = 'large';

    // sort the list of members by lastname OR firstname.
    // the sortBy method toggles the right setting, which is defined here
    sortProps: any = [
        {
            key: 'lastname',
            label: 'Last name'
        },
        {
            key: 'firstname',
            label: 'First name'
        }
    ];
    sortTitle: string = 'Sort by: ';
    sortKey: string = this.sortProps[0].key;
    sortLabel: string = this.sortProps[1].label;

    // NEW NEW NEW
    title: string = 'List of users in Knora';
    detailIsActive: boolean = false;
    add: any = {
        title: 'Add something (add.title)',
        description: 'What does add mean? (add.description)',
        object: 'user'
    };

    // test with framework component
    data: any = {
        title: 'List of users in Knora',
        description: 'not yet implemented (data.description)',
        type: UserData,
        list: []
    };

    list='user';

    constructor(private _userService: UserService,
                public dialog: MdDialog) {
    }

    ngOnInit() {

        this._userService.getAllUsers()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.usersList = result.getBody(UsersList);
                    this.data.list = this.usersList.users;
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }


    sortBy(key: string) {

//        this.sortKey = (key == this.sortKey ? this.sortProps[1].key : this.sortProps[0].key);

        if (key === this.sortProps[0].key) {
            this.sortKey = this.sortProps[1].key;
            this.sortLabel = this.sortProps[0].label;
        }
        else {
            this.sortKey = this.sortProps[0].key;
            this.sortLabel = this.sortProps[1].label;
        }

    }

}
