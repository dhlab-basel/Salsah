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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceTypesService } from '../../../../model/services/resource-types.service';
import {
    ApiServiceError,
    ApiServiceResult,
    OntologyCacheService,
    OntologyInformation,
    Properties,
    ResourceClass
} from '@knora/core';
import { ResourceTypes, ResourceTypeItem } from '../../../../model/webapi/knora/';
import { MessageData } from '../../message/message.component';
import { FormDialogComponent } from '../../dialog/form-dialog/form-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
    selector: 'salsah-resource-types-list',
    templateUrl: './resource-types-list.component.html',
    styleUrls: ['./resource-types-list.component.scss']
})
export class ResourceTypesListComponent implements OnInit {

    @Input() restrictedBy: string; // restricted by ontology
    @Input() index: number;

    @Output() toggleItem = new EventEmitter<any>();
    // send the number of entries to the parent component (framework-for-listings) to us it there in the title
    @Output() counter: EventEmitter<number> = new EventEmitter<number>();

    // in the case of a http get request, we display the progress in the loading element
    isLoading: boolean = true;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No resource type found',
        statusText: 'It seems there\'s no resource type yet. Add a new one with the button above &uarr;'
    };

    // result counter
    numberOfItems: number;

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;

    // iri of the selected resource type
    iri: string;

    // resource classes for the selected ontology
    resourceClasses: Array<ResourceClass> = [];

    // properties for the selected ontology or selected resource class
    properties: Properties;

    constructor(
        private _resourceTypesService: ResourceTypesService,
        private _cacheService: OntologyCacheService,
        public _dialog: MatDialog
    ) { }

    ngOnInit() {

        this.selectedRow = this.index;


        // TODO: we get wrong ontology iris from Knora; s. comment in issue: https://github.com/dhlab-basel/Knora/issues/553#issuecomment-418776341
        //
        this._cacheService.getEntityDefinitionsForOntologies([this.restrictedBy]).subscribe(
            (ontoInfo: OntologyInformation) => {
                console.log(ontoInfo);

                this.resourceClasses = ontoInfo.getResourceClassesAsArray();
                this.properties = ontoInfo.getProperties();
                this.numberOfItems = Object.keys(this.resourceClasses).length;
                this.isLoading = false;
            },
            (error) => {
                this.errorMessage = error;
                this.isLoading = false;
            }
        );
    }

    // open / close detail view
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            this.toggleItem.emit({ id, index });
        } else {
            // open the detail view
            this.selectedRow = index;
            this.toggleItem.emit({ id, index });
        }

    }

    // TODO: make a global edit method ... somewhere ...
    edit(id: string, title?: string) {

        const config: MatDialogConfig = new MatDialogConfig();

        config.data = {
            iri: id,
            title: 'Edit ' + id,
            form: 'resource-type'
        };

        config.panelClass = 'resizable';

        const dialogRef = this._dialog.open(FormDialogComponent, config);
    }

}
