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

import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {ApiServiceError} from '../../../../model/services/api-service-error';

import {UsersService} from '../../../../model/services/users.service';
import {ProjectsService} from '../../../../model/services/projects.service';
import {GroupsService} from '../../../../model/services/groups.service';

import {AutocompleteItem} from '../../../../app.interfaces';
import {Project, User} from '../../../../model/webapi/knora';
import {AppConfig} from '../../../../app.config';

@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

    // general stuff
    isLoading: boolean = true;

    // step by step form
    step: number;
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
            'exists': 'This email address exists already.'
        }
    };

    // list of all users
    users: AutocompleteItem[] = [];

    // filter users while typing (autocomplete)
    filteredUsers: Observable<any>;

    //
    selectedUser: AutocompleteItem;

    //
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    // second step:
    //  - create new user (in system and project view)
    //  - edit user, if userIri is defined
    secondFormGroup: FormGroup;
    @Input() userIri?: string;

    // form errors of the second form group
    secondFormErrors = {
        'givenName': '',
        'familyName': '',
        'password': ''
    };

    secondValidationMessages = {
        'givenName': {
            'required': 'First name is required.'
        },
        'familyName': {
            'required': 'Last name is required.'
        },
        'password': {
            'required': 'A password is required.',
            'minlength': 'Use at least 8 characters.',
            'pattern': 'The password should have at least one uppercase letter and one number.',
        }
    };

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

    // filter projects while typing (auto complete)
    filteredProjects: Observable<any>;

    //
    selectedProject: AutocompleteItem;
    selectedProjectProfile: Project;

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
    projectErrorMessage: any = undefined;
    groupErrorMessage: any = undefined;

    //
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    // form controller and error handling
    //


    //
    // ------------------------------------------------------------------------

    // list of users to prevent duplicate entries
    existingUserNames: [RegExp] = [
        new RegExp('user')
    ];


    formLabels: any = {
        user: {
            form: {
                autoComplete: 'Select user or set new one by email address',
                projectAdmin: {
                    title: 'Or create new user',
                    titleDone: 'New user',
                    description: 'If the user doesn\'t exist, create a new one'
                },
                systemAdmin: {
                    title: 'Add user',
                    titleDone: 'New user',
                    description: 'Create new user profile'
                },
                edit: {
                    title: 'Edit user',
                    titleDone: 'Done',
                    description: 'Edit this user profile'
                },
                givenName: 'First name',
                familyName: 'Last name',
                email: 'Email address (will be your login name)',
                emailHint: 'This will be your login name',
                emailValidation: 'This doesn\'t appear to be a valid email address.',
                password: 'Password',
                passwordHint: 'Use at least 8 characters with one uppercase letter and one number.',
                avatar: 'Upload a profile pic',
                language: 'Default language'
            }
        },
        project: {
            select: {
                title: 'Project membership',
                description: 'Add this user to a project',
                autoComplete: 'Just type a project name here',
                autoCompleteHint: '',
                skip: 'Skip this step'
            },
            existing: {
                title: 'You\'re adding the user to the project ',
                description: ''
            },
        },
        permissions: {
            title: 'Permissions',
            description: 'Set user\'s permissions',
            group: {
                title: 'Group',
                description: 'Group permissions'
            },
            project: {
                title: 'Set project permissions',
                description: 'Administrative rights in ',
            },
            system: {
                title: 'Set system permissions',
                description: 'Administrative rights in system (Knora)'
            }
        },
        overview: {
            title: 'Submit data',
            description: 'The following data will be sent to Knora'
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


    constructor(public _usersService: UsersService,
                public _projectsService: ProjectsService,
                public _groupsService: GroupsService,
                private _formBuilder: FormBuilder) {

        /*
        this.form = this._formBuilder.group({
            'username': new FormControl({
                    value: this.selectedUser, disabled: false
                }, [
                    Validators.required,
                    Validators.pattern(AppConfig.RegexEmail)
//                    existingNamesValidator(this.existingUserNames)
                ]
            ),
            'group': new FormControl({
                    value: 'Member'
                }, []
            )
        });
        */

        /*
        this.filteredProjects = this.form.controls['projectname'].valueChanges
            .pipe(
                startWith(this.form.controls['projectname'].value),
                map(project => project ? this.filter(this.projects, project) : this.projects.slice())
            );
            */
    }

    ngOnInit() {

        this.buildFirstForm();

        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });

        this._usersService.getAllUsers()
            .subscribe(
                (result: User[]) => {

                    // The email address of the user should be unique.
                    // Therefore we create a list of existingUserNames to avoid multiple use of user names
                    for (const user of result) {
                        this.existingUserNames.push(
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
    }

    /**
     * First form is an input field with an auto complete method to get an existing user
     *
     */
    buildFirstForm(): void {

        // for developing only
        const username: string = 'name@domain.tld';

        this.firstFormGroup = this._formBuilder.group({
            'username': new FormControl({
                value: username, disabled: false
            }, [
                Validators.required,
                Validators.pattern(AppConfig.RegexEmail)
//                    existingNamesValidator(this.existingUserNames)
            ])
        });
    }

    buildSecondForm(name: string): void {

        // 1. get user by user name


        // 2. build form with the data from above in case (a)
        //    otherwise (case b) build an empty form


        /*
        if (!user) {
            user = new User();
        }

        this.firstFormGroup = this._formBuilder.group({
            'username': new FormControl({
                value: this.selectedUser, disabled: false
            }, [
                Validators.required,
                Validators.pattern(AppConfig.RegexEmail)
//                    existingNamesValidator(this.existingUserNames)
            ]),
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
            'password': new FormControl({
                value: user.password, disabled: true
            }, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(AppConfig.RegexPassword)
            ]),
            'lang': new FormControl({
                value: user.lang, disabled: false
            })
        });
        */
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
     * set selected user from auto complete
     * @param {AutocompleteItem} value
     */
    setSelected(user?: AutocompleteItem) {
        // set selected has four possible scenarios
        // a) the user has selected one user from the auto-complete list, which gives us the user's IRI
        // b) the user has typed in an eMail address of a new user. It means the user doesn't exist yet
        // c) the user has typed in an eMail address of an existing user, but has not selected from the auto-complete list
        // d) the user has typed in something else, which is not a valid eMail address,
        //    so the form isn't valid; the method for this case will never start

        // check if the form is valid
        Object.keys(this.firstFormErrors).map(field => {
            this.firstFormErrors[field] = '';
            const control = this.firstFormGroup.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.firstValidationMessages[field];
                console.log(control.errors);
                Object.keys(control.errors).map(key => {
                    this.firstFormErrors[field] += messages[key] + ' ';
                });

            }
        });

        // which case do we have? option a - d?
        if (user) {
            // case a) set selected user
            console.log('case a) ', user);
            if (user.name.startsWith('*')) {
                // user is already member in the project
                console.log(user.iri + ' is already a member in this project');
            }
//        console.log('user\'s email: ', user.name.split('(')[1].split(')')[0]);
            this.selectedUser = {
                iri: user.iri,
                name: user.name,
                label: ''
            };

        } else {
            // case b or c
            const email: string = this.firstFormGroup.controls['username'].value;
            console.log('case b or c) not sure if this user exists ', email);
            // get user by username (email)
            this._usersService.getUserByEmail(email)
                .subscribe(
                    (result: User) => {
                        console.log(result);
                    },
                    (error: ApiServiceError) => {
                        if (error.status === 404) {
                            // user doesn't exist
                            // create new user profile
                            const newUser: User = new User();
                            newUser.email = email;

                            console.log(newUser);

                            this._usersService.createUser(this.firstFormGroup.value).subscribe(
                                (result: User) => {
                                    console.log(result);

                                    this.selectedUser = {
                                        iri: result.id,
                                        name: result.email,
                                        label: ''
                                    };

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


    }

    resetSelected(ctrl: FormControl) {
        ctrl.reset();
        this.setSelected();
        this.selectedUser = undefined;
    }

    /**
     * navigate go to the next step or the one after that (skip)
     * @param {Event} ev
     * @param {string} step
     */
    navigate(ev: Event, step: string) {
        ev.preventDefault();
        const num: number = (step === 'skip' ? 1 : 3);
        if (step) {
            this.step = num;
        } else {
            this.step++;
        }
    }

    nextStep(ev: Event) {
        // check some values here
        // new user or existing one?
        console.log(this.selectedUser);
        // if undefined, check if  the value is a valid email address
    }


}
