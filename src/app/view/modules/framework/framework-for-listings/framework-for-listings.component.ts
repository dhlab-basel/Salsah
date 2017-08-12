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

export interface ListData {
    title: string,
    description: string,
    content: string,
    showAsTable: boolean,
    restrictedByIri: string
}

export interface AddData {
    title: string,
    description: string
}

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

    // get the list data
    @Input() list: ListData;

    // the list can have an (optional) add button, which opens the form-dialog with a new-XYZ-form
    @Input() add?: AddData;

    // error message in the case of an api service error
    errorMessage: any = undefined;

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // which view is active?
    detailViewIsActive: boolean = false;
    addNewFormIsActive: boolean = false;    // TODO: will be changed into dialog box!!

    // definition of the position for the preview (main module) and the detail view (sub module)
    position: string = 'center';

    // the size of the main module (incl. list and detail view)
    // at the beginning, the size of the main module is "medium"
    // if the detail view is active, the size changes into large
    // and the submodules (list view and detail view) changes their size resp. the visibility as well
    moduleSize: string = 'medium';
    listSize: string = 'large';

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // id (almost the iri) of the selected person
    id: string;

    constructor(public dialog: MdDialog) {
    }

    ngOnInit() {
        if (this.list == undefined) {
            // list is not optional! show an error message
            this.errorMessage = <any>{
                status: 424,
                statusText: 'There\'s no specified list data in FrameworkForListings!'
            }
        }
    }

    //
    // toggle (open/close) the detail view
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

    //
    // if the input "add" is set, this method opens a form dialog box with the new-XYZ-form component
    // the form-dialog component handles which nex-XYZ-form to use
    openNew() {
        let dialogRef;
        switch (this.list.content) {
            case 'user':
            case 'project':
            case 'resource-type':
                dialogRef = this.dialog.open(FormDialogComponent, {
                    data: {
                        title: this.add.title,
                        description: this.add.description,
                        form: 'new-' + this.list.content,
                        restriction: this.list.restrictedByIri
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
