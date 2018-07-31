import { Component, Input, OnInit } from '@angular/core';
import { ReadListValue } from '@knora/core';

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
