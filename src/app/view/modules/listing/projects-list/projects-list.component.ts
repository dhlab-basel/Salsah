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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from '../../../../model/services/projects.service';
import {Project} from '../../../../model/webapi/knora/';
import {UsersService} from '../../../../model/services/users.service';
import {MessageData} from '../../message/message.component';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {MessageDialogComponent} from '../../dialog/message-dialog/message-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {User} from '../../../../model/webapi/knora/admin';

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

    // restrictedBy can be a user; to show a list of the user's projects
    @Input() restrictedBy: string;
    @Input() listType?: string;
    @Input() admin?: boolean;

    // send the number of entries to the parent component (framework-for-listings) to us it there in the title
    @Output() counter: EventEmitter<number> = new EventEmitter<number>();

    // grid list settings
    columns: number = 3;
    rowHeight: number = 308;
    colGutter: number = 12;

    // in the case of a http get request, we display the progress in the loading element
    isLoading = true;

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
    allProjects: Project[] = [];
    allActive: Project[] = [];
    allInactive: Project[] = [];
    numberOfItems: number;
    countActive: number;
    countInactive: number;

    sortProps: any = [
        {
            key: 'shortcode',
            label: 'Short code'
        },
        {
            key: 'shortname',
            label: 'Short name'
        },
        {
            key: 'longname',
            label: 'Long name'
        }
    ];

    sortKey: string = 'longname';
    sortKeyIA: string = this.sortKey;

    constructor(private _router: Router,
                private _projectsService: ProjectsService,
                private _userService: UsersService,
                public _dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.restrictedBy !== undefined) {
            // we have a user id
            // get all the projects where the user is member of
            this._userService.getUserByIri(this.restrictedBy)
                .subscribe(
                    (result: User) => {
                        this.allProjects = result.projects;

                        this.filter(this.allProjects);

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
                    (result: Project[]) => {
                        this.allProjects = result;

                        // console.log('projects: ', result);

                        this.filter(this.allProjects);

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


    filter(list: Project[]) {
        for (const item of list) {
            if (item.status === true) {
                this.allActive.push(item);
            } else {
                this.allInactive.push(item);
            }
        }
        this.numberOfItems = Object.keys(list).length;
        this.countActive = Object.keys(this.allActive).length;
        this.countInactive = Object.keys(this.allInactive).length;
    }


    edit(id: string) {
        const config: MatDialogConfig = new MatDialogConfig();

        config.data = {
            iri: id,
            form: 'project'
        };

        config.panelClass = 'resizable';

        const dialogRef = this._dialog.open(FormDialogComponent, config);

    }

    open(id: string) {
        localStorage.removeItem('currentProject');
        this._router.navigate(['/project/', id]);
    }

    removeUserFromProject(user: string, project: string) {
        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'Are you sure to remove this user from the project?',
            confirm: true,
            answer: answer
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
                    (res: User) => {
                        console.log(res);
                        // reload page
                    },
                    (error: ApiServiceError) => {
                        const message: MessageData = error;
                        const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                            data: {
                                message: message
                            }
                        });
                    }
                )
            }

        });

    }

    setInactive(iri: string, name: string) {
        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'Are you sure to delete this project? ' + name,
            confirm: true,
            answer: answer
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {
            this.isLoading = true;
            if (config.data.confirm === true) {
                // if answer is true: remove the user from the project
                this._projectsService.deleteProject(iri).subscribe(
                    (res: Project) => {
                        // reload page
                        this.isLoading = false;
                        window.location.reload();
                    },
                    (error: ApiServiceError) => {
                        const message: MessageData = error;
                        const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                            data: {
                                message: message
                            }
                        });
                    }
                )
            } else {
                this.isLoading = false;
            }

        });
    }

    setActive(iri: string, name: string) {

        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'Reactivate this project? ' + name,
            confirm: true,
            answer: answer
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {
            this.isLoading = true;
            if (config.data.confirm === true) {
                // if answer is true: remove the user from the project
                this._projectsService.activateProject(iri).subscribe(
                    (res: Project) => {
                        // reload page
                        window.location.reload();
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        const message: MessageData = error;
                        const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                            data: {
                                message: message
                            }
                        });
                    }
                )
            } else {
                this.isLoading = false;
            }

        });
    }

}
