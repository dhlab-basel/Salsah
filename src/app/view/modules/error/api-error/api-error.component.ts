import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'salsah-api-error',
    templateUrl: './api-error.component.html',
    styleUrls: ['./api-error.component.scss']
})
export class ApiErrorComponent implements OnInit {


    /**
     * Attribute: error = errorMessage
     */
    @Input() error: any;

    constructor() {
    }

    ngOnInit() {

    }

}
