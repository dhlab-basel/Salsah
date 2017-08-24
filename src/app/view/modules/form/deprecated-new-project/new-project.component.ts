/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
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

import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../../../../model/services/projects.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectItem} from '../../../../model/webapi/knora/';
import {forbiddenNamesValidator} from '../../other/forbidden-name.directive';
import {ProjectsList} from '../../../../model/webapi/knora/v1/projects/projects-list';

@Component({
    selector: 'salsah-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

    errorMessage: any;

    submitted: boolean = false;

    newProject: ProjectItem = new ProjectItem();

    existingProjects: [RegExp] = [
        new RegExp('project')
    ];

    // form group
    form: FormGroup;

    descriptionMaxLength: number = 1000;


    constructor(public _projectsService: ProjectsService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        // get a list of all projects and create an array of the short names
        // the short name should be unique and with the array list, we can
        // prevent to have the same short name; proof it with the ForbiddenName directive
        this._projectsService.getAllProjects()
            .subscribe(
                (result: ApiServiceResult) => {
                    let projectsList: ProjectItem[] = result.getBody(ProjectsList).projects;
                    for(let p of projectsList) {
                        this.existingProjects.push(new RegExp(p.shortname.toLowerCase()));
                    }
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            );

        this.buildForm();
    }

    buildForm(): void {
        // formControllName
        this.form = this.fb.group({
            'shortname': [this.newProject.shortname, [Validators.required, Validators.minLength(3), Validators.maxLength(16), forbiddenNamesValidator(this.existingProjects)]],
            'longname': [null, Validators.required],
            'description': [null, Validators.maxLength(this.descriptionMaxLength)],
            'institution': [null],
            'logo': [null],
            'id': [null],
            'dataNamedGraph': new FormControl({value: 'http://www.knora.org/data/', disabled: true}),
            'ontologyNamedGraph': new FormControl({value: 'http://www.knora.org/ontology/', disabled: true}),
            'status': [true],
            'selfjoin': [false],
            'keywords': [null]
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {

        if (!this.form) {
            return;
        }
        const form = this.form;

        if(data && data.shortname) {
            this.newProject.ontologyNamedGraph = 'http://www.knora.org/ontology/' + data.shortname;
            this.newProject.dataNamedGraph = 'http://www.knora.org/data/' + data.shortname;
        }


        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formLabels = {
        shortname: 'Project short name',
        longname: 'Project name',
        description: 'Description',
        logo: {
            upload: 'Upload a logo',
            or: 'OR',
            url: 'Set an URL'
        },
        keywords: 'Keywords'
    };

    formErrors = {
        'shortname': '',
        'longname': '',
        'description': '',
        'keywords': '',
    };

    validationMessages = {
        'shortname': {
            'required': 'Short name is required.',
            'minlength': 'Short name must be at least 3 characters long.',
            'maxlength': 'Short name cannot be more than 16 characters long.',
            'forbiddenName': 'This short name is already taken.'
        },
        'longname': {
            'required': 'Long name is required.',
        },
        'description': {
            'maxlength': 'Description cannot be more than ' + this.descriptionMaxLength + ' characters long.',
        },
        'keywords': {

        }
    };

    /**
     *
     * @param value
     */
    onSubmit(value: any): void {

        this.submitted = true;

        this.newProject  = value;

//        this.newProject.ontologyNamedGraph = 'http://www.knora.org/ontology/' + value.shortname;
//        this.newProject.dataNamedGraph = 'http://www.knora.org/data/' + value.shortname;

        console.log('you submitted value: ', value);

        this._projectsService.createProject(this.newProject).subscribe(
            (result: ApiServiceResult) => {

                console.log("service: ", result);

                // result.body.userProfile.userData.user_id
                // this.project.id
                // TODO: add the user, who creates the project to the new project
                /*
                if (this.projectIri) {
                    this._userService.addUserToProject(result.body.userProfile.userData.user_id, this.projectIri).subscribe(
                        (result: ApiServiceResult) => {
//                        console.log(result.body);
//                        this._projectTeam.closeDetailView();
                        },
                        (error: ApiServiceError) => {
                            console.log(error);
                            this.errorMessage = error;
                        }
                    );

                }
                */


            },
            (error: ApiServiceError) => {
                this.errorMessage = error;
            }
        );

    }


}
