/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
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
    selector: '[salsahExistingName]',
    providers: [{provide: NG_VALIDATORS, useExisting: ExistingNameDirective, multi: true}]
})
/**
 * With the ExistingNameDirective we could prevent to use an already existing name
 * e.g. get a list of all project shortnames, then we can use this list as existing names
 * TODO: implement projectsService.getAll
 */
export class ExistingNameDirective implements Validators, OnChanges {
    @Input() existingName: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['existingName'];
        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val);
            this.valFn = existingNameValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

// validation of existing name value
export function existingNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let name;

        if (control.value) {
            name = control.value.toLowerCase();
        }

        const no = nameRe.test(name);
        return no ? {'existingName': {name}} : null;
    };
}

// the same as above, but with an array list of existing names
export function existingNamesValidator(nameAr: [RegExp]): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {

        let name;

        if (control.value) {
            name = control.value.toLowerCase();
        }

        let no;
        for (const existing of nameAr) {
            no = existing.test(name);
            if (no) {
                console.log(no);
                return no ? {'existingName': {name}} : null;
            }
        }
        return no ? {'existingName': {name}} : null;
    };
}

export function notAllowed(pattern: RegExp, regType: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        let name;

        console.log(regType);

        if (control.value) {
            name = control.value.toLowerCase();
        }

        console.log(name);

        const no = pattern.test(name);
        return no ? {regType: {name}} : null;
    };
}
