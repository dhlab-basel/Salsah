import {Component, OnInit, Input} from '@angular/core';
import {AppConfig} from "../../../../app.config";

@Component({
    selector: 'salsah-api-error',
    templateUrl: './api-error.component.html',
    styleUrls: ['./api-error.component.css']
})
export class ApiErrorComponent implements OnInit {

    api: string = AppConfig.API_ENDPOINT;
    failedOn: string;

    /**
     * Attribute: error = errorMessage
     */
    @Input() error: any;

    constructor() {
    }

    ngOnInit() {
//        this.failedOn = this.api + this.error.url;

    }

}
