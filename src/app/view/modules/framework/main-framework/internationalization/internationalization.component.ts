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
    selectedLang: string;
    lang: Array<any>;
    subscription: Subscription;

    constructor(public translate: TranslateService,
                public _langService: LanguageService) {

        this.subscription = this._langService.getLanguage().subscribe(lang => {
                this.lang = lang;
                // console.log('lang: ' + lang.var);
            }
        );


        translate.addLangs(['de', 'en']);
        translate.setDefaultLang('en');

        this.selectedLang = translate.getBrowserLang();
        translate.use(this.selectedLang.match(/en|de/) ? this.selectedLang : 'en');
        // console.log('BrowserLang: ' + this.browserLang);
        this._langService.setLanguage(this.selectedLang);

    }

    setLanguage(language: string) {
        this.translate.use(language);
        // localStorage.setItem('lang', langSelect);
        this.selectedLang = language;
        this._langService.setLanguage(language);
        // console.log('langSelect, i18n: ' + langSelect);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


}
