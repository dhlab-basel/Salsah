import {Component, Input, OnInit} from '@angular/core';
import {ReadLinkValue} from '../../../model/webapi/knora/v2/read-property-item';
import {AppConstants} from '../../../app.constants';

@Component({
  selector: 'read-textfile-value',
  templateUrl: './read-textfile-value.component.html',
  styleUrls: ['./read-textfile-value.component.scss']
})
export class ReadTextfileValueComponent implements OnInit {

    @Input() valueObject: ReadLinkValue;

    AppConstants = AppConstants;

    constructor() { }

    ngOnInit() {
    }

}
