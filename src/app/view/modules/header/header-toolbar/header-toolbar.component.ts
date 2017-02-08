import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'salsah-header-toolbar',
    templateUrl: './header-toolbar.component.html',
    styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit {

    @Input() session: Object;
    @Input() help: Object;
    @Input() create: Object;
    @Input() user: Object;


    constructor() {
    }

    ngOnInit() {

    }

}
