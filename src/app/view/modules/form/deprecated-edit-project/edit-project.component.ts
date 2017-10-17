import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../model/webapi/knora/v1/projects/project';
import {ProjectsService} from '../../../../model/services/projects.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';

@Component({
    selector: 'salsah-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

    @Input() iri: string;

    project: Project;
    errorMessage: any = undefined;

    constructor(private _projectsService: ProjectsService) {
    }

    ngOnInit() {
        this._projectsService.getProjectByIri(this.iri)
            .subscribe(
                (result: Project) => {
                    this.project = result;
                    console.log(this.project);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

}
