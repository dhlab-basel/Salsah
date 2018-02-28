import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../../model/webapi/knora/admin';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../../../model/services/users.service';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {AutocompleteItem} from '../../../../../app.interfaces';
import {Project} from '../../../../../model/webapi/knora';
import {existingNamesValidator} from '../../../other/existing-name.directive';
import {AppConfig} from '../../../../../app.config';

@Component({
    selector: 'salsah-select-user',
    templateUrl: './select-user.component.html',
    styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit {

    isLoading: boolean = true;

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

    // form group for the form controller
    form: FormGroup = new FormGroup({});

    // after selected a user, get the UserData/Profile from Knora
    selectedUser: string = undefined;

    // list of users (regular expression) to prevent duplicate entries
    existingUserNames: [RegExp] = [
        new RegExp('user')
    ];

    // in case of an API error, set the error message
    errorMessage: any;

    // in case of form error, set the form errors
    formErrors = {
        'username': ''
    };

    // ...and the error hints
    validationMessages = {
        'username': {
            'required': 'Email address is required.',
            'pattern': 'This doesn\'t appear to be a valid email address.',
            'existingName': 'This email address exists already.'
        },
    };

    // permission groups / role of the user in a project
    groups: AutocompleteItem[] = [
        {
            iri: '',
            name: '',
            label: 'Member'
        },
        {
            iri: '',
            name: '',
            label: 'Administrator'
        },
        {
            iri: '',
            name: '',
            label: 'System admin'
        }

    ];

    selectedGroup: string = 'Member';


    constructor(private _usersService: UsersService,
                private _fb: FormBuilder) {

        this.form = this._fb.group({
            'username': new FormControl({
                    value: this.selectedUser, disabled: false
                }, [
                    Validators.required,
                    Validators.pattern(AppConfig.RegexEmail),
                    existingNamesValidator(this.existingUserNames)
                ]
            ),
            'group': new FormControl({
                value: 'Member'
            }, []
            )
        });

//        this.userCtrl =

    }

    ngOnInit() {

        this._usersService.getAllUsers()
            .subscribe(
                (users: User[]) => {

                    // The email address of the user should be unique.
                    // Therefore we create a list of existingUserNames to avoid multiple use of user names
                    for (const user of users) {
                        this.existingUserNames.push(
                            new RegExp('(?:^|\W)' + user.email.toLowerCase() + '(?:$|\W)')
                        );
                    }

                    let members: string;
                    if (this.project) {
                        // get the members of the project
                        members = sessionStorage.getItem('currentMembers');
                    }

                    let i: number = 1;
                    for (const u of users) {

                        let exists: string = '';

                        if (members && members.indexOf(u.id) > -1) {
                            exists = '* ';
                        }

                        this.users[i] = {
                            iri: u.id,
                            name: u.email,
                            label: exists + u.givenName + ' ' + u.familyName + ' (' + u.email + ')'
                        };
                        i++;
                    }

                    console.log(this.users);

                    this.users.sort(function (u1, u2) {
                        if (u1.label < u2.label) {
                            return -1;
                        } else if (u1.label > u2.label) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    this.filteredUsers = this.form.controls['username'].valueChanges
                        .pipe(
                            startWith(this.form.controls['username'].value),
                            map(user => user ? this.filter(this.users, user) : this.users.slice())
                        );

                    this.isLoading = false;

                },
                (error: ApiServiceError) => {
                    this.isLoading = false;
                    this.errorMessage = error;
                }
            );

    }


    /**
     *
     * @param {AutocompleteItem[]} list
     * @param {string} name
     * @returns {AutocompleteItem[]}
     */
    filter(list: AutocompleteItem[], name: string) {
        return list.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    /**
     *
     * @param {AutocompleteItem} user
     */
    setSelected(user?: AutocompleteItem) {
        // set selected has four possible scenarios
        // a) the user has selected one user from the auto-complete list, which gives us the user's IRI
        // b) the user has typed in an eMail address of a new user. It means the user doesn't exist yet
        // c) the user has typed in an eMail address of an existing user, but has not selected from the auto-complete list
        // d) the user has typed in something else, which is not a valid eMail address, so the form isn't valid and this method will never start

        // check if the form is valid
        Object.keys(this.formErrors).map(field => {
            this.formErrors[field] = '';
            const control = this.form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                Object.keys(control.errors).map(key => {
                    this.formErrors[field] += messages[key] + ' ';
                });

            }
        });

        // which case do we have? option a - d?
        if (user) {
            // case a) set selected user
            console.log('case a) ', user)
        } else {
            // case b or c
            console.log('case b or c) not sure if this user exists ', this.form.controls['username']);
            // get user by username
        }


        if (user.name.startsWith('*')) {
            // user is already member in the project
            console.log(user.iri + ' is already a member in this project');
        }
//        console.log('user\'s email: ', user.name.split('(')[1].split(')')[0]);
        this.selectedUser = user.iri;
    }

    /**
     *  reset auto complete input and selected user
     */
    resetSelected() {
        this.form.reset();
        this.selectedUser = undefined;
    }

    /**
     *
     * @param {string} val
     */
    checkInput(val: string) {

    }


    /* ------------------------------------------------------------------------ */
    /* ------------------------------------------------------------------------ */

    /**
     * navigate go to the next step or the one after that (skip)
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
