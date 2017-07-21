/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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
import {Properties} from "../../../../model/webapi/knora";
import {ResourceTypesService} from "../../../../model/services/resource-types.service";
import {ResourceType, ResourceTypeInfo} from "../../../../model/webapi/knora/";
import {ProjectsService} from "../../../../model/services/projects.service";
import {ProjectsList, ProjectItem} from "../../../../model/webapi/knora/";

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
    @Input('projects') projectsList: ProjectItem[];


    resType: ResourceTypeInfo = new ResourceTypeInfo;

    properties: Properties;
    errorMessage: string = undefined;
    selectedRow: number;

    editResource: boolean;

    focusOnResourceEdit: string = 'inactive';
    focusOnPropertiesEdit: string = 'inactive';

    editResourceClass: ResourceTypeInfo = new ResourceTypeInfo();

    guiItems: string[] = [
        "text",
        "richtext",
        "text area",
        "dropdown menu",
        "number field",
        "date field",
        "searchbox",
        "file upload"
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
                    this.editResourceClass.properties= this.resType.properties;

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

    //sets default values from json files on md-select
    setGUI(index: number, event) {
        if (this.editResourceClass.properties[index] !== undefined) {
            this.editResourceClass.properties[index].gui_name = event.value;
        }
    }
    setOcc(index: number, event) {
        if (this.editResourceClass.properties[index] !== undefined) {
            this.editResourceClass.properties[index].occurrence = event.value;
        }
    }
    setVoc(index: number, event) {
        if (this.editResourceClass.properties[index] !== undefined) {
            this.editResourceClass.properties[index].vocabulary = event.value;
        }
    }


}
