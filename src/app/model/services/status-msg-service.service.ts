import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StatusMsgServiceService  extends ApiService {

    getStatusMsg(): Observable<any> {
        return this.httpGet('http://localhost:4200/assets/data/statusMsg.json', {withCredentials: false});
    };

}
