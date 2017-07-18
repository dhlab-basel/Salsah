import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../model/webapi/knora/v1/projects/project';
import {ListInfo} from '../../../../model/webapi/knora/v1/lists/list-info';
import {Router} from '@angular/router';
import {ListsService} from '../../../../model/services/lists.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';

@Component({
  selector: 'salsah-project-lists-admin',
  templateUrl: './project-lists-admin.component.html',
  styleUrls: ['./project-lists-admin.component.scss']
})
export class ProjectListsAdminComponent implements OnInit {

    @Input('projects') projects: Project[];
    @Input('listTitle') title: string;

    isLoading = true;
    isLoadingSubModule = true;
    errorMessage: any = undefined;

    selectedRow: number;

    project: Project = new Project;

    projectLists: ListInfo[] = [];
    systemLists: ListInfo[] = [];

    size = 'large';

    addList = false;
    editList = false;

    listIri: string;

    constructor(
        private _router: Router,
        private _listsService: ListsService
    ) {
    }

    ngOnInit() {

        this.project = JSON.parse(localStorage.getItem('currentProject'));

        // get all project lists
        this._listsService.getLists(this.project.id)
            .subscribe(
                (lists: ListInfo[]) => {
                    console.log(lists);
                    this.projectLists = lists;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        // get all system lists
        this._listsService.getLists('http://www.knora.org/ontology/knora-base#SystemProject')
            .subscribe(
                (lists: ListInfo[]) => {
                    console.log(lists);
                    this.systemLists = lists;
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    openList(id: string, index: number) {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;
        this.editList = true;
        this.addList = false;

        this.listIri = id;
        this.isLoadingSubModule = false;
    }

    createList() {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;
        this.selectedRow = undefined;

        this.addList = true;
        this.editList = false;
        this.isLoadingSubModule = false;


        /*
         let dialogRef = this.dialog.open(ResourceClassFormComponent);
         dialogRef.afterClosed().subscribe(result => {
         this.selectedOption = result;
         });
         */
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.editList = false;
        this.addList = false;
    }

    loadingSubmodule(loaded: boolean) {
        console.log(loaded);
        this.isLoadingSubModule = loaded;
    }


}
