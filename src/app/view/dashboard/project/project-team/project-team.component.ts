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
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {UserFormComponent} from "../../../modules/form/user-form/user-form.component";
import {ProjectsService} from "../../../../model/services/projects.service";
import {UserService} from "../../../../model/services/user.service";
import {ProjectMembers, ProjectItem, User} from "../../../../model/webapi/knora";

@Component({
    selector: 'salsah-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

    isLoading: boolean = true;
    isLoadingSubModule: boolean = true;
    errorMessage: string = undefined;

    selectedRow: number;

    project: ProjectItem = new ProjectItem;

    members: ProjectMembers = new ProjectMembers();

    user: User;

    position = {
        preview: 'left',            // top
        detail: 'right'             // bottom
    };

    size: string = 'large';


    constructor(
        private _projectsService: ProjectsService,
        private _userService: UserService
    ) {
    }

    ngOnInit() {
        this.project = JSON.parse(localStorage.getItem('currentProject'));

        this._projectsService.getProjectMembers(this.project.shortname)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.members = result.getBody(ProjectMembers);
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }


    openUser(id: string, index: number) {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;

        this._userService.getUser(id)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.user = result.getBody(User);
                    this.selectedRow = index;
                    this.isLoadingSubModule = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.user = undefined;
    }

}
