import {Component, OnInit} from '@angular/core';
import {ResourceTypesService} from "../../../../model/api/resource-types.service";
import {ResourceTypes} from "../../../../model/classes/resource-types";
import {ProjectItem} from "../../../../model/classes/projects";

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

    constructor(private _resourceTypesService: ResourceTypesService) {
    }

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

}
