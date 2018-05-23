import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'salsah-object-viewer',
    templateUrl: './object-viewer.component.html',
    styleUrls: ['./object-viewer.component.scss']
})
export class ObjectViewerComponent implements OnInit {

    resIri: string;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.resIri = params['rid'];
        });
    }

}
