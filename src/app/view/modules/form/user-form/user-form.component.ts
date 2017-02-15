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

import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
    selector: 'salsah-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


    uf: FormGroup;

    emailRegexp: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    passwordRegexp: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

    private counter: number = 0;

    public form: any = {        // TODO: modify a language json file or db file for multilingual use
        user: {
            title: 'Create a new user account',
            givenName: 'First Name',
            familyName: 'Last Name',
            email: 'Email address',
            emailHint: 'This will be your login name',
            emailValidation: 'This doesn\'t appear to be a valid email address.',
            password: 'Password',
            passwordHint: 'Use at least one lowercase letter, one numeral, and eight characters.',
            avatar: 'Upload a profile pic'
        }
    };

    constructor(public dialog: MdDialog,
                fb: FormBuilder) {
        this.uf = fb.group({
            'givenName': ['', Validators.required],
            'familyName': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegexp)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)])],
            'systemAdmin': false,
            'lang': 'en'
        });
    }

    ngOnInit() {

    }

    onSubmit(value: any): void {
        console.log('you submitted value: ', value);
        this.dialog.closeAll();
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
