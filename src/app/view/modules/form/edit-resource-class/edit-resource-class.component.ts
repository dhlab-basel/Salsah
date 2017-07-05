import {Component, EventEmitter, OnChanges, Input, Output} from '@angular/core';
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {Properties} from "../../../../model/webapi/knora";
import {ResourceTypesService} from "../../../../model/services/resource-types.service";
import {ResourceType, ResourceTypeInfo} from "../../../../model/webapi/knora/";

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'salsah-edit-resource-class',
    templateUrl: './edit-resource-class.component.html',
    styleUrls: ['./edit-resource-class.component.scss'],
    animations: [
        trigger('resEdit',
            [
                state('inactive', style({display: 'none'})),
                state('active', style({display: 'block'})),
                transition('inactive => true', animate('100ms ease-in')),
                transition('true => inactive', animate('100ms ease-out'))
            ]),
        trigger('propEdit',
            [
                state('inactive', style({display: 'none'})),
                state('active', style({display: 'block'})),
                transition('inactive => true', animate('100ms ease-in')),
                transition('true => inactive', animate('100ms ease-out'))
            ])
    ]
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

    focusOnResourceEdit: string = 'inactive';
    focusOnPropertiesEdit: string = 'inactive';

    guiItems: string[] = [
        "Text",
        "Richtext",
        "Text area",
        "Dropdown menu",
        "Number field",
        "Date field",
    ];


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
    closeEditView(){
        this.editResource = false;
    }

    //form functions
    onSubmit(data: any): void {
        console.log('your new resource is:', this.resType);
//        this.dialog.closeAll();
    }

    resEdit: any;
    propEdit: any;

    toggleMenu(name: string) {
        switch (name) {
            case 'resEdit':
                this.focusOnPropertiesEdit = 'inactive';
                this.focusOnResourceEdit = (this.focusOnResourceEdit === 'active' ? 'inactive' : 'active');
                break;
            case 'propEdit':
                this.focusOnResourceEdit = 'inactive';
                this.focusOnPropertiesEdit = (this.focusOnPropertiesEdit === 'active' ? 'inactive' : 'active');
                break;
        }
    }



}
