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
import {UserFormComponent} from '../../form/user-form/user-form.component';
import {MessageComponent} from '../../message/message.component';
import {UserProfileDialogComponent} from '../../dialog/user-profile-dialog/user-profile-dialog.component';

@Component({
    selector: 'salsah-framework-for-listings',
    templateUrl: './framework-for-listings.component.html',
    styleUrls: ['./framework-for-listings.component.scss']
})
export class FrameworkForListingsComponent implements OnInit {

    @Input() title: string;
    @Input() add: any;
    @Input() list: string;          // which list? switch looks for 'user', 'resource', 'project', 'resourceClass'
    @Input() project: string;       // project iri

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
    position = {
        preview: 'left',            // top
        detail: 'right'             // bottom
    };

    // the size of the main module. It is large by default.
    // if the the new resource module or the edit resource module is active,
    // the size changes
    size: string = 'large';

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
            if (this.size === 'large') this.size = 'small';
            this.isLoadingSubModule = true;
            this.addNewFormIsActive = false;
            this.detailViewIsActive = true;

            this.id = id;
            this.selectedRow = index;
            this.isLoadingSubModule = false;
        }
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.detailViewIsActive = false;
        this.addNewFormIsActive = false;
    }

    openNew() {
        let dialogRef;
        switch(this.add.object) {
            case 'user':
                console.log(this.project);
                dialogRef = this.dialog.open(UserProfileDialogComponent, {data: {iri: this.project}});
            break;

            default:
                dialogRef = this.dialog.open(MessageComponent);

        }
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });



    }
}
