import {Component, Inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Property} from 'app/model/services/ontologycache.service';
import {AppConfig, KnoraSchema} from '../../../../../../app.config';
import {GravsearchGenerationService} from "../../../../../../model/services/gravsearch-generation.service";

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

    type = AppConfig.EqualsComparisonOperator;
    label = AppConfig.EqualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'Equals';
    };
}

export class NotEquals implements ComparisonOperator {

    type = AppConfig.NotEqualsComparisonOperator;
    label = AppConfig.NotEqualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'NotEquals';
    };
}

export class GreaterThanEquals implements ComparisonOperator {

    type = AppConfig.GreaterThanEqualsComparisonOperator;
    label = AppConfig.GreaterThanEqualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'GreaterThanEquals';
    };
}

export class GreaterThan implements ComparisonOperator {

    type = AppConfig.GreaterThanComparisonOperator;
    label = AppConfig.GreaterThanComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'GreaterThan';
    };
}

export class LessThan implements ComparisonOperator {

    type = AppConfig.LessThanComparisonOperator;
    label = AppConfig.LessThanComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'LessThan';
    };
}

export class LessThanEquals implements ComparisonOperator {

    type = AppConfig.LessThanEqualsComparisonOperator;
    label = AppConfig.LessThanQualsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'LessThanEquals';
    };
}

export class Exists implements ComparisonOperator {

    type = AppConfig.ExistsComparisonOperator;
    label = AppConfig.ExistsComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'Exists';
    };
}

export class Like implements ComparisonOperator {

    type = AppConfig.LikeComparisonOperator;
    label = AppConfig.LikeComparisonLabel;

    constructor() {
    }

    getClassName() {
        return 'Like';
    };

}

export class Match implements ComparisonOperator {

    type = AppConfig.MatchComparisonOperator;
    label = AppConfig.MatchComparisonLabel;

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
     * Turns the value into a SPARQL string representation.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string} SPARQL representation of the value.
     */
    toSparql(schema: KnoraSchema): string;

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
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    public toSparql(schema: KnoraSchema): string {

        let literalType: string;

        // check if a Knora schema conversion is necessary, e.g., knora-api:dateValue (complex) to knora-api:date (simple).
        // xsd types will remain unchanged
        if (schema == KnoraSchema.simple && GravsearchGenerationService.typeConversionComplexToSimple[this.type] !== undefined) {
            // convert to simple schema
            literalType = GravsearchGenerationService.typeConversionComplexToSimple[this.type];
        } else {
            // do not convert
            literalType = this.type;
        }

        return `"${this.value}"^^<${literalType}>`;
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

    /**
     * Creates a SPARQL representation of the IRI.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    public toSparql(schema: KnoraSchema): string {
        // this is an instance Iri and does not have to be converted.
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

    AppConfig = AppConfig;

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
            this.propertyValueType = AppConfig.Resource;
        } else {
            this.propertyValueType = this._property.objectType;
        }

        switch (this.propertyValueType) {

            case AppConfig.TextValue:
                this.comparisonOperators = [new Like(), new Match(), new Equals(), new NotEquals(), new Exists()];
                break;

            case AppConfig.BooleanValue:
            case AppConfig.Resource:
            case AppConfig.UriValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;

            case AppConfig.IntValue:
            case AppConfig.DecimalValue:
            case AppConfig.DateValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new LessThan(), new LessThanEquals(), new GreaterThan(), new GreaterThanEquals(), new Exists()];
                break;

            case AppConfig.ListValue:
            case AppConfig.GeomValue:
            case AppConfig.FileValue:
            case AppConfig.AudioFileValue:
            case AppConfig.StillImageFileValue:
            case AppConfig.DDDFileValue:
            case AppConfig.MovingImageFileValue:
            case AppConfig.TextFileValue:
            case AppConfig.ColorValue:
            case AppConfig.IntervalValue:
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
