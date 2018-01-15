import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyValue, Value, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";

@Component({
    selector: 'boolean-value',
    templateUrl: './boolean-value.component.html',
    styleUrls: ['./boolean-value.component.scss']
})
export class BooleanValueComponent implements OnInit, PropertyValue {

    type = AppConfig.BooleanValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            booleanValue: [false, Validators.compose([Validators.required])]
        });

    }

    ngOnInit() {
    }

    getValue(): Value {
        return new ValueLiteral(String(this.form.value.booleanValue), AppConfig.xsdBoolean);
    }
}
