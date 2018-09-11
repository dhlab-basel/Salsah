import { Component, OnInit, Input } from '@angular/core';
import { ReadGeomValue } from '@knora/core';

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
