import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchDataService {

    private searchMessage = new BehaviorSubject<string>('test');
    currentSearch = this.searchMessage.asObservable();

    constructor() {
    }

    changeMessage(message: string) {
        this.searchMessage.next(message)
    }


}
