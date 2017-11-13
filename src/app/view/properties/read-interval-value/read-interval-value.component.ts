import {Component, Input, OnInit} from '@angular/core';
import {ReadIntervalValue} from 'app/model/webapi/knora/v2/read-property-item';

@Component({
    selector: 'read-interval-value',
    templateUrl: './read-interval-value.component.html',
    styleUrls: ['./read-interval-value.component.scss']
})
export class ReadIntervalValueComponent implements OnInit {

    @Input() valueObject: ReadIntervalValue;

    constructor() {
    }

    ngOnInit() {
    }

}
