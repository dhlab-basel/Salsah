import { Component, OnInit } from '@angular/core';

import {UserProfileDialogComponent} from '../../../modules/dialog/user-profile-dialog/user-profile-dialog.component';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'salsah-system-projects',
  templateUrl: './system-projects.component.html',
  styleUrls: ['./system-projects.component.scss']
})
export class SystemProjectsComponent implements OnInit {

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openProject() {
    let dialogRef = this.dialog.open(UserProfileDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
