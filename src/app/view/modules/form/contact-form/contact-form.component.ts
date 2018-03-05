import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'dialog-overview-example-dialog',
    template: 'Your message has been sent. Thank you!',
})
export class DialogOverviewExampleDialog {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector: 'salsah-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

    form: FormGroup;

    captchaValid = false;

    constructor(private fb: FormBuilder, private db: AngularFirestore, public dialog: MatDialog, private _route: ActivatedRoute,
                private _router: Router) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.email],
            feedback: ['', Validators.required]
        });

        this.captchaValid = false;

    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: { message: 'form submitted' }
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
        });
    }

    onSubmit() {

        if (!this.form.valid || !this.captchaValid) return;

        // destructuring assignment
        const {name, email, feedback} = this.form.value;
        const date = Date();

        let formRequest = {name, email, feedback, date};

        // send data to Cloud Firestore
        this.db.collection('/messages').add(formRequest);

        this.captchaValid = false;

        this.openDialog();

        this.form.reset();

        this._router.navigate(['/'], {relativeTo: this._route});
    }

    resolved(captchaResponse: string | null) {
        if (captchaResponse !== null) {
            this.captchaValid = true;
            //console.log(`Resolved captcha with response ${captchaResponse}:`);
        }
    }

}
