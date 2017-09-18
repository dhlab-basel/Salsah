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

import {AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {UsersList} from 'app/model/webapi/knora/';
import {UserService} from '../../../../model/services/user.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {UserProfile} from '../../../../model/webapi/knora/';
import {User} from '../../../../model/webapi/knora/v1/users/user';
import {ProjectsList} from '../../../../model/webapi/knora/v1/projects/projects-list';
import {ProjectsService} from '../../../../model/services/projects.service';
import {ProjectItem} from '../../../../model/webapi/knora/v1/projects/project-item';
import {Project} from '../../../../model/webapi/knora/v1/projects/project';
import {existingNamesValidator} from '../../other/existing-name.directive';

@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit, OnChanges {
    // the user-form can be used to create new users or to edit existing users

    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new user
    @Input() iri?: string = undefined;

    // project admin case: restrictedBy is the iri of the project
    // in this case, the project admin adds a new (or existing) person to this project
    @Input() restrictedBy?: string = undefined;

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

    // loader
    isLoading: boolean = true;
    isSubmitting: boolean = false;

    // step number in the form
    step: number = 0; // Default: 0; for developers: you have to change to step number to open the step where you're working on

    // outputs which should be sent to the parent component; form-dialog in this case
    // TODO: it doesn't work yet
    // before submit
//    @Output() validData = new EventEmitter<any>();
    // on submit
//    @Output() submitData = new EventEmitter<any>();

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
    selectedUser: UserProfile;

    // case 2a) form to select project form
    // autocomplete existing projects
    // project list for md-autocomplete
    projects: any = [];
    filteredProjects: any;
    // form controller for md-autocomplete
    projectCtrl: FormControl;
    selectedProject: ProjectItem;

    // case 1b) form to create new user
    // uf => user form control
    form: FormGroup;
    // email and password validator
    emailRegexp: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//    passwordRegexp: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    passwordRegexp: any = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/i;
    // password visibility
    showPassword: boolean = false;
    // list of users to prevent duplicate entries
    existingUserNames: [RegExp] = [
        new RegExp('user')
    ];

    // case 2b) project permission
    groupPermission: boolean = true;
    adminPermission: boolean = false;

    // some titles, descriptions and labels or hints
    public formLabels: any = {
        user: {
            select: {
                title: 'Select user',
                titleDone: 'Selected user',
                description: 'Add an existing one',
                autoComplete: 'just type a name here',
                autoCompleteHint: '',
                skip: 'Skip and create new user instead'
            },
            create: {
                projectAdmin: {
                    title: 'Or create new user',
                    titleDone: 'New user',
                    description: 'If the user doesn\'t exist, create a new one',
                },
                systemAdmin: {
                    title: 'Add user',
                    titleDone: 'New user',
                    description: 'Create new user profile',
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
            permissions: {
                title: 'Project permissions',
                titleDone: 'With the following permissions',
                description: 'Set user\'s permissions for this project',
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
        overview: {
            title: 'Submit data',
            description: 'The following data will be sent to Knora'
        },
        navigation: {
            next: 'Next',
            back: 'Back',
            skip: 'Skip',
            cancel: 'Cancel',
            submit: 'Save'
        }
    };

    // the following form fields would have an error check

    formErrors = {
        'givenName': '',
        'familyName': '',
        'email': '',
        'password': '',
    };

    // ...with the following messages
    validationMessages = {
        'givenName': {
            'required': 'First name is required.'

        },
        'familyName': {
            'required': 'Last name is required.'
        },
        'email': {
            'required': 'Email address is required.',
            'pattern': 'This doesn\'t appear to be a valid email address.',
            'existingName': 'This email address exists already.'
        },
        'password': {
            'required': 'A password is required.',
            'minlength': 'Use at least 8 characters.',
            'pattern': 'The password should have at least one uppercase letter and one number.',
        }
    };

    // setting to reset the md input autocomplete
    // @ViewChild(NgModel) modelDir: NgModel;

    // @ViewChild('selectUser') selectUser: ElementRef;


    constructor(public _userService: UserService,
                public _projectsService: ProjectsService,
                @Inject(FormBuilder) fb: FormBuilder) {


        this.userCtrl = new FormControl('', Validators.required);
        this.projectCtrl = new FormControl('', Validators.required);

        this.filteredUsers = this.userCtrl.valueChanges
            .startWith(this.userCtrl.value)
            .map(val => this.displayFn(val))
            .map(name => this.filterUsers(name));

        this.filteredProjects = this.projectCtrl.valueChanges
            .startWith(this.projectCtrl.value)
            .map(val => this.displayFn(val))
            .map(name => this.filterProjects(name));

        /* disabled in dev test */
        this.form = fb.group({
            'givenName': [null, Validators.required],
            'familyName': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegexp), existingNamesValidator(this.existingUserNames)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)])],
            'lang': 'en',
            'status': true,
            'systemAdmin': false,
            'group': null
        });

// test data
        /*
        this.uf = fb.group({
            'givenName': ['hans', Validators.required],
            'familyName': ['wurst', Validators.required],
            'email': ['hans@wurst.bell', Validators.compose([Validators.required, Validators.pattern(this.emailRegexp)])],
            'password': ['etwasKompliziertes2x', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)])],
            'lang': 'en',
            'status': true,
            'systemAdmin': false,
            'group': null
        });
        */
    }

    ngOnInit() {
        // for the test environment
        this.restrictedBy = 'http://data.knora.org/projects/77275339';

        // get a list of all users and create an array of the user name ( = email address)
        // the user name should be unique and with the array list, we can
        // prevent to have the same user name twice; proof it with the ForbiddenName directive
        let usersList: UsersList;

        this._userService.getAllUsers()
            .subscribe(
                (result: ApiServiceResult) => {
                    usersList = result.getBody(UsersList);
                    for (const user of usersList.users) {
                        this.existingUserNames.push(new RegExp('(?:^|\W)' + user.email.toLowerCase() + '(?:$|\W)'));
                    }

                    // in case of project admin:
                    // get a list of the users which are already team members;
                    // that list should already be in the session storage
                    if (this.restrictedBy) {
                        const members = sessionStorage.getItem('currentMembers');

                        this.getProject(this.restrictedBy);

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

                    } else {
                        // in case of system admin:
                        // get a list of projects to add the new created user
                        this.step = 1;

                        let projectsList: ProjectsList;
                        this._projectsService.getAllProjects()
                            .subscribe(
                                (res: ApiServiceResult) => {
                                    projectsList = res.getBody(ProjectsList);

                                    let i: number = 1;
                                    for (const p of projectsList.projects) {
                                        this.projects[i] = {
                                            iri: p.id,
                                            name: p.longname + ' (' + p.shortname + ')'
                                        };
                                        i++;
                                    }

                                    this.projects.sort(function (p1, p2) {
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
                            )
                    }

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            );


        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

        /*
         this.filteredUsers = this.userCtrl.valueChanges
         .startWith(null)
         .map(val => val ? this.filter(val) : this.usersList.slice())
         */
    }

    ngOnChanges() {
        // still needed ????????????????????????????????
//        console.log(this.uf.valid);
        if (this.form.valid) {
//            console.log(this.uf);
        }
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

    setStep(index: number) {
        this.step = index;

        if (index === 3 && !this.selectedProject) {
            this.groupPermission = false;
        }
    }

    displayFn(value: any): string {
        if (value && typeof value === 'object') {
            // the admin has selected a user
            // get the user data
            // let selectedUser: string;
            /*
            if (this.usersList) {
                this.usersList.users.filter(function (user) {
                    if (user.user_id === value.iri) {
                        selectedUser = value.iri;
                    }
                });
            }
            */
//            return value && value.name && selectedUser;
            return 'deprecated';
        } else {
            // the admin is still typing; no selected user
            return value;
        }
//        return value && typeof value === 'object' ? value.name : value;
    }


    toggleVisibility() {
        this.showPassword = (!this.showPassword);
    }

    filterUsers(val: string) {
        if (val) {
            const filterValue = val.toLowerCase();
            return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
        }
        return this.users;
    }

    filterProjects(val: string) {
        if (val) {
            const filterValue = val.toLowerCase();
            return this.projects.filter(project => project.name.toLowerCase().includes(filterValue));
        }
        return this.projects;
    }

    // get the user profile, if selected from the list
    getUser(iri: string) {
        // check if the selected user isn't in the project yet
        if (this.restrictedBy) {
            const members = sessionStorage.getItem('currentMembers');
            if (members.indexOf(iri) > -1) {
                alert('The selected user (' + iri + ') has already a membership in this project (' + this.restrictedBy + ')');
                this.resetSelectedUser();
                iri = null;
            }
        }

        if (iri) {
            this.selectedUser = new UserProfile();
            this._userService.getUserByIri(iri)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.selectedUser = result.getBody(User).userProfile;
                        /*
                        this.uf.controls['givenName'].setValue(this.selectedUser.userData.givenName);
                        this.uf.controls['familyName'].setValue(this.selectedUser.userData.familyName);
                        this.uf.controls['email'].setValue(this.selectedUser.userData.email);
                        this.uf.controls['lang'].setValue(this.selectedUser.userData.lang);
                        */

                    },
                    (error: ApiServiceError) => {
                        console.log(error);
                        this.errorMessage = error;
                    }
                );
            if (this.step === 0) {
                this.nextStep(event, 3);
            }
        } else {
            this.selectedUser = undefined;
        }
    }

    // get the project item, if selected from the list
    getProject(iri: string) {
        if (iri) {
            this.selectedProject = new ProjectItem();
            this._projectsService.getProjectByIri(iri)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.selectedProject = result.getBody(Project).project_info;
                    },
                    (error: ApiServiceError) => {
                        console.log(error);
                        this.errorMessage = error;
                    }
                );
            if (this.step === 2) {
                this.nextStep(event);
            }
        }
    }

    resetSelectedUser() {
        this.userCtrl.reset();
        this.selectedUser = null;
    }

    resetSelectedProject() {
        this.projectCtrl.reset();
        this.selectedProject = null;
    }


    prevStep(ev, step?: number) {
        ev.preventDefault();
        if (step) {
            this.step = step;
        } else {
            this.step--;
        }
    }

    nextStep(ev, step?: number) {
        ev.preventDefault();
        if (step) {
            this.step = step;
        } else {
            this.step++;
        }
    }

    submitData(): void {
        this.isSubmitting = true;

        let userIri: string;

        // 1) existing user or new user?
        // in case of new user, we have to sent those data first to receive a user iri
        if (this.form.valid && !this.selectedUser) {
            // new user: send the data to knora
            this._userService.createUser(this.form.value).subscribe(
                (result: ApiServiceResult) => {

                    this.selectedUser = result.getBody(UserProfile);

                    userIri = this.selectedUser.userData.user_id;

                    // next step: add the user to the selected project
                    /*
                    const project: string = (this.restrictedBy ? this.restrictedBy : this.selectedProject.id);

                    if (project) {
//                        this.addUserToProject(this.selectedUser.userData.user_id, project);
                    }
                    */
                    this.isSubmitting = false;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            )
        } else {
            // existing user from list; add the user to the project and set the permissions
            this._userService.addUserToProject(this.selectedUser.userData.user_id, this.restrictedBy).subscribe(
                (result: ApiServiceResult) => {
                    console.log(result);
                    this.isSubmitting = false;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            )
        }

        // 2) add user to project, if project iri exists
        // we need the user iri first!
        console.log(this.selectedUser.userData.user_id);

        if (this.selectedUser) {
            console.log('selectedUser', this.selectedUser);

            // add the selected user to the project and set the permissions
            console.log('selectedProject', this.selectedProject);
        }


    }

    /*
    addUserToProject(uIri: string, pIri: string) {

    }
    */

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

    getInfo() {
        console.log('groupPermission?', this.groupPermission);
        console.log('adminPermission?', this.adminPermission);
        console.log('disabled by form?', !this.form.valid);
        console.log('disabled by user?', !this.selectedUser);
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
