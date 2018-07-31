import { Injectable } from '@angular/core';
import { ApiService } from '@knora/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class StatusMsgServiceService extends ApiService {

    getStatusMsg(): Observable<any> {
        const url = environment.url;
        return this.httpGet(url + '/assets/i18n/statusMsg.json');
        // return this.httpGet(url + '/assets/i18n/statusMsg.json', {withCredentials: false});
    };

}
