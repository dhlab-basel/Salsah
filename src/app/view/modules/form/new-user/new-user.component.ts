import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
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

    // for the form (md input autocomplete) we need some controllers
    userCtrl: FormControl;

    // and now some variables to store the value of the selected user
    currentUser = '';
    reactiveUsers: any;
    tdUsers: any[];

    // setting to reset the md input autocomplete
    @ViewChild(NgModel) modelDir: NgModel;

    // language setup
    public form: any = {
        title: 'Add a new user to the team',
        select: 'by selecting',
        or: 'OR',
        create: 'create a new user account'
    };

    constructor(public _userService: UserService,
                public dialog: MdDialog) {

        this.tdUsers = this.users;

        this.userCtrl = new FormControl();

        this.reactiveUsers = this.userCtrl.valueChanges
            .startWith(this.userCtrl.value)
            .map(val => this.displayFn(val))
            .map(name => this.filterUsers(name));
    }

    ngOnInit() {

        this._userService.getAllUsers()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.usersList = result.getBody(UsersList);
//              let tempUsersList: string[] = [];
                    let i: number = 1;
                    for (let u of this.usersList.users) {
                        this.users[i] = {
                            iri: u.user_id,
                            name: u.lastname + ', ' + u.firstname + ' (' + u.email + ')'
                        };
//                        this.usersList[i] = u.lastname + ', ' + u.firstname + ' (' + u.email + ')';
                        i++;
                    }

                    this.users.sort();

                    console.log(this.users);

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
        return value && typeof value === 'object' ? value.name: value;
    }

    filterUsers(val: string) {
        console.log(val);
        if (val) {
            const filterValue = val.toLowerCase();
            return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
        }

        return this.users;
    }

    /*
    filterUsers(val: string) {
        return val ? this.usersList.filter(u => u.toLowerCase().indexOf(val.toLowerCase()) === 0) : this.usersList;
//        return this.usersList.filter(option => new RegExp(`^${val}`, 'gi').test(option));
    }
    */


    openUserForm() {
        let dialogRef = this.dialog.open(UserFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });

    }

}
