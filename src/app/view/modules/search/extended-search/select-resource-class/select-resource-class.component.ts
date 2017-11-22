import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ResourceClass} from "../../../../../model/services/ontologycache.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-resource-class',
    templateUrl: './select-resource-class.component.html',
    styleUrls: ['./select-resource-class.component.scss']
})
export class SelectResourceClassComponent implements OnInit {

    // setter method for resource classes when being updated
    @Input()
    set resourceClasses(value: Array<ResourceClass>) {
        this.resourceClassSelected = undefined; // reset on updates
        this._resourceClasses = value;
    };

    // getter method for resource classes (used in template)
    get resourceClasses() {
        return this._resourceClasses;
    }

    // event emitted to parent component once a resource class is selected by the user
    @Output() resourceClassSelectedEvent = new EventEmitter<string>();

    // available resource classes for selection
    private _resourceClasses: Array<ResourceClass>;

    // stores the currently selected resource class
    private resourceClassSelected: string;

    private form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        // build a form for the resource class selection
        this.form = fb.group({
            resourceClass: [null] // resource class selection is optional
        });

        // store and emit Iri of the resource class when selected
        this.form.valueChanges.subscribe((data) => {
            this.resourceClassSelected = data.resourceClass;
            this.resourceClassSelectedEvent.emit(this.resourceClassSelected);
        })
    }

    /**
     * Returns the Iri of the selected resource class.
     *
     * @returns the Iri of the selected resource class or false in case no resource class is selected.
     */
    getResourceClassSelected(): any {
        if (this.resourceClassSelected !== undefined) {
            return this.resourceClassSelected;
        } else {
            return false;
        }
    }

    ngOnInit() {
    }

}
