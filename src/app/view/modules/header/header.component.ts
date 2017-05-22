import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor( ) {
    }

    ngOnInit() {

    }

    //
    // toolbar settings: "add" menu, help button, "user" menu
    // the default title text is in english.
    // TODO: It will be overwritten, by the user's preferred language by a special language JSON file?!
    //

    currentProject = {
        name: 'SALSAH',
        title: 'System for Annotation and Linkage of Sources in Arts and Humanities',
        logo: './assets/img/salsah-logo.png'
    };

}
