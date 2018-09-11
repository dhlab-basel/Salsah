import { Component, Input, OnInit } from '@angular/core';
import { KnoraConstants, ReadLinkValue } from '@knora/core';

@Component({
  selector: 'read-textfile-value',
  templateUrl: './read-textfile-value.component.html',
  styleUrls: ['./read-textfile-value.component.scss']
})
export class ReadTextfileValueComponent implements OnInit {

  @Input() valueObject: ReadLinkValue;

  KnoraConstants = KnoraConstants;

  constructor() { }

  ngOnInit() {
  }

}
