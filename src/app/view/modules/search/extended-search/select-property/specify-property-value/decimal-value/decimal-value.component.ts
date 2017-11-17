import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyValue} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";

@Component({
    selector: 'decimal-value',
    templateUrl: './decimal-value.component.html',
    styleUrls: ['./decimal-value.component.scss']
})
export class DecimalValueComponent implements OnInit, PropertyValue {

    type = AppConfig.DecimalValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            decimalValue: [null, Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {
    }

    getValue(): number {
        return parseFloat(this.form.value.decimalValue);
    }
}
