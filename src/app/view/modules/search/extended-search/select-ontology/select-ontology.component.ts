import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {Ontology} from "../../../../../model/services/ontologycache.service";
import {MatSelectChange} from "@angular/material";
import {EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'select-ontology',
    templateUrl: './select-ontology.component.html',
    styleUrls: ['./select-ontology.component.scss']
})
export class SelectOntologyComponent implements OnInit {

    @Input() ontologies: Array<Ontology>;

    @Output() ontologySelected = new EventEmitter<string>();

    private form: FormGroup;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {

        // build a form for the named graph selection
        this.form = fb.group({
            ontology: [null, Validators.required]
        });

        // emit Iri of the ontology when being selected
        this.form.valueChanges.subscribe((data) => {
            this.ontologySelected.emit(data.ontology);
        })

    }

    ngOnInit() {

    }

}
