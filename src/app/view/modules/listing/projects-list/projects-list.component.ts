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

/**
 * This component has two optional attributes:
 *      - projects: ProjectItem[]
 *      - listTitle: string
 *
 *  The value for projects is an array of project objects:
 *   - It will be used for a list of all projects, where the user is member of.
 *   - When it's empty or not defined, it will display all public projects.
 *
 *  The listTitle is for a list title value
 */

@Component({
    selector: 'salsah-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.scss']
})


export class ProjectsListComponent implements OnInit {


    @Input('projects') projectsList: ProjectItem[];
    @Input('listTitle') title: string;


    // in the case of a http get request, we display the progress in the loading element
    isLoading: boolean = true;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    // the http get request will fill an array called projects
//    projectsList: ProjectItem[] = [];



    constructor(
        private _router: Router,
        private _projectsService: ProjectsService
    ) {
    }

    ngOnInit() {
        if(this.projectsList === undefined) {
            // get all projects from the service
            this._projectsService.getAllProjects()
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.projectsList = result.getBody(ProjectsList).projects;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }
        else {
            // the user data contains a list of projects; so the data is already there
            this.isLoading = false;
        }
    }

    openProject(id: string) {
        localStorage.removeItem('currentProject');
        this._router.navigate(['/project/', id]);
    }

}
