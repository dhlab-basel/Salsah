import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
import {ResourceTypesService} from "../../../../model/api/resource-types.service";
import {ResourceTypes} from "../../../../model/classes/resource-types";
import {ProjectItem} from "../../../../model/classes/projects";
import {NewResourceClassComponent} from "../../../modules/create/new-resource-class/new-resource-class.component";

@Component({
    selector: 'salsah-project-resources',
    templateUrl: './project-resources.component.html',
    styleUrls: ['./project-resources.component.css']
})
export class ProjectResourcesComponent implements OnInit {

    isLoading: boolean = true;
    errorMessage: string = undefined;

    project: ProjectItem = new ProjectItem;

    resourceTypes: ResourceTypes = new ResourceTypes;

    selectedOption: string;

    constructor(
        private _resourceTypesService: ResourceTypesService,
        public dialog: MdDialog) { }

    ngOnInit() {
        this.project = JSON.parse(localStorage.getItem('project'));
        this._resourceTypesService.getResourceTypes(this.project.ontologyNamedGraph)
            .subscribe(
                (data: ResourceTypes) => {
                    this.resourceTypes = data;
                    this.isLoading = false;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }


    createNewResourceClass() {

//        alert('open new dialog');

        let dialogRef = this.dialog.open(NewResourceClassComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });

    }

}
