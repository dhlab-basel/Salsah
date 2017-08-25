import {Component, ElementRef, OnInit} from '@angular/core';

import {Http} from '@angular/http';
import {FileUploader} from '@uniprank/ng2-file-uploader';

@Component({
    selector: 'salsah-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {


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
}
