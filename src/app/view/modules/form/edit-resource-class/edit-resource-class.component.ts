import {Component, EventEmitter, OnChanges, Input, Output} from '@angular/core';
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {Properties} from "../../../../model/webapi/knora";
import {ResourceTypesService} from "../../../../model/services/resource-types.service";
import {ResourceType, ResourceTypeInfo} from "../../../../model/webapi/knora/";

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
//                    console.log(this.resType);
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

/*
        this._propertiesService.getPropertiesByResType(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.properties = result.getBody(Properties);
                    this.selectedRow = this.newIndex;
                    this.isLoadingSubModule = false;
                    console.log("iri:", this.iri);
                    console.log("my properties:", this.properties);
                    console.log("my row:", this.selectedRow);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoadingSubModule = false;
                }
            );
*/

    }


}
