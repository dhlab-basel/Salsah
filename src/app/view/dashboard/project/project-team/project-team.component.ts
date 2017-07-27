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
// services
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ProjectsService} from "../../../../model/services/projects.service";
import {UserService} from "../../../../model/services/user.service";
// json classes
import {ProjectMembers, ProjectItem, User} from "../../../../model/webapi/knora";

@Component({
    selector: 'salsah-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

    // this component has a list of users
    list: string = 'user';
    // which are member in the specified project
    project: string;

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // this component makes a http request (service)
    // if something's going wrong, we need an error message "container"
    errorMessage: string = undefined;

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected person
    iri: string;

    // project information; we get it from local storage
//    project: ProjectItem = new ProjectItem;

    // list of members in the project
    members: ProjectMembers = new ProjectMembers();

    // user profile
    user: User;

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
    sortKey: string;
    sortLabel: string;

    add: any = {
        title: 'Add new user to the team',
        description: 'What does add mean? (add.description)',
        object: 'user'
    };


    constructor(private _projectsService: ProjectsService,
                private _userService: UserService) {
    }

    ngOnInit() {
        this.project = JSON.parse(localStorage.getItem('currentProject')).id;

        this.sortKey = this.sortProps[0].key;

        this.sortLabel = this.sortProps[1].label;

//        let proIri = this.project.id;

        this._projectsService.getProjectMembersByIri(this.project)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.members = result.getBody(ProjectMembers);
                    // set an array of the project members in local storage
                    // as a list of user IRIs
                    let currentMembers: string[] = [];
                    for (let m of this.members.members) {
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

    addUser() {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;
        this.selectedRow = undefined;

        this.newUserIsActive = true;
        this.editUserIsActive = false;
        this.isLoadingSubModule = false;
    }

    toggleUser(id: string, index: number) {
        if(id === this.iri && index === this.selectedRow) {
            // the user clicked on the already selected item
            // close the detail view
            this.closeDetailView();
        }
        else {
            if (this.size === 'large') this.size = 'small';
            this.isLoadingSubModule = true;
            this.editUserIsActive = true;
            this.newUserIsActive = false;

            this.iri = id;
            this.selectedRow = index;
            this.isLoadingSubModule = false;
        }
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.editUserIsActive = undefined;
        this.newUserIsActive = undefined;
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
