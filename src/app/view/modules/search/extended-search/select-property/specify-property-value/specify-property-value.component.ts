import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Property} from 'app/model/services/ontologycache.service';
import {AppConfig} from "../../../../../../app.config";

interface ComparisonOperator {

    type: string;
    label: string;

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
 * An abstract interface that represents a value.
 * This interface has to be implemented for all value types (value component classes).
 */
export interface PropertyValue {

    /**
     * Type of the value.
     */
    type: string;

    /**
     * Gets the value (typed).
     *
     * @returns {any} the value.
     */
    getValue(): any;

}

@Component({
    selector: 'specify-property-value',
    templateUrl: './specify-property-value.component.html',
    styleUrls: ['./specify-property-value.component.scss']
})
export class SpecifyPropertyValueComponent implements OnInit {

    AppConfig = AppConfig;

    @ViewChild('propertyValue') propertyValue: PropertyValue;

    @Input()
    set property(prop: Property) {
        this._property = prop;

        this.initForm();
    };

    get property() {
        return this._property
    }

    private _property: Property;

    public isReady: Boolean = false;

    private form: FormGroup;

    comparisonOperators: Array<ComparisonOperator> = [];

    public propertyValueType;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    }

    initForm() {

        // build a form for the named graph selection
        this.form = this.fb.group({
            comparisonOperator: [null, Validators.required]
        });

        // emit Iri of named graph when selected
        this.form.valueChanges.subscribe((data) => {
            console.log(this.propertyValue);
        });

        // TODO: depending on the given value type, init a value form field

        // TODO: reset values to default in case the user chose another property

        // depending on object class, set comparison operators and value entry field


        if (this._property.isLinkProperty) {
            this.propertyValueType = AppConfig.LinkValue;
        } else {
            this.propertyValueType = this._property.objectType;
        }

        switch (this.propertyValueType) {

            case AppConfig.TextValue:
            case AppConfig.BooleanValue:
            case AppConfig.LinkValue:
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
                this.comparisonOperators = [new Exists()];
                break;

            default:
                console.log("ERROR: Unsupported value type " + this._property.objectType)

        }


        this.isReady = true;

    }

    ngOnInit() {
        this.initForm();
    }

    getFormData() {
        return this.form.value
    }

}
