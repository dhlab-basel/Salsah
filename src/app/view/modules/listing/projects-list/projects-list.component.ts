import {Component, OnInit} from '@angular/core';
import {Projects} from "../../../../model/classes/projects";
import {ProjectsService} from "../../../../model/api/projects.service";
import {Router} from "@angular/router";

@Component({
    selector: 'salsah-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

    _isLoading: boolean = true;

    _errorMessage: any = undefined;

    projects: Projects = new Projects();

    constructor(
        private _router: Router,
        private _projectsService: ProjectsService
    ) {
    }

    ngOnInit() {
        this._projectsService.getAllProjects()
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

    openProject(id) {
        console.log(encodeURIComponent(id));
        this._router.navigate(['/project/', id]);

    }

}
