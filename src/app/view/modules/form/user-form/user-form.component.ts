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

import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {MdDialog} from '@angular/material';

import {UsersList} from 'app/model/webapi/knora/';
import {UserService} from '../../../../model/services/user.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {UserData} from '../../../../model/webapi/knora/v1/users/user-data';
import {UserProfile} from '../../../../model/webapi/knora/';
import {User} from '../../../../model/webapi/knora/v1/users/user';
import {ProjectsList} from '../../../../model/webapi/knora/v1/projects/projects-list';

@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit, OnChanges {
    // the user-form can be used to create new users or to edit existing users

    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new user
    @Input() iri?: string;

    // project admin case: restrictedBy is the iri of the project
    // in this case, the project admin adds a new (or existing) person to this project
    @Input() restrictedBy?: string;

    // the form is a step by step form
    /* the steps (depending on the usage / route) are as follow:
        1) user profile
            a) in case of project admin: select existing user OR create new user profile => b)
            b) in case of system admin: create new user profile or edit old one

        2) add user to project and set permissions
            a) in case of project admin: only permission settings
            b) in case of system admin: select project and set permissions or add user to project or remove user from project

        3) special stuff like "add the user to system project" and set system permissions

     */

    // step number in the form
    step: number = 0; // Default: 0; for developers: you have to change to step number to open the step where you're working on

    // outputs which should be sent to the parent component; form-dialog in this case
    // TODO: it doesn't work yet
    // before submit
    @Output() validData = new EventEmitter<any>();
    // on submit
    @Output() submitData = new EventEmitter<any>();

    // form settings

    // autocomplete list preparation
    // http request service:
    // in case of an api error
    errorMessage: any = undefined;

    // case 1a) select user form
    // autocomplete existing users
    // users list for md-autocomplete
    users: any = [];
    filteredUsers: any;
    // form controller for md-autocomplete
    userCtrl: FormControl;

    // case 2a) select project form
    // autocomplete existing projects
    projectsList: ProjectsList;
    // special list for md-autocomplete
    projects: any = [];
    // form controller for md-autocomplete
    projectCtrl: FormControl;

    // case 1b) create new user form
    // uf => user form control
    uf: FormGroup;
    // email and password validator
    emailRegexp: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    passwordRegexp: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    // password visibility
    showPassword: boolean = false;

    public form: any = {
        user: {
            select: {
                title: 'Select user',
                description: 'Add an existing one',
                autoComplete: 'just type a name here',
                autoCompleteHint: '',
                skip: 'Skip and create new user instead'
            },
            create: {
                title: 'Create user',
                description: 'If the user doesn\'t exist, create a new one',
                givenName: 'First name',
                familyName: 'Last name',
                email: 'Email address',
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
                title: 'Project member',
                description: 'Add user to the project',
                autoComplete: 'Just type a project name here',
                autoCompleteHint: ''
            },
            existing: {
                title: 'You\'re adding the user to the project ',
                description: ''
            },
            permissions: {
                admin: 'Administrative rights',
                adminHint: 'What are admin rights? Describe it here (TODO)',
                group: 'Group rights',
                groupHint: 'What are group rights? Describe it here (TODO)'
            }
        },
        system: {
            title: 'System admin',
            description: 'Set system admin rights for this user (only sys admin can do that)'
        },
        navigation: {
            next: 'Next',
            back: 'Back',
            skip: 'Skip',
            cancel: 'Cancel',
            submit: 'Save'
        }
    };







    // if restrictedBy is defined, show the select user form
    // incl. the material expansion
    expand: number = 0;




    // how many steps has the form?
    max_steps: number = 3;
    // or define an array of steps
    steps: string[] = [];

    counter: number = 0;



    // this component uses a service,
    // so we define an empty errorMessage to have one if needed


    // to add a user to a project, we need a list of all users first
    // list of users from the API

    // list of users for the md input autocomplete


    // current project iri
//    projectIri: string = this.restrictedBy;
    // JSON.parse(localStorage.getItem('currentProject')).id;

    // list of users in the project;
    // we need the list of existing users, to exclude them from
    // the auto complete list
    projectUsersList: UsersList;



    // and now some variables to store the value of the selected user
    currentUser = '';
//    reactiveUsers: any;
    tdUsers: any[];

    // selected user
    selectedUser: UserData = new UserData();
    userErrorMessage: any = undefined;

    // setting to reset the md input autocomplete
//    @ViewChild(NgModel) modelDir: NgModel;

    // (NEW) user form
    // the user form (uf) to create a new user account




    constructor(public _userService: UserService,
                public dialog: MdDialog,
                @Inject(FormBuilder) fb: FormBuilder) {

        this.tdUsers = this.users;

        this.userCtrl = new FormControl();

        this.filteredUsers = this.userCtrl.valueChanges
            .startWith(this.userCtrl.value)
            .map(val => this.displayFn(val))
            .map(name => this.filterUsers(name));

        this.uf = fb.group({
            'givenName': [null, Validators.required],
            'familyName': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegexp)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)])],
            'lang': 'en',
            'status': true,
            'systemAdmin': false,
            'group': null
        });
    }

    ngOnInit() {
        // for the test environment
        this.restrictedBy = 'http://data.knora.org/projects/77275339';

        // in case of project admin:
        // get a list of the users which are already team members;
        // that list should already be in the session storage
        if (this.restrictedBy) {
            this.steps = [
                'Select User',
                'Create User',
                'Project Permissions',
                'Save'
            ];
            const members = sessionStorage.getItem('currentMembers');

            let usersList: UsersList;
            this._userService.getAllUsers()
                .subscribe(
                    (result: ApiServiceResult) => {
                        usersList = result.getBody(UsersList);
//              let tempUsersList: string[] = [];
                        let i: number = 1;
                        for (const u of usersList.users) {
                            let exists: string = '';
                            if (members.indexOf(u.user_id) > -1) {
                                exists = '* ';
                            }
                            this.users[i] = {
                                iri: u.user_id,
                                name: exists + u.givenName + ' ' + u.familyName + ' (' + u.email + ')'
                            };

//                        this.usersList[i] = u.familyName + ', ' + u.givenName + ' (' + u.email + ')';
                            i++;
                        }

                        this.users.sort(function (u1, u2) {
                            if (u1.name < u2.name) {
                                return -1;
                            } else if (u1.name > u2.name) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });

                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );
        } else {
            this.steps = [
                'Create User',
                'Select Projects',
                'Project Permissions',
                'Save'
            ];
            this.expand = 1;
        }

        /*
         this.filteredUsers = this.userCtrl.valueChanges
         .startWith(null)
         .map(val => val ? this.filter(val) : this.usersList.slice())
         */
    }

    ngOnChanges() {
        // still needed ????????????????????????????????
//        console.log(this.uf.valid);
        if (this.uf.valid) {
//            console.log(this.uf);
        }
    }

    setStep(index: number) {
        this.step = index;
    }

    displayFn(value: any): string {
        if (value && typeof value === 'object') {
            // the admin has selected a user
            // get the user data
            let selectedUser: string;
            /*
            if (this.usersList) {
                this.usersList.users.filter(function (user) {
                    if (user.user_id === value.iri) {
                        selectedUser = value.iri;
                    }
                });
            }
            */
            return value && value.name && selectedUser;
        } else {
            // the admin is still typing; no selected user
            return value;
        }
//        return value && typeof value === 'object' ? value.name : value;
    }





    setExpansion(index: number) {
        this.expand = index;
    }

    filterUsers(val: string) {
        if (val) {
            const filterValue = val.toLowerCase();
            return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
        }
        return this.users;
    }

    toggleVisibility() {
        this.showPassword = (!this.showPassword);
    }

    onSubmit(value: any): void {

        console.log('you submitted value: ', value);
        this._userService.createUser(value).subscribe(
            (result: ApiServiceResult) => {
//                console.log(result.body.userProfile.userData.user_id);

                // result.body.userProfile.userData.user_id
                // this.project.id
                if (this.restrictedBy) {
                    this._userService.addUserToProject(result.body.userProfile.userData.user_id, this.restrictedBy).subscribe(
                        (secondResult: ApiServiceResult) => {
                            console.log(secondResult.body);
//                        this._projectTeam.closeDetailView();
                        },
                        (error: ApiServiceError) => {
                            console.log(error);
                            this.errorMessage = error;
                        }
                    );

                }


            },
            (error: ApiServiceError) => {
                this.errorMessage = error;
            }
        );


    }


    // get the user profile, if selected from the list
    getUser(iri: string) {
        let selectedUser: UserProfile = new UserProfile();

        if (iri) {
            this._userService.getUserByIri(iri)
                .subscribe(
                    (result: ApiServiceResult) => {
                        const tmpData: User = result.getBody(User);
                        selectedUser = tmpData.userProfile;
                        this.uf.controls['givenName'].setValue(selectedUser.userData.givenName);
                        this.uf.controls['familyName'].setValue(selectedUser.userData.familyName);
                        this.uf.controls['email'].setValue(selectedUser.userData.email);
                        this.uf.controls['lang'].setValue(selectedUser.userData.lang);
                    },
                    (error: ApiServiceError) => {
                        console.log(error);
                        this.errorMessage = error;
                    }
                );
        }
    }

    prevStep(ev) {
        ev.preventDefault();
        this.counter--;
    }

    nextStep(ev) {
        ev.preventDefault();
        this.counter++;
    }

    getGroups() {
        // preparation for the group selection in the permissions section
        /*
        this._groupsService.getAll()
            .subscribe(

            );
        */
    }

    /*
        openUserForm() {
            const dialogRef = this.dialog.open(UserFormComponent);
            dialogRef.afterClosed().subscribe(result => {
                console.log(result);
            });

        }
    */
}
