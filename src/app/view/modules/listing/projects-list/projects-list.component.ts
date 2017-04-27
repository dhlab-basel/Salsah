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

import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ProjectsService} from "../../../../model/services/projects.service";
import {ProjectsList, ProjectItem} from "../../../../model/webapi/knora/";


@Component({
    selector: 'salsah-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

    isLoading: boolean = true;

    errorMessage: any = undefined;

    projects: ProjectItem[] = [];


    @Input('projects') inputProjects: ProjectItem[];

    constructor(
        private _router: Router,
        private _projectsService: ProjectsService
    ) {
    }

    ngOnInit() {
        if(this.inputProjects === null || this.inputProjects === undefined) {
            this._projectsService.getAllProjects()
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.projects = result.getBody(ProjectsList).projects;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }
        else {
//            this.user = JSON.parse(localStorage.getItem('ownProfile'));
            this.projects = this.inputProjects;
            this.isLoading = false;
            // get only the projects of the current user....
            // this._projectsService.getUsersProjects()
/*
            this._projectsService.getUsersProjects(encodeURIComponent(this.user))
                .subscribe(
                    (data: UserData) => {
                        this.projects = data.projects;
                        this.isLoading = false;
                    },
                    error => {
                        this.errorMessage =<any>error;
                        this.isLoading = false;
                    }

                )
                */
        }

    }

    openProject(id: string) {
        localStorage.removeItem('currentProject');
        this._router.navigate(['/project/', id]);
    }

}
