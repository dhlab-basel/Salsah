import {Component, OnInit} from '@angular/core';
import {AutocompleteItem} from '../../../../../app.interfaces';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'salsah-user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

    // in case of an API error
    errorMessage: any;

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;

    userRoleForm: FormGroup;


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
