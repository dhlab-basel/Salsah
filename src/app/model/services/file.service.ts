import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AppConfig} from '../../app.config';

@Injectable()
export class FileService {

    constructor(private http: Http) {
    }

    upload(files, parameters) {
        const headers = new Headers();
        const options = new RequestOptions({headers: headers});
        options.params = parameters;
        console.log('headers: ', headers);
        console.log('options: ', options);
        return this.http.post(AppConfig.settings.iiifURL + '/admin_upload', files, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }

    getImages() {
        return this.http.get(AppConfig.settings.iiifURL + '/admin_upload')
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }

}
