import {Component, Input, OnInit} from '@angular/core';
import {ReadListValue} from "../../../model/webapi/knora/v2/read-property-item";

@Component({
    selector: 'read-list-value',
    templateUrl: './read-list-value.component.html',
    styleUrls: ['./read-list-value.component.scss']
})
export class ReadListValueComponent implements OnInit {

    @Input() valueObject: ReadListValue;

    constructor() {
    }

    ngOnInit() {
    }

}
