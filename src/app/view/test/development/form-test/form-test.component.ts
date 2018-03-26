import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-form-test',
    templateUrl: './form-test.component.html',
    styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent implements OnInit {

    userIri: string = 'http://rdfh.ch/users/root';
    projectIri: string = 'http://rdfh.ch/projects/00FF';   // images

    constructor() {
    }

    ngOnInit() {
    }

}
