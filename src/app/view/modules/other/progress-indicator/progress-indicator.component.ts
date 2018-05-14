import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {

    /**
     * status is a number
     * - not ready:    -1
     * - loading:       0
     * - done:          1
     *
     * - error:       400
     */
    @Input() status?: number;

    constructor() {
    }

    ngOnInit() {
    }

}
