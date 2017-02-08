import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'salsah-header-toolbar',
    templateUrl: './header-toolbar.component.html',
    styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit {

    @Input() session: any;
    @Input() help: any;
    @Input() create: any;
    @Input() user: any;


    constructor() {
    }

    ngOnInit() {

    }

}
