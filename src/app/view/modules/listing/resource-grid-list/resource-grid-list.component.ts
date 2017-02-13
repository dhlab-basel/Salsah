import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Search} from "../../../../model/classes/search";

@Component({
  selector: 'salsah-resource-grid-list',
  templateUrl: './resource-grid-list.component.html',
  styleUrls: ['./resource-grid-list.component.css']
})
export class ResourceGridListComponent implements OnInit {

    @Input() result: Search = new Search();
    @Input() cols: number = 3;
    @Output() openResource = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    open(id: string) {
        this.openResource.emit(id);
    }

}
