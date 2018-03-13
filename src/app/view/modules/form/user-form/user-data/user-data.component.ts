import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppConfig} from '../../../../../app.config';
import {User, UserResponse} from '../../../../../model/webapi/knora';
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
     * username (email) in the case of edit
     * @type {string} [ = email address]
     */
    @Input() username?: string = undefined;

    /**
     * send isValid is true, if the form has no errors
     * @type {EventEmitter<boolean>}
     */

    @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

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

    ngOnInit() {

        // check if this.username exists already:
        // if true, we're in the edit mode
        // otherwise the form should be empty to create new user with this user name
        this._usersService.getUserByEmail(this.username)
            .subscribe(
                (result: User) => {
                    this.userProfile = result;

                    this.buildForm(this.userProfile);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = error;
                    this.buildForm(new User());
//                    console.log(error);
                }
            );


    }


    /**
     *
     * @param {User} user
     */
    buildForm(user?: User): void {

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
                value: this.username, disabled: true
            }),
            'password': new FormControl({
                value: user.password, disabled: true
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
