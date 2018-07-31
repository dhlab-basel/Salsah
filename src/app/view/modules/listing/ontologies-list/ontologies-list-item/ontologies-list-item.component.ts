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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceTypeItem } from '../../../../../model/webapi/knora/v1/resource-types/resource-type-item';
import { ApiServiceError, ApiServiceResult } from '@knora/core';
import { ResourceTypes } from '../../../../../model/webapi/knora/v1/resource-types/resource-types';
import { MessageData } from '../../../message/message.component';
import { ResourceTypesService } from '../../../../../model/services/resource-types.service';

@Component({
    selector: 'salsah-ontologies-list-item',
    templateUrl: './ontologies-list-item.component.html',
    styleUrls: ['./ontologies-list-item.component.scss']
})
export class OntologiesListItemComponent implements OnInit {

    @Input() listData: ResourceTypeItem[] = [];
    //    @Input() sortProp: string;
    @Input() index: number;
    @Input() project?: string;

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

    // the main objects in this component
    list: ResourceTypeItem[] = [];
    num: number;

    sortProp: string = undefined;

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected resource type
    iri: string;


    constructor(private _resourceTypesService: ResourceTypesService) {
    }

    ngOnInit() {
        this.selectedRow = this.index;

        this._resourceTypesService.getResourceTypesByVoc(this.project)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.list = result.getBody(ResourceTypes).resourcetypes;
                    this.num = Object.keys(this.list).length;
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    console.log('ResourceTypesListComponent', error);
                    this.errorMessage = error;
                    this.isLoading = false;
                }
            );
    }

}
