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

import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {AppSettings} from '../../../model/services/app.settings';

@Directive({
    selector: '[salsahImage]'
})
export class ImageDirective implements OnChanges {

    @Input() image: string;
    @Input() type: string;

    source: string;

    filePath: string = './assets/img';
    errorPath: string = this.filePath + '/errors';

    onError: string;

    constructor(private _renderer: Renderer2,
                private _ele: ElementRef) {
    }

    ngOnChanges() {
        switch (this.type) {

            case 'avatar':
                this.onError = this.errorPath + '/defaultUser.png';
                this.source = 'http://www.gravatar.com/avatar/' + Md5.hashStr(this.image);
                break;

            case 'admin':
                this.onError = this.errorPath + '/image-not-available.png';

                if (this.image === null || this.image === undefined) {
                    this.source = this.errorPath + '/defaultProject.png';
                } else {
                    // if the image is a complete url
                    if (this.image.slice(0, 4) === 'http') {
                        this.source = this.image;
                    } else {
                        this.source = AppSettings.settings.iiifURL + '/server/admin' + '/' + this.image;
                    }
                }
                break;

            default:
                this.onError = this.errorPath + '/image-not-available.png';

                // if the image is a complete url
                if (this.image.slice(0, 4) === 'http') {
                    this.source = this.image;
                } else {
                    this.source = AppSettings.settings.iiifURL + '/server/admin' + '/' + this.image;
                }
        }

        this._renderer.setAttribute(this._ele.nativeElement, 'src', this.source);
        this._renderer.setAttribute(this._ele.nativeElement, 'onError', 'this.src=\'' + this.onError + '\'');

    }
}
