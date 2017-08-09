/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
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

import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {MessageDialogComponent} from '../../dialog/message-dialog/message-dialog.component';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';

@Component({
    selector: 'salsah-framework-for-listings',
    templateUrl: './framework-for-listings.component.html',
    styleUrls: ['./framework-for-listings.component.scss']
})

/**
 * This is a framework which can be used in cases of listing stuff
 * e.g. list of projects or users
 * @Input title: <string> title of the framework
 * @Input add: <any> If we need an "add" button, we have to define an add-object with title, description and object (type)
 *                   e.g. 'user' if we want to add new users in our framework
 * @Input list: <string> which list? A switch looks for 'user', 'resource', 'project', 'resourceClass'
 * @Input table: <boolean> if true, shows the list as a table
 * @Input project: <string> Project iri is needed in the case of the users list
 *                          if the project iri is set, it shows only the members in the defined project
 */
export class FrameworkForListingsComponent implements OnInit {

    /**
     * title of the framework
     */
    @Input() title: string;
    /**
     * If we need an "add" button, we have to define an add-object with title, description and object (type)
     *     e.g. 'user' if we want to add new users in our framework
     */
    @Input() add: any;
    /**
     * which list? A switch looks for 'user', 'resource', 'project', 'resourceClass'
     */
    @Input() list: string;          // which list? switch looks for 'user', 'resource', 'project', 'resourceClass'
    /**
     * if true, shows the list as a table
     */
    @Input() table: boolean;        // shows the list in a table
    /**
     * Project is needed in the case of the users list
     *     if the project iri is set, it shows only the members in the defined project
     */
    @Input() project: string;       // project iri

    // error message in the case of an api service error
    errorMessage: string = undefined;

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // which view is active?
    detailViewIsActive: boolean = false;
    addNewFormIsActive: boolean = false;

    // definition of the position for the preview (main module) and the detail view (sub module)

    position: string = 'center';

    // the size of the main module.
    // the default value (at the begin) is medium
    // if the the new resource module or the edit resource module is active,
    // the size changes into large
    moduleSize: string = 'medium';
    listSize: string = 'large';

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // id (almost the iri) of the selected person
    id: string;

    constructor(public dialog: MdDialog) {
    }

    ngOnInit() {
        if (this.list === undefined) {
            // list is not optional! show an error message
            this.errorMessage = <any>{
                status: 424,
                statusText: 'There\'s no specified list in FrameworkForListings!'
            }
        }
    }

    toggleDetail($event) {
        let id: string = $event.id;
        let index: number = $event.index;
        this.addNewFormIsActive = false;

        if (id === this.id && index === this.selectedRow) {
            // the user clicked on the already selected item
            // close the detail view
            this.closeDetailView();
        }
        else {
            if (this.listSize === 'large') {
                this.listSize = 'small';
                this.position = 'left';
                this.moduleSize = 'large';
            }
            this.isLoadingSubModule = true;
            this.addNewFormIsActive = false;
            this.detailViewIsActive = true;

            this.id = id;
            this.selectedRow = index;
            this.isLoadingSubModule = false;
        }
    }

    closeDetailView() {
        this.listSize = 'large';
        this.moduleSize = 'medium';
        this.selectedRow = undefined;
        this.detailViewIsActive = false;
        this.addNewFormIsActive = false;
    }

    openNew() {
        let dialogRef;
        let title: string;
        switch (this.list) {
            case 'user':
                dialogRef = this.dialog.open(FormDialogComponent, {
                    data: {
                        title: this.add.title,
                        form: 'new-user',
                        iri: this.project,
                    }
                });
                break;
            case 'project':
                title = 'Create new project';
                dialogRef = this.dialog.open(FormDialogComponent, {
                    data: {
                        title: title,
                        form: 'new-project'
                    }
                });
                break;


            default:
                let message = {
                    title: 'Not yet implemented',
                    text: 'TODO: add the list type "' + this.list + '" to the openNew method in FrameworkForListings',
                    path: 'Missing list type: ' + this.list
                };
                dialogRef = this.dialog.open(MessageDialogComponent, {
                    data: {
                        note: message
                    }
                });

        }
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });


    }
}
