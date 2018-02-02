import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LanguageService {

    private subject = new Subject<any>();

    setLanguage(lang: string) {
        this.subject.next({var: lang});
    }
    getLanguage(): Observable<any> {
        return this.subject.asObservable();
    }

}
