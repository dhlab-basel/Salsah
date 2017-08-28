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

import {Component, ElementRef, Input, OnInit} from '@angular/core';

import {Http} from '@angular/http';
import {FileUploader} from '@uniprank/ng2-file-uploader';

@Component({
    selector: 'salsah-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

    @Input() file: string;

    viewType: string = 'upload';
    dragStatus: boolean = false;

    uploader: FileUploader;

    constructor(private _http: Http,
                private _ele: ElementRef) {
        this.uploader = new FileUploader({
            autoUpload: true,
            url: 'http://localhost:3000/uploads',
            method: 'POST',
            removeBySuccess: true
        })
    }

    ngOnInit() {
        if (this.file) {
            this.viewType = 'preview';
        }

    }

    switchUploader() {
        this.viewType = (this.viewType === 'upload' ? 'url' : 'upload')
    }

    allowDrop(ev) {
        this.dragStatus = true;
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text');
        ev.target.appendChild(document.getElementById(data));
    }

    upload() {


    }

    delete(ev) {
        ev.preventDefault();
        this.file = undefined;
        this.viewType = 'upload';
    }
}
