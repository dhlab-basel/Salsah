import { Injectable, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
// import {language} from './language';

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

    langObservable: Observable<Language[]>;
    observer;

  constructor() {
      this.langObservable = new Observable(observer => {
          this.observer = observer;
          this.observer.next(this.languages);
      });
  }

  setLanguage(lang) {
      switch (lang) {
          case 'de':
              localStorage.setItem('lang', lang);
              this.languages[0].selected = 'yes';
              this.languages[1].selected = 'no';
              break;
          case 'en':
              localStorage.setItem('lang', lang);
              this.languages[0].selected = 'no';
              this.languages[1].selected = 'yes';
              break;
          default:
              localStorage.setItem('lang', lang);
              this.languages[0].selected = 'no';
              this.languages[1].selected = 'yes';
              break;
      }
      this.observer.next(this.languages);
  }

    getLanguage(): Observable<Language[]> {
        return this.langObservable;
    }

    initLanguage() {
        localStorage.setItem('lang', 'en');
        this.languages[0].selected = 'no';
        this.languages[1].selected = 'yes';
    }



}
