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
import {Params, ActivatedRoute, Router} from "@angular/router";
import {ProjectItem, Project} from "../../../../model/classes/projects";
import {ProjectsService} from "../../../../model/api/projects.service";
import {ApiServiceResult} from "../../../../model/api/api-service-result";
import {ApiServiceError} from "../../../../model/api/api-service-error";

@Component({
    selector: 'salsah-project-profile',
    templateUrl: './project-profile.component.html',
    styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {


    errorMessage: string = undefined;
    projectItem: ProjectItem = new ProjectItem();

    project: Project = new Project();

    projectRoute: string = '/project/';

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _projectsService: ProjectsService
    ) {

    }

    ngOnInit() {

        this.projectItem = JSON.parse(localStorage.getItem('project'));

        console.log(this.projectItem);

        if(this.projectItem !== null) {
            // get the project information
            this._projectsService.getProject(this.projectItem.shortname)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.project = result.getBody(Project);
                        console.log(this.project);
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        localStorage.removeItem('project');
                    }
                );
        }
        else {
            console.log('Error in local storage with the project item');
        }


    }

}
