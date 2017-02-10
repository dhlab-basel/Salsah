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
import {ProjectsService} from "../../../model/api/projects.service";

@Component({
    selector: 'salsah-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    isLoading: boolean = true;

    public menu: any = [
        {
            name: 'Project',
            path: ''
        },
        {
            name: 'Team',
            path: 'team'
        },
        {
            name: 'Resources',
            path: 'resources'
        },
        {
            name: 'Advanced',
            path: 'advanced'
        }
    ];

    public cur_project: string = undefined;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _projectsService: ProjectsService
    ) {
    }

    ngOnInit() {

        this._activatedRoute.params.forEach((params: Params) => {
            this.cur_project = params['pid'];
            this.menu[0].path = '/project/' + this.cur_project;
            // get the project information
            /*
            this._projects.getProject()
                .subscribe(
                    (data: Projects) => {
                        this.projects = data;
                        this.isLoading = false;
                    },
                    error => {
                        this._errorMessage = <any>error;
                    }
                );
            */
        });

        if(this.cur_project === 'new') {
            alert("Create a new project!?");
        }

    }

}
