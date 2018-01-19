import {Injectable, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export class Language {
    lang: string;
    selected: string;
}

@Injectable()
export class LanguageService {
    @Input() language: Language;
    languages: Language[] = [
        {
            lang: 'de',
            selected: ''
        },
        {
            lang: 'en',
            selected: ''
        }
    ];

    localStorage: any;
    lang: string;

    private subject = new Subject<Language[]>();

    /*
        langObservable: Observable<Language[]>;
        observer;
        constructor() {
            this.langObservable = new Observable(observer => {
                this.observer = observer;
                this.observer.next(this.languages);
            });
        }
    */


    setLanguage(lang: string) {
        switch (lang) {
            case 'de':
                localStorage.setItem('lang', lang);
                this.languages[0].selected = 'selected';
                this.languages[1].selected = 'no';
                break;
            case 'en':
                localStorage.setItem('lang', lang);
                this.languages[0].selected = 'no';
                this.languages[1].selected = 'selected';
                break;
            default:
                localStorage.setItem('lang', lang);
                this.languages[0].selected = 'selected';
                this.languages[1].selected = 'no';
                break;
        }
        // this.observer.next(this.languages);
        this.subject.next()
    }

    getLanguage(): Observable<Language[]> {
        console.log('getLanguage wird aufgerufen: das langSubject ist: ' + this.subject.asObservable());
        return this.subject.asObservable();
    }

    // To Do:
    // Initialize the language according to the browser language
    // Possible procedure: use ngx-translate and read out browser-language
    // Initialize the select form correctly (minor issue...)

}
