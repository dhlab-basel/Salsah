///<reference path="../../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'salsah-internationalization',
    templateUrl: './internationalization.component.html',
    styleUrls: ['./internationalization.component.scss']
})
export class InternationalizationComponent implements OnInit, OnChanges { // OnChange hier geändert

    localStorage: any;
    langSelect: any;

    @Output() LanguageChange = new EventEmitter<any>();

    constructor(private translate: TranslateService) {
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

    changeLang(event: any, langSelect: string) {
        // console.log('Sprache: ' + langSelect);
        this.translate.use(langSelect);
        localStorage.setItem('lang', langSelect);
        this.LanguageChange.emit(this.langSelect);
        alert('i18n: ' + langSelect);
    }


    ngOnInit() { // ngOnChange nötig, funktioniert das?
    }

    ngOnChanges() {
        alert('etwas wurde geändert');
    }

}
