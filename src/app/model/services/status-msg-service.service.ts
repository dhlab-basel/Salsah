import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../app.settings';

@Injectable()
export class StatusMsgServiceService  extends ApiService {

    getStatusMsg(): Observable<any> {
        const url = AppSettings.settings.appURL;
        return this.httpGet(url + '/assets/i18n/statusMsg.json', {withCredentials: false});
    };

}
