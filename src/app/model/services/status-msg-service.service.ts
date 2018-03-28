import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';

@Injectable()
export class StatusMsgServiceService  extends ApiService {

    getStatusMsg(): Observable<any> {
        const url = environment.url;
        return this.httpGet(url + '/assets/i18n/statusMsg.json', {withCredentials: false});
    };

}
