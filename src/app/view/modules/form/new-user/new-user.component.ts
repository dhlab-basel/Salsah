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

import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {MdDialog} from '@angular/material';

import {UsersList} from 'app/model/webapi/knora/';
import {UserFormComponent} from '../user-form/user-form.component';
import {UserService} from '../../../../model/services/user.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from '../../../../model/services/projects.service';
import {UserData} from '../../../../model/webapi/knora/v1/users/user-data';
import {ProjectTeamComponent} from '../../../dashboard/project/project-team/project-team.component';
import {ProjectItem} from '../../../../model/webapi/knora/v1/projects/project-item';

@Component({
    selector: 'salsah-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

    // if project value (as IRI) is defined
    // we can add the new created user direct to the specified project
    // and/or we need the autocomplete list of knora users
    @Input() project: string;

    // this component uses a service,
    // so we define an empty errorMessage to have one if needed
    errorMessage: any = undefined;

    // to add a user to a project, we need a list of all users first
    // list of users from the API
    usersList: UsersList;
    // list of users for the md input autocomplete
    users: any = [];

    // current project iri
    projectIri: string = this.project;
    // JSON.parse(localStorage.getItem('currentProject')).id;

    // list of users in the project;
    // we need the list of existing users, to exclude them from
    // the auto complete list
    projectUsersList: UsersList;

    // EXISTING user (list for auto completion)
    // for the form (md input autocomplete) we need some controllers
    userCtrl: FormControl;

    // and now some variables to store the value of the selected user
    currentUser = '';
    reactiveUsers: any;
    tdUsers: any[];

    // selected user
    selectedUser: UserData = new UserData();
    userErrorMessage: any = undefined;

    // setting to reset the md input autocomplete
    @ViewChild(NgModel) modelDir: NgModel;

    // (NEW) user form
    // the user form (uf) to create a new user account
    uf: FormGroup;
    // email and password validator
    emailRegexp: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    passwordRegexp: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

    // language package for all form fields...
    // TODO: modify a language json file or db file for multilingual use; how we want to handle multi language?
    public form: any = {
        title: 'Add a new user to the team',
        select: 'by selecting',
        or: 'OR',
        create: 'create a new user account',
        user: {
            existingUser: 'Add an existing user',
            title: 'Create a new user account',
            firstName: 'First name',
            lastName: 'Last name',
            email: 'Email address',
            emailHint: 'This will be your login name',
            emailValidation: 'This doesn\'t appear to be a valid email address.',
            password: 'Password',
            passwordHint: 'Use at least 8 characters with one uppercase letter and one number.',
            avatar: 'Upload a profile pic',
            language: 'Default language',
            admin: 'Project admin?',
            member: 'Add the new user to the project'
        }
    };


    constructor(public _userService: UserService,
                public dialog: MdDialog,
                @Inject(FormBuilder) fb: FormBuilder) {

        this.tdUsers = this.users;

        this.userCtrl = new FormControl();

        this.reactiveUsers = this.userCtrl.valueChanges
            .startWith(this.userCtrl.value)
            .map(val => this.displayFn(val))
            .map(name => this.filterUsers(name));

        this.uf = fb.group({
            'givenName': ['gaga hornochs', Validators.required],
            'familyName': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegexp)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)])],
            'systemAdmin': false,
            'lang': 'en',
            'status': true
        });
    }

    ngOnInit() {
        // get a list of the users which are already team members;
        // that list should be already stored in the local storage
        let members = localStorage.getItem('currentProjectMembers');

        this._userService.getAllUsers()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.usersList = result.getBody(UsersList);
//              let tempUsersList: string[] = [];
                    let i: number = 1;
                    for (let u of this.usersList.users) {
                        let exists: string = '';
                        if (members.indexOf(u.user_id) > -1) {
                            exists = '* ';
                        }
                        this.users[i] = {
                            iri: u.user_id,
                            name: exists + u.firstname + ' ' + u.lastname + ' (' + u.email + ')'
                        };

//                        this.usersList[i] = u.lastname + ', ' + u.firstname + ' (' + u.email + ')';
                        i++;
                    }

                    this.users.sort(function (u1, u2) {
                        if (u1.name < u2.name) {
                            return -1;
                        }
                        else if (u1.name > u2.name) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    });

                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
        /*
         this.filteredUsers = this.userCtrl.valueChanges
         .startWith(null)
         .map(val => val ? this.filter(val) : this.usersList.slice())
         */
    }

    displayFn(value: any): string {
        if (value && typeof value === 'object') {
            // the admin has selected a user
            // get the user data
            let selectedUser: string;
            if (this.usersList) {
                this.usersList.users.filter(function (user) {
                    if (user.user_id == value.iri) {
                        console.log(value.iri);
                        selectedUser = value.iri;

                    }
                });
            }
            return value && value.name && selectedUser;
        }
        else {
            // the admin is still typing; no selected user
            return value;

        }

//        return value && typeof value === 'object' ? value.name : value;
    }

    filterUsers(val: string) {
        if (val) {
            const filterValue = val.toLowerCase();
            return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
        }
        return this.users;
    }

    onSubmit(value: any): void {

        console.log('you submitted value: ', value);
        this._userService.createUser(value).subscribe(
            (result: ApiServiceResult) => {
//                console.log(result.body.userProfile.userData.user_id);

                // result.body.userProfile.userData.user_id
                // this.project.id
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


            },
            (error: ApiServiceError) => {
                this.errorMessage = error;
            }
        );


    }

    /*
     filterUsers(val: string) {
     return val ? this.usersList.filter(u => u.toLowerCase().indexOf(val.toLowerCase()) === 0) : this.usersList;
     //        return this.usersList.filter(option => new RegExp(`^${val}`, 'gi').test(option));
     }
     */

    openUser(val: any) {
        console.log(val);
    }

    getUser(val: any): string {

        if (val) {
            console.log('getUser: ' + val);


        }
        return undefined;
    }


    openUserForm() {
        let dialogRef = this.dialog.open(UserFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });

    }

}
