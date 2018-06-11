import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../../app.config';

@Injectable()
export class StatusMsgServiceService  extends ApiService {

    getStatusMsg(): Observable<any> {
        const url = AppConfig.settings.appURL;
        return this.httpGet(url + '/assets/i18n/statusMsg.json', {withCredentials: false});
    };

}
