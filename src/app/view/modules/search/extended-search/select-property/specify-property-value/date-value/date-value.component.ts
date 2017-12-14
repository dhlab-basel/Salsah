import {Component, Inject, OnInit} from '@angular/core';
import {PropertyValue, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'date-value',
    templateUrl: './date-value.component.html',
    styleUrls: ['./date-value.component.scss']
})
export class DateValueComponent implements OnInit, PropertyValue {

    type = AppConfig.DateValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            dateValue: [null, Validators.compose([Validators.required])]
        });

        this.form.valueChanges.subscribe((data) => {
            //console.log(data);
        });

    }

    ngOnInit() {
    }

    getValue(): ValueLiteral {
        // TODO: make this a knora-api date string
        return new ValueLiteral(String(this.form.value.dateValue), AppConfig.xsdString);
    }
}
