import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppConfig} from '../../../../../app.config';
import {UserData, UserProfile, UserResponse} from '../../../../../model/webapi/knora';
import {existingNamesValidator} from '../../../other/existing-name.directive';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiServiceResult} from '../../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {UsersService} from '../../../../../model/services/users.service';

@Component({
    selector: 'salsah-user-data',
    templateUrl: './user-data.component.html',
    styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

    /**
     *
     * @type {boolean}
     */
    @Input() expanded?: boolean = true;

    /**
     * user (iri) in the case of edit
     * @type {string}
     */
    @Input() user?: string = undefined;

    /**
     * project (iri) in the case of project admin view
     * @type {string}
     */
    @Input() project?: string = undefined;

    /**
     * set the step
     * @type {EventEmitter<number>}
     */
    @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

    @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

    // form group for the form controller
    form: FormGroup = new FormGroup({});

    // password visibility
    showPassword: boolean = false;

    // user profile to edit
    userProfile: UserProfile;

    // all existing users
    existingUsers: [RegExp] = [
        new RegExp('user')
    ];

    // in case of an API error
    errorMessage: any;

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;

    // labels, titles and other texts in the form
    formLabels: any = {
        user: {
            title: {
                new: 'Create new user',
                edit: 'Edit user'
            },
            form: {
                givenName: 'First name',
                familyName: 'Last name',
                email: 'Email address (will be your login name)',
                emailHint: 'This will be your login name',
                emailValidation: 'This doesn\'t appear to be a valid email address.',
                password: 'Password',
                passwordHint: 'Use at least 8 characters with one uppercase letter and one number.',
                avatar: 'Upload a profile pic',
                language: 'Default language'
            }
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

    // error checking on the following fields
    formErrors = {
        'givenName': '',
        'familyName': '',
        'email': '',
        'password': ''
    };

    // ...and the error hints
    validationMessages = {
        'givenName': {
            'required': 'First name is required.'
        },
        'familyName': {
            'required': 'Last name is required.'
        },
        'email': {
            'required': 'Email address is required.',
            'pattern': 'This doesn\'t appear to be a valid email address.',
            'existingName': 'This email address exists already.'
        },
        'password': {
            'required': 'A password is required.',
            'minlength': 'Use at least 8 characters.',
            'pattern': 'The password should have at least one uppercase letter and one number.',
        }
    };

    constructor(private _usersService: UsersService,
                private _fb: FormBuilder) {
    }

    ngOnInit() {


        if (this.user) {
            this.getExistingUsers(this.user);
            this._usersService.getUserByIri(this.user)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.userProfile = result.getBody(UserResponse).userProfile;

                        const exclude = new RegExp(this.userProfile.userData.email);
                        this.existingUsers.splice(this.existingUsers.indexOf(exclude), 1);

                        this.buildForm(this.userProfile);
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = error;
                        console.log(error);
                    }
                );
        } else {
            this.getExistingUsers();
            this.buildForm(new UserProfile());
        }


    }

    /**
     * get all existing users from knora
     */
    getExistingUsers(exclude?: string): void {
        this._usersService.getAllUsers()
            .subscribe(
                (users: UserData[]) => {
                    // The email address of the user should be unique.
                    // Therefore we create a list of existingUserNames to avoid multiple use of user names
                    for (const user of users) {
                        if (exclude !== user.user_id) {
                            this.existingUsers.push(new RegExp('(?:^|\W)' + user.email.toLowerCase() + '(?:$|\W)'));
                        }
                    }
                }
            );
    }

    /**
     *
     * @param {UserProfile} user
     */
    buildForm(user?: UserProfile): void {

        if (!user) {
            user = new UserProfile();
            user.userData = new UserData();
        }


        this.form = this._fb.group({
            'givenName': new FormControl({
                value: user.userData.givenName, disabled: false
            }, [
                Validators.required
            ]),
            'familyName': new FormControl({
                value: user.userData.familyName, disabled: false
            }, [
                Validators.required
            ]),
            'email': new FormControl({
                value: user.userData.email, disabled: false
            }, [
                Validators.required,
                Validators.pattern(AppConfig.RegexEmail),
                existingNamesValidator(this.existingUsers)
            ]),
            'password': new FormControl({
                value: user.userData.password, disabled: true
            }, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(AppConfig.RegexPassword)
            ]),
            'lang': new FormControl({
                value: user.userData.lang, disabled: false
            })
//            'status': user.userData.status,
//            'systemAdmin': this.sysAdminPermission,
//            'group': null
        });

//        this.isLoading = false;

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

        this.isLoading = false;
    }

    /**
     *
     * @param data
     */
    onValueChanged(data?: any) {

        if (!this.form) {
            return;
        }

        const form = this.form;

        Object.keys(this.formErrors).map(field => {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                Object.keys(control.errors).map(key => {
                    this.formErrors[field] += messages[key] + ' ';
                });

            }
        });
    }

    /**
     * toggel the visibility of the password
     */
    toggleVisibility() {
        this.showPassword = (!this.showPassword);
    }

    /**
     * navigate go to the next or the one after that (skip)
     * @param ev
     * @param {string} step
     */
    navigate(ev, step: string) {
        ev.preventDefault();
        const num: number = (step === 'skip' ? 3 : 2);
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
