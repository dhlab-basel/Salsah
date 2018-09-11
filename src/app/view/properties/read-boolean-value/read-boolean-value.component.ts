import { Component, Input, OnInit } from '@angular/core';
import { ReadBooleanValue } from '@knora/core';

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
