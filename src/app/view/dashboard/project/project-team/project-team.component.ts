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
        showAs: 'expansion',
        restrictedBy: ''
    };

    // add new users
    add: AddData = {
        title: '',
        description: ''
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

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    constructor(private translate: TranslateService,
                public _langService: LanguageService) {
        this.browserLang = translate.getBrowserLang();
        // if (localStorage.getItem('lang') === 'de') {
            if (this.browserLang === 'de') {
            this.list.title = 'Mitglieder in diesem Projekt';
            this.add.title = 'Füge neues Mitglied hinzu';
        } else {
            this.list.title = 'Members in this project';
            this.add.title = 'Add new team member';
        }


        this.list.restrictedBy = JSON.parse(sessionStorage.getItem('currentProject')).id;
        this.subscription = this._langService.getLanguage().subscribe(
            lang => {
                this.lang = lang, this.changeptVal(lang.var), console.log('project-tesm: constructor log');
            }
        );

    }


    ngOnInit() {
        this.list.restrictedBy = JSON.parse(sessionStorage.getItem('currentProject')).id;

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    changeptVal(name) {

        // console.log('language in project-team: ' + name);

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
