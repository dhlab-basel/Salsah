import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Properties, Property} from "../../../../../model/services/ontologycache.service";
import {MatSelectChange} from "@angular/material";
import {AppConfig} from "../../../../../app.config";

@Component({
    selector: 'select-property',
    templateUrl: './select-property.component.html',
    styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {
    @Input()
    set setProperties(value: Properties) {

        this.properties = value;
        this.initProperties();
    }

    properties: Properties;

    propertiesAsArray: Array<Property>;

    constructor() {
    }

    ngOnInit() {

    }

    initProperties() {

        let propsArray = [];

        for (let propIri in this.properties) {

            let prop = this.properties[propIri];

            // only list editable props that are not link value props
            if (prop.isEditable && !prop.isLinkValueProperty) propsArray.push(this.properties[propIri]);
        }

        this.propertiesAsArray = propsArray;
    }

    propertyChosen(change: MatSelectChange) {
        let propIri = change.value;

        let prop: Property = this.properties[propIri];

        //console.log(prop);



    }

}
