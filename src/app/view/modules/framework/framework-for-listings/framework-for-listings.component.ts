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

import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../../dialog/message-dialog/message-dialog.component';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';
import {MessageData} from '../../message/message.component';
import {ActivatedRoute, Params} from '@angular/router';

export interface ListData {
    title: string,
    description: string,
    content: string,
    showAs: string,
    restrictedBy: string,
    searchMode?: string
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
 * @Input list: <ListData> List settings object with
 *              title, description, content (list type: user || project || resource etc.), showAs (table || grid || (list = default)) and restrictedBy.
 * @Input add: <AddData> Optional. If we need an "add" button, we have to define an add-object with
 *              title and description
 *
 * Both input type objects are defined in framework-for-listings.component.ts
 */
export class FrameworkForListingsComponent implements OnInit, OnChanges {

    // get the list data
    @Input() list: ListData;

    // the list can have an (optional) add button, which opens the form-dialog with a new-XYZ-form
    @Input() add?: AddData;

    loggedInAdmin: boolean = false;

    // error message in the case of an api service error
    errorMessage: any = undefined;

    notYetImplemented: MessageData = <MessageData>{
        status: 204,
        statusMsg: 'Not yet implemented',
        statusText: 'TODO: add the following component to the FrameworkForListings component:'
    };

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // rerender value, if we have to rerender a child component
    rerender: boolean = false;

    // which view is active?
    detailViewIsActive: boolean = false;

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

//    constructor(@Inject(ElementRef) elementRef: ElementRef, @Inject(Injector) injector: Injector)
    constructor(private _dialog: MatDialog,
                private _route: ActivatedRoute,
                private _cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        // bad hack to get the project admin information
        this.loggedInAdmin = (sessionStorage.getItem('admin') !== null);
        // end of bad hack. TODO: we have to find a better solution


        if (this.list === undefined || this.list === null) {
            // list is not optional! show an error message
            this.errorMessage = <any>{
                status: 424,
                statusText: 'There\'s no specified list data in FrameworkForListings!'
            };
            this.list = <ListData>{};
        } else {
            this.notYetImplemented.route = this.list.content;

            if (this.list.content === 'resource') {

                // reload component when activated route changes
                this._route.params.subscribe((params: Params) => {
                    this.rerender = true;
                    this._cdRef.detectChanges();
                    this.rerender = false;
                });
            }
        }
    }

    ngOnChanges() {
//        console.log(this.list);
    }

    //
    // toggle (open/close) the detail view
    toggleDetail($event) {
        const id: string = $event.id;
        const index: number = $event.index;

        if (id === this.id && index === this.selectedRow) {
            // the user clicked on the already selected item
            // close the detail view
            this.closeDetailView();
        } else {
            if (this.listSize === 'large') {
                this.listSize = 'small';
                this.position = 'left';
                this.moduleSize = 'large';
            }
            this.isLoadingSubModule = true;
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
    }

    //
    // if the input "add" is set, this method opens a form dialog box with the new-XYZ-form component
    // the form-dialog component handles which nex-XYZ-form to use
    openNew(form: string) {
        let dialogRef;
        switch (form) {
            case 'user':
            case 'project':
            case 'resource-type':
                dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
                    data: {
                        title: this.add.title,
                        description: this.add.description,
                        form: this.list.content,
                        restriction: this.list.restrictedBy
                    }
                });
                break;

            default:
                const message: MessageData = {
                    status: 204,
                    statusMsg: 'Not yet implemented',
                    statusText: 'TODO: add the list type "' + form + '" to the openNew method in FrameworkForListings',
                    route: 'Missing list type: ' + form
                };
                dialogRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                    data: {
                        message: message
                    }
                });
        }

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

}
