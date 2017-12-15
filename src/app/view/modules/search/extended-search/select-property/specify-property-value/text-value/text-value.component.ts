import {Component, Inject, OnInit} from '@angular/core';
import {PropertyValue, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'text-value',
    templateUrl: './text-value.component.html',
    styleUrls: ['./text-value.component.scss']
})
export class TextValueComponent implements OnInit, PropertyValue {

    type = AppConfig.TextValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            textValue: [null, Validators.required]
        });

    }

    ngOnInit() {
    }

    getValue(): ValueLiteral {

        return new ValueLiteral(String(this.form.value.textValue), AppConfig.xsdString);
    }

}
