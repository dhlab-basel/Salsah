import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { KuiCoreConfig } from '@knora/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StatusMsgService {

    constructor(private _http: HttpClient,
                @Inject('config') public config: KuiCoreConfig) {
    }

    /**
     * this method get the status messages from the statusMsg.json file
     * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
     * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
     *
     */
    getStatusMsg(): Observable<any> {

        return this._http.get(this.config.app + '/assets/i18n/statusMsg.json')
            .pipe(map(
                (res: any) => {
                    return res;
                    },
                err => {
                    console.error(err);
                }
                )
            );

    };

}
