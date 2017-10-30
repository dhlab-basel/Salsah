import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Property} from "../../../../../model/services/ontologycache.service";
import {MatSelectChange} from "@angular/material";

@Component({
    selector: 'select-property',
    templateUrl: './select-property.component.html',
    styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
    @Input() properties: Array<Property>;

    @Output() property = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    propertyChosen(change: MatSelectChange) {
        this.property.emit(change.value);

    }

}
