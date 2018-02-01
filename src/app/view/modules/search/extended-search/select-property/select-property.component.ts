import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Properties, Property} from "../../../../../model/services/ontologycache.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
    ComparisonOperatorAndValue,
    SpecifyPropertyValueComponent
} from "./specify-property-value/specify-property-value.component";

/**
 * Represents a property, the specified comparison operator, and value.
 */
export class PropertyWithValue {

    /**
     * Constructs a [PropertyWithValue].
     *
     * @param {Property} property the specified property.
     * @param {ComparisonOperatorAndValue} valueLiteral the specified comparison operator and value.
     * @param isSortCriterion indicates if the property is used as a sort criterion.
     */
    constructor(readonly property: Property, readonly valueLiteral: ComparisonOperatorAndValue, readonly isSortCriterion: Boolean) {
    };

}

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

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    }

    ngOnInit() {

        // build a form for the property selection
        this.form = this.fb.group({
            property: [null, Validators.required],
            isSortCriterion: [false, Validators.required]
        });

        // update the selected property
        this.form.valueChanges.subscribe((data) => {
            let propIri = data.property;
            this.propertySelected = this._properties[propIri];
        });

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
    getPropertySelectedWithValue(): PropertyWithValue {

        let propVal: ComparisonOperatorAndValue = this.specifyPropertyValue.getComparisonOperatorAndValueLiteralForProperty();

        let isSortCriterion = false;

        // only non linking properties can be used for sorting
        if (!this.propertySelected.isLinkProperty) {
            isSortCriterion = this.form.value.isSortCriterion;
        }

        return new PropertyWithValue(this.propertySelected, propVal, isSortCriterion);

    }


}
