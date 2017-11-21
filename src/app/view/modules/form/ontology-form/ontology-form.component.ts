/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-ontology-form',
    templateUrl: './ontology-form.component.html',
    styleUrls: ['./ontology-form.component.scss']
})
export class OntologyFormComponent implements OnInit {

    // ontology data:
    // the ontology-form can be used to create new ontologies or to edit existing ones
    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new ontologies
    @Input() iri?: string = undefined;

    // project data:
    // project admin case: restrictedBy is the iri of the project
    // in this case, the project admin adds a new ontology to the project
    @Input() restrictedBy?: string = undefined;

    isLoading: boolean = true;

    constructor() {
    }

    ngOnInit() {
        this.isLoading = false;
    }

}
