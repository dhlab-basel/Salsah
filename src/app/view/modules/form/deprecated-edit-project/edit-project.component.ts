import {Component, Input, OnInit} from '@angular/core';
import {ProjectItem} from '../../../../model/webapi/knora/v1/projects/project-item';
import {ProjectsService} from '../../../../model/services/projects.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {Project} from '../../../../model/webapi/knora/v1/projects/project';
import {ApiServiceError} from '../../../../model/services/api-service-error';

@Component({
    selector: 'salsah-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

    @Input() iri: string;

    project: ProjectItem;
    errorMessage: any = undefined;

    constructor(private _projectsService: ProjectsService) {
    }

    ngOnInit() {
        this._projectsService.getProjectByIri(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.project = result.getBody(Project).project_info;
                    console.log(this.project);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

}
