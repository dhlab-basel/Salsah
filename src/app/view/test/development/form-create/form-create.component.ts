import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormDialogComponent} from '../../../modules/dialog/form-dialog/form-dialog.component';
import {MessageData} from '../../../modules/message/message.component';
import {MessageDialogComponent} from '../../../modules/dialog/message-dialog/message-dialog.component';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'salsah-form-create',
    templateUrl: './form-create.component.html',
    styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {

    form: string;

    existingForms: string[] = [
        'project',
        'user',
        'resource-type'
    ];

    constructor(private _title: Title,
                private _route: ActivatedRoute,
                private _dialog: MatDialog) {
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {

            this.form = params['name'];

            this._title.setTitle( 'Developer environment | Test ' + this.form + ' form');

            setTimeout(this.open(this.form), 1000);
//            this.open(this.form);

        });
    }

    open(form: string) {
        let dialogRef;
        const restrictedBy: string = undefined;
        switch (form) {
            case 'user':
            case 'project':
            case 'resource-type':
//                restrictedBy = 'http://data.knora.org/projects/77275339';
                dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
                    data: {
                        title: 'Test ' + form + ' form',
                        description: 'Create new',
                        form: form,
                        restriction: restrictedBy
                    }
                });
                break;

            default:
                console.log('Doesn\'t exist');
                const message: MessageData = {
                    status: 204,
                    statusMsg: 'Not yet implemented',
                    statusText: 'TODO: add the list type "' + form + '" to the openNew method in FrameworkForListings',
                    route: 'Missing form name: ' + form
                };
                dialogRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{
                    data: {
                        message: message
                    }
                });
        }
    }

    refresh(): void {
        window.location.reload();
    }

}
