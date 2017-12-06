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

import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FileService} from '../../../../model/services/file.service';
import {AppConfig} from '../../../../app.config';
import {Project} from '../../../../model/webapi/knora';

@Component({
    selector: 'salsah-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

    errors: Array<string> = [];
    dragAreaClass: string = 'dragarea';

    @Input() fileExt?: string = 'JPG, GIF, PNG, JPEG';
    @Input() maxFiles?: number = 5;
    @Input() maxSize?: number = 5; // 5MB
    @Input() existingFile?: string;
    @Input() formType?: string;

    @Output() uploadStatus = new EventEmitter();

    viewType: string = 'upload';

    files: string[];

    fileServer: string;

    /*

    @Input() file?: string;

    @Output() setFiles = new EventEmitter<any>();

    private fileList: any = [];
    private invalidFiles: any = [];

    private filesToUpload: any = [];


    dragStatus: boolean = false;
    */

    constructor(private _fileService: FileService) {
    }

    ngOnInit() {
        if (this.existingFile !== undefined && this.existingFile !== null) {
            this.files = [this.existingFile];
            this.viewType = 'preview';
        }
    }

    onFileChange(event) {
        const uploadFiles = event.target.files;
        console.log('files: ', uploadFiles);
        this.saveFiles(uploadFiles);
    }


    // onDragOver
    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }

    // onDragEnter
    @HostListener('dragenter', ['$event'])
    onDragEnter(event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }

    // onDragEnd
    @HostListener('dragend', ['$event'])
    onDragEnd(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }

    // onDragLeave
    @HostListener('dragleave', ['$event'])
    onDragLeave(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }

    // onDrop
    @HostListener('drop', ['$event'])
    onDrop(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        this.saveFiles(files);
    }

    saveFiles(files) {
        this.errors = []; // Clear error
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
            return;
        }
        if (files.length > 0) {
            const formData: FormData = new FormData();
            for (let j = 0; j < files.length; j++) {
                formData.append('file[]', files[j], files[j].name);
            }
            const parameters = {
//        projectId: this.projectId,
//        sectionId: this.sectionId
            };
            this._fileService.upload(formData, parameters)
                .subscribe(
                    success => {
                        this.uploadStatus.emit(success);
                        this.files = success.files;
                        this.fileServer = AppConfig.FileServer;
                        this.viewType = 'preview';

                    },
                    error => {
                        this.uploadStatus.emit(false);
                        this.errors.push(error.ExceptionMessage);
                    });
        }
    }

    private isValidFiles(files) {
        // Check Number of files
        if (files.length > this.maxFiles) {
            this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
            return;
        }
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    }

    private isValidFileExtension(files) {
        // Make array of file extensions
        const extensions = (this.fileExt.split(','))
            .map(function (x) {
                return x.toLocaleUpperCase().trim();
            });
        for (let i = 0; i < files.length; i++) {
            // Get file extension
            const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            const exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push('Error (Extension): ' + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    }

    private isValidFileSize(file) {
        const fileSizeinMB = file.size / (1024 * 1000);
        const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize) {
            this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
        }
    }


    /**
     * button to toggle the view between 'upload' (browse and drag'n'drop view) and 'url' (set an url of the (image) file)
     */
    switchUploader() {
        this.viewType = (this.viewType === 'upload' ? 'url' : 'upload')
    }

    deleteFile(ev) {
        ev.preventDefault();
//        this.file = undefined;
        this.uploadStatus.emit({'status': 'Del', 'files': [null]});
        this.viewType = 'upload';
    }

    /*
        //
        // ngX file upload settings
        //
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;

    sizeLimit = 2000000;

    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    beforeUpload(uploadingFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('File is too large');
        }
    }
     */
}

