import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {UserFormComponent} from "../../../modules/form/user-form/user-form.component";

@Component({
  selector: 'salsah-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit {

    position = {
        preview: 'left',        // top
        properties: 'right'       // bottom
    };

    size: string = 'large';

  constructor(
      public dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  addNewUser() {
    let dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

}
