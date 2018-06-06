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
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppConstants} from '../../../../../app.constants';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {User} from '../../../../../model/webapi/knora';
import {UsersService} from '../../../../../model/services/users.service';

@Component({
    selector: 'salsah-user-password',
    templateUrl: './user-password.component.html',
    styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {

    @Input() userIri: string;

    // visibility of password
    showOldPassword: boolean = false;
    showNewPassword: boolean = false;

    // in case of an API error
    errorMessage: any;

    // in case if the old password is wrong
    oldPasswordIsWrong: boolean = false;
    oldPasswordError: string = 'The old password is not correct';

    // in case of success:
    success: boolean = false;
    successMessage: any = {
        status: 200,
        statusText: 'You have successfully changed your password.'
    };

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;

    userPasswordForm: FormGroup;

    // error checking on the following fields
    formErrors = {
        'requesterPassword': '',
        'newPassword': ''
    };

    // ...and the error hints
    validationMessages = {
        'requesterPassword': {
            'required': 'The old password is required'
        },
        'newPassword': {
            'required': 'A new password is needed, if you want to change it.',
            'minlength': 'Use at least 8 characters.',
            'pattern': 'The password should have at least one uppercase letter and one number.'
        }
    };


    constructor(private _usersService: UsersService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {

        this.userPasswordForm = this._formBuilder.group({
            'requesterPassword': new FormControl({
                value: '', disabled: false
            }, [
                Validators.required
            ]),
            'newPassword': new FormControl({
                value: '', disabled: false
            }, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(AppConstants.RegexPassword)

            ])
        });

        this.userPasswordForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

        this.isLoading = false;

    }

    onValueChanged(data?: any) {

        const form = this.userPasswordForm;

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
     * toggel the visibility of the password
     */
    toggleVisibility(ev: Event, password: string) {
        ev.preventDefault();

        if (password === 'old') {
            this.showOldPassword = (!this.showOldPassword);
        } else {
            this.showNewPassword = (!this.showNewPassword);
        }

    }

    /**
     *
     */
    submitData(): void {
        // reset old messages
        this.oldPasswordIsWrong = false;

        this.isLoading = true;

        this._usersService.updateUser(this.userIri, this.userPasswordForm.value).subscribe(
            (result: User) => {
                console.log(result);
                this.success = true;
                this.isLoading = false;
            },
            (error: ApiServiceError) => {

                if (error.status === 403) {
                    // the old password is wrong
                    this.oldPasswordIsWrong = true;
                    this.success = false;
                } else {
                    this.errorMessage = error;
                }

                this.isLoading = false;
            }
        )
    }

}
