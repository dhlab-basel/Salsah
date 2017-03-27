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
import {ResourceTypesService} from "../../../../model/api/resource-types.service";
import {ResourceTypes} from "../../../../model/classes/resource-types";
import {ProjectItem} from "../../../../model/classes/projects";
import {ResourceClassFormComponent} from "../../../modules/form/resource-class-form/resource-class-form.component";
import {PropertiesService} from "../../../../model/api/properties.service";
import {Properties} from "../../../../model/classes/properties";
import {ApiServiceResult} from "../../../../model/api/api-service-result";
import {ApiServiceError} from "../../../../model/api/api-service-error";

@Component({
    selector: 'salsah-project-resources',
    templateUrl: './project-resources.component.html',
    styleUrls: ['./project-resources.component.css']
})
export class ProjectResourcesComponent implements OnInit {

    isLoading: boolean = true;
    isLoadingSubModule: boolean = true;
    errorMessage: string = undefined;

    selectedRow: number;

    project: ProjectItem = new ProjectItem;

    resourceTypes: ResourceTypes = new ResourceTypes;

    properties: Properties;

    selectedOption: string;

    position = {
        preview: 'left',        // top
        detail: 'right'         // bottom
    };

    size: string = 'large';

    constructor(private _resourceTypesService: ResourceTypesService,
                private _propertiesService: PropertiesService,
                public dialog: MdDialog) {
    }

    ngOnInit() {
        this.project = JSON.parse(localStorage.getItem('project'));
        this._resourceTypesService.getResourceTypes(this.project.ontologyNamedGraph)
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
        // Develop test: open the dialog box for new resources directly on the start
        this.addNewResourceClass();
    }


    addNewResourceClass() {
        let dialogRef = this.dialog.open(ResourceClassFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });

    }

    openResourceClass(id: string, index: number) {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;

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
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.properties = undefined;
    }

}
