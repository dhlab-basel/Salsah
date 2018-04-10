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

    projectRoute: string;

    projectAdmin: boolean = false;

    firstTab: boolean;

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
            name: 'Lists',
            route: 'lists'
        }
    ];

    public currentProject: string = undefined;

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

            // set the root of the project route; it's needed for the first tab
            this.projectRoute = '/project/' + this.currentProject;
            this.firstTab = (this._router.url === this.projectRoute);

            // set the metadata page title
            this._title.setTitle('Salsah | Project (' + this.currentProject + ')');

            // get the project information
            this._projectsService.getProjectByShortname(this.currentProject)
                .subscribe(
                    (result: Project) => {
                        this.project = result;
                        sessionStorage.setItem('currentProject', JSON.stringify(this.project));
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        console.log(error);
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


    toggleFirstTab(first: boolean) {
        this.firstTab = first === true;
    }

}
