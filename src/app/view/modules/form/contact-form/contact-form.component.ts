import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import * as firebase from "firebase/app";
import DocumentReference = firebase.firestore.DocumentReference;

@Component({
    selector: 'dialog-overview-example-dialog',
    template: '<span>{{data.message}}</span>',
})
export class PopUpMessage {

    constructor(public dialogRef: MatDialogRef<PopUpMessage>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

}

@Component({
    selector: 'salsah-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

    form: FormGroup;

    captchaValid = false; // will be set to true by the re-captcha callback `resolved`

    formErrors = {
        'name': '',
        'email': '',
        'feedback': '',
    };

    // ...with the following messages
    validationMessages = {
        'name': {
            'required': 'Name is required.'
        },
        'email': {
            'email': 'This doesn\'t appear to be a valid email address.'
        },
        'feedback': {
            'required': 'A password is required.'
        }
    };

    constructor(private fb: FormBuilder,
                private db: AngularFirestore,
                private dialog: MatDialog,
                private _route: ActivatedRoute,
                private _router: Router) {
    }

    ngOnInit() {
        this.createForm();

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

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
     * Initializes the form.
     */
    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.email],
            feedback: ['', Validators.required]
        });

        this.captchaValid = false;

    }

    /**
     * Opens a dilaog to inform the user if his request could be processed successfully.
     *
     * @param {string} msg the message to be displayed to the user.
     */
    openDialog(msg: string): void {

        let dialogRef = this.dialog.open(PopUpMessage, {
            width: '250px',
            data: {message: msg}
        });

    }

    /**
     * Resets the form fields.
     */
    resetForm() {

        this.form.reset();
    }

    /**
     * Submission of the form.
     */
    onSubmit() {

        // exit if the form is invalid or the captcha has not been succesfully completed.
        if (!this.form.valid || !this.captchaValid) return;

        // destructuring assignment
        const {name, email, feedback} = this.form.value;
        const date = Date();

        let formRequest = {name, email, feedback, date};

        // send data to Cloud Firestore
        this.db.collection('/messages').add(formRequest).then((docRef: DocumentReference) => {

            // success

            this.captchaValid = false;

            this.openDialog("Your message has been sent. Thank you.");

            this.form.reset();

            this._router.navigate(['/'], {relativeTo: this._route});
        }).catch((error) => {
            // an error occurred: the message could not be sent

            this.openDialog("An error occurred. Your message could not be sent.");

        });

    }

    /**
     * Called when te captcha has been completed succcessfuly.
     *
     * @param {string | null} captchaResponse the message sent by the captcha element. `null` if it has not been completed.
     */
    resolved(captchaResponse: string | null) {
        if (captchaResponse !== null) {
            this.captchaValid = true;
        }
    }

}
