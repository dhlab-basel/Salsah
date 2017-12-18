import {Component, Inject, OnInit} from '@angular/core';
import {AppConfig} from "../../../../../../../app.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyValue, ValueLiteral} from "../specify-property-value.component";
import {Utils} from "../../../../../../../utils";

@Component({
  selector: 'uri-value',
  templateUrl: './uri-value.component.html',
  styleUrls: ['./uri-value.component.scss']
})
export class UriValueComponent implements OnInit, PropertyValue {

    type = AppConfig.UriValue;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        this.form = this.fb.group({
            uriValue: [null, Validators.compose([Validators.required, Validators.pattern(Utils.urlRegex)])]
        });

    }

    ngOnInit() {
    }

    getValue(): ValueLiteral {

        return new ValueLiteral(String(this.form.value.uriValue), AppConfig.xsdUri);
    }

}
