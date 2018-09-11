import { Component, Input, OnInit } from '@angular/core';
import { ReadUriValue } from '@knora/core';

@Component({
    selector: 'read-uri-value',
    templateUrl: './read-uri-value.component.html',
    styleUrls: ['./read-uri-value.component.scss']
})
export class ReadUriValueComponent implements OnInit {

    @Input() valueObject: ReadUriValue;

    constructor() {
    }

    ngOnInit() {
    }

}
