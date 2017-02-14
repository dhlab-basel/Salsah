import { Component, OnInit } from '@angular/core';
import {ProjectItem} from "../../../../model/classes/projects";

@Component({
  selector: 'salsah-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

    project: ProjectItem = new ProjectItem;


  constructor() { }

  ngOnInit() {
      this.project = JSON.parse(localStorage.getItem('project'));
  }

}
