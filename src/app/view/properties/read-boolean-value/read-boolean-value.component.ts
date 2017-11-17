import {Component, Input, OnInit} from '@angular/core';
import {ReadBooleanValue} from "../../../model/webapi/knora/v2/read-property-item";

@Component({
    selector: 'read-boolean-value',
    templateUrl: './read-boolean-value.component.html',
    styleUrls: ['./read-boolean-value.component.scss']
})
export class ReadBooleanValueComponent implements OnInit {

    @Input() valueObject: ReadBooleanValue;

    constructor() {
    }

    ngOnInit() {
    }

}
