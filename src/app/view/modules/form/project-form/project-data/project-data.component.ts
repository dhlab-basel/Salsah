/* Copyright © 2016 Digital Humanities Lab, University of Basel.
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

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Project, User} from '../../../../../model/webapi/knora';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../../../../../model/services/projects.service';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {existingNamesValidator} from '../../../other/existing-name.directive';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {ApiServiceResult} from '../../../../../model/services/api-service-result';
import {MessageData} from '../../../message/message.component';

@Component({
    selector: 'salsah-project-data',
    templateUrl: './project-data.component.html',
    styleUrls: ['./project-data.component.scss']
})
export class ProjectDataComponent implements OnInit, OnChanges {

    @Input() projectIri?: string;

    /**
     * user profile in case of edit?
     */
    @Input() project?: Project;

    /**
     * Is the form a standalone or embedded in a step by step form wizard?
     *
     * @type {boolean}
     */
    @Input() standalone?: boolean = true;

    /**
     *
     * @type {EventEmitter<User>}
     */
    @Output() projectData = new EventEmitter<Project>();

    @Output() closeForm = new EventEmitter<any>();

    // quick hack:
    edit: boolean = false;

    // form group for the form controller
    projectDataForm: FormGroup;

    logo: string = null;

    existingShortNames: [RegExp] = [
        new RegExp('project')
    ];
    shortnameRegex = /^[a-zA-Z]+\S*$/;

    existingShortcodes: [RegExp] = [
        new RegExp('project')
    ];
    shortcodeRegex = /^[0-9A-Fa-f]+$/;

    descriptionMaxLength: number = 2000;
    shortcodeMinLength: number = 4;
    shortcodeMaxLength: number = this.shortcodeMinLength;

    shortnameMinLength: number = 3;
    shortnameMaxLength: number = 16;

    formErrors = {
        'shortname': '',
        'longname': '',
        'shortcode': '',
        'description': ''
//        'institution': '',
//        'keywords': '',
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
            'required': 'Project (long) name is required.'
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
        }
//        'institution': {},
//        'keywords': {
//            'required': 'At least one keyword is required.'
//        }
    };

    // keywords input field:
    // keywords is an array of objects of {name: 'string'}
    keywords: string[] = [];
    // Enter, comma
    separatorKeysCodes = [ENTER, COMMA];
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;


    // in case of an API error
    errorMessage: any;

    // in case of success:
    success: boolean = false;
    successMessage: any = {
        status: 200,
        statusText: 'You have successfully updated the project data.'
    };


    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;

    constructor(private _projectsService: ProjectsService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        // get a list of all projects and create an array of the short names, but only in "create new" mode
        // the short name should be unique and with the array list, we can prevent
        // to have the same short name; proof it with the ForbiddenName directive
        if (!this.projectIri) {
            this._projectsService.getAllProjects()
                .subscribe(
                    (result: Project[]) => {
                        for (const project of result) {
                            this.existingShortNames.push(new RegExp('(?:^|\W)' + project.shortname.toLowerCase() + '(?:$|\W)'));
                            if (project.shortcode !== null) {
                                this.existingShortcodes.push(new RegExp('(?:^|\W)' + project.shortcode.toLowerCase() + '(?:$|\W)'));
                            }
                        }
                    },
                    (error: ApiServiceError) => {
                        console.log(error);
                        this.errorMessage = error;
                    }
                );

            if (this.project === undefined) {
                this.project = new Project();
            }
            this.buildForm(this.project);

            this.isLoading = false;

        } else {
            this._projectsService.getProjectByIri(this.projectIri)
                .subscribe(
                    (result: Project) => {
                        this.project = result;

                        this.buildForm(this.project);

                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = error;
                    }
                );
        }

    }


    ngOnChanges() {
        if (this.project) {
            this.buildForm(this.project)
        }
    }


    buildForm(project: Project): void {
        // if project is defined, we're in the edit mode
        // otherwise "create new project" mode is active
        this.edit = (!!project.id);

        // separate list of keywords
        this.keywords = project.keywords;

        this.projectDataForm = this._formBuilder.group({
            'shortname': new FormControl({
                value: project.shortname, disabled: this.edit
            }, [
                Validators.required,
                Validators.minLength(this.shortnameMinLength),
                Validators.maxLength(this.shortnameMaxLength),
                existingNamesValidator(this.existingShortNames),
                Validators.pattern(this.shortnameRegex)
            ]),

            'longname': new FormControl({
                value: project.longname, disabled: false
            }, [
                Validators.required
            ]),
            'shortcode': new FormControl({
                value: project.shortcode, disabled: (this.edit && project.shortcode !== null)
            }, [
                Validators.required,
                Validators.minLength(this.shortcodeMinLength),
                Validators.maxLength(this.shortcodeMaxLength),
                existingNamesValidator(this.existingShortcodes),
                Validators.pattern(this.shortcodeRegex)
            ]),
            'description': new FormControl({
                value: project.description[0].value, disabled: false
            }, [
                Validators.required,
                Validators.maxLength(this.descriptionMaxLength)
            ]),
//            'institution': new FormControl({
//                value: project.institution, disabled: false
//            }),
            'logo': new FormControl({
                value: project.logo, disabled: false
            }),
            'id': [project.id],
            'status': [true],
            'selfjoin': [false],
            'keywords': []          // must be empty (even in edit mode), because of the mat-chip-list
        });

        this.projectDataForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    /**
     *
     * @param data
     */
    onValueChanged(data?: any) {

        if (!this.projectDataForm) {
            return;
        }

        const form = this.projectDataForm;

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

    /**
     *
     */
    submitData(): void {
        this.isLoading = true;

        // a) update keyowrds from mat-chip-list
        if (!this.keywords) {
            this.keywords = [];
        }
        this.projectDataForm.controls['keywords'].setValue(this.keywords);

        // b) update description field / multi language preparation
        // FIXME: this is a quick (hardcoded) hack:
        // TODO: create multi language input fields
        this.projectDataForm.controls['description'].setValue([{
            'language': 'en',
            'value': this.projectDataForm.controls['description'].value
        }]);


        if (this.edit) {
            // edit / update project data
            this._projectsService.updateProject(this.project.id, this.projectDataForm.value).subscribe(
                (result: Project) => {
                    this.project = result;
                    this.buildForm(this.project);
                    this.isLoading = false;
                    this.success = true;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = error;
                    this.isLoading = false;
                    this.success = false;
                }
            )
        } else {
            // create new project
            this._projectsService.createProject(this.projectDataForm.value).subscribe(
                (result: Project) => {
                    this.project = result;
                    this.buildForm(this.project);
                    this.isLoading = false;
                    this.closeForm.emit('/project/' + this.projectDataForm.controls['shortname'].value);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = error;
                    this.isLoading = false;
                    this.success = false;
                }
            )
        }
    }

    //
    // add or remove keyword from mat-chip-list

    /**
     *
     * @param {MatChipInputEvent} event
     */
    addKeyword(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if (!this.keywords) {
            this.keywords = [];
        }

        // Add keyword
        if ((value || '').trim()) {
            this.keywords.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    /**
     *
     * @param keyword
     */
    removeKeyword(keyword: any): void {
        const index = this.keywords.indexOf(keyword);

        if (index >= 0) {
            this.keywords.splice(index, 1);
        }
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
