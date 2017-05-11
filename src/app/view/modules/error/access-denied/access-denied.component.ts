/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'salsah-access-denied',
  templateUrl: 'access-denied.component.html',
  styleUrls: ['access-denied.component.scss']
})

/**
 * A simple 403 access denied message
 */
export class AccessDeniedComponent implements OnInit {

  goToLocation: any = {
    root: '/',
    login: '/login',
    back: ''
  };

  constructor(
      private _location: Location
  ) { }

  ngOnInit() {
    this.goToLocation.back = this._location.back();
  }

}
