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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectsService} from '../../../../model/services/projects.service';
import {UserService} from '../../../../model/services/user.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {UserData} from '../../../../model/webapi/knora/v1/users/user-data';
import {ProjectMembers} from '../../../../model/webapi/knora/v1/projects/project-members';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {UsersList} from '../../../../model/webapi/knora/v1/users/users-list';

@Component({
    selector: 'salsah-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

/**
 * list of users
 *
 * Input:
 * - project<string> --> list of users in the specified project
 */
export class UsersListComponent implements OnInit {

    // if we have a service, we need two variables:
    // error message, if something went wrong
    errorMessage: any = undefined;
    // progress loader status
    isLoading: boolean = true;

    @Input('project') project: string;
    @Output() toggleUser = new EventEmitter<any>();

    // the main objects in this component
    users: UserData[] = [];

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected person
    iri: string;

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
    sortKey: string;
    sortLabel: string;

    constructor(public _projectsService: ProjectsService,
                public _userService: UserService) {
    }

    ngOnInit() {

        if (this.project !== undefined) {
            // get project members
            this._projectsService.getProjectMembersByIri(this.project)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.users = result.getBody(ProjectMembers).members;
                        // set an array of the project members in local storage
                        // it's a list of user IRIs
                        // we need it, when we want to add new members to a project
                        // in that case we see, if someone is already a member
                        let currentMembers: string[] = [];
                        for (let m of this.users) {
                            currentMembers.push(m.user_id);
                        }
                        localStorage.setItem('currentProjectMembers', JSON.stringify(currentMembers));
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }
        else {
            // get all users from knora
            this._userService.getAllUsers()
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.users = result.getBody(UsersList).users;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );

        }

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

    // open / close user
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            this.toggleUser.emit({id, index});
        }
        else {
            // open the detail view
            this.selectedRow = index;
            this.toggleUser.emit({id, index});
        }

    }

}


