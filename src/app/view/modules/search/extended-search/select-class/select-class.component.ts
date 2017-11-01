import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {MatSelectChange} from "@angular/material";
import {ResourceClass} from "../../../../../model/services/ontologycache.service";

@Component({
    selector: 'select-class',
    templateUrl: './select-class.component.html',
    styleUrls: ['./select-class.component.scss']
})
export class SelectClassComponent implements OnInit {
    @Input() set setResourceClasses(value: Array<ResourceClass>) {
        this.resourceClasses = value;
    };

    resourceClasses: Array<ResourceClass>;

    @Output() resourceClass = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    resourceClassChosen(change: MatSelectChange) {
        this.resourceClass.emit(change.value);

    }

}
