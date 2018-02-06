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

import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {UsersService} from '../../../../model/services/users.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from '../../../../model/services/projects.service';
import {Project, User} from '../../../../model/webapi/knora';
import {existingNamesValidator} from '../../other/existing-name.directive';


@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
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

    // general stuff
    isLoading: boolean = true;
    errorMessage: any = undefined;
    // status after submit data; needed to close the dialog box
    afterSubmit: boolean = false;

    // step number in the form
    step: number = 0;
    // set the start number; this number depends on the route,
    // where the form is used: project admin or system admin
    start: number = this.step;

    // who is using the form? is this user a system admin?
    sysAdmin: boolean = false;


    // user data:
    // the user-form can be used to create new users or to edit existing users
    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new user
    @Input() iri?: string = undefined;
    userIri: string = this.iri;
    // on submitting user data, activate a progress loader
    submitUserData: boolean = false;
    submitUserStatus: number = -1;
    // on error with user data
    userErrorMessage: ApiServiceError = undefined;

    // case 1a) select user form
    // autocomplete existing users
    // users list for mat-autocomplete
    users: any = [];
    filteredUsers: any;
    // form controller for mat-autocomplete
    userCtrl: FormControl;
    selectedUser: User;

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


    // project data:
    // project admin case: restrictedBy is the iri of the project
    // in this case, the project admin adds a new (or existing) person to this project
    @Input() restrictedBy?: string = undefined;
    projectIri: string = this.restrictedBy;
    // on submitting project data (resp. when adding to user to a project), activate a progress loader
    submitProjectData: boolean = false;
    submitProjectStatus: number = -1;
    // on error with project data
    projectErrorMessage: ApiServiceError = undefined;

    // case 2a) form to select project form
    // autocomplete existing projects
    // project list for mat-autocomplete
    projects: any = [];
    filteredProjects: any;
    // form controller for mat-autocomplete
    projectCtrl: FormControl;
    selectedProject: Project;

    // case 2b) project permission
    groupPermission: boolean = true;
    adminPermission: boolean = false;
    sysAdminPermission: boolean = false;
    specialPermission: string = 'not yet implemented';
    submitPermissionsStatus: number = -1;
    // on error with permissions data
    permissionsErrorMessage: ApiServiceError = undefined;


    // some titles, descriptions, labels and hints
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

    // outputs which should be sent to the parent component; form-dialog in this case
    // TODO: it doesn't work yet
    // before submit
//    @Output() validData = new EventEmitter<any>();
    // on submit
//    @Output() submitData = new EventEmitter<any>();

    // setting to reset the md input autocomplete. How does it work? TODO: fix or reactivate this
    // @ViewChild(NgModel) modelDir: NgModel;
    // @ViewChild('selectUser') selectUser: ElementRef;

    constructor(public _userService: UsersService,
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

        // form validation configuration
        this.form = fb.group({
            'givenName': [null, Validators.required],
            'familyName': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegexp), existingNamesValidator(this.existingUserNames)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)])],
            'lang': 'en',
            'status': true,
            'systemAdmin': this.sysAdminPermission,
            'group': null
        });

