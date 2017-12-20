import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Property} from 'app/model/services/ontologycache.service';
import {AppConfig} from "../../../../../../app.config";

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

class Equals implements ComparisonOperator {

    constructor() {
    }

    type = AppConfig.EqualsComparisonOperator;
    label = AppConfig.EqualsComparisonLabel;

    getClassName() {
        return this.constructor.name;
    };
}

class NotEquals implements ComparisonOperator {

    constructor() {
    }

    type = AppConfig.NotEqualsComparisonOperator;
    label = AppConfig.NotEqualsComparisonLabel;

    getClassName() {
        return this.constructor.name;
    };
}

class GreaterThan implements ComparisonOperator {

    constructor() {
    }

    type = AppConfig.GreaterThanEqualsComparisonOperator;
    label = AppConfig.GreaterThanEqualsComparisonLabel;

    getClassName() {
        return this.constructor.name;
    };
}

class GreaterThanEquals implements ComparisonOperator {

    constructor() {
    }

    type = AppConfig.GreaterThanComparisonOperator;
    label = AppConfig.GreaterThanComparisonLabel;

    getClassName() {
        return this.constructor.name;
    };
}

class LessThan implements ComparisonOperator {

    constructor() {
    }

    type = AppConfig.LessThanComparisonOperator;
    label = AppConfig.LessThanComparisonLabel;

    getClassName() {
        return this.constructor.name;
    };
}

class LessThanEquals implements ComparisonOperator {

    constructor() {
    }

    type = AppConfig.LessThanEqualsComparisonOperator;
    label = AppConfig.LessThanQualsComparisonLabel;

    getClassName() {
        return this.constructor.name;
    };
}

class Exists implements ComparisonOperator {

    constructor() {
    }

    type = AppConfig.ExistsComparisonOperator;
    label = AppConfig.ExistsComparisonLabel;

    getClassName() {
        return this.constructor.name;
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
    constructor(readonly value: string, readonly type: string) {
    };


    /**
     * Creates a type annotated value literal to be used in a SPARQL query.
     *
     * @returns {string}
     */
    toSparql(): string {
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

    toSparql(): string {
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

@Component({
    selector: 'specify-property-value',
    templateUrl: './specify-property-value.component.html',
    styleUrls: ['./specify-property-value.component.scss']
})
export class SpecifyPropertyValueComponent implements OnInit {

    AppConfig = AppConfig;

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

    private form: FormGroup;

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

        // build a form for the named graph selection
        this.form = this.fb.group({
            comparisonOperator: [null, Validators.required]
        });

        // emit Iri of named graph when selected
        this.form.valueChanges.subscribe((data) => {
            this.comparisonOperatorSelected = data.comparisonOperator;
        });

        // depending on object class, set comparison operators and value entry field
        if (this._property.isLinkProperty) {
            this.propertyValueType = AppConfig.Resource;
        } else {
            this.propertyValueType = this._property.objectType;
        }

        switch (this.propertyValueType) {

            case AppConfig.TextValue:
            case AppConfig.BooleanValue:
            case AppConfig.Resource:
            case AppConfig.UriValue:
            case AppConfig.IntervalValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;

            case AppConfig.IntValue:
            case AppConfig.DecimalValue:
            case AppConfig.DateValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new LessThan(), new GreaterThan(), new LessThanEquals(), new GreaterThanEquals(), new Exists()];
                break;

            case AppConfig.ListValue:
            case AppConfig.GeomValue:
            case AppConfig.FileValue:
            case AppConfig.AudioFileValue:
            case AppConfig.StillImageFileValue:
            case AppConfig.DDDFileValue:
            case AppConfig.MovingImageFileValue:
            case AppConfig.ColorValue:
                this.comparisonOperators = [new Exists()];
                break;

            default:
                console.log("ERROR: Unsupported value type " + this._property.objectType)

        }

    }

    ngOnInit() {
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
