import {Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
    Cardinality, CardinalityOccurrence, Properties, Property,
    ResourceClass
} from "../../../../../model/services/ontologycache.service";
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

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);

@Component({
    selector: 'select-property',
    templateUrl: './select-property.component.html',
    styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit, OnDestroy {

    // parent FormGroup
    @Input() formGroup: FormGroup;

    // index of the given property (unique)
    @Input() index: number;

    // setter method for properties when being updated by parent component
    @Input()
    set properties(value: Properties) {
        this.propertySelected = undefined; // reset selected property (overwriting any previous selection)
        this._properties = value;
        this.updatePropertiesArray();
    }

    _activeResourceClass: ResourceClass;

    // setter method for selected resource class
    @Input()
    set activeResourceClass(value: ResourceClass) {
        this._activeResourceClass = value;
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

    // unique name for this property to be used in the parent FormGroup
    propIndex: string;

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

        resolvedPromise.then(() => {
            this.propIndex = 'property' + this.index;

            // add form to the parent form group
            this.formGroup.addControl(this.propIndex, this.form);
        });

    }

    ngOnDestroy() {

        // remove form from the parent form group
        resolvedPromise.then(() => {
            this.formGroup.removeControl(this.propIndex)
        });
    }

    /**
     * Indicates if property can be used as a sort criterion.
     * Property has to have cardinality or max cardinality 1 for the chosen resource class.
     *
     * We cannot sort by properties whose cardinality is greater than 1.
     *
     * @returns {boolean}
     */
    sortCriterion() {

        // check if a resource class is selected and if the property's cardinality is 1 for the selected resource class
        if (this._activeResourceClass !== undefined && this.propertySelected !== undefined && !this.propertySelected.isLinkProperty) {

            const card: Cardinality[] = this._activeResourceClass.cardinalities.filter(
                (card: Cardinality) => {
                    // cardinality 1 or max occurrence 1
                    return card.property == this.propertySelected.id
                        && card.value == 1
                        && (card.occurrence == CardinalityOccurrence.card || card.occurrence == CardinalityOccurrence.maxCard)

                }
            );

            return card.length == 1;
        } else {
            return false;
        }

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
