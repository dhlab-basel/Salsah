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

import { Component, Input, OnChanges } from '@angular/core';
import { ApiServiceError, Project, User, UsersService } from '@knora/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { MessageData } from '../../message/message.component';
import { MessageDialogComponent } from '../../dialog/message-dialog/message-dialog.component';

@Component({
    selector: 'salsah-user-object',
    templateUrl: './user-object.component.html',
    styleUrls: ['./user-object.component.scss']
})
export class UserObjectComponent implements OnChanges {

    @Input() id: string;

    user: User;
    email: string;
    iri: string;

    selectedRow: number;

    errorMessage: any;

    currentProject: Project;

    constructor(private _userService: UsersService,
        public _dialog: MatDialog) {
    }

    ngOnChanges() {
        this.iri = undefined;
        this.email = undefined;
        this._userService.getUserByIri(this.id)
            .subscribe(
                (result: User) => {
                    this.user = result;
                    this.email = result.email;
                    this.iri = this.id;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        // do we have a current project?
        if (sessionStorage.getItem('currentProject') !== null) {
            this.currentProject = JSON.parse(sessionStorage.getItem('currentProject'));
        }
    }

    deleteUser(iri: string) {
        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'Are you sure to delete this user?',
            confirm: true,
            answer: answer
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {
            if (config.data.confirm === true) {
                // if answer is true: remove the user from the project
                this._userService.deleteUser(iri).subscribe(
                    (res: User) => {
                        // reload page
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
            }
        });
    }

}
