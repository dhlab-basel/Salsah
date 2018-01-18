///<reference path="../../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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

    constructor(private translate: TranslateService,
                public _langService: LanguageService) {
        translate.addLangs(['de', 'en']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();

        if (localStorage.getItem('lang') === null) {
            translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
            this.langString = translate.currentLang;
            localStorage.setItem('lang', this.langString);
            // this._langService.setLanguage(this.langString);
//            console.log('Die Browsersprache ist: ' + this.langString);

        } else {
            translate.use(localStorage.getItem('lang'));
            this.langString = translate.currentLang;
//            console.log('Die Usersprache ist: ' + this.langString);
            // this._langService.setLanguage(this.langString);
        }
    }

    setLanguage(event: any, langSelect: string) {
        console.log('Sprache: ' + langSelect);
        this.translate.use(langSelect);
        localStorage.setItem('lang', langSelect);
        this.langString = langSelect;
        this._langService.setLanguage(langSelect);
        // window.location.reload();
        console.log('langSelect, i18n: ' + langSelect);
    }

    initialize() {
        this.langString = this.translate.currentLang;
        // console.log('Initialize: ' + this.langString);
        return this.langString;

    }


    ngOnInit() {

        this._langService.getLanguage().subscribe(
            languages => this.languages = languages
        );

    }

}
