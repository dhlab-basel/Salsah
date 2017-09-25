/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
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

import {Component, OnInit, Input, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from '../../../../model/services/projects.service';
import {UserService} from '../../../../model/services/user.service';
import {ProjectsList, ProjectItem, User, UserProfile} from '../../../../model/webapi/knora/';
import {MessageData} from '../../message/message.component';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {MessageDialogComponent} from '../../dialog/message-dialog/message-dialog.component';

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

    @Input('restrictedBy') user: string;
    @Input() listType?: string;

    columns: number = 3;

    rowHeight: number = 308;
    colGutter: number = 8;
    colWidth: number = 208;
    maxWidth: number = 980;

    // in the case of a http get request, we display the progress in the loading element
    isLoading: boolean = true;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No projects found',
        statusText: 'It seems there\'s no project yet. Create a new one with the button above &uarr;'
    };

    // the http get request will fill an array called projects
    list: ProjectItem[] = [];
    num: number;

    sortKey: string = 'longname';

    constructor(private _router: Router,
                private _projectsService: ProjectsService,
                private _userService: UserService,
                public _dialog: MdDialog) {
    }

    ngOnInit() {
        if (this.user !== undefined) {
            // we have a user id
            // get all the projects where the user is member of
            this._userService.getUserByIri(this.user)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.list = result.getBody(User).userProfile.projects_info;
                        console.log(this.list);
                        this.num = Object.keys(this.list).length;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = error;
                        this.isLoading = false;
                    }
                );
        } else {
            // get all projects from the service
            this._projectsService.getAllProjects()
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.list = result.getBody(ProjectsList).projects;
                        this.num = this.list.length;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        console.log(error);
                        this.errorMessage = error;
                        this.isLoading = false;
                    }
                );
        }
    }


    edit(id: string) {
        const dialogRef = this._dialog.open(FormDialogComponent, <MdDialogConfig>{
            data: {
                iri: id,
                form: 'project'
            }
        });
    }

    open(id: string) {
        localStorage.removeItem('currentProject');
        this._router.navigate(['/project/', id]);
    }

    removeUserFromProject(user: string, project: string) {
        let answer: boolean = false;
        const config = new MdDialogConfig();

        config.data = {
            title: 'Are you sure to remove this user from the project?',
            confirm: answer
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            console.log(config.data);

            if (config.data.confirm === true) {
                // if answer is true: remove the user from the project
                this._userService.removeUserFromProject(user, project).subscribe(
                    (res: ApiServiceResult) => {
                        console.log(res);
                        // reload page
                    },
                    (error: ApiServiceError) => {
                        const message: MessageData = error;
                        const errorRef = this._dialog.open(MessageDialogComponent, <MdDialogConfig>{
                            data: {
                                message: message
                            }
                        });
                    }
                )
            }

        });

    }

}
