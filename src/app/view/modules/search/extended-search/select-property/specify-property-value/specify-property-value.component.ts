import {Component, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Property} from 'app/model/services/ontologycache.service';
import {AppConstants} from "../../../../../../app.constants";

/**
 * An abstract interface representing a comparison operator.
 * This interface is implemented for the supported comparison operators.
 */
interface ComparisonOperator {

    // type of comparison operator
    type: string;

    // the label of the comparison operator to be presented to the user.
    label: string;

    // returns the class name when called on an instance
    getClassName(): string
}

export class Equals implements ComparisonOperator {

    type = AppConstants.EqualsComparisonOperator;
    label = AppConstants.EqualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'Equals';
    };
}

export class NotEquals implements ComparisonOperator {

    type = AppConstants.NotEqualsComparisonOperator;
    label = AppConstants.NotEqualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'NotEquals';
    };
}

export class GreaterThanEquals implements ComparisonOperator {

    type = AppConstants.GreaterThanEqualsComparisonOperator;
    label = AppConstants.GreaterThanEqualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'GreaterThanEquals';
    };
}

export class GreaterThan implements ComparisonOperator {

    type = AppConstants.GreaterThanComparisonOperator;
    label = AppConstants.GreaterThanComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'GreaterThan';
    };
}

export class LessThan implements ComparisonOperator {

    type = AppConstants.LessThanComparisonOperator;
    label = AppConstants.LessThanComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'LessThan';
    };
}

export class LessThanEquals implements ComparisonOperator {

    type = AppConstants.LessThanEqualsComparisonOperator;
    label = AppConstants.LessThanQualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'LessThanEquals';
    };
}

export class Exists implements ComparisonOperator {

    type = AppConstants.ExistsComparisonOperator;
    label = AppConstants.ExistsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'Exists';
    };
}

export class Like implements ComparisonOperator {

    type = AppConstants.LikeComparisonOperator;
    label = AppConstants.LikeComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'Like';
    };

}

export class Match implements ComparisonOperator {

    type = AppConstants.MatchComparisonOperator;
    label = AppConstants.MatchComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'Match';
    };

}

/**
 * Combination of a comparison operator and a value literal or an IRI.
 * In case the comparison operator is 'Exists', no value is given.
 */
export class ComparisonOperatorAndValue {

    constructor(readonly comparisonOperator: ComparisonOperator, readonly value?: Value) {
    };
}

/**
 * An abstract interface representing a value: an IRI or a literal.
 */
export interface Value {

    /**
     * Turns the value into a Sparql string representation.
     *
     * @returns {string}
     */
    toSparql(): string;

}

/**
 * Represents a property's value as a literal with the indication of its type.
 */
export class ValueLiteral implements Value {

    /**
     * Constructs a [ValueLiteral].
     *
     * @param {string} value the literal representation of the value.
     * @param {string} type the type of the value (making use of xsd).
     */
    constructor(public readonly value: string, public readonly type: string) {
    };


    /**
     * Creates a type annotated value literal to be used in a SPARQL query.
     *
     * @returns {string}
     */
    public toSparql(): string {
        return `"${this.value}"^^<${this.type}>`;
    }

}

/**
 * Represents an IRI.
 */
export class IRI implements Value {

    /**
     * Constructs an [IRI].
     *
     * @param {string} iri the IRI of a resource instance.
     */
    constructor(readonly iri: string) {
    };

    public toSparql(): string {
        return `<${this.iri}>`;
    }

}

/**
 * An abstract interface that represents a value.
 * This interface has to be implemented for all value types (value component classes).
 */
export interface PropertyValue {

    /**
     * Type of the value.
     */
    type: string;

    /**
     * Returns the value.
     *
     * @returns {Value}.
     */
    getValue(): Value;

}

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);

@Component({
    selector: 'specify-property-value',
    templateUrl: './specify-property-value.component.html',
    styleUrls: ['./specify-property-value.component.scss']
})
export class SpecifyPropertyValueComponent implements OnInit, OnChanges {

    AppConstants = AppConstants;

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
            this.propertyValueType = AppConstants.Resource;
        } else {
            this.propertyValueType = this._property.objectType;
        }

        switch (this.propertyValueType) {

            case AppConstants.TextValue:
                this.comparisonOperators = [new Like(), new Match(), new Equals(), new NotEquals(), new Exists()];
                break;

            case AppConstants.BooleanValue:
            case AppConstants.Resource:
            case AppConstants.UriValue:
            case AppConstants.IntervalValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;

            case AppConstants.IntValue:
            case AppConstants.DecimalValue:
            case AppConstants.DateValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new LessThan(), new LessThanEquals(), new GreaterThan(), new GreaterThanEquals(), new Exists()];
                break;

            case AppConstants.ListValue:
            case AppConstants.GeomValue:
            case AppConstants.FileValue:
            case AppConstants.AudioFileValue:
            case AppConstants.StillImageFileValue:
            case AppConstants.DDDFileValue:
            case AppConstants.MovingImageFileValue:
            case AppConstants.TextFileValue:
            case AppConstants.ColorValue:
                this.comparisonOperators = [new Exists()];
                break;

            default:
                console.log('ERROR: Unsupported value type ' + this._property.objectType)

        }

    }

    ngOnInit() {}

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
        if (this.comparisonOperatorSelected.getClassName() != 'Exists') {
            value = this.propertyValueComponent.getValue();
        }

        // return the comparison operator and the specified value
        return new ComparisonOperatorAndValue(this.comparisonOperatorSelected, value);

    }

}
