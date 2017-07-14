import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {Observable} from "rxjs";
// OR !??
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {MdDialog} from "@angular/material";

import {UsersList} from "app/model/webapi/knora/";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../../../../model/services/user.service";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ProjectsService} from "../../../../model/services/projects.service";
import {ProjectMembers} from "../../../../model/webapi/knora/v1/projects/project-members";

@Component({
    selector: 'salsah-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

    // this component uses a service,
    // so we define an empty errorMessage to have one if needed
    errorMessage: any = undefined;

    // to add a user to a project, we need a list of all users first
    // list of users from the API
    usersList: UsersList;
    // list of users for the md input autocomplete
    users: any = [];

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
            admin: 'Project admin?'
        }
    };


    constructor(public _userService: UserService,
                public _projectsService: ProjectsService,
                public dialog: MdDialog,
                @Inject(FormBuilder) fb: FormBuilder
    ) {

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
                            console.log('exists: ' + u.user_id);
                            exists = '* ';
                        }
                        this.users[i] = {
                            iri: u.user_id,
                            name: exists + u.firstname + ' ' + u.lastname + ' (' + u.email + ')'
                        };


//                        this.usersList[i] = u.lastname + ', ' + u.firstname + ' (' + u.email + ')';
                        i++;
                    }

                    this.users.sort( function(u1, u2) {
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
        return value && typeof value === 'object' ? value.name : value;
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


    openUserForm() {
        let dialogRef = this.dialog.open(UserFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });

    }

}
