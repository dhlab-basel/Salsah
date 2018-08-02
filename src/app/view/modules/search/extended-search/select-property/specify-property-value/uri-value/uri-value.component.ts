import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from '../../../../../../../app.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KnoraConstants, PropertyValue, Value, ValueLiteral, Utils } from '@knora/core';



// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);

@Component({
    selector: 'uri-value',
    templateUrl: './uri-value.component.html',
    styleUrls: ['./uri-value.component.scss']
})
export class UriValueComponent implements OnInit, OnDestroy, PropertyValue {

    // parent FormGroup
    @Input() formGroup: FormGroup;

    type = KnoraConstants.UriValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    }

    ngOnInit() {

        this.form = this.fb.group({
            uriValue: [null, Validators.compose([Validators.required, Validators.pattern(Utils.RegexUrl)])]
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

        return new ValueLiteral(String(this.form.value.uriValue), KnoraConstants.xsdUri);
    }

}
