import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    isLoading: boolean = true;

    menu: any = [
        {
            name: 'Profile',
            path: 'profile'
        },
        {
            name: 'Projects',
            path: 'projects'
        },
        {
            name: 'Collections',
            path: 'collections'
        }

    ];

    constructor() {
    }

    ngOnInit() {
    }

}
