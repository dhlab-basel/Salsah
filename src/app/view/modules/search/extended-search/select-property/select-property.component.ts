import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Properties, Property} from "../../../../../model/services/ontologycache.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpecifyPropertyValueComponent} from "./specify-property-value/specify-property-value.component";

@Component({
    selector: 'select-property',
    templateUrl: './select-property.component.html',
    styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
    // setter method for properties when being updated by parent component
    @Input()
    set properties(value: Properties) {
        this.propertySelected = undefined; // reset selected property (overwriting any previous selection)
        this._properties = value;
        this.updatePropertiesArray();
    }

    // reference to child component: combination of comparison operator and value for chosen property
    @ViewChild('specifyPropertyValue') private specifyPropertyValue: SpecifyPropertyValueComponent;

    // properties that can be selected from
    private _properties: Properties;

    // properties as an Array structure (based on this.properties)
    propertiesAsArray: Array<Property>;

    // represents the currently selected property
    propertySelected: Property;

    private form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {
        // build a form for the property selection
        this.form = fb.group({
            property: [null, Validators.required]
        });

        // update the selected property
        this.form.valueChanges.subscribe((data) => {
            let propIri = data.property;
            this.propertySelected = this._properties[propIri];
        })
    }

    ngOnInit() {

    }

    /**
     * Updates the properties array that is accessed by the template.
     */
    private updatePropertiesArray() {

        // represent the properties as an array to be accessed by the template
        let propsArray = [];

        for (let propIri in this._properties) {

            let prop = this._properties[propIri];

            // only list editable props that are not link value props
            if (prop.isEditable && !prop.isLinkValueProperty) propsArray.push(this._properties[propIri]);
        }

        this.propertiesAsArray = propsArray;
    }

    /**
     * Returns the selected property with the specified value.
     */
    getPropertySelectedWithValue() {

        // TODO: return the property, the comparison operator and the specified value
        // TODO: access this.specifyPropertyValue


    }


}
