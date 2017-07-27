import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Search} from "../../../../model/webapi/knora";

@Component({
  selector: 'salsah-resource-grid-list',
  templateUrl: './resource-grid-list.component.html',
  styleUrls: ['./resource-grid-list.component.scss']
})
export class ResourceGridListComponent implements OnInit {

    selectedRow: number;

    @Input() result: Search = new Search();
    @Input() cols: number = 3;
    @Output() openResource = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    open(id: string, index: number) {
        this.selectedRow = index;
        this.openResource.emit({id, index});
    }

}