// test data for developing...
        /*
                this.form = fb.group({
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

        this.sysAdmin = JSON.parse(localStorage.getItem('currentUser')).sysAdmin;
        // for the test environment
//        this.restrictedBy = 'http://data.knora.org/projects/77275339';

        // get a list of all users and create an array of the user name ( = email address)
        // the user name should be unique and with the array list, we can
        // prevent to have the same user name twice; proof it with the ForbiddenName directive

        this._userService.getAllUsers()
            .subscribe(
                (users: User[]) => {
                    // The email address of the user should be unique.
                    // Therefore we create a list of existingUserNames to avoid multiple use of user names
                    for (const user of users) {
                        this.existingUserNames.push(new RegExp('(?:^|\W)' + user.email.toLowerCase() + '(?:$|\W)'));
                    }

                    // in case of project admin:
                    // get a list of the users which are already team members;
                    // the list of project members should already be in the session storage
                    if (this.restrictedBy) {
                        const members = sessionStorage.getItem('currentMembers');

                        // this.setSelectedProject(this.restrictedBy);
                        this.projectIri = this.restrictedBy;
                        this.selectedProject = new Project();
                        this._projectsService.getProjectByIri(this.projectIri)
                            .subscribe(
                                (res: Project) => {
                                    this.selectedProject = res;
                                },
                                (error: ApiServiceError) => {
                                    console.log(error);
                                    this.projectErrorMessage = error;
                                }
                            );

                        let i: number = 1;
                        for (const u of users) {
                            let exists: string = '';
                            if (members.indexOf(u.id) > -1) {
                                exists = '* ';
                            }
                            this.users[i] = {
                                iri: u.id,
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
                        // OR in case of edit user and the user isn't yet a member of a project
                        this.step = 1;
                        this.start = this.step;

                        let projectsList: Project[];
                        this._projectsService.getAllProjects()
                            .subscribe(
                                (res: Project[]) => {
                                    projectsList = res;

                                    let i: number = 1;
                                    for (const p of projectsList) {
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

        if (!this.selectedProject) {
            this.groupPermission = false;
            this.adminPermission = false;
        }
    }

    displayFn(value: any): string {
        // do we still need this method? ...
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
    setSelectedUser(ev, iri?: string) {

        if (iri && ev.isUserInput) {
            this.userIri = iri;

//            console.log(this.userIri);
            this.selectedUser = new User();

            // check if the selected user isn't in the project yet
            if (this.restrictedBy) {
                const members = sessionStorage.getItem('currentMembers');
                if (members.indexOf(iri) > -1) {
                    alert('The selected user (' + this.userIri + ') has already a membership in this project (' + this.restrictedBy + ')');
                    this.resetSelectedUser();
                } else {
                    this._userService.getUserByIri(this.userIri)
                        .subscribe(
                            (result: User) => {
                                this.selectedUser = result;
                            },
                            (error: ApiServiceError) => {
                                console.log(error);
                                this.errorMessage = error;
                            }
                        );
                    if (this.step === 0) {
                        this.nextStep(event, 3);
                    }
                }
            }
        }
    }

    // get the project item, if selected from the list
    setSelectedProject(ev, iri: string) {

        if (iri && ev.isUserInput) {
            this.projectIri = iri;
            this.selectedProject = new Project();
            this._projectsService.getProjectByIri(this.projectIri)
                .subscribe(
                    (result: Project) => {
                        this.selectedProject = result;
                    },
                    (error: ApiServiceError) => {
                        console.log(error);
                        this.projectErrorMessage = error;
                    }
                );
            if (this.step === 2) {
                this.nextStep(event);
            }
        }
    }

    resetSelectedUser() {
        this.userCtrl.reset();
        this.userIri = undefined;
        this.selectedUser = undefined;
    }

    resetSelectedProject() {
        this.projectCtrl.reset();
        this.projectIri = null;
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

    skipStep(ev, nextStep: number, skip: string) {
        ev.preventDefault();
        this.step = nextStep;
        switch (skip) {
            case 'project':
                this.resetSelectedProject();
                break;
            case 'user':
                this.resetSelectedUser();
                break;
        }
    }


    submitData(): void {

        // 1) existing user or new user?
        // in case of new user, we have to sent those data first to receive a user iri
        this.submitUserStatus = 0;
        if (this.form.valid && !this.userIri) {

            // new user: send the data from user form to knora

            this._userService.createUser(this.form.value).subscribe(
                (result: User) => {

                    const newUser: User = result;

                    this.userIri = newUser.id;

                    this.submitUserStatus = 1;

                    // next step: add the user to the selected project
                    // and set the permissions
                    if (this.projectIri !== undefined) {
                        this.addUserToProject(this.userIri, this.projectIri);
                    }
                    this.afterSubmit = true;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.submitUserStatus = 400;
                    this.userErrorMessage = error;
                }
            )
        } else {
            // add existing user to project only
            // and set the permissions

            this.submitUserStatus = 1;

            if (this.projectIri !== undefined) {
                this.addUserToProject(this.userIri, this.projectIri);
            }
            this.afterSubmit = true;
        }

    }

    addUserToProject(uIri: string, pIri: string) {
        this.submitProjectStatus = 0;
        this._userService.addUserToProject(uIri, pIri).subscribe(
            (result: User) => {
                this.submitProjectStatus = 1;
                // and set the permissions in a second step
                if (this.adminPermission) {
                    // set the user as project admin
                    this._userService.addUserToProjectAdmin(uIri, pIri).subscribe(
                        (res: User) => {
                            this.submitPermissionsStatus = 1;
                        },
                        (error: ApiServiceError) => {
                            console.log(error);
                            this.submitPermissionsStatus = 400;
                            this.permissionsErrorMessage = error;
                        }
                    )
                }
                if (this.sysAdminPermission) {
                    this.submitPermissionsStatus = 0;
                    const data: any = {
                        systemAdmin: true
                    };
                    this._userService.addUserToSystemAdmin(uIri, data).subscribe(
                        (res: User) => {
                            this.submitPermissionsStatus = 1;
                        },
                        (error: ApiServiceError) => {
                            console.log(error);
                            this.submitPermissionsStatus = 400;
                            this.permissionsErrorMessage = error;
                        }
                    )
                }
            },
            (error: ApiServiceError) => {
                console.log(error);
                this.submitProjectStatus = 400;
                this.projectErrorMessage = error;
            }
        );
    }

    // after close form, refresh the page
    updateView() {
        location.reload();
    }

    // option to add more users after added one
    resetForm() {
        this.step = this.start;
        this.submitUserStatus = -1;
        this.userErrorMessage = undefined;
        this.resetSelectedUser();
        this.form.reset();

        this.submitProjectStatus = -1;
        this.projectErrorMessage = undefined;
        if (this.start === 1) {
            this.resetSelectedProject();
        }

        this.submitPermissionsStatus = -1;
        this.permissionsErrorMessage = undefined;
        this.adminPermission = false;
        this.sysAdminPermission = false;

        this.afterSubmit = false;
    }


    // old submit method; TODO: delete it...
    onSubmit(value: any): void {

        console.log('you submitted value: ', value);
        this._userService.createUser(value).subscribe(
            (result: User) => {
//                console.log(result.body.userProfile.userData.user_id);

                // result.body.userProfile.userData.user_id
                // this.project.id
                if (this.restrictedBy) {
                    this._userService.addUserToProject(result.id, this.restrictedBy).subscribe(
                        (secondResult: User) => {
                            console.log(secondResult);
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

//        this.addUserToProject('http://data.knora.org/users/multiuser', this.restrictedBy);
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
