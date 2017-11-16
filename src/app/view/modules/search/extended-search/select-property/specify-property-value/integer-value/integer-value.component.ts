import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'integer-value',
    templateUrl: './integer-value.component.html',
    styleUrls: ['./integer-value.component.scss']
})
export class IntegerValueComponent implements OnInit {

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            integerValue: [null, Validators.compose([Validators.required, Validators.pattern(/^-?\d+$/)])] // only allow for integer values (no fractions)
        });

        // emit Iri of named graph when selected
        this.form.valueChanges.subscribe((data) => {
            // TODO: implement callback

            let value = this.getValue();
            console.log(value);
            console.log(typeof value);

        });
    }

    ngOnInit() {
    }

    getValue(): number {
        
        return parseInt(this.form.value.integerValue);
    }

}
