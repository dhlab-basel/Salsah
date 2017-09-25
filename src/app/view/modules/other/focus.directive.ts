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

import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
    selector: '[salsahFocus]'
})
export class FocusDirective implements OnInit {

    @Input() salsahFocus: boolean;

    constructor(private hostElement: ElementRef,
                private renderer: Renderer) {
    }

    ngOnInit() {
        if (this.salsahFocus) {
//          better solution, but it doesn't work because of a bug in material
//          this.hostElement.nativeElement.focus();

//          old / deprecated version with renderer
          this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
        }
    }

}
