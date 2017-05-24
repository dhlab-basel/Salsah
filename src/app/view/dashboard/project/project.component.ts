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
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ApiServiceResult} from "../../../model/services/api-service-result";
import {ApiServiceError} from "../../../model/services/api-service-error";
import {ProjectsService} from "../../../model/services/projects.service";
import {Project} from "../../../model/webapi/knora";

@Component({
    selector: 'salsah-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    isLoading: boolean = true;

    errorMessage: string = undefined;
    project: Project = new Project();

    projectRoute: string = '/project/';

    firstTabClass: string = 'active';

    public menu: any = [
        {
            name: 'Team',
            route: 'team'
        },
        {
            name: 'Resources',
            route: 'resources'
        },
        {
            name: 'Advanced',
            route: 'advanced'
        }
    ];

    public cur_project: string = undefined;

    auth: any = {
        user: undefined,
        session: undefined
    };

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _projectsService: ProjectsService
    ) {
    }

    ngOnInit() {

        this._route.params.subscribe((params: Params) => {
            this.cur_project = params['pid'];
            this.projectRoute += this.cur_project;

            this.firstTabClass = (this._router.url === this.projectRoute ? 'active' : undefined);


            // get the project information
            this._projectsService.getProject(this.cur_project)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.project = result.getBody(Project);
                        this.isLoading = false;
                        localStorage.setItem('currentProject', JSON.stringify(
                            this.project.project_info
                        ))
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        localStorage.removeItem('currentProject');
                    }
                );

        });
//        this.auth = SessionService.checkAuth();

        if(this.cur_project === 'new') {
            alert("Create a new project!?");
        }

    }

    disableFirstTab() {
        this.firstTabClass = undefined;
    }

    enableFirstTab() {
        this.firstTabClass = 'active';
    }

}
