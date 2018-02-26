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

import {Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {UsersService} from '../../../../model/services/users.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from '../../../../model/services/projects.service';
import {Project, User} from '../../../../model/webapi/knora';
import {existingNamesValidator} from '../../other/existing-name.directive';
import {AppConfig} from '../../../../app.config';


export interface AutocompleteList {
    iri: string,
    name: string
}

@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

    // general stuff
    isLoading: boolean = true;
    errorMessage: any = undefined;

    // user data
    // the user-form can be used to create new users or to edit existing users
    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new user
    @Input() userIri?: string;
    // on error with user data
    userErrorMessage: ApiServiceError = undefined;

    // add' or 'create new' user starts always with the user's email address
    // it's an auto complete form, which checks, if the user already exists

    // form controller for mat-autocomplete in user select
    userCtrl: FormControl;
    // list of all users in the system
    allUsers: AutocompleteList[] = [];
    // filter users while typing (autocomplete method)
    filteredUsers: Observable<any[]>;




    // project data
    // project admin view: restrictedBy is the iri of the project
    // in this case, the project admin adds a new (or existing) person to the project
    @Input() projectIri?: string;
    // on error with project data
    projectErrorMessage: ApiServiceError = undefined;

    // form controller for mat-autocomplete in user select
    projectCtrl: FormControl;

    // in system admin view, it's possible to add a new created (or an old) user to a project
    // list of all projects in the system
    allProjects: AutocompleteList[] = [];
    // filter users while typing (autocomplete method)
    filteredProjects: Observable<any[]>;




    selectedUser: User;
    newUser: string;

    // list of users to prevent duplicate entries
    existingUserNames: [RegExp] = [
        new RegExp('user')
    ];


    // system admin view: to add a user to a project, we need a list of all projects

    selectedProject: Project;
    // form controller for mat-autocomplete in project select


    // Form labels and placeholder; will be organised by a i18n json file!

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


    constructor (public _userService: UsersService,
                 public _projectsService: ProjectsService,
                 private _fb: FormBuilder) {

        this.userCtrl = new FormControl();

        this.filteredUsers = this.userCtrl.valueChanges
            .pipe(
                startWith(''),
                map(user => user ? this.filter(this.allUsers, user) : this.allUsers.slice())
            );

        this.projectCtrl = new FormControl();

        this.filteredProjects = this.projectCtrl.valueChanges
            .pipe(
                startWith(this.projectCtrl.value),
                map(project => project ? this.filter(this.allProjects, project) : this.allProjects.slice())
            );
    }

    ngOnInit () {

        // get a list of all users and create an array of the user name ( = email address)
        // the user name should be unique and with the array list, we can
        // prevent to have the same user name twice; proof it with the ForbiddenName directive
        this._userService.getAllUsers()
            .subscribe(
                (users: User[]) => {

                    // The email address of the user should be unique.
                    // Therefore we create a list of existingUserNames to avoid multiple use of user names
                    for (const user of users) {
                        this.existingUserNames.push(
                            new RegExp('(?:^|\W)' + user.email.toLowerCase() + '(?:$|\W)')
                        );
                    }

                    let members: string;

                    if (this.projectIri !== undefined) {
                        // get the members of the project
                        members = sessionStorage.getItem('currentMembers');

                        // get the project information
                        let selectedProject = new Project();
                        this._projectsService.getProjectByIri(this.projectIri)
                            .subscribe(
                                (project: Project) => {
                                    selectedProject = project;
                                },
                                (error: ApiServiceError) => {
                                    console.log(error);
                                    this.projectErrorMessage = error;
                                }
                            );
                    }


                    let i: number = 1;
                    for (const u of users) {

                        let exists: string = '';

                        if (members && members.indexOf(u.id) > -1) {
                            exists = '* ';
                        }

                        this.allUsers[i] = {
                            iri: u.id,
                            name: exists + u.givenName + ' ' + u.familyName + ' (' + u.email + ')'
                        };
                        i++;
                    }

                    console.log(this.allUsers);

                    this.allUsers.sort(function (u1, u2) {
                        if (u1.name < u2.name) {
                            return -1;
                        } else if (u1.name > u2.name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    // in case of project admin:
                    // get a list of the users which are already team members;
                    // the list of project members should already be in the session storage
                    if (this.projectIri !== undefined) {




                    }
                    /*
                    else {
                        // in case of system admin view:
                        // get a list of projects to add the new created user
                        // OR in case of edit user and the user isn't yet a member of a project

                        let projectsList: Project[];
                        this._projectsService.getAllProjects()
                            .subscribe(
                                (res: Project[]) => {
                                    projectsList = res;

                                    let i: number = 1;
                                    for (const p of projectsList) {
                                        this.allProjects[i] = {
                                            iri: p.id,
                                            name: p.longname + ' (' + p.shortname + ')'
                                        };
                                        i++;
                                    }

                                    this.allProjects.sort(function (p1, p2) {
                                        if (p1.name < p2.name) {
                                            return -1;
                                        } else if (p1.name > p2.name) {
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

                        let i: number = 1;
                        for (const u of users) {
                            let exists: string = '';
                            if (members.indexOf(u.id) > -1) {
                                exists = '* ';
                            }
                            this.allUsers[i] = {
                                iri: u.id,
                                name: exists + u.givenName + ' ' + u.familyName + ' (' + u.email + ')'
                            };
                            i++;
                        }

                        this.allUsers.sort(function (u1, u2) {
                            if (u1.name < u2.name) {
                                return -1;
                            } else if (u1.name > u2.name) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    }
                   */

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.userErrorMessage = error;
                }
            );

    }

    // filter for auto complete input field
    filter(list: AutocompleteList[], name: string) {
        return list.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }


}
