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

import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
// services
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ResourceTypesService} from "../../../../model/services/resource-types.service";
import {PropertiesService} from "../../../../model/services/properties.service";
// json classes
import {ProjectItem, ResourceTypes, Properties, ResourceTypeInfo, ResourceType} from "../../../../model/webapi/knora";

// import {ResourceClassFormComponent} from "../../../modules/form/resource-class-form/resource-class-form.component";


@Component({
    selector: 'salsah-project-resources',
    templateUrl: './project-resources.component.html',
    styleUrls: ['./project-resources.component.scss']
})
export class ProjectResourcesComponent implements OnInit {

    isLoading: boolean = true;
    isLoadingSubModule: boolean = true;
    errorMessage: string = undefined;

    selectedRow: number;

    project: ProjectItem = new ProjectItem;

    resourceTypes: ResourceTypes = new ResourceTypes;

    resType: ResourceTypeInfo = new ResourceTypeInfo;

    addResource: boolean = false;
    editResource: boolean = false;

    properties: Properties;

    selectedOption: string;

    position = {
        preview: 'left',        // top
        detail: 'right'         // bottom
    };

    size: string = 'large';

    id: string;
    index: number;

    resClassIri: string;
    propsIndex: number;

    constructor(private _resourceTypesService: ResourceTypesService,
                private _propertiesService: PropertiesService,
                public dialog: MdDialog) {
 //       openElem.show.subscribe((val:boolean) => this.isLoadingSubModule = val);
    }

    ngOnInit() {

        this.project = JSON.parse(localStorage.getItem('currentProject'));
        this._resourceTypesService.getResourceTypesByVoc(this.project.ontologyNamedGraph)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resourceTypes = result.getBody(ResourceTypes);
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
        // Develop test: open the dialog box for new resources on the start directly
        // this.addNewResourceClass();
    }


    createResource() {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;
        this.selectedRow = undefined;

        this.addResource = true;
        this.editResource = false;
        this.isLoadingSubModule = false;


/*
        let dialogRef = this.dialog.open(ResourceClassFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });
*/
    }

    openResource(id: string, index: number) {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;
        this.editResource = true;
        this.addResource = false;

        this.resClassIri = id;
        this.propsIndex = index;
        this.isLoadingSubModule = false;



/*
        this._propertiesService.getPropertiesByResType(id)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.properties = result.getBody(Properties);
                    this.selectedRow = index;
                    this.isLoadingSubModule = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoadingSubModule = false;
                }
            );
*/
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.editResource = false;
        this.addResource = false;
    }

    loadingSubmodule(loaded: boolean) {
        console.log(loaded);
        this.isLoadingSubModule = loaded;
    }

}
