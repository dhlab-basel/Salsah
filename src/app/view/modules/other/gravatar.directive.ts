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

import {Directive, ElementRef, Input} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Directive({
    selector: '[salsahGravatar]'
})
export class GravatarDirective {

    @Input() email: string;
    @Input() size: number = 40;
    @Input() fallback: string = 'mm';

    md5eMail: any;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.md5eMail = Md5.hashStr(this.email);

        this.elementRef.nativeElement.src = 'http://www.gravatar.com/avatar/' + this.md5eMail + '?s=' + this.size + 'd=' + this.fallback;

    }


}


