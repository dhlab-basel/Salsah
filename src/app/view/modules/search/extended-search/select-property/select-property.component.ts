import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Properties, Property} from "../../../../../model/services/ontologycache.service";
import {MatSelectChange} from "@angular/material";
import {AppConfig} from "../../../../../app.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-property',
    templateUrl: './select-property.component.html',
    styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
    @Input()
    set setProperties(value: Properties) {

        this.properties = value;
        this.initProperties();
    }

    properties: Properties;

    propertiesAsArray: Array<Property>;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {
        // build a form for the named graph selection
        this.form = fb.group({
            property: [null, Validators.required]
        });

        // emit Iri of named graph when selected
        this.form.valueChanges.subscribe((data) => {
            this.propertyChosen(data.property);
        })
    }

    ngOnInit() {

    }

    initProperties() {

        let propsArray = [];

        for (let propIri in this.properties) {

            let prop = this.properties[propIri];

            // only list editable props that are not link value props
            if (prop.isEditable && !prop.isLinkValueProperty) propsArray.push(this.properties[propIri]);
        }

        this.propertiesAsArray = propsArray;
    }

    propertyChosen(propertyIri: string) {

        let prop: Property = this.properties[propertyIri];

        console.log(prop);

    }

}
