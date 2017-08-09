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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceTypesService} from '../../../../model/services/resource-types.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ResourceTypes, ResourceTypeItem, ProjectItem} from '../../../../model/webapi/knora/';

@Component({
    selector: 'salsah-resource-types-list',
    templateUrl: './resource-types-list.component.html',
    styleUrls: ['./resource-types-list.component.scss']
})
export class ResourceTypesListComponent implements OnInit {

    @Input() list: ResourceTypeItem[];
    @Input() title: string;
    @Output() toggleItem = new EventEmitter<any>();

    project: ProjectItem = new ProjectItem;

    // in the case of a http get request, we display the progress in the loading element
    isLoading: boolean = true;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    // the http get request will fill an array called projects
//    projectsList: ProjectItem[] = [];

    // for the list of objects we have to know which object is active / selected
    selectedRow: number = undefined;


    constructor(private _resourceTypesService: ResourceTypesService) {
    }

    ngOnInit() {
        if (this.list === undefined) {
            this.project = JSON.parse(localStorage.getItem('currentProject'));
            this._resourceTypesService.getResourceTypesByVoc(this.project.ontologyNamedGraph)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.list = result.getBody(ResourceTypes).resourcetypes;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        console.log(error);
                        this.errorMessage = error;
                        this.isLoading = false;
                    }
                );
        }
        else {
            // the user data contains a list of projects; so the data is already there
            this.isLoading = false;
        }
    }

    // open / close detail view
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            this.toggleItem.emit({id, index});
        }
        else {
            // open the detail view
            this.selectedRow = index;
            this.toggleItem.emit({id, index});
        }

    }

}
