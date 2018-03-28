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
import {Project} from '../../../../model/webapi/knora/';
import {ApiServiceError} from '../../../../model/services/api-service-error';

import {ActivatedRoute} from '@angular/router';
import {existingNamesValidator, notAllowed} from '../../other/existing-name.directive';
import {MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../../dialog/message-dialog/message-dialog.component';
import {MessageData} from '../../message/message.component';
import {AppConfig} from '../../../../app.config';
import {OntologyInfoShort} from '../../../../model/webapi/knora/admin/ontologies/ontology-info-short';

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

    @Output() closeForm = new EventEmitter<any>();

    // @Output() submitData = new EventEmitter<any>();

    isLoading: boolean = true;

    errorMessage: any;

    submitted: boolean = false;

    step: number = 0;

    project: Project = new Project();

    logo: string = null;

    existingShortNames: [RegExp] = [
        new RegExp('project')
    ];
    shortnameRegex = /^[a-zA-Z]+\S*$/;

    existingShortcodes: [RegExp] = [
        new RegExp('project')
    ];
    shortcodeRegex = /^[0-9A-Fa-f]+$/;

    form: FormGroup = new FormGroup({});

    descriptionMaxLength: number = 2000;
    shortcodeMinLength: number = 4;
    shortcodeMaxLength: number = this.shortcodeMinLength;

    shortnameMinLength: number = 3;
    shortnameMaxLength: number = 16;

    formLabels = {
        project: {
            title: 'Project details',
            subtitle: 'Create new',    // depends on the form type: Create new or Edit
            description: 'Description',
            shortname: 'Project short name',
            longname: 'Project name',
            shortcode: 'Shortcode',
            institution: 'Institution',
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
            reset: 'Reset',
            activate: 'Activate',
            deactivate: 'Deactivate'
        }

    };

    formErrors = {
        'shortname': '',
        'longname': '',
        'shortcode': '',
        'description': '',
        'institution': '',
        'keywords': '',
    };

    validationMessages = {
        'shortname': {
            'required': 'Short name is required.',
            'minlength': 'Short name must be at least ' + this.shortnameMinLength + ' characters long.',
            'maxlength': 'Short name cannot be more than ' + this.shortnameMaxLength + ' characters long.',
            'pattern': 'Short name shouldn\'t start with a number; Spaces are not allowed.',
            'existingName': 'This short name is already taken.'
        },
        'longname': {
            'required': 'Long name is required.'
        },
        'shortcode': {
            'required': 'Shortcode is required',
            'maxlength': 'Shortcode cannot be more than ' + this.shortcodeMaxLength + ' characters long.',
            'minlength': 'Shortcode cannot be less than ' + this.shortcodeMinLength + ' characters long.',
            'pattern': 'This is not a hexadecimal value!',
            'existingName': 'This shortcode is already taken.'
        },
        'description': {
            'required': 'A description is required.',
            'maxlength': 'Description cannot be more than ' + this.descriptionMaxLength + ' characters long.'
        },
        'institution': {},
        'keywords': {}
    };

    constructor(public _projectsService: ProjectsService,
                private _fb: FormBuilder,
                private _route: ActivatedRoute) {
    }


    ngOnInit() {
        // get a list of all projects and create an array of the short names
        // the short name should be unique and with the array list, we can
        // prevent to have the same short name; proof it with the ForbiddenName directive
        this._projectsService.getAllProjects()
            .subscribe(
                (result: Project[]) => {
                    const projects: Project[] = result;
                    for (const p of projects) {
                        this.existingShortNames.push(new RegExp('(?:^|\W)' + p.shortname.toLowerCase() + '(?:$|\W)'));
                        if (p.shortcode !== null) {
                            this.existingShortcodes.push(new RegExp('(?:^|\W)' + p.shortcode.toLowerCase() + '(?:$|\W)'));
                        }
                    }
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            );

        if (this.iri) {
            // edit existing project; get the data first
            this.formLabels.project.subtitle = 'Edit ';
            this._projectsService.getProjectByIri(this.iri)
                .subscribe(
                    (result: Project) => {
                        this.project = result;
                        this.formLabels.project.subtitle += this.project.shortname;

                        const shortN = new RegExp(this.project.shortname);
                        const shortC = new RegExp(this.project.shortcode);
                        this.existingShortNames.splice(this.existingShortNames.indexOf(shortN), 1);
                        this.existingShortcodes.splice(this.existingShortcodes.indexOf(shortC), 1);

                        const sc = new RegExp(this.project.shortcode);

                        this.buildForm(this.project);
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );
        } else {
            // create new project
            this.buildForm(new Project());
        }


    }

    buildForm(proj: Project): void {
        // formControllName
        /*
                this.form = new FormGroup({
                    'shortname': new FormControl({value: proj.shortname}),
                    'shortcode': new FormControl({value: proj.shortcode}),
                    'longname': new FormControl({value: proj.longname}),
                    'longname': new FormControl({value: proj.institution}),
                    'description': new FormControl({value: proj.description}),
                    'logo': new FormControl({value: proj.logo})
                });

                        if (proj.logo !== undefined) {
                    this.logo = proj.logo;
                }

        */


        this.form = this._fb.group({

            'shortname': new FormControl({
                value: proj.shortname, disabled: this.iri !== undefined
            }, [
                Validators.required,
                Validators.minLength(this.shortnameMinLength),
                Validators.maxLength(this.shortnameMaxLength),
                existingNamesValidator(this.existingShortNames),
                Validators.pattern(this.shortnameRegex)
            ]),

            'longname': new FormControl({
                value: proj.longname, disabled: false
            }, [
                Validators.required
            ]),
            'shortcode': new FormControl({
                value: proj.shortcode, disabled: (this.iri !== undefined && proj.shortcode !== null)
            }, [
                Validators.required,
                Validators.minLength(this.shortcodeMinLength),
                Validators.maxLength(this.shortcodeMaxLength),
                existingNamesValidator(this.existingShortcodes),
                Validators.pattern(this.shortcodeRegex)
            ]),
            'description': new FormControl({
                value: proj.description, disabled: false
            }, [
                Validators.required,
                Validators.maxLength(this.descriptionMaxLength)
            ]),
            'institution': new FormControl({
                value: proj.institution, disabled: false
            }),
            'logo': new FormControl({
                value: proj.logo, disabled: false
            }),
            'id': [proj.id],
            'status': [true],
            'selfjoin': [false],
            'keywords': [proj.keywords]
        });

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
    }

    onSubmit(value: any, iri?: string): void {

        this.submitted = false;

        this.project = value;

        // this.submitData.emit({value, iri});

        if (!this.iri) {
            this.project.ontologies = [];
            const ontology: OntologyInfoShort = {
                ontologyIri: AppConfig.KnoraOntologyPath + '/' + value.shortcode + '/' + value.shortname,
                ontologyName: value.shortname
            };
            this.project.ontologies.push(ontology);

            console.log('project info before post ', this.project);

            // create project
            this._projectsService.createProject(this.project)
                .subscribe(
                    (result: ApiServiceResult) => {
                        const newProject: Project = result.getBody();
                        console.log('project info after post ', newProject);

                        // create new ontology with iri of the new project and shortname;
                        // we have to store it in the session/local storage,
                        // because the knora api isn't ready yet for new ontology creation;
                        // TODO: needs coordination with knora api

                        const newOntology: any = {
                            '@context': {
                                'dc': 'http://www.knora.org/ontology/dc#',
                                'foaf': 'http://xmlns.com/foaf/0.1/',
                                'knora-base': 'http://www.knora.org/ontology/knora-base#',
                                'owl': 'http://www.w3.org/2002/07/owl#',
                                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                                'salsah-gui': 'http://www.knora.org/ontology/salsah-gui#',
                                'xsd': 'http://www.w3.org/2001/XMLSchema#'
                            },
                            '@graph': [
                                {
                                    '@id': this.project.ontologies[0],
                                    '@type': 'owl:Ontology'
                                }
                            ]
                        };

                        localStorage.setItem('newOntology', JSON.stringify(newOntology));

                        // this.isLoading = true;

                        // TODO: find a better solution: reload the component only, not the whole application; implement @Output as discussed here: https://stackoverflow.com/questions/41231557/refresh-component-in-angular-2

//                    window.location.replace('/project/' + value.shortname);

                        // IN PRGOGRESS:
                        this.closeForm.emit('/project/' + value.shortname);
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = error;
                    }
                );
        } else {
            // update project
            this._projectsService.updateProject(this.iri, this.project).subscribe(
                (result: ApiServiceResult) => {
                    this.closeForm.emit();
//                    this.isLoading = true;
//                    window.location.reload();
//                    console.log('service: ', result);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = error;
                }
            );
        }

        if (this.submitted) {
//            console.log('submitted');
            location.reload();
        }
    }


    sipiUpload(success: any): void {
        if (success !== false) {
            this.form.patchValue({'logo': success.files[0]});
//            this.form.controls['logo'].value = success.files[0];
        } else {
            console.log('error on file upload');
        }

    }


    submitData() {
        console.log(this.form);
    }

    deactivateProject(ev, id: string) {
        ev.preventDefault();
        // TODO: "are you sure?"-dialog

        // if true
        this._projectsService.deleteProject(id).subscribe(
            (res: Project) => {
                // reload page
                this.isLoading = false;
                window.location.reload();
            },
            (error: ApiServiceError) => {
                const message: MessageData = error;
                console.log(message);
                /*
                const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                    data: {
                        message: message
                    }
                });
                */
            }
        )

        // close dialog box

        // else: cancel action
    }

    activateProject(ev, id: string) {
        ev.preventDefault();
        // TODO: "are you sure?"-dialog

        this._projectsService.activateProject(id).subscribe(
            (res: Project) => {
                // reload page
                window.location.reload();
                this.isLoading = false;
            },
            (error: ApiServiceError) => {
                const message: MessageData = error;
                console.log(message);
                /*
                const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                    data: {
                        message: message
                    }
                });
                */
            }
        )
    }

}
