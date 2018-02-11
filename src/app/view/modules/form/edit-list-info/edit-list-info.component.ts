import {Component, Input, OnChanges} from '@angular/core';
import {List, ListInfo, ListNodeInfo} from '../../../../model/webapi/knora';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {StringV2} from 'app/model/webapi/knora/v2/shared/strings';


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

    // language: string ;
    arrayLength: number;

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
            addNode: 'Add node',
            addChild: 'Add child'
        }
    };

    public listInfoForm: FormGroup; // our model driven form


    constructor(private _fb: FormBuilder) {
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

    setLabels(labels: StringV2[]){
        console.log('setLabels: ', labels);
        const labelFGs = labels.map(label => this._fb.group(label));
        const labelFormArray = this._fb.array(labelFGs);
        this.arrayLength = labelFormArray.length;
        this.listInfoForm.setControl('labels', labelFormArray);
        // this.language = labelFormArray.get('language').value;
        // console.log('this.language: ', this.language);
    }
    setComments(comments: StringV2[]){
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

    // setLanguage(){
    //     this.language = this.currentListInfo.labels[this.arrayLength].language;
    //     return this.language;
    //     console.log(this.language);
    // }

    revertListInfo(cList: ListInfo) {
        this.ngOnChanges();
    }

    addLabel() {
        this.labels.push(this.buildValueLangGroup());
    }

    addComment() {
        this.comments.push(this.buildValueLangGroup());
    }
    saveListInfo(listInfo: ListInfo){
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log('save:', listInfo);
    }

}
