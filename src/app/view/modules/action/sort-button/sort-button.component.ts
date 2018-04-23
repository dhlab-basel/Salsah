import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'salsah-sort-button',
    templateUrl: './sort-button.component.html',
    styleUrls: ['./sort-button.component.scss']
})
export class SortButtonComponent implements OnInit {

    activeKey: string;

    @Input() sortProps: any;

    @Output() sortKeyChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() sortKey(value) {
        this.activeKey = value;
    }

    constructor() {
    }

    ngOnInit() {

    }

    sortBy(key: string) {
        this.sortKeyChange.emit(key);
    }

}
