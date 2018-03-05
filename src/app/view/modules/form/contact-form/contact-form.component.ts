import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
    selector: 'salsah-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder, private db: AngularFirestore) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.email],
            feedback: ['', Validators.required],
        });
    }

    onSubmit() {

        // destructuring assignment
        const {name, email, feedback} = this.form.value;
        const date = Date();

        let formRequest = {name, email, feedback, date};

        // send data to Cloud Firestore
        this.db.collection('/messages').add(formRequest);

        this.form.reset();
    }

}
