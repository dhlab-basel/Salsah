import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ListsService} from "../../../../model/services/lists.service";

@Component({
    selector: 'salsah-new-list',
    templateUrl: './new-list.component.html',
    styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

    @Input() listIri: string;

    public newListForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted

    listInfoErrorMessage: ApiServiceError = undefined;

    public editLists: any = {
        label: 'List',
        description: 'Click on the fields to edit',
        list: {
            label: 'Label ',
            project: 'Belongs to project',
            id: 'Id',
            comments: 'Comments ' ,
            nodes: {
                formLabel: 'edit Nodes',
                formDescription: 'click on the fields to edit',
                id: 'Node ID',
                name: 'Node name',
                label: 'Node label',
                children: 'has children',
                childName: 'Child name',
                level: 'Node level',
                position: 'Node position',
            }
        },

        buttons: {
            save: 'Save',
            reset: 'Reset',
            close: 'Close',
            edit: 'Edit',
            skip: 'Skip',
            next: 'Next',
            add: 'Add',
            adNode: 'Add node',
            addChild: 'Add child'
        }
    };


    constructor(private _listsService: ListsService,
                private _fb: FormBuilder) {
    }

    ngOnInit() {
        this.buildListInfoForm();
    }

    buildListInfoForm() {
        this.newListForm = this._fb.group({
            id:'',
            belongsToProject: ['', Validators.required],
            labels: '',
            comments: ''
        });
    }

    saveListInfo(){
        this.submitted = true; // set form submit to true
        console.log('save:', this.newListForm.value);

        this._listsService.updateListInfo(this.newListForm.value).subscribe(
            (result: any) => {
                console.log(result);
            },
            (error: ApiServiceError) => {
                console.log(error);
                this.listInfoErrorMessage = error;
            }
        );

    }

}
