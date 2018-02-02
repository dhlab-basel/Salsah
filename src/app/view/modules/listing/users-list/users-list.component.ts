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

import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {ProjectsService} from '../../../../model/services/projects.service';
import {UsersService} from '../../../../model/services/users.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {UserData, UserProfile, UserResponse} from '../../../../model/webapi/knora';
import {ApiServiceError} from '../../../../model/services/api-service-error';

import {MessageData} from '../../message/message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {MessageDialogComponent} from '../../dialog/message-dialog/message-dialog.component';
import {NewUserData} from '../../../../model/webapi/knora/admin/users/users-list';
import {LanguageService} from '../../../../model/services/language.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'salsah-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

/**
 * list of users
 *
 * Input:
 * - project<string> --> project iri returns list of users in the specified project
 * - index<number> --> index of active list item; for highlighting
 */
export class UsersListComponent implements OnInit, OnDestroy {

    // restrictedBy: project iri
    @Input() restrictedBy?: string;

    // listType could be table, or accordion; the default list type is a simple mat-list
    @Input() listType?: string;

    // information about the logged-in user: does he have admin rights?
    @Input() admin?: boolean = false;

    // isLoading = true, during the http get request
    isLoading: boolean = true;

    // error message in the case of an error from the http get request
    errorMessage: any = undefined;

    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No users found',
        statusText: 'It seems there\'s no user yet. Add a new one with the button above &uarr;'
    };

    // the main objects in this component: users;
    // we need a list of active and a list of inactive users
    allUsers: UserData[] = [];
    allActiveUsers: NewUserData[] = [];
    allInactiveUsers: NewUserData[] = [];

    newAllActiveUsers: NewUserData[] = [];
    newAllInactiveUsers: NewUserData[] = [];

    numberOfItems: number;
    countActive: number;
    countInactive: number;

    // Language translation
    subscription: Subscription;
    browserLang: string;
    currentLanguage: string;
    name: string;

    lang: any = [
        {
            var: ''
        }
    ];

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri and index of the selected person
    iri: string;
    index: number;

    // sort the list of members by familyName OR givenName.
    // the sortBy method toggles the right setting, which is defined here
    // the correct translation is done on ngOnInit
    sortProps: any = [
        {
            key: 'familyName',
            label: 'Last name'
        },
        {
            key: 'givenName',
            label: 'First name'
        },
        {
            key: 'email',
            label: 'E-mail'
        }
    ];
    sortTitle: string = 'Sort by ';  // Replaced by the json language files...
    sortKey: string = this.sortProps[0].key;
    sortKeyIA: string = this.sortProps[0].key;
    sortLabel: string = this.sortProps[0].label;

    step = 0;


    constructor(private _router: Router,
                public _projectsService: ProjectsService,
                public _userService: UsersService,
                public _dialog: MatDialog,
                public translate: TranslateService,
                public _langService: LanguageService
    ) {

        if (translate.currentLang === null) {
            this.browserLang = translate.getBrowserLang();
            translate.use(this.browserLang.match(/en|de/) ? this.browserLang : 'en');
        } else {
            this.browserLang = translate.currentLang;
        }


        if ( this.browserLang === 'de') {
            this.sortProps = [
                {
                    key: 'familyName',
                    label: 'Nachname'
                },
                {
                    key: 'givenName',
                    label: 'Vorname'
                },
                {
                    key: 'email',
                    label: 'E-mail'
                }
            ];
        } else {
            this.sortProps = [
                {
                    key: 'familyName',
                    label: 'Last name'
                },
                {
                    key: 'givenName',
                    label: 'First name'
                },
                {
                    key: 'email',
                    label: 'E-mail'
                }
            ];
        }

    }

    ngOnInit() {

        this.initView(this.restrictedBy);


    }

    listOfActiveAndInactiveUsers() {
        this.allActiveUsers = [];
        this.allInactiveUsers = [];
        for (const au of this.allUsers) {
            // at the end, we need an array of user profiles
            this._userService.getUserByIri(au.user_id)
                .subscribe(
                    (userResult: ApiServiceResult) => {
                        const user: UserProfile = userResult.getBody(UserResponse).userProfile;
                        if (user.userData.status === true) {
//                            this.allActiveUsers.push(user);
                            const active: NewUserData = {
                                email: user.userData.email,
                                givenName: user.userData.givenName,
                                familyName: user.userData.familyName,
                                user_profile: user
                            };
                            this.allActiveUsers.push(active);
                            this.countActive = this.allActiveUsers.length;
                        } else {
//                            this.allInactiveUsers.push(user);
                            const inactive: NewUserData = {
                                email: user.userData.email,
                                givenName: user.userData.givenName,
                                familyName: user.userData.familyName,
                                user_profile: user
                            };
                            this.allInactiveUsers.push(inactive);
                            this.countInactive = this.allInactiveUsers.length;
                        }
                        this.numberOfItems = Object.keys(this.allUsers).length;
                        this.isLoading = false;

                    },
                    (userError: ApiServiceError) => {
                        this.errorMessage = <any>userError;
                    }
                );
        }

        this.subscription = this._langService.getLanguage().subscribe (
            lang => {
                this.lang = lang, this.changeVal(lang.var);

            }
        );

        this.currentLanguage = this.translate.currentLang;
        // console.log('Users-List: CurrentLanguage: ' + this.currentLanguage);

        if ( this.currentLanguage === 'de') {
            this.sortProps = [
                {
                    key: 'familyName',
                    label: 'Nachname'
                },
                {
                    key: 'givenName',
                    label: 'Vorname'
                },
                {
                    key: 'email',
                    label: 'E-mail'
                }
            ];
        } else {
            this.sortProps = [
                {
                    key: 'familyName',
                    label: 'Last name'
                },
                {
                    key: 'givenName',
                    label: 'First name'
                },
                {
                    key: 'email',
                    label: 'E-mail'
                }
            ];
        }
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    sortBy(key: string) {


        if (key === this.sortProps[0].key) {
            this.sortKey = this.sortProps[1].key;
            this.sortLabel = this.sortProps[0].label;
        } else {
            this.sortKey = this.sortProps[0].key;
            this.sortLabel = this.sortProps[1].label;
        }
    }

    changeVal(name) {
        // console.log('User-List-component greeting');
        switch (name) {
            case 'en':
                this.sortProps = [
                    {
                        key: 'familyName',
                        label: 'Last name'
                    },
                    {
                        key: 'givenName',
                        label: 'First name'
                    },
                    {
                        key: 'email',
                        label: 'E-mail'
                    }
                ];
                break;
            case 'de':
                this.sortProps = [
                    {
                        key: 'familyName',
                        label: 'Nachname'
                    },
                    {
                        key: 'givenName',
                        label: 'Vorname'
                    },
                    {
                        key: 'email',
                        label: 'E-mail'
                    }
                ];
                break;
        }
    }

    // in the list view, it opens an object on the right hand side detail view
    // open / close user
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
//            this.toggleItem.emit({id, index});
        } else {
            // open the detail view
            this.selectedRow = index;
//            this.toggleItem.emit({id, index});
        }

    }

    // in the table view, it opens an object in a dialog box
    // open / close user
    edit($event) {
        if ($event.id !== undefined) {
            const dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
                data: {
                    userIri: $event.id,
                    projectIri: $event.restrictedBy,
                    form: 'user'
                }
            });

            dialogRef.afterClosed().subscribe(() => {
                // console.log('new view update here!?');
                this.initView(this.restrictedBy, $event.index);
            });
        }
    }

    open(id: string) {
        this._router.navigate(['/user/', id]);
    }

    removeFromProject(uIri: string, pIri: string) {
        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'Are you sure to remove this user from the project?',
            confirm: answer
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {

            if (config.data.confirm === true) {
                // if answer is true: remove the user from the project
                this._userService.removeUserFromProject(uIri, pIri).subscribe(
                    (res: ApiServiceResult) => {
                        // reload page
                        window.location.reload();
                    },
                    (error: ApiServiceError) => {
                        const message: MessageData = error;
                        const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                            data: {
                                message: message
                            }
                        });
                    }
                )
            }

        });

    }

    setInactive(iri: string, name: string) {
        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'Are you sure to delete this user? ' + name,
            confirm: answer
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {
            this.isLoading = true;
            if (config.data.confirm === true) {
                // if answer is true: remove the user from the project
                this._userService.deactivateUser(iri).subscribe(
                    (res: ApiServiceResult) => {
                        // reload page
                        this.isLoading = false;
                        window.location.reload();
                    },
                    (error: ApiServiceError) => {
                        const message: MessageData = error;
                        const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                            data: {
                                message: message
                            }
                        });
                    }
                )
            } else {
                this.isLoading = false;
            }

        });
    }

    setActive(iri: string, name: string) {
        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'Reactivate this user? ' + name,
            confirm: answer
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {
            this.isLoading = true;
            if (config.data.confirm === true) {
                // if answer is true: remove the user from the project
                this._userService.activateUser(iri).subscribe(
                    (res: ApiServiceResult) => {
                        // reload page
                        this.isLoading = false;
                        window.location.reload();
                    },
                    (error: ApiServiceError) => {
                        const message: MessageData = error;
                        const errorRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                            data: {
                                message: message
                            }
                        });
                    }
                )
            } else {
                this.isLoading = false;
            }

        });
    }

    goTo(route: string, id: string) {

    }


    private initView(iri?: string, index?: number) {
        this.allUsers = [];
        this.allActiveUsers = [];
        this.allInactiveUsers = [];

        this.index = index;
//        console.log(this.allUsers);

        if (iri !== undefined) {
            // the list is restricted by a project, so
            // get project all members and prepare them into two lists:
            // active users and inactive (deleted) users
            this._projectsService.getProjectMembersByIri(iri)
                .subscribe(
                    (result: UserData[]) => {
                        this.allUsers = result;
                        this.numberOfItems = Object.keys(this.allUsers).length;

                        this.listOfActiveAndInactiveUsers();
                        // set an array of the project members in local storage
                        // it's a list of user IRIs
                        // we need it, when we want to add new members to a project
                        // in that case we see, if someone is already a member
                        const currentMembers: string[] = [];
                        for (const m of this.allUsers) {
                            currentMembers.push(m.user_id);
                        }
                        sessionStorage.setItem('currentMembers', JSON.stringify(currentMembers));
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        } else {
            // get all users from knora
            this._userService.getAllUsers()
                .subscribe(
                    (result: UserData[]) => {
                        this.allUsers = result;
                        this.numberOfItems = Object.keys(this.allUsers).length;

                        this.listOfActiveAndInactiveUsers();
                        this.isLoading = false;

                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );

        }
    }
}


