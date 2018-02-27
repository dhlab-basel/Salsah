import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyValue, Value, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);

@Component({
    selector: 'boolean-value',
    templateUrl: './boolean-value.component.html',
    styleUrls: ['./boolean-value.component.scss']
})
export class BooleanValueComponent implements OnInit, OnDestroy, PropertyValue {

    // parent FormGroup
    @Input() formGroup: FormGroup;

    type = AppConfig.BooleanValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    }

    ngOnInit() {

        this.form = this.fb.group({
            booleanValue: [false, Validators.compose([Validators.required])]
        });

        resolvedPromise.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });

    }

    ngOnDestroy() {

        // remove form from the parent form group
        resolvedPromise.then(() => {
            this.formGroup.removeControl('propValue')
        });

    }

    getValue(): Value {
        return new ValueLiteral(String(this.form.value.booleanValue), AppConfig.xsdBoolean);
    }
}
