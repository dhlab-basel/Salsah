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

import {Component, OnInit, DoCheck} from '@angular/core';
import {
    AddData, ListData,
    SortData
} from '../../../modules/framework/framework-for-listings/framework-for-listings.component';

import {LanguageService} from '../../../../model/services/language.service';
import {errorHandler} from '@angular/platform-browser/src/browser';


@Component({
    selector: 'salsah-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

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

    languages: any;
    name: string;

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    constructor(public _langService: LanguageService) {
        // Temporarily stored values, will be refactored to a function, called by an Event Emitter

        let langString: string;
        if (localStorage.getItem('lang') === 'de') {
            // console.log('Sprache: de');
            langString = localStorage.getItem('lang');
            this.list.title = 'Mitglieder in diesem Projekt';
            this.add.title = 'Füge neues Mitglied hinzu';
        } else {
            // console.log('Sprache: en');
            langString = localStorage.getItem('lang');
            this.list.title = 'Members in this project';
            this.add.title = 'Add new team member';
        }
    }


    ngOnInit() {
        this.list.restrictedBy = JSON.parse(sessionStorage.getItem('currentProject')).id;
        this._langService.getLanguage().subscribe(
            languages => {
                this.languages = languages, this.changeptVal();
            },
            (e) => {
                console.log(e)
            },
            () => {
                console.log('Final')
            }
        );
    }

    /*
    ngDoCheck() {
        this._langService.getLanguage().subscribe (
            languages => {
                this.languages = languages, this.changeptVal();
            }
        );
    }
*/
    changeptVal() {
        console.log('changeptVal...');
        this._langService.getLanguage();
        this.name = localStorage.getItem('lang');
        console.log('language: ', this.name);
        /*
                for ( const xy in this.languages) {
                    if (this.languages[xy].selected === 'selected') {
                        this.name = this.languages[xy].lang;
                        console.log('Project-Team changeVal detected: ' + this.languages[xy].lang);
                        console.log('Project-Team Var name: ' + this.name);
                    }
                }
        */
        switch (this.name) {
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
