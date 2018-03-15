import {Component, EventEmitter, Input, OnChanges} from '@angular/core';
import {AppConfig} from '../../../../../app.config';
import {User} from '../../../../../model/webapi/knora';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {UsersService} from '../../../../../model/services/users.service';

@Component({
    selector: 'salsah-user-data',
    templateUrl: './user-data.component.html',
    styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnChanges {

    /**
     * username (email) in the case of edit
     *
     * @type {string} [ = email address]
     */
    @Input() username?: string = undefined;

    /**
     * Is the form a standalone or embedded in a step by step form wizard?
     *
     * @type {boolean}
     */
    @Input() standalone?: boolean = true;

    /**
     * send isValid is true, if the form has no errors
     * @type {EventEmitter<boolean>}
     */

    // form group for the form controller
    userDataForm: FormGroup;

    // error checking on the following fields
    formErrors = {
        'givenName': '',
        'familyName': '',
//        'email': '',
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
        /*
        'email': {
            'required': 'Email address is required.',
            'pattern': 'This doesn\'t appear to be a valid email address.',
            'existingName': 'This email address exists already.'
        },
        */
        'password': {
            'required': 'A password is required.',
            'minlength': 'Use at least 8 characters.',
            'pattern': 'The password should have at least one uppercase letter and one number.',
        }
    };

    // password visibility
    showPassword: boolean = false;

    // user profile to edit
    userProfile: User;

    // in case of an API error
    errorMessage: any;

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;



    constructor(private _usersService: UsersService,
                private _formBuilder: FormBuilder) {
    }

    ngOnChanges() {
        // check if this.username exists already:
        // if true, we're in the edit mode
        // otherwise the form should be empty to create new user with this user name
        this._usersService.getUserByEmail(this.username)
            .subscribe(
                (result: User) => {
                    this.userProfile = result;

                    this.buildForm(this.userProfile, true);
                },
                (error: ApiServiceError) => {
                    if (error.status === 404) {
                        // the user doesn't exist yet
                        // create new one (case b)
                        const newUser: User = new User();
                        newUser.email = this.username;
                        this.buildForm(newUser, false);
                    } else {
                        this.errorMessage = error;
                    }
                }
            );
    }

    submitData(): void {
        if (this.standalone) {
            // send the data to the api
            console.log(this.userDataForm.controls);
        } else {
            // go to next step, which should be defined in the parent component


        }
    }

    /**
     *
     * @param {User} user
     * @param {boolean} edit
     */
    buildForm(user: User, edit: boolean): void {

        this.userDataForm = this._formBuilder.group({
            'givenName': new FormControl({
                value: user.givenName, disabled: false
            }, [
                Validators.required
            ]),
            'familyName': new FormControl({
                value: user.familyName, disabled: false
            }, [
                Validators.required
            ]),
            'email': new FormControl({
                value: user.email, disabled: !this.standalone
            }),
            'password': new FormControl({
                value: user.password, disabled: (edit && !this.standalone)
            }, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(AppConfig.RegexPassword)
            ]),
            'lang': new FormControl({
                value: user.lang, disabled: false
            })
//            'status': user.userData.status,
//            'systemAdmin': this.sysAdminPermission,
//            'group': null
        });

//        this.isLoading = false;


        this.userDataForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

        this.isLoading = false;
    }

    /**
     *
     * @param data
     */
    onValueChanged(data?: any) {

        if (!this.userDataForm) {
            return;
        }

        const form = this.userDataForm;

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



}
