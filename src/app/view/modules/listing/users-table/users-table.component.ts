import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ProjectsService} from 'app/model/services/projects.service';
import {UserService} from 'app/model/services/user.service';
import {UserData, UsersList, ProjectMembers} from 'app/model/webapi/knora/';
import {MdDialog} from '@angular/material';
import {MessageDialogComponent} from '../../dialog/message-dialog/message-dialog.component';
import {EditUserComponent} from '../../form/edit-user/edit-user.component';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';

@Component({
    selector: 'salsah-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
    get toggleUser(): EventEmitter<any> {
        return this._toggleUser;
    }

    set toggleUser(value: EventEmitter<any>) {
        this._toggleUser = value;
    }

    // if we have a service, we need two variables:
    // error message, if something went wrong
    errorMessage: any = undefined;
    // progress loader status
    isLoading: boolean = true;

    @Input('restrictedByIri') project: string;
    @Input() index: number;
    @Output() private _toggleUser = new EventEmitter<any>();

    // the main objects in this component
    users: UserData[] = [];

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected person
    iri: string;

    // sort the list of members by lastname OR firstname.
    // the sortBy method toggles the right setting, which is defined here
    sortProps: any = [
        {
            key: 'lastname',
            label: 'Last name'
        },
        {
            key: 'firstname',
            label: 'First name'
        }
    ];
    sortTitle: string = 'Sort by: ';
    sortKey: string;
    sortLabel: string;

    constructor(public _projectsService: ProjectsService,
                public _userService: UserService,
                public dialog: MdDialog) {
    }

    ngOnInit() {

        this.selectedRow = this.index;

        if (this.project !== undefined) {
            // get project members
            this._projectsService.getProjectMembersByIri(this.project)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.users = result.getBody(ProjectMembers).members;
                        // set an array of the project members in local storage
                        // it's a list of user IRIs
                        // we need it, when we want to add new members to a project
                        // in that case we see, if someone is already a member
                        let currentMembers: string[] = [];
                        for (let m of this.users) {
                            currentMembers.push(m.user_id);
                        }
                        localStorage.setItem('currentProjectMembers', JSON.stringify(currentMembers));
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }
        else {
            // get all users from knora
            this._userService.getAllUsers()
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.users = result.getBody(UsersList).users;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );
        }

    }

    sortBy(key: string) {

//        this.sortKey = (key == this.sortKey ? this.sortProps[1].key : this.sortProps[0].key);

        if (key === this.sortProps[0].key) {

            this.sortKey = this.sortProps[1].key;
            this.sortLabel = this.sortProps[0].label;
        }
        else {
            this.sortKey = this.sortProps[0].key;
            this.sortLabel = this.sortProps[1].label;
        }

    }

    // open / close user
    open(id: string) {
        console.log(id);
        let dialogRef = this.dialog.open(FormDialogComponent, {
            data: {
                iri: id,
                form: 'edit-user'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });

    }

}
