import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'salsah-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

    constructor(private _title: Title) {
    }

    ngOnInit() {

        this._title.setTitle( 'Salsah | Documentation');

    }

}
