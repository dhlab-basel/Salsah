import { Component, OnInit } from '@angular/core';
import { ApiServiceError, Project, ProjectsService, User, UsersService } from '@knora/core';

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
        this._usersService.getUser(this.userIri)
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
