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
import {AppConfig} from '../../../../../app.config';
import {User} from '../../../../../model/webapi/knora';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {UsersService} from '../../../../../model/services/users.service';

@Component({
    selector: 'salsah-user-data',
    templateUrl: './user-data.component.html',
    styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit, OnChanges {

    /**
     * user iri in the case of edit
     */
    @Input() userIri?: string;

    /**
     * user profile in case of edit?
     */
    @Input() user?: User;

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
    @Output() userData = new EventEmitter<User>();

    // form group for the form controller
    userDataForm: FormGroup;

    // error checking on the following fields
    formErrors = {
        'givenName': '',
        'familyName': '',
//        'email': '',
        'password': ''
    };

    // ...and the error hints
    validationMessages = {
        'givenName': {
            'required': 'First name is required.'
        },
        'familyName': {
            'required': 'Last name is required.'
        },
        /*
        'email': {
            'required': 'Email address is required.',
            'pattern': 'This doesn\'t appear to be a valid email address.',
            'existingName': 'This email address exists already.'
        },
        */
        'password': {
            'required': 'A password is required.',
            'minlength': 'Use at least 8 characters.',
            'pattern': 'The password should have at least one uppercase letter and one number.',
        }
    };

    // password visibility
    showPassword: boolean = false;

    // in case of an API error
    errorMessage: any;

    // in case of success:
    success: boolean = false;
    successMessage: any = {
        status: 200,
        statusText: 'You have successfully updated the user profile.'
    };

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;


    languagesList: any[] = [
        {
            id: 'en',
            name: 'english'
        },
        {
            id: 'de',
            name: 'deutsch'
        },
        {
            id: 'fr',
            name: 'français'
        },
        {
            id: 'it',
            name: 'italiano'
        }
    ];

    constructor(private _usersService: UsersService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {

        if (!this.user && this.userIri) {

            this._usersService.getUserByIri(this.userIri)
                .subscribe(
                    (result: User) => {
                        this.user = result;

                        this.buildForm(this.user);

                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = error;
                    }
                );
        } else {

            this.buildForm(this.user);

            this.isLoading = false;
        }

    }

    ngOnChanges() {
        if (this.user) {
            this.buildForm(this.user)
        }
    }


    /**
     *
     * @param {User} user
     */
    buildForm(user: User): void {

        // if user is defined, we're in the edit mode
        // otherwise "create new user" mode is active
        const edit: boolean = (!!user.id);

        this.userDataForm = this._formBuilder.group({
            'givenName': new FormControl({
                value: user.givenName, disabled: false
            }, [
                Validators.required
            ]),
            'familyName': new FormControl({
                value: user.familyName, disabled: false
            }, [
                Validators.required
            ]),
            'email': new FormControl({
                value: user.email, disabled: true
            }),
            'password': new FormControl({
                value: user.password, disabled: (edit)
            }, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(AppConfig.RegexPassword)
            ]),
            'lang': new FormControl({
                value: (user.lang ? user.lang : 'en'), disabled: false
            })
//            'status': user.userData.status,
//            'systemAdmin': this.sysAdminPermission,
//            'group': null
        });

//        this.isLoading = false;


        this.userDataForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

//        this.onValueChanged(); // (re)set validation messages now

    }

    /**
     *
     * @param data
     */
    onValueChanged(data?: any) {

        if (!this.userDataForm) {
            return;
        }

        const form = this.userDataForm;

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
     * toggle the visibility of the password
     */
    toggleVisibility() {
        this.showPassword = (!this.showPassword);
    }

    /**
     *
     */
    submitData(): void {

        if (this.standalone) {
            this.isLoading = true;
            // this method is only used in standalone user data form
            // to edit user profile
            this._usersService.updateUser(this.user.id, this.userDataForm.value).subscribe(
                (result: User) => {
                    this.user = result;
                    this.buildForm(this.user);
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
            this.userData.emit(this.userDataForm.value);
        }
    }

}
