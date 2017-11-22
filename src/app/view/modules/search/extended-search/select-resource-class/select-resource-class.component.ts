import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ResourceClass} from "../../../../../model/services/ontologycache.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-resource-class',
    templateUrl: './select-class.component.html',
    styleUrls: ['./select-class.component.scss']
})
export class SelectResourceClassComponent implements OnInit {
    @Input() set setResourceClasses(value: Array<ResourceClass>) {
        this.resourceClasses = value;
    };

    @Output() resourceClassSelected = new EventEmitter<string>();

    resourceClasses: Array<ResourceClass>;

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        // build a form for the resource class selection
        this.form = fb.group({
            resourceClass: [null]
        });

        // emit Iri of named graph when selected
        this.form.valueChanges.subscribe((data) => {
            this.resourceClassSelected.emit(data.resourceClass);
        })
    }

    ngOnInit() {
    }

}
