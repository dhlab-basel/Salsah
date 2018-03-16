import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-form-test',
    templateUrl: './form-test.component.html',
    styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent implements OnInit {

    userIri: string = 'http://rdfh.ch/users/superuser';
    userName: string = 'root@example.com';
    projectIri: string = 'http://rdfh.ch/projects/77275339';   // incunabula

    constructor() {
    }

    ngOnInit() {
    }

}
