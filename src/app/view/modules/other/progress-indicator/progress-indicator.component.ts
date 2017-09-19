import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {

    @Input() type?: string;
    @Input() status?: number;

    done: boolean = false;

    constructor() {

    }

    ngOnInit() {
        if (this.status !== undefined) {
            // developer test
//            this.refresh();
        }
    }

    // only for developers to test the component
    toggleLoader() {
        this.done = !this.done;
    }

    refresh() {
        setTimeout(() => {
            // Do Something Here
            if (this.status === 1) {
                this.status -= 2;
            } else {
                this.status ++;
            }
            // Then recall the parent function to
            // create a recursive loop.
            this.refresh();
        }, 1000);

    }

}
