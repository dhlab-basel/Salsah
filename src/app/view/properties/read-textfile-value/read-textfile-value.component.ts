import { Component, Input, OnInit } from '@angular/core';
import { ReadLinkValue } from '@knora/core';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'read-textfile-value',
  templateUrl: './read-textfile-value.component.html',
  styleUrls: ['./read-textfile-value.component.scss']
})
export class ReadTextfileValueComponent implements OnInit {

    @Input() valueObject: ReadLinkValue;

    AppConfig = AppConfig;

    constructor() { }

    ngOnInit() {
    }

}
