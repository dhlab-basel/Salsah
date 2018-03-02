import {Component, OnInit} from '@angular/core';
import {AutocompleteItem} from '../../../../../app.interfaces';

@Component({
    selector: 'salsah-select-group',
    templateUrl: './select-group.component.html',
    styleUrls: ['./select-group.component.scss']
})
export class SelectGroupComponent implements OnInit {

    // permission groups / role of the user in a project
    listOfGroups: AutocompleteItem[] = [
        {
            iri: '',
            name: '',
            label: 'Member'
        },
        {
            iri: '',
            name: '',
            label: 'Administrator'
        },
        {
            iri: '',
            name: '',
            label: 'System admin'
        }

    ];

    constructor() {
    }

    ngOnInit() {
    }

}
