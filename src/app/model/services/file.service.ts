import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FileService {

    uploadServer: string = environment.media;

    constructor(private http: Http) {
    }

    upload(files, parameters) {
        const headers = new Headers();
        const options = new RequestOptions({headers: headers});
        options.params = parameters;
        console.log('headers: ', headers);
        console.log('options: ', options);
        return this.http.post(this.uploadServer + '/admin_upload', files, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }

    getImages() {
        return this.http.get(this.uploadServer + '/admin_upload')
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }

}
