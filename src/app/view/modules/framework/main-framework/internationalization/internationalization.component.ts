///<reference path="../../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../model/services/language.service';

@Component({
    selector: 'salsah-internationalization',
    templateUrl: './internationalization.component.html',
    styleUrls: ['./internationalization.component.scss']
})
export class InternationalizationComponent implements OnInit {

    localStorage: any;
    langString: string;
    languages: Array<any>;

    constructor(
        private translate: TranslateService
        // public _langService: LanguageService
    ) {
        translate.addLangs(['de', 'en']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        // translate.use(browserLang.match(/en|de/) ? browserLang : 'en');

        if (localStorage.getItem('lang') === null) {
            translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
        } else {
            translate.use(localStorage.getItem('lang'));
        }
    }

    setLanguage(event: any, langSelect: string) {
        console.log('Sprache: ' + langSelect);
        this.translate.use(langSelect);
        localStorage.setItem('lang', langSelect);
        this.langString = langSelect;
        // this._langService.setLanguage(langSelect);
        // window.location.reload();
        // alert('i18n: ' + langSelect);
    }

    ngOnInit() {
        /*
        this._langService.getLanguage().subscribe(
            languages => this.languages = languages
        );
        */
    }

}
