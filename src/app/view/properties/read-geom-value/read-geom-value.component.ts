import { Component, OnInit, Input } from '@angular/core';
import {ReadGeomValue} from "../../../model/webapi/knora/v2/read-property-item";

@Component({
  selector: 'read-geom-value',
  templateUrl: './read-geom-value.component.html',
  styleUrls: ['./read-geom-value.component.scss']
})
export class ReadGeomValueComponent implements OnInit {

  @Input() valueObject: ReadGeomValue;

  constructor() { }

  ngOnInit() {
  }

}
