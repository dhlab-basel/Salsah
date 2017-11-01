import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Properties, Property} from "../../../../../model/services/ontologycache.service";
import {MatSelectChange} from "@angular/material";

@Component({
    selector: 'select-property',
    templateUrl: './select-property.component.html',
    styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
    @Input() properties: Properties;

    propertiesAsArray: Array<Property>;

    //@Output() property = new EventEmitter<string>();

    selectedProperty: Property;

    constructor() {
    }

    ngOnInit() {
        this.propsArray();
    }

    ngOnChange() {
        this.propsArray();
    }

    propsArray() {
        let propsArray = [];

        for (let propIri in this.properties) {
            propsArray.push(this.properties[propIri]);
        }

        this.propertiesAsArray = propsArray;
    }

    propertyChosen(change: MatSelectChange) {
        //this.property.emit(change.value);

        let propIri = change.value;
        console.log(propIri);

    }

}
