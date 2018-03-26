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

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {ApiServiceError} from '../../../../model/services/api-service-error';

import {UsersService} from '../../../../model/services/users.service';

import {AutocompleteItem} from '../../../../app.interfaces';
import {User} from '../../../../model/webapi/knora';
import {AppConfig} from '../../../../app.config';

@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

    // dev only:
    setStep: number = 0;

    // general stuff
    isLoading: boolean = true;

    isLinear: boolean = true;

    // ------------------------------------------------------------------------
    // first step:
    //  - select user or set new user by entering an email address (in system and project view)
    //
    firstFormGroup: FormGroup;

    // form errors of first form group
    firstFormErrors = {
        'username': ''
    };

    // ...and the error hints
    firstValidationMessages = {
        'username': {
            'required': 'Email address is required.',
            'pattern': 'This doesn\'t appear to be a valid email address.',
            'member': 'This user is already a member of the project.'
        }
    };

    // list of all users
    users: AutocompleteItem[] = [];

    // filter users while typing (autocomplete)
    filteredUsers: Observable<any>;

    //
    selectedUser: User;

    //
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    // second step:
    //  - create new user (in system and project view)
    //  - edit user, if userIri is defined

    @Input() userIri?: string;

    email: string;

//    @ViewChild(UserDataComponent) userData: UserDataComponent;

    //
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    // third step:
    //  - select project (in system view) / project name (in project view)
    //
    thirdFormGroup: FormGroup;
    @Input() projectIri?: string = undefined;

    // list of all projects
    projects: AutocompleteItem[] = [];

    // selected groups
    groups: string[];

    //
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    // fourth step:
    //  - select group (in system and project view)
    //

    //
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    // error handling
    //
    // general api error message
    errorMessage: any = undefined;
    userErrorMessage: any = undefined;

    //
    // ------------------------------------------------------------------------


    constructor(public _usersService: UsersService,
                private _formBuilder: FormBuilder) {

    }

    ngOnInit() {

        this.buildFirstForm();

    }

    /**
     * First form is an input field with an auto complete method to get an existing user
     *
     */
    buildFirstForm(): void {

        this._usersService.getAllUsers()
            .subscribe(
                (result: User[]) => {

                    // list of users to prevent duplicate entries
                    let existingUserNames: [RegExp] = [
                        new RegExp('user')
                    ];

                    // The email address of the user should be unique.
                    // Therefore we create a list of existingUserNames to avoid multiple use of user names
                    for (const user of result) {
                        existingUserNames.push(
                            new RegExp('(?:^|\W)' + user.email.toLowerCase() + '(?:$|\W)')
                        );
                    }

                    let members: string[];
                    if (this.projectIri) {
                        // get the members of the project
                        members = JSON.parse(sessionStorage.getItem('currentMembers'));
                    }

                    let i: number = 1;
                    for (const u of result) {

                        let exists: string = '';

                        if (members && members.indexOf(u.id) > -1) {
                            exists = '* ';
                        }

                        this.users[i] = {
                            iri: u.id,
                            name: u.email,
                            label: exists + u.givenName + ' ' + u.familyName + ' (' + u.email + ')'
                        };
                        i++;
                    }

                    this.users.sort(function (u1, u2) {
                        if (u1.label < u2.label) {
                            return -1;
                        } else if (u1.label > u2.label) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    this.filteredUsers = this.firstFormGroup.controls['username'].valueChanges
                        .pipe(
                            startWith(this.firstFormGroup.controls['username'].value),
                            map(user => user ? this.filter(this.users, user) : this.users.slice())
                        );

                    /*
                                        this.filteredUsers = this.form.controls['username'].valueChanges
                                            .pipe(
                                                startWith(this.form.controls['username'].value),
                                                map(user => user ? this.filter(this.users, user) : this.users.slice())
                                            );
                    */
                    this.isLoading = false;

                },
                (error: ApiServiceError) => {
                    this.isLoading = false;
                    this.errorMessage = error;
                }
            );

        // for developing only --> TODO: remove before publishing!!!
        const username: string = 'multi.user@example.com';

        this.firstFormGroup = this._formBuilder.group({
            'username': new FormControl({
                value: username, disabled: false
            }, [
                Validators.required,
                Validators.pattern(AppConfig.RegexEmail)
//                    existingNamesValidator(this.existingUserNames)
            ])
        });

        this.firstFormGroup.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

    }

    /**
     * filter a list while typing in auto complete input field
     * @param {AutocompleteItem[]} list
     * @param {string} name
     * @returns {AutocompleteItem[]}
     */
    filter(list: AutocompleteItem[], name: string) {
        return list.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    /**
     * set the error messages on value changed
     *
     * @param data
     */
    onValueChanged(data?: any) {

        if (!this.firstFormGroup) {
            return;
        }

        // reset selected user
        this.selectedUser = undefined;

        // check if the form is valid
        Object.keys(this.firstFormErrors).map(field => {
            this.firstFormErrors[field] = '';
            const control = this.firstFormGroup.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.firstValidationMessages[field];
                Object.keys(control.errors).map(key => {
                    this.firstFormErrors[field] += messages[key] + ' ';
                });
            }
        });
    }

    /**
     * set selected user from auto complete
     *
     * @param {string} username
     */
    setSelected(username?: string) {
        // set selected has four possible scenarios
        // a) the user selected one user from the auto-complete list, which gives us the user's IRI
        // b) the user typed in an eMail address of a new user. It means the user doesn't exist yet
        // c) the user typed in an eMail address of an existing user, but has not selected from the auto-complete list
        // d) the user typed in something else, which is not a valid eMail address,
        //    so the form isn't valid; the method for this case will never start

        if (this.selectedUser !== undefined) {
            return;
        }

        // which case do we have? option a - d?
        this.email = (username ? username : this.firstFormGroup.controls['username'].value);

        // get user by username (email)
        this._usersService.getUserByEmail(this.email)
            .subscribe(
                (result: User) => {
                    // case b) result in case the user exists
                    this.selectedUser = result;
                },
                (error: ApiServiceError) => {
                    if (error.status === 404) {
                        // case c) user doesn't exist
                        // create new user profile
                        this.selectedUser = new User();

                        this.selectedUser.email = this.email;

                        this._usersService.createUser(this.selectedUser).subscribe(
                            (result: User) => {
                                this.selectedUser = result;
                            },
                            (postError: ApiServiceError) => {
                                this.userErrorMessage = postError;
                            }
                        )
                    } else {
                        // api error
                        this.errorMessage = error;
                    }

                }
            );

    }

    resetSelected() {
        this.selectedUser = undefined;
    }

    getUserData(user: User) {
        // update the selectedUser data from UserDataComponent (child)
        if (this.selectedUser.id) {
            const id = this.selectedUser.id;
            // in case of update user profile:
            // change the selectedUser data
            this.selectedUser = user;
            this.selectedUser.email = this.email;
            this.selectedUser.id = id;
        } else {
            this.selectedUser = user;
            this.selectedUser.email = this.email;
        }
    }

    getUserRole(data: any) {
        this.projectIri = data.project;
        this.groups = data.group;
    }


}
