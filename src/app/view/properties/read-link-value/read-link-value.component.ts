/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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
import {ReadLinkValue} from '../../../model/webapi/knora/v2/read-property-item';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {OntologyInformation} from "../../../model/services/ontologycache.service";
import {ResourceObjectComponent} from "../../modules/object/resource-object/resource-object.component";

@Component({
    selector: 'read-link-value',
    templateUrl: './read-link-value.component.html',
    styleUrls: ['./read-link-value.component.scss']
})
export class ReadLinkValueComponent implements OnInit {

    @Input() valueObject: ReadLinkValue;
    @Input() ontologyInfo: OntologyInformation;

    constructor(private dialog: MdDialog) {
    }

    ngOnInit() {
    }

    showReferredResourceInDialog() {
        let config = new MdDialogConfig();
        config.height = '60%';
        config.width = '60%';

        let dialogRef = this.dialog.open(ResourceObjectComponent, config);
        // https://stackoverflow.com/questions/40648252/angular2-material-mddialog-pass-in-variable
        dialogRef.componentInstance.iri = this.valueObject.referredResourceIri;
    }


}
