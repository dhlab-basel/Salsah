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
import {HttpRequest} from '@angular/common/http';

@Component({
    selector: 'salsah-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

    @Input() file?: string;

    filesToUpload: Array<File>;

    viewType: string = 'upload';
    dragStatus: boolean = false;

//    uploader: FileUploader;

    constructor() {
        this.filesToUpload = [];
        /*
                this.uploader = new FileUploader({
                    autoUpload: true,
                    url: 'http://localhost:3000/upload',
                    method: 'POST',
                    removeBySuccess: true
                })
        */
    }

    ngOnInit() {
        if (this.file) {
            this.viewType = 'preview';
        }

    }

    /**
     * button to toggle the view between 'upload' (browse and drag'n'drop view) and 'url' (set an url of the (image) file)
     */
    switchUploader() {
        this.viewType = (this.viewType === 'upload' ? 'url' : 'upload')
    }


    allowDrop(ev) {
        this.dragStatus = true;
        ev.preventDefault();
    }

    drag(ev) {
        console.log('drag', ev);
        ev.dataTransfer.setData('text', ev.target.id);
    }

    drop(ev) {
        this.dragStatus = false;
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text');
        console.log(data);
        ev.target.appendChild(document.getElementById(data));

        /*
        const req = new HttpRequest('POST', 'http://localhost:3000/upload', file, {
            reportProgress: true
        })
        */


    }

    // another method; source: https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/

    upload() {
        this.makeFileRequest('http://localhost:3000/upload', [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });

    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;

        console.log(this.filesToUpload);
//        this.upload();
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

    delete(ev) {
        ev.preventDefault();
        this.file = undefined;
        this.viewType = 'upload';
    }
}
