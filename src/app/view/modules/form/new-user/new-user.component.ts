import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, NgModel} from "@angular/forms";
import {MdDialog} from "@angular/material";

import {UsersList} from "app/model/webapi/knora/";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../../../../model/services/user.service";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {Observable} from "rxjs";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'salsah-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

    errorMessage: any = undefined;

    // to add a user to a project, we need a list of all users first; here's the variable
    users: UsersList;
    usersList: string[] = [];
    // we can use the list of users in the md auto complete input field; in that case, we need some controllers
    userCtrl: FormControl;
    currentUser = '';

    topHeightCtrl = new FormControl(0);

    reactiveUsers: any;
    tdUsers: any[];

    tdDisabled = false;

    @ViewChild(NgModel) modelDir: NgModel;

    filteredUsers: any;

    public form: any = {
        title: 'Add a new user to the team',
        select: 'by selecting',
        or: 'OR',
        create: 'create a new user account'
    };

    constructor(public _userService: UserService,
                public dialog: MdDialog) {

        this.tdUsers = this.usersList;

        this.userCtrl = new FormControl();

        this.reactiveUsers = this.userCtrl.valueChanges
            .startWith(this.userCtrl.value)
            .map(val => this.displayFn(val))
            .map(name => this.filterUsers(name))

        this.filteredUsers = this.userCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterUsers(name))
    }

    ngOnInit() {

        this._userService.getAllUsers()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.users = result.getBody(UsersList);
//              let tempUsersList: string[] = [];
                    let i: number = 1;
                    for (let u of this.users.users) {
                        this.usersList[i] = u.firstname + ' ' + u.lastname + ' (' + u.email + ')';
                        i++;
                    }

                    this.usersList.sort();

                    console.log(this.usersList);

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
        if (val) {
            const filterValue = val.toLowerCase();
            return this.usersList.filter(user => user.toLowerCase().startsWith(filterValue));
        }

        return this.usersList;
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
