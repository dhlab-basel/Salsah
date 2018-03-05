import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyValue, Value, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);

@Component({
    selector: 'decimal-value',
    templateUrl: './decimal-value.component.html',
    styleUrls: ['./decimal-value.component.scss']
})
export class DecimalValueComponent implements OnInit, OnDestroy, PropertyValue {

    // parent FormGroup
    @Input() formGroup: FormGroup;

    type = AppConfig.DecimalValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    }

    ngOnInit() {

        this.form = this.fb.group({
            decimalValue: [null, Validators.compose([Validators.required])]
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

        return new ValueLiteral(String(this.form.value.decimalValue), AppConfig.xsdDecimal);
    }
}
