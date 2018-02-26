import {Component, Input, OnChanges} from '@angular/core';
import {ListsService} from '../../../../model/services/lists.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {List, ListInfo, ListNodeInfo} from '../../../../model/webapi/knora';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {StringLiteralV2} from 'app/model/webapi/knora/v2/shared/strings';

@Component({
    selector: 'salsah-edit-list-info',
    templateUrl: './edit-list-info.component.html',
    styleUrls: ['./edit-list-info.component.scss']
})
export class EditListInfoComponent implements OnChanges {

    @Input() listIri: string;
    @Input() currentListInfo: ListInfo;

    errorMessage: string = undefined;
    isLoading: boolean = true;
    public submitted: boolean; // keep track on whether form is submitted

    listInfoErrorMessage: ApiServiceError = undefined;

    // language: string ;
    arrayLength: number;

    public ISOlang: any[] = [{
        label: 'en',
        name: 'english'
    },
    ]


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

    public listInfoForm: FormGroup; // our model driven form


    constructor(private _listsService: ListsService,
                private _fb: FormBuilder) {
    }

    ngOnChanges() {
        console.log('labels: ', this.currentListInfo.labels);
        this.buildListInfoForm();
        this.setLabels(this.currentListInfo.labels);
        this.setComments(this.currentListInfo.comments);
    }

    buildListInfoForm() {
        this.listInfoForm = this._fb.group({
            id: new FormControl({value: this.currentListInfo.id, disabled: true}),
            belongsToProject: [this.currentListInfo.projectIri, Validators.required],
            labels: this._fb.array([]),
            comments: this._fb.array([])
        });

        console.log('iri in form: ', this.currentListInfo.id);
        console.log('list info: ', this.currentListInfo);
        this.isLoading = false;

    }

    get labels(): FormArray {
        return this.listInfoForm.get('labels') as FormArray;
    }

    get comments(): FormArray {
        return this.listInfoForm.get('comments') as FormArray;
    }

    setLabels(labels: StringLiteralV2[]){
        console.log('setLabels: ', labels);
        const labelFGs = labels.map(label => this._fb.group(label));
        const labelFormArray = this._fb.array(labelFGs);
        this.arrayLength = labelFormArray.length;
        this.listInfoForm.setControl('labels', labelFormArray);
    }

    setComments(comments: StringLiteralV2[]){
        console.log('setComments: ', comments);
        const commentFGs = comments.map(comment => this._fb.group(comment));
        const commentFormArray = this._fb.array(commentFGs);
        this.listInfoForm.setControl('comments', commentFormArray);
    }

    buildValueLangGroup(): FormGroup {
        return this._fb.group({
            value: ['', Validators.required],
            language: ['', Validators.required]
        });
    }

    revertListInfo(cList: ListInfo) {
        this.ngOnChanges();
    }

    addLabel() {
        this.labels.push(this.buildValueLangGroup());
    }
    addComment() {
        this.comments.push(this.buildValueLangGroup());
    }

    removeLabel(i: number) {
        this.labels.removeAt(i);
    }
    removeComment(i: number) {
        this.comments.removeAt(i);
    }

    saveListInfo(){
        this.submitted = true; // set form submit to true
        console.log('save:', this.listInfoForm.value);

        this._listsService.updateListInfo(this.listInfoForm.value).subscribe(
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
