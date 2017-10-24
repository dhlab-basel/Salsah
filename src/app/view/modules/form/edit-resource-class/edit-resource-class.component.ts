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
// import {ResourceType, ResourceTypeInfo} from "../../../../model/webapi/knora/";
import {ProjectsService} from "../../../../model/services/projects.service";
import {ProjectsList, ProjectItem} from "../../../../model/webapi/knora/";
import {MatSelectModule} from '@angular/material';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

//animations are used to create collapsible cards content
@Component({
    selector: 'salsah-edit-resource-class',
    templateUrl: './edit-resource-class.component.html',
    styleUrls: ['./edit-resource-class.component.scss'],
})


export class EditResourceClassComponent implements OnChanges {

    @Input('iri') iri: string;
    @Input('index') index: number;
    @Input('projects') projectsList: ProjectItem[];


    resType: ResourceTypeInfo = new ResourceTypeInfo;

    properties: Properties;
    errorMessage: string = undefined;
    selectedRow: number;

    editResource: boolean;

    public editResFormLabels: any = {
        label: 'Resource',
        description:'Click to edit the resource name',
        resource: {
            label: 'Resource label',
            description: 'Resource description',
            properties: {
                formLabel: 'Properties',
                formDescription: 'Click to edit the property',
                label: 'Property name',
                description: 'Property description',
                gui: 'GUI element',
                attributes: 'GUI attributes',
                id: 'Property ID',
                occurence: 'Occurrence',
                valuetype_id: 'Value type ID',
                vocabulary: 'Vocabulary'
            }
        },
        addProp:{
            label: 'Add new property',
            description: 'Add new or create a custom property'
        }
};

    guiItems: string[] = [
        "text",
        "richtext",
        "text area",
        "dropdown menu",
        "number field",
        "date field",
        "searchbox",
        "file upload",
        "date",
        "radio"
        ];
    cardinalityList: string[] = [
        "1",
        "1-n",
        "0-1",
        "0-n"
        ];

    constructor(private _resourceTypesService: ResourceTypesService,
                private _projectsService: ProjectsService) {
    }


    ngOnChanges() {

        // get the resource class data by res class iri
        this._resourceTypesService.getResourceType(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resType = result.getBody(ResourceType).restype_info;
//                    let tmpResTypeInfo: ResourceTypeInfo = result.getBody(ResourceTypeInfo);
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

        this._projectsService.getAllProjects()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.projectsList = result.getBody(ProjectsList).projects;
                }
    )

    }

    editResources(){
        this.editResource = true;
    }
    closeEditView(){
        this.editResource = false;
    }

    //form functions

    submitResEdit(): void {
        if (this.resType !== undefined) {
            console.log('Your submitted data is: Resource label:', this.resType.label, ' Resource description: ' ,this.resType.description);
        }
    }

    submitPropEdit(index: number, event): void {
        if (this.resType.properties[index] !== undefined) {
            console.log('Your submitted property is:', this.resType.properties[index]);
        }
    }

    onSubmit(data: any): void {
        console.log('you submitted value:', data);
    }



    //sets default values from json files on mat-select
    setGUI(index: number, event) {
        if (this.resType.properties[index] !== undefined) {
            this.resType.properties[index].gui_name = event.value;
        }
    }
    setOcc(index: number, event) {
        if (this.resType.properties[index] !== undefined) {
            this.resType.properties[index].occurrence = event.value;
        }
    }
    setVoc(index: number, event) {
        if (this.resType.properties[index] !== undefined) {
            this.resType.properties[index].vocabulary = event.value;
        }
    }


}
