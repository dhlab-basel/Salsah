///<reference path="../../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';
import {LanguageService} from '../../../../../model/services/language.service';

@Component({
    selector: 'salsah-internationalization',
    templateUrl: './internationalization.component.html',
    styleUrls: ['./internationalization.component.scss']
})
export class InternationalizationComponent implements OnInit, OnDestroy {

    localStorage: any;
    langString: string;
    lang: Array<any>;
    subscription: Subscription;
    browserLang: string = 'en';


    constructor(private translate: TranslateService,
                public _langService: LanguageService) {

        this.subscription = this._langService.getLanguage().subscribe(lang => {
            this.lang = lang;
            // console.log('lang: ' + lang.var);
            }
        );


        translate.addLangs(['de', 'en']);
        translate.setDefaultLang('en');

        this.browserLang = translate.getBrowserLang();
        // console.log('BrowserLang: ' + this.browserLang);

        if (localStorage.getItem('lang') === null) {
            translate.use(this.browserLang.match(/en|de/) ? this.browserLang : 'en');
            this.langString = translate.currentLang;
            localStorage.setItem('lang', this.langString);
            // this._langService.setLanguage(this.langString);
            // console.log('Die Browsersprache ist: ' + this.langString);

        } else {
            translate.use(localStorage.getItem('lang'));
            this.langString = translate.currentLang;
            // console.log('Die Usersprache ist: ' + this.langString);
            // this._langService.setLanguage(this.langString);
        }
    }

    setLanguage(event: any, langSelect: string) {
        // console.log('Sprache: ' + langSelect);
        this.translate.use(langSelect);
        localStorage.setItem('lang', langSelect);
        this.langString = langSelect;
        this._langService.setLanguage(langSelect);
        // window.location.reload();
        // console.log('langSelect, i18n: ' + langSelect);
    }

    ngOnInit() {
        // is not needed anymore...
        // console.log('Init Intern.');
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


}
