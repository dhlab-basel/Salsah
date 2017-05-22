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
import {Params, ActivatedRoute} from "@angular/router";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ProjectsService} from "../../../../model/services/projects.service";
import {Project, ProjectItem} from "../../../../model/webapi/knora";


@Component({
    selector: 'salsah-project-profile',
    templateUrl: './project-profile.component.html',
    styleUrls: ['./project-profile.component.scss']
})
export class ProjectProfileComponent implements OnInit {


    errorMessage: string = undefined;
    projectItem: ProjectItem = new ProjectItem();

    project: Project = new Project();
    description: any = undefined;

    constructor(private _route: ActivatedRoute,
                private _projectsService: ProjectsService
    ) {

    }

    ngOnInit() {

        if (JSON.parse(localStorage.getItem('currentProject')) === null) {
            // the local storage is not ready yet; or something went wrong
            // get the project from the services with the shortname from the route parameter "project"
            this._route.params.subscribe((params: Params) => {

                this._projectsService.getProject(params['pid'])
                    .subscribe(
                        (result: ApiServiceResult) => {
                            this.project = result.getBody(Project);
                            this.projectItem = this.project.project_info;
                        },
                        (error: ApiServiceError) => {

                            this.errorMessage = <any>error;
                            console.log(this.errorMessage);
                            localStorage.removeItem('currentProject');
                        }
                    );
            });
        }
        else {
            this.projectItem = JSON.parse(localStorage.getItem('currentProject'));
        }

    }

}
