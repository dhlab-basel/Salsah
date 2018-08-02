import { Component, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    ComparisonOperator,
    ComparisonOperatorAndValue,
    Equals,
    Exists,
    GreaterThan,
    GreaterThanEquals,
    KnoraConstants,
    KnoraSchema,
    LessThan,
    LessThanEquals,
    Like,
    Match,
    NotEquals,
    Property,
    PropertyValue,
    Value
} from '@knora/core';


// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);

@Component({
    selector: 'specify-property-value',
    templateUrl: './specify-property-value.component.html',
    styleUrls: ['./specify-property-value.component.scss']
})
export class SpecifyPropertyValueComponent implements OnInit, OnChanges {

    KnoraConstants = KnoraConstants;

    // parent FormGroup
    @Input() formGroup: FormGroup;

    @ViewChild('propertyValue') private propertyValueComponent: PropertyValue;

    // setter method for the property chosen by the user
    @Input()
    set property(prop: Property) {
        this.comparisonOperatorSelected = undefined; // reset to initial state
        this._property = prop;
        this.resetComparisonOperators(); // reset comparison operators for given property (overwriting any previous selection)
    };

    // getter method for this._property
    get property(): Property {
        return this._property
    }

    private _property: Property;

    form: FormGroup;

    // available comparison operators for the property
    comparisonOperators: Array<ComparisonOperator> = [];

    // comparison operator selected by the user
    comparisonOperatorSelected: ComparisonOperator;

    // the type of the property
    propertyValueType;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    };

    /**
     * Resets the comparison operators for this._property.
     */
    resetComparisonOperators() {

        // depending on object class, set comparison operators and value entry field
        if (this._property.isLinkProperty) {
            this.propertyValueType = KnoraConstants.Resource;
        } else {
            this.propertyValueType = this._property.objectType;
        }

        switch (this.propertyValueType) {

            case KnoraConstants.TextValue:
                this.comparisonOperators = [new Like(), new Match(), new Equals(), new NotEquals(), new Exists()];
                break;

            case KnoraConstants.BooleanValue:
            case KnoraConstants.Resource:
            case KnoraConstants.UriValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;

            case KnoraConstants.IntValue:
            case KnoraConstants.DecimalValue:
            case KnoraConstants.DateValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new LessThan(), new LessThanEquals(), new GreaterThan(), new GreaterThanEquals(), new Exists()];
                break;

            case KnoraConstants.ListValue:
            case KnoraConstants.GeomValue:
            case KnoraConstants.FileValue:
            case KnoraConstants.AudioFileValue:
            case KnoraConstants.StillImageFileValue:
            case KnoraConstants.DDDFileValue:
            case KnoraConstants.MovingImageFileValue:
            case KnoraConstants.TextFileValue:
            case KnoraConstants.ColorValue:
            case KnoraConstants.IntervalValue:
                this.comparisonOperators = [new Exists()];
                break;

            default:
                console.log('ERROR: Unsupported value type ' + this._property.objectType)

        }

    }

    ngOnInit() { }

    ngOnChanges() {

        // build a form for comparison operator selection
        this.form = this.fb.group({
            comparisonOperator: [null, Validators.required]
        });

        // store comparison operator when selected
        this.form.valueChanges.subscribe((data) => {
            this.comparisonOperatorSelected = data.comparisonOperator;
        });

        resolvedPromise.then(() => {

            // remove from the parent form group (clean reset)
            this.formGroup.removeControl('comparisonOperator');

            // add form to the parent form group
            this.formGroup.addControl('comparisonOperator', this.form);
        });

    }

    /**
     * Gets the specified comparison operator and value for the property.
     *
     * @returns {ComparisonOperatorAndValue} the comparison operator and the specified value
     */
    getComparisonOperatorAndValueLiteralForProperty(): ComparisonOperatorAndValue {
        // return value (literal or IRI) from the child component
        let value: Value;

        // comparison operator 'Exists' does not require a value
        if (this.comparisonOperatorSelected.getClassName() !== 'Exists') {
            value = this.propertyValueComponent.getValue();
        }

        // return the comparison operator and the specified value
        return new ComparisonOperatorAndValue(this.comparisonOperatorSelected, value);

    }

}
