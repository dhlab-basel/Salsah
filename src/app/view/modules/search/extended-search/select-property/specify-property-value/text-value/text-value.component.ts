import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {PropertyValue, Value, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);

@Component({
    selector: 'text-value',
    templateUrl: './text-value.component.html',
    styleUrls: ['./text-value.component.scss']
})
export class TextValueComponent implements OnInit, OnDestroy, PropertyValue {

    // parent FormGroup
    @Input() formGroup: FormGroup;

    type = AppConfig.TextValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    }

    ngOnInit() {

        this.form = this.fb.group({
            textValue: [null, Validators.required]
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

        return new ValueLiteral(String(this.form.value.textValue), AppConfig.xsdString);
    }

}
