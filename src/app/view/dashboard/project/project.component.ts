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
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiServiceError} from '../../../model/services/api-service-error';
import {ProjectsService} from '../../../model/services/projects.service';
import {Project} from '../../../model/webapi/knora';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'salsah-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    isLoading: boolean = true;

    errorMessage: any = undefined;
    project: Project = new Project();

    projectRoute = '/project/';

    projectAdmin: boolean = false;

    firstTabClass: string = 'active';

    public menu: any = [
        {
            name: 'Team',
            route: 'team'
        },
        {
            name: 'Ontologies',
            route: 'ontologies'
        },
        {
            name: 'Resources',
            route: 'resources'
        },
        {
            name: 'Lists',
            route: 'lists'
        }
    ];

    public currentProject: string = undefined;

    auth: any = {
        user: undefined,
        session: undefined
    };

    constructor(private _title: Title,
                private _router: Router,
                private _route: ActivatedRoute,
                private _projectsService: ProjectsService) {
    }

    ngOnInit() {
        sessionStorage.removeItem('currentProject');

        this._route.params.subscribe((params: Params) => {
            // get the project shortname from the route
            this.currentProject = params['pid'];
            // set the root of the project route
            this.projectRoute += this.currentProject;

            // set the metadata page title
            this._title.setTitle('Salsah | Project (' + this.currentProject + ')');


            // this.firstTabClass = (this._router.url === this.projectRoute ? 'active' : undefined);

            // get the project information
            this._projectsService.getProjectByShortname(this.currentProject)
                .subscribe(
                    (result: Project) => {
                        this.project = result;
                        sessionStorage.setItem('currentProject', JSON.stringify(this.project));


                        // TODO: do we still need the following lines
                        if (sessionStorage.getItem('projectAdmin')) {
                            if (JSON.parse(sessionStorage.getItem('projectAdmin')).length > 0) {
                                this.projectAdmin = (JSON.parse(sessionStorage.getItem('projectAdmin')).indexOf(this.project.id) > -1);
                                // bad hack to get the project admin information
                                if (this.projectAdmin) {
                                    sessionStorage.setItem('admin', JSON.stringify(true));
                                }
                                // end of bad hack. TODO: we have to find a better solution
                                this.isLoading = false;
                            } else {
                                this.isLoading = false;
                            }
                        } else {
                            this.isLoading = false;
                        }

                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        sessionStorage.removeItem('currentProject');
                        this.isLoading = false;
                    }
                );

        });

        if (this.currentProject === 'new') {
            alert('Create a new project!?');
        }

    }

    disableFirstTab() {
        this.firstTabClass = undefined;
    }

    enableFirstTab() {
        this.firstTabClass = 'active';
    }

}
