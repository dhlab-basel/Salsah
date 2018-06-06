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
import {MatDialog, MatDialogConfig} from '@angular/material';
import {OntologyInformation} from '../../../model/services/ontologycache.service';
import {ObjectDialogComponent} from '../../modules/dialog/object-dialog/object-dialog.component';
import {AppConstants} from '../../../app.constants';

@Component({
    selector: 'read-link-value',
    templateUrl: './read-link-value.component.html',
    styleUrls: ['./read-link-value.component.scss']
})
export class ReadLinkValueComponent implements OnInit {

    @Input() valueObject: ReadLinkValue;
    @Input() ontologyInfo: OntologyInformation;

    AppConstants = AppConstants;

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    showReferredResourceInDialog() {

        const config: MatDialogConfig = ObjectDialogComponent.createConfiguration(this.valueObject.referredResourceIri);

        this.dialog.open(ObjectDialogComponent, config);

    }


}
