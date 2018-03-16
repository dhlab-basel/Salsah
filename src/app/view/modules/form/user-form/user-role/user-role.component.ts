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

import {Component, Input, OnInit} from '@angular/core';
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

    @Input() projectIri: string;

    // in case of an API error
    errorMessage: any;

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;

    userRoleForm: FormGroup;

    // error checking on the following fields
    formErrors = {
        'group': ''
    };

    // ...and the error hints
    validationMessages = {
        'group': {
            'required': 'The user has to be at least in one group.'
        }
    };

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
                value: this.projectIri, disabled: (this.projectIri)
            }),
            'group': new FormControl({
                value: '', disabled: false
            }, [
                Validators.required
            ])
        });

        this.onValueChanged();



    }

    onValueChanged(data?: any) {

        if (!this.userRoleForm) {
            return;
        }

        const form = this.userRoleForm;

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

}
