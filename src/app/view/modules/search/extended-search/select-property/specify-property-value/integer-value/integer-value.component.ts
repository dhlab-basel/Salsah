import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyValue} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";

@Component({
    selector: 'integer-value',
    templateUrl: './integer-value.component.html',
    styleUrls: ['./integer-value.component.scss']
})
export class IntegerValueComponent implements OnInit, PropertyValue {

    type = AppConfig.IntValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            integerValue: [null, Validators.compose([Validators.required, Validators.pattern(/^-?\d+$/)])] // only allow for integer values (no fractions)
        });

    }

    ngOnInit() {
    }

    getValue(): number {
        return parseInt(this.form.value.integerValue);
    }

}
