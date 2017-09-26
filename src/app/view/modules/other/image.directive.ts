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

import {Directive, ElementRef, Renderer2, Input, OnInit, OnChanges} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {environment} from '../../../../environments/environment';

@Directive({
    selector: '[salsahImage]'
})
export class ImageDirective implements OnChanges {

    @Input() image: string;
    @Input() type: string;

    defaultPath: string = environment.localData;

    source: string;
    onError: string = this.defaultPath;

    constructor(private _renderer: Renderer2,
                private _ele: ElementRef) {
    }

    ngOnChanges() {

        switch (this.type) {

            case 'user':
                this.onError += '/users/defaultUser.png';
                this.source = 'http://www.gravatar.com/avatar/' + Md5.hashStr(this.image);

                break;

            case 'project':
                this.onError += '/errors/image-not-available.png';

                if (this.image === null || this.image === undefined) {
                    this.source = this.defaultPath + '/projects/defaultProject.png';
                } else {
                    // if the image is a complete url
                    if (this.image.slice(0, 4) === 'http') {
                        this.source = this.image;
                    } else {
                        this.source = this.defaultPath + '/projects/' + this.image;
                    }
                }
                break;

            default:
                this.source = this.image;
                this.onError += '/errors/image-not-available.png';
        }

        this._renderer.setAttribute(this._ele.nativeElement, 'src', this.source);
        this._renderer.setAttribute(this._ele.nativeElement, 'onError', 'this.src=\'' + this.onError + '\'');


    }
}
