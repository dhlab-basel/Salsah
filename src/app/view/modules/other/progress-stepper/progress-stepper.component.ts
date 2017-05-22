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

@Component({
    selector: 'salsah-progress-stepper',
    templateUrl: './progress-stepper.component.html',
    styleUrls: ['./progress-stepper.component.scss']
})
export class ProgressStepperComponent implements OnInit {

    @Input('counter') counter: number;
    @Input('max_steps') max_steps?: number;
    @Input('steps') steps?: string[];

    errorMessage: string = undefined;

    progress: number[] = Array();

    constructor() {

    }

    ngOnInit() {
        if (!this.steps && !this.max_steps) {
            // at least one of attribute steps or max_steps should be set!
            this.errorMessage = "<p>Error in the ProgressStepperComponent.<br>One of the following attribute is missing: max_steps || steps</p>";
        }
        else {
            if (this.steps !== undefined ) {
                this.max_steps = this.steps.length;
            }

            this.progress = Array(this.max_steps * 2 - 1).fill('').map((x, i) => i);
        }

    }

}
