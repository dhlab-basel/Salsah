import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {NamedGraph} from "../../../../../model/services/ontologycache.service";
import {MatSelectChange} from "@angular/material";
import {EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-graph',
    templateUrl: './select-graph.component.html',
    styleUrls: ['./select-graph.component.scss']
})
export class SelectGraphComponent implements OnInit {

    @Input() namedGraphs: Array<NamedGraph>;

    @Output() namedGraphSelected = new EventEmitter<string>();

    form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        // build a form for the named graph selection
        this.form = fb.group({
            namedGraph: [null, Validators.required]
        });

        // emit Iri of named graph when selected
        this.form.valueChanges.subscribe((data) => {
            this.namedGraphSelected.emit(data.namedGraph);
        })

    }

    ngOnInit() {

    }

}
