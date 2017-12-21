///<reference path="../../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'salsah-internationalization',
  templateUrl: './internationalization.component.html',
  styleUrls: ['./internationalization.component.scss']
})
export class InternationalizationComponent implements OnInit {

    localStorage: any;

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

    public changeStorage(event:any, langSelect:string) {
        // console.log('Sprache: ' + langSelect);
        localStorage.setItem('lang', langSelect);
    }


    ngOnInit() {
  }

}
