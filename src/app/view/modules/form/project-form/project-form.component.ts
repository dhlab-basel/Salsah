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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../../../../model/services/projects.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {Project, ProjectItem, ProjectsList} from '../../../../model/webapi/knora/';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {existingNamesValidator} from '../../other/existing-name.directive';

@Component({
    selector: 'salsah-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

    // the project-form can be used to create new project or the edit existing projects
    // it can have an attribute called iri which creates the edit form
    // otherwise the form is empty to create a new project

    @Input() iri?: string;

    // @Output() submitData = new EventEmitter<any>();

    isLoading: boolean = true;

    errorMessage: any;

    submitted: boolean = false;

    step: number = 0;

    project: ProjectItem = new ProjectItem();

    logo: string = null;

    existingShortNames: [RegExp] = [
        new RegExp('project')
    ];
    shortnameRegexp = /^\S*$/;

    form: FormGroup;

    descriptionMaxLength: number = 2000;

    formLabels = {
        project: {
            title: 'Project details',
            description: 'Description',
            shortname: 'Project short name',
            longname: 'Project name',
            logo: {
                upload: 'Upload a logo',
                or: 'OR',
                url: 'Set an URL',
                name: 'Logo file name or URL'
            },
            keywords: 'Keywords'
        },
        user: {
            select: 'Select user to add'
        },
        navigation: {
            next: 'Next',
            back: 'Back',
            skip: 'Skip',
            cancel: 'Cancel',
            submit: 'Save',
            close: 'Close',
            add: 'Add more users',
            reset: 'Reset'
        }

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
            'pattern': 'Whitespaces are not allowed.',
            'existingName': 'This short name is already taken.'
        },
        'longname': {
            'required': 'Long name is required.',
        },
        'description': {
            'maxlength': 'Description cannot be more than ' + this.descriptionMaxLength + ' characters long.',
        },
        'keywords': {}
    };

    constructor(public _projectsService: ProjectsService,
                private _fb: FormBuilder) {
    }


    ngOnInit() {
        // get a list of all projects and create an array of the short names
        // the short name should be unique and with the array list, we can
        // prevent to have the same short name; proof it with the ForbiddenName directive
        this._projectsService.getAllProjects()
            .subscribe(
                (result: ApiServiceResult) => {
                    const projectsList: ProjectItem[] = result.getBody(ProjectsList).projects;
                    for (const p of projectsList) {
                        this.existingShortNames.push(new RegExp('(?:^|\W)' + p.shortname.toLowerCase() + '(?:$|\W)'));
                    }
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            );

        if (this.iri) {
            // edit existing project; get the data first
            this._projectsService.getProjectByIri(this.iri)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.project = result.getBody(Project).project_info;

                        const short = new RegExp(this.project.shortname);

                        this.existingShortNames.splice(this.existingShortNames.indexOf(short), 1);

                        this.buildForm(this.project);
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );
        } else {
            // create new project
            this.buildForm(new ProjectItem());
        }


    }

    buildForm(proj: ProjectItem): void {
        // formControllName
        /*
        this.form = new FormGroup({
            'shortname': new FormControl({value: proj.shortname}),
            'longname': new FormControl({value: proj.longname}),
            'description': new FormControl({value: proj.description}),
            'logo': new FormControl({value: proj.logo})
        });

        console.log(this.form);
        */

        console.log(proj.logo);

        if (proj.logo !== undefined) {
            this.logo = proj.logo;
        }

        this.form = this._fb.group({
            'shortname': new FormControl({value: proj.shortname, disabled: this.iri !== undefined}, [Validators.required, Validators.minLength(3), Validators.maxLength(16), existingNamesValidator(this.existingShortNames), Validators.pattern(this.shortnameRegexp)]),
            'longname': [proj.longname, Validators.required],
            'description': [proj.description, Validators.maxLength(this.descriptionMaxLength)],
            'institution': [proj.institution],
            'logo': [proj.logo],
            'id': [proj.id],
            'status': [true],
            'selfjoin': [false],
            'keywords': [proj.keywords]
        });


        // console.log(this.form);

        this.isLoading = false;


        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {

        if (!this.form) {
            return;
        }
        const form = this.form;

        /*
        if(data && data.shortname) {
            this.newProject.ontologyNamedGraph = 'http://www.knora.org/ontology/' + data.shortname;
            this.newProject.dataNamedGraph = 'http://www.knora.org/data/' + data.shortname;
        }
        */

        Object.keys(this.formErrors).map(field => {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                Object.keys(control.errors).map(key => {
                    this.formErrors[field] += messages[key] + ' ';
                });

            }
        });

/*
        for (const field in Object.keys(this.formErrors)) {
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
        */
    }

    onSubmit(value: any, iri?: string): void {

        this.submitted = false;

        this.project = value;

        // this.submitData.emit({value, iri});

        if (!this.iri) {
            // create project
            this._projectsService.createProject(this.project).subscribe(
                (result: ApiServiceResult) => {
//                    console.log('service: ', result);
                    this.submitted = true;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = error;
                }
            );
        } else {
            // update project
            this._projectsService.updateProject(this.iri, this.project).subscribe(
                (result: ApiServiceResult) => {

//                    console.log('service: ', result);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = error;
                }
            );
        }

        if (this.submitted) {
            location.reload();
        }
    }


    /**
     * saveProject()
     * check validity of the data in the form
     * if everything's fine, send the data to the api
     * and change the view from modify project to the project admin view
     */

        //
        // ngX file upload settings
        //
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    /*
     options: NgUploaderOptions = {
     url: 'http://localhost:10050/upload'
     };
     */
    sizeLimit = 2000000;

    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    beforeUpload(uploadingFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('File is too large');
        }
    }

    getFiles(files: any): void {
        this.logo = files[0].name;
        console.log('getFile: ', files[0].name);
    }


    submitData() {
        console.log(this.form);
    }

}
