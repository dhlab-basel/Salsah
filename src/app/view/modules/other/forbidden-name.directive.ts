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
import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidatorFn, Validators} from '@angular/forms';

@Directive({
    selector: '[salsahForbiddenName]',
    providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true}]
})
/**
 * With the ForbiddenNameDirective we could prevent to use an already existing name
 * e.g. get a list of all project shortnames, then we can use this list as forbidden names
 * TODO: implement projectsService.getAll
 */
export class ForbiddenNameDirective implements Validators, OnChanges {
    @Input() forbiddenName: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['forbiddenName'];
        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val, 'i');
            this.valFn = forbiddenNameValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

// validation of forbidden name value
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const name = control.value;
        const no = nameRe.test(name);
        return no ? {'forbiddenName': {name}} : null;
    };
}

// the same as above, but with an array list of forbidden names
export function forbiddenNamesValidator(nameAr: [RegExp]): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
        const name = control.value;
        let no;
        for (const forbidden of nameAr) {
            no = forbidden.test(name);
            if (no) {
                console.log(no);
                return no ? {'forbiddenName': {name}} : null;
            }
        }
        return no ? {'forbiddenName': {name}} : null;
    };
}
