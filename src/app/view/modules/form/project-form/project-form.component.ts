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

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {


    public form: any = {        // TODO: modify a language json file or db file for multilingual use
        project: {
            title: 'Create a new project',
            name: 'Project name',
            shortname: 'Project short name',
            description: 'Description',
            logo: 'Upload a project logo'
        }
    };

    constructor() {

    }

    ngOnInit() {
    }

    onSubmit(pf: any): void {
        console.log('you submitted value:', pf);
    }


    /**
     * saveProject()
     * check validity of the data in the form
     * if everything's fine, send the data to the api
     * and change the view from modify project to the project admin view
     */

        //
        // ngX file upload settings
        //
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    /*
     options: NgUploaderOptions = {
     url: 'http://localhost:10050/upload'
     };
     */
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

}
