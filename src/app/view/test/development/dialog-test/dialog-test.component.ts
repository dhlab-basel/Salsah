import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConfirmDialogComponent} from '../../../modules/dialog/confirm-dialog/confirm-dialog.component';
import {MessageDialogComponent} from '../../../modules/dialog/message-dialog/message-dialog.component';
import {MessageData} from '../../../modules/message/message.component';
import {ObjectDialogComponent} from '../../../modules/dialog/object-dialog/object-dialog.component';

@Component({
    selector: 'salsah-dialog-test',
    templateUrl: './dialog-test.component.html',
    styleUrls: ['./dialog-test.component.scss']
})
export class DialogTestComponent implements OnInit {

    iri: string = 'http://data.knora.org/18a671b8a601';

    constructor(private _dialog: MatDialog) {
    }

    ngOnInit() {

        /*
        setTimeout(() => {
            // start with object dialog
            this.openObjectDialog(this.iri);
        }, 1000);
        */


    }

    openMessageDialog() {
        const config: MatDialogConfig = new MatDialogConfig();

        const message: MessageData = {
            status: 0,
            statusMsg: 'status message',
            statusText: 'A longer status Text: This MessageDialogComponent contains the MessageComponent, which has a predefined message structure and is used for error messages.',
            route: 'http://route-were-the-error-happend.com'
        };

        config.data = {
            message: message
        };

        const dialogRef = this._dialog.open(MessageDialogComponent, config);
    }

    openConfirmDialog(confirm: boolean = false) {

        const message = (confirm ? 'You\'re sure?' : 'Everything\'s fine! Have a nice day');

        const config: MatDialogConfig = new MatDialogConfig();
        config.data = {
            title: message,
            confirm: confirm
        };

        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);
    }

    openObjectDialog(iri: string) {

        const config: MatDialogConfig = new MatDialogConfig();

        config.data = {
            iri: iri
        };

        config.panelClass = 'resizable';

        const dialogRef = this._dialog.open(ObjectDialogComponent, config);
    }

}
