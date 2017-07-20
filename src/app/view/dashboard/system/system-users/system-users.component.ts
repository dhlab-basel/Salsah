import {Component, OnInit, ViewChild} from '@angular/core';
import {User, UserData, UsersList} from '../../../../model/webapi/knora/';
import {UserService} from '../../../../model/services/user.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';

@Component({
    selector: 'salsah-system-users',
    templateUrl: './system-users.component.html',
    styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent implements OnInit {

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // this component makes a http request (service)
    // if something's going wrong, we need an error message "container"
    errorMessage: string = undefined;

    // list of users
    usersList: UsersList;
    // and a user's list for sorting
    users: any = [];

    // user profile
    user: User;

    // table columns header
    displayedColumns = ['Gravatar', 'Prename', 'Lastname', 'eMail'];

    // the sub module of this component can contain
    // a) a form to create a new user and add it to the project
    newUserIsActive: boolean = false;
    // OR
    // b) a form to edit an existing user
    editUserIsActive: boolean = false;
    // we need to know, which one is active

    // definition of the position for the preview (main module) and the detail view (sub module)
    position = {
        preview: 'left',            // top
        detail: 'right'             // bottom
    };

    // the size of the main module. It is large by default.
    // if the the new resource module or the edit resource module is active,
    // the size changes
    size: string = 'large';

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

    constructor(private _userService: UserService) {
    }

    ngOnInit() {

        this.sortKey = this.sortProps[0].key;

        this.sortLabel = this.sortProps[1].label;

        this._userService.getAllUsers()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.usersList = result.getBody(UsersList);
//              let tempUsersList: string[] = [];
                    let i: number = 1;
                    for (let u of this.usersList.users) {

                        this.users[i] = {
                            iri: u.user_id,
                            name: u.firstname + ' ' + u.lastname + ' (' + u.email + ')'
                        };

//                        this.usersList[i] = u.lastname + ', ' + u.firstname + ' (' + u.email + ')';
                        i++;
                    }

                    this.users.sort(function (u1, u2) {
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

                    this.isLoading = false;

                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

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

}
