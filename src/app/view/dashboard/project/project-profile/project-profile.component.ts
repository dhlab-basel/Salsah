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
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../../modules/dialog/form-dialog/form-dialog.component';


@Component({
    selector: 'salsah-project-profile',
    templateUrl: './project-profile.component.html',
    styleUrls: ['./project-profile.component.scss']
})
export class ProjectProfileComponent implements OnInit {

    errorMessage: string = undefined;
    isLoading: boolean = true;

    project: Project = new Project();
    session: string = 'currentProject';

    loggedInAdmin: boolean;

    edit: any = {
        title: 'Edit Project'
    };

    constructor(private _route: ActivatedRoute,
                private _projectsService: ProjectsService,
                public _dialog: MatDialog) {

        _dialog.afterAllClosed
            .subscribe(() => {
                    // update a variable or call a function when the dialog closes
                    // get the project information
                    _route.params.subscribe((params: Params) => {
                        this.updateSession(params['pid']);
                    });
                }
            );
    }

    ngOnInit() {
        // get the project information
        this._route.params.subscribe((params: Params) => {
            this.getProject(params['pid']);
        });

    }

    getProject(id: string) {
        // bad hack to get the project admin information
        if (localStorage.getItem('currentUser') !== null) {
            this.loggedInAdmin = JSON.parse(localStorage.getItem('currentUser')).sysAdmin;
        }
        if (sessionStorage.getItem(this.session) !== null) {
            this.project = JSON.parse(sessionStorage.getItem(this.session));
            this.isLoading = false;
        } else {
            this.updateSession(id);
        }

    }

    updateSession(id: string) {
        sessionStorage.removeItem(this.session);
        this._projectsService.getProjectByShortname(id)
            .subscribe((result: Project) => {
                    this.project = result;
                    sessionStorage.setItem(this.session, JSON.stringify(this.project));
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    sessionStorage.removeItem(this.session);
                }
            )

    }

    editProject() {
        const dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
            data: {
                iri: this.project.id,
                form: 'project'
            }
        });

        dialogRef.beforeClose().subscribe(result => {
            this.isLoading = true;
        });
    }


}
