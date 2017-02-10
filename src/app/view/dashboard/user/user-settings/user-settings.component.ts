import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../../model/api/session.service";

@Component({
  selector: 'salsah-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(
      private _session: SessionService
  ) { }

  ngOnInit() {
      this._session.checkAuth(true);

  }

}
