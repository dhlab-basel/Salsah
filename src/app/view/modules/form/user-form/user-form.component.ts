/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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

import {Component, OnInit, Inject} from '@angular/core';
import {MdDialog, MdDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {UserService} from "../../../../model/services/user.service";
import {ProjectItem} from "../../../../model/webapi/knora/";
import {UsersList} from "../../../../model/webapi/knora/v1/users/users-list";

import 'rxjs/add/operator/startWith';
import {Observable} from "rxjs";

@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    // a component with a service needs also a error message variable:
    errorMessage: any;


    // if no user (incl. the "create user" item) is selected, the user form fields are disabled
    inactive: boolean = true;

    // the user form (uf) to create a new user account
    uf: FormGroup;

    // email and password validator
    emailRegexp: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    passwordRegexp: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

    // language package for all form fields...
    // TODO: modify a language json file or db file for multilingual use; how we want to handle multi language?
    public form: any = {
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

    // the user form is a multi step form:
    // 1. card: select user or (if not exist) create a new one
    // 2. add the user to the project(s) and give him some rights: admin or member
    // how many steps has the form?
    max_steps: number = 2;
    // or define an array of steps
    steps: string[] = [
        "Add User",
        "Permissions",
        "Save"
    ];
    counter: number = 0;


    // Do we need a project variable?
    project: ProjectItem = new ProjectItem();


    constructor(public dialog: MdDialog,
                @Inject(FormBuilder) fb: FormBuilder,
                public _userService: UserService) {


        this.project = JSON.parse(localStorage.getItem('currentProject'));

//        console.log(encodeURIComponent("http://rdfh.ch/users/NmqI97IkSr2PNUGVjApLUg"));

        this.uf = fb.group({
            'givenName': ['gaga hornochs', Validators.required],
            'familyName': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegexp)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)])],
            'systemAdmin': false,
            'lang': 'en',
            'status': true
        });

        /* the services needs the following props:
         {
         "username": "",
         "givenName": "",
         "familyName": "",
         "email": "",
         "password": "",
         "status": true,
         "lang": "de",
         "systemAdmin": false
         }
         */

    }

    ngOnInit() {


    }

    onSubmit(value: any): void {
        console.log('you submitted value: ', value);

        this._userService.createUser(value).subscribe(
            (result: ApiServiceResult) => {
                console.log(result.body.userProfile.userData.user_id);
                console.log(this.project.id);

                // result.body.userProfile.userData.user_id
                // this.project.id
                // this._userService.addUserToProject()

                this.dialog.closeAll();
            },
            (error: ApiServiceError) => {
                console.log(error);
            }
        );


    }


    closeForm(e) {
        e.preventDefault();
        this.dialog.closeAll();
    }


    nextFormSection(cntr: number, e) {
        e.preventDefault();
        // show the next section
        this.counter = cntr + 1;
    }

    prevFormSection(cntr: number, e) {
        e.preventDefault();
        // show the previous section
        this.counter = cntr - 1;
    }



}
