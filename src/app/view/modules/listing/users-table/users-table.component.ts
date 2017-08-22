/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
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
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from 'app/model/services/projects.service';
import {UserService} from 'app/model/services/user.service';
import {UserData, UsersList, ProjectMembers} from 'app/model/webapi/knora/';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';

@Component({
    selector: 'salsah-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
    get toggleUser(): EventEmitter<any> {
        return this._toggleUser;
    }

    set toggleUser(value: EventEmitter<any>) {
        this._toggleUser = value;
    }

    // if we have a service, we need two variables:
    // error message, if something went wrong
    errorMessage: any = undefined;
    // progress loader status
    isLoading = true;

    @Input('restrictedBy') project: string;
    @Input() index: number;
    @Output() private _toggleUser = new EventEmitter<any>();

    // the main objects in this component
    users: UserData[] = [];

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected person
    iri: string;

    // sort the list of members by familyName OR givenName.
    // the sortBy method toggles the right setting, which is defined here
    sortProps: any = [
        {
            key: 'familyName',
            label: 'Last name'
        },
        {
            key: 'givenName',
            label: 'First name'
        }
    ];
    sortTitle = 'Sort by: ';
    sortKey: string;
    sortLabel: string;

    constructor(public _projectsService: ProjectsService,
                public _userService: UserService,
                public dialog: MdDialog) {
    }

    ngOnInit() {

        this.selectedRow = this.index;

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
                        const currentMembers: string[] = [];
                        for (const m of this.users) {
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
    open(id: string) {
        console.log(id);
        const dialogRef = this.dialog.open(FormDialogComponent, <MdDialogConfig>{
            data: {
                iri: id,
                form: 'edit-user'
            }
        });
        /*
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
        */

    }

}
