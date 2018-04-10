import {Component, OnInit} from '@angular/core';
import {Project, User} from '../../../../model/webapi/knora/admin';
import {UsersService} from '../../../../model/services/users.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from '../../../../model/services/projects.service';

@Component({
    selector: 'salsah-form-test',
    templateUrl: './form-test.component.html',
    styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent implements OnInit {

    userIri: string = 'http://rdfh.ch/users/multiuser';
    projectIri: string = 'http://rdfh.ch/projects/00FF';   // images

    project: Project;

    user: User;

    constructor(private _usersService: UsersService,
                private _projectsService: ProjectsService) {
    }

    ngOnInit() {

        /*
         * get user info
         */
        this._usersService.getUserByIri(this.userIri)
            .subscribe(
                (result: User) => {
                    this.user = result;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                }
            );

        this._projectsService.getProjectByIri(this.projectIri)
            .subscribe(
                (result: Project) => {
                    this.project = result;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                }

            );

    }

}
