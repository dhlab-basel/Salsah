import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageData} from '../../modules/message/message.component';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'salsah-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

    errorMessage: MessageData;
    isLoading: boolean = true;

    sysAdmin: boolean = false;
    loggedInUser: boolean = false;

    public menu: any = [
        {
            name: 'Projects',
            route: 'projects'
        },
        {
            name: 'Users',
            route: 'users'
        },
        {
            name: 'Ontologies',
            route: 'ontologies'
        }
    ];

    constructor(private _title: Title) {
    }

    ngOnInit() {

        this._title.setTitle( 'Salsah | System admin');

        this.isLoading = false;

    }

}
