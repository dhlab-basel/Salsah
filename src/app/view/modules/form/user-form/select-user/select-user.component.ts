import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../../model/webapi/knora/admin';
import {FormControl, Validators} from '@angular/forms';
import {UsersService} from '../../../../../model/services/users.service';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {AutocompleteItem} from '../../../../../app.interfaces';

@Component({
    selector: 'salsah-select-user',
    templateUrl: './select-user.component.html',
    styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit {

    /**
     *
     * @type {boolean}
     */
    @Input() expanded?: boolean = true;

    /**
     *
     * @type {number}
     */
    @Input() step?: number = 0;

    /**
     * project (iri)
     * @type {string}
     */
    @Input() project?: string = undefined;

    /**
     * set the step
     * @type {EventEmitter<number>}
     */
    @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

    @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

    // list of all users
    users: AutocompleteItem[] = [];

    // list of all project members, if a project is defined (@Input)
    members: string[];

    // filter users while typing (autocomplete)
    filteredUsers: Observable<any>;

    // form controller for mat-autocomplete
    userCtrl: FormControl;

    // after selected a user, get the UserData/Profile from Knora
    selectedUser: string = undefined;

    // in case of an API error
    errorMessage: any;

    // labels, titles and other texts in the form
    formLabels: any = {
        user: {
            select: {
                title: 'Select user',
                titleDone: 'Selected user',
                description: 'Add an existing one',
                autoComplete: 'just type a name here',
                autoCompleteHint: '',
                skip: 'Skip and create new user instead'
            },
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

    constructor(private _usersService: UsersService) {

        this.userCtrl = new FormControl('', Validators.required);

    }

    ngOnInit() {
        this.listOfUsers();
    }

    /**
     * The email address of the user should be unique.
     * Therefore we create a list of existingUserNames to avoid multiple use of user names!
     */
    listOfUsers() {

        this._usersService.getAllUsers()
            .subscribe(
                (users: User[]) => {

                    let i: number = 1;

                    // create a list of users from given name, family name and email and sort it alphabetically
                    for (const u of users) {
                        let exists: string = '';

                        // if the selection is used in a form in the project environment, then
                        // we're filtering the current project members and add a * in front of the name;
                        if (this.project) {
                            this.members = JSON.parse(sessionStorage.getItem('currentMembers'));
                            if (this.members.indexOf(u.id) > -1) {
                                exists = '* ';
                            }
                        }

                        this.users[i] = <AutocompleteItem>{
                            id: u.id,
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

                    this.filteredUsers = this.userCtrl.valueChanges
                        .pipe(
                            startWith(this.userCtrl.value),
                            map(user => user ? this.filterUsers(user) : this.users.slice())
                        );
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            );
    }

    /**
     *
     * @param {string} name
     * @returns {AutocompleteItem[]}
     *
     */
    filterUsers(name: string) {
        const filterValue = name.toLowerCase();
        return this.users.filter(user =>
            user.name.toLowerCase().includes(filterValue)
        );
    }

    /**
     * get the information about the selected user
     * @param {AutocompleteItem} user
     */
    setSelectedUser(user: AutocompleteItem) {
        // if the selected user is already a member in the project, make an alert (or something else)
        if (this.members.indexOf(user.id) > -1) {
            alert('The selected user (' + user.name + ') has already a membership in this project (' + this.project + ')');
            this.resetSelectedUser();
        } else {
            // otherwise take the selected user name and split it by '(' to change the form description into given and family name
            if (this.userCtrl.valid) {
                this.selectedUser = user.name.split('(')[0];
            } else {
                this.resetSelectedUser();
            }
        }
    }

    /**
     * reset the mat-autocomplete input field
     */
    resetSelectedUser() {
        this.userCtrl.reset();
        this.selectedUser = undefined;
    }

    /**
     * navigate go to the next or the one after that (skip)
     * @param ev
     * @param {string} step
     */
    navigate(ev, step: string) {
        ev.preventDefault();
        const num: number = (step === 'skip' ? 1 : 3);
        this.goTo.emit(num)
    }

    /**
     * get the information / return the information if the expansion panel is active or not
     * @param {number} step
     */
    isActive(step: number): void {
        this.setStep.emit(step);
    }
}
