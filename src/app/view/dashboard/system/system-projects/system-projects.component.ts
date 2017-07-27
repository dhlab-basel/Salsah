import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';

@Component({
    selector: 'salsah-system-projects',
    templateUrl: './system-projects.component.html',
    styleUrls: ['./system-projects.component.scss']
})
export class SystemProjectsComponent implements OnInit {

    title: string = 'All projects in Knora';
    list: string = 'project';

    add: any = {
        title: 'Add new project',
        description: 'What does add mean? (add.description)'
    };

    constructor(public dialog: MdDialog) {
    }

    ngOnInit() {
    }



}
