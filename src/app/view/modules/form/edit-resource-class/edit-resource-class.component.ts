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

import {Component, EventEmitter, OnChanges, Input, Output} from '@angular/core';
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ResourceTypesService} from "../../../../model/services/resource-types.service";
import {Properties, ResourceType, ResourceTypeInfo} from "../../../../model/webapi/knora/";

@Component({
    selector: 'salsah-edit-resource-class',
    templateUrl: './edit-resource-class.component.html',
    styleUrls: ['./edit-resource-class.component.scss']
})
export class EditResourceClassComponent implements OnChanges {

    @Input('iri') iri: string;
    @Input('index') index: number;

//    @Output() loadingSubmodule = new EventEmitter<any>();

//    public isLoadingSubModule: boolean = false;

    resType: ResourceTypeInfo = new ResourceTypeInfo;

    properties: Properties;
    errorMessage: string = undefined;
    selectedRow: number;

    editResource: boolean;



    constructor(private _resourceTypesService: ResourceTypesService) {
    }


    ngOnChanges() {

        // get the resource class data by res class iri
        this._resourceTypesService.getResourceType(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {

                    this.resType = result.getBody(ResourceType).restype_info;
//                    let tmpResTypeInfo: ResourceTypeInfo = result.getBody(ResourceTypeInfo);
//                    console.log(tmpResTypeInfo.restype_info.label);
                    console.log(this.resType);
                    this.selectedRow = this.index;
                    // disable the progress loader of the submodule
//                    this.loadingSubmodule.emit(this.isLoadingSubModule);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    // disable the progress loader of the submodule
//                    this.loadingSubmodule.emit(false);
                }
            );



    }

    editResources(){
        this.editResource = true;
    }

}
