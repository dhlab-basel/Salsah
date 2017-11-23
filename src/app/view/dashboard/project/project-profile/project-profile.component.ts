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
import {ActivatedRoute, Params} from '@angular/router';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from '../../../../model/services/projects.service';
import {Project} from '../../../../model/webapi/knora';


@Component({
    selector: 'salsah-project-profile',
    templateUrl: './project-profile.component.html',
    styleUrls: ['./project-profile.component.scss']
})
export class ProjectProfileComponent implements OnInit {

    errorMessage: string = undefined;
    project: Project = new Project();

    projectLogoPath: string = '/data-pool/projects/';

    constructor(private _route: ActivatedRoute,
                private _projectsService: ProjectsService) {

    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            const projectFromRoute: string = params['pid'];
            let projectFromSession: string;
            if (sessionStorage.getItem('currentProject') !== null) {
                projectFromSession = JSON.parse(sessionStorage.getItem('currentProject')).shortname;
            }
            if(projectFromSession === projectFromRoute) {
                this.project = JSON.parse(sessionStorage.getItem('currentProject'));
            } else {
                this._projectsService.getProjectByShortname(params['pid'])
                    .subscribe((result: Project) => {
                            this.project = result;
                        },
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;
                            sessionStorage.removeItem('currentProject');
                        }
                    )
            }
        });

    }

}
