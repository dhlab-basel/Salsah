import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../model/services/user.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {UsersList} from "app/model/webapi/knora/";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {UserFormComponent} from "../user-form/user-form.component";
import {MdDialog} from "@angular/material";

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
    userCtrl: FormControl = new FormControl();
    filteredUsers: Observable<string[]>;

    public form: any = {
        title: 'Add a new user to the team',
        select: 'by selecting',
        or: 'OR',
        create: 'create a new user account'
    };

    constructor(public _userService: UserService,
                public dialog: MdDialog) {
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

                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        this.filteredUsers = this.userCtrl.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : this.usersList.slice())

    }

    filter(val: string): string[] {
        return this.usersList.filter(option => new RegExp(`^${val}`, 'gi').test(option));
    }


    openUserForm() {
        let dialogRef = this.dialog.open(UserFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });

    }

}
