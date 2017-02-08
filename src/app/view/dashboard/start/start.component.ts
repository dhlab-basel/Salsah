import {Component, OnInit} from '@angular/core';
import {Projects} from "../../../model/classes/projects";
import {ProjectsService} from "../../../model/api/projects.service";

@Component({
    selector: 'salsah-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

    public _isLoading: boolean = true;

    private _errorMessage: any = undefined;

    public projects: Projects = new Projects();


    constructor(private _projects: ProjectsService) {
    }

    ngOnInit() {
        this._projects.getAllProjects()
            .subscribe(
                (data: Projects) => {
                    this.projects = data;
                    this._isLoading = false;
                },
                error => {
                    this._errorMessage = <any>error;
                }
            );
    }

}
