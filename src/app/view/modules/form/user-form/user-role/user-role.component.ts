import {Component, OnInit} from '@angular/core';
import {AutocompleteItem} from '../../../../../app.interfaces';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppConfig} from '../../../../../app.config';
import {ProjectsService} from '../../../../../model/services/projects.service';
import {Project} from '../../../../../model/webapi/knora/admin';
import {ApiServiceError} from '../../../../../model/services/api-service-error';

@Component({
    selector: 'salsah-user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

    // in case of an API error
    errorMessage: any;

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;

    userRoleForm: FormGroup;

    projects: Project[];

    projectsList: any = [];

    // permission groups / role of the user in a project
    groups: AutocompleteItem[] = [
        {
            iri: '',
            name: '',
            label: 'Member'
        },
        {
            iri: '',
            name: '',
            label: 'Administrator'
        },
        {
            iri: '',
            name: '',
            label: 'System admin'
        }

    ];

    constructor(private _projectsService: ProjectsService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {

        // get all projects to select from list
        this._projectsService.getAllProjects()
            .subscribe(
                (result: Project[]) => {
                    this.projects = result;

                    let i: number = 0;
                    for (const p of result) {
                        this.projectsList[i] = {
                            iri: p.id,
                            name: p.longname + ' (' + p.shortname + ')'
                        };
                        i++;
                    }

                    this.projectsList.sort(function (p1, p2) {
                        if (p1.name < p2.name) {
                            return -1;
                        } else if (p1.name > p2.name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    // when it's ready: disable the progress loader
                    this.isLoading = false;


                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );


        this.userRoleForm = this._formBuilder.group({
            'project': new FormControl({
                value: '', disabled: false
            }),
            'group': new FormControl({
                value: '', disabled: false
            })
        });



    }

}
