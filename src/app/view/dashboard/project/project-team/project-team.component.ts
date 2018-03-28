/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {
    AddData, ListData,
    SortData
} from '../../../modules/framework/framework-for-listings/framework-for-listings.component';

import {LanguageService} from '../../../../model/services/language.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'salsah-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {

    // here we can reuse the framework-for-listings component:
    // shows a list of users and the possibility to create new users

    //
    //  DATA for FrameworkForListingsComponent
    //

    list: ListData = {
        title: '',
        description: '',
        content: 'user',
        showAs: 'accordion',
        restrictedBy: ''
    };

    // add new users
    add: AddData = {
        title: '',
        description: '',
        type: 'member'
    };

    // Language translation
    lang: any = [
        {
            var: ''
        }
    ];

    name: string;
    subscription: Subscription;
    browserLang: string;
    currentLanguage: string;

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    constructor(public translate: TranslateService,
                public _langService: LanguageService) {

        if (translate.currentLang === null) {
            this.browserLang = translate.getBrowserLang();
            translate.use(this.browserLang.match(/en|de/) ? this.browserLang : 'en');
        } else {
            this.browserLang = translate.currentLang;
        }

        if (this.browserLang === 'de') {
            this.list.title = 'Mitglieder in diesem Projekt';
            this.add.title = 'Füge neues Mitglied hinzu';
        } else {
            this.list.title = 'Members in this project';
            this.add.title = 'Add new team member';
        }

        this.list.restrictedBy = JSON.parse(sessionStorage.getItem('currentProject')).id;
    }


    ngOnInit() {
        this.list.restrictedBy = JSON.parse(sessionStorage.getItem('currentProject')).id;

        this.subscription = this._langService.getLanguage().subscribe(
            lang => {
                this.lang = lang, this.changeptVal(lang.var);
            }
        );

        this.currentLanguage = this.translate.currentLang;
        // console.log('CurrentLanguage: ' + this.currentLanguage);

        if (this.currentLanguage === 'de') {
            this.list.title = 'Mitglieder in diesem Projekt';
            this.add.title = 'Füge neues Mitglied hinzu';
        } else {
            this.list.title = 'Members in this project';
            this.add.title = 'Add new team member';
        }

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    changeptVal(name) {
        switch (name) {
            case 'en':
                this.list.title = 'Members in this project';
                this.add.title = 'Add new team member';
                break;
            case 'de':
                this.list.title = 'Mitglieder in diesem Projekt';
                this.add.title = 'Füge neues Mitglied hinzu';
                break;
        }
    }
}
