import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Property} from 'app/model/services/ontologycache.service';

@Component({
    selector: 'specify-property-value',
    templateUrl: './specify-property-value.component.html',
    styleUrls: ['./specify-property-value.component.scss']
})
export class SpecifyPropertyValueComponent implements OnInit {

    @Input() set property(prop: Property) {
        this._property = prop;

        this.initForm();
    };

    get property() {
        return this._property
    }

    private _property: Property;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        // build a form for the named graph selection
        this.form = fb.group({
            comparisonOperator: [null, Validators.required],
            propertyValue: [null, Validators.required]
        });

        // emit Iri of named graph when selected
        this.form.valueChanges.subscribe((data) => {
            // TODO: implement callback
            console.log(data);
        })

    }

    initForm() {
        // TODO: depending on the given value type, init comparison operators

        // TODO: depending on the given value type, init a value form field

        // TODO: reset values to default in case the user chose another property
    }

    ngOnInit() {
        this.initForm();
    }

}
