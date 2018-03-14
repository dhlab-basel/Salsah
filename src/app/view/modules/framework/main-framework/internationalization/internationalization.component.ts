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


    constructor(public translate: TranslateService,
                public _langService: LanguageService) {

        this.subscription = this._langService.getLanguage().subscribe(lang => {
                this.lang = lang;
                // console.log('lang: ' + lang.var);
            }
        );


        translate.addLangs(['de', 'en']);
        translate.setDefaultLang('en');

        this.browserLang = translate.getBrowserLang();
        translate.use(this.browserLang.match(/en|de/) ? this.browserLang : 'en');
        // console.log('BrowserLang: ' + this.browserLang);
        this._langService.setLanguage(this.browserLang);

    }

    setLanguage(event: any, langSelect: string) {
        this.translate.use(langSelect);
        // localStorage.setItem('lang', langSelect);
        this.langString = langSelect;
        this._langService.setLanguage(langSelect);
        // console.log('langSelect, i18n: ' + langSelect);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


}
