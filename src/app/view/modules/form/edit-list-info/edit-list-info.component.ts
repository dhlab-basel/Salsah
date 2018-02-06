import {Component, Input, OnChanges} from '@angular/core';
import {List, ListInfo, ListNodeInfo} from '../../../../model/webapi/knora';

@Component({
  selector: 'salsah-edit-list-info',
  templateUrl: './edit-list-info.component.html',
  styleUrls: ['./edit-list-info.component.scss']
})
export class EditListInfoComponent implements OnChanges {

    @Input() listIri: string;
    @Input() currentListInfo: ListInfo;

  constructor() { }

  ngOnChanges() {
  }

}
