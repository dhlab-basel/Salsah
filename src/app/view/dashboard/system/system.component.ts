import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../../../model/webapi/knora/";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'salsah-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  errorMessage: any = undefined;
  isLoading: boolean = true;

  userProfile: UserProfile = new UserProfile();

  public menu: any = [
    {
      name: 'Users',
      route: 'users'
    },
    {
      name: 'Projects',
      route: 'projects'
    },
    {
      name: 'Ontologies',
      route: 'ontologies'
    }
  ];

  constructor(private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    // is there a logged in user?
    let loggedInUser = JSON.parse(localStorage.getItem('ownProfile'));
    this.userProfile = (loggedInUser !== null ? loggedInUser : new UserProfile());

    // if a user isn't logged in, go to the /login page
    // if a user is logged in, but he's not a sys admin, deny the access
    if(this.userProfile.userData == undefined) {
      // there's no logged-in user and the route doesn't match a user id (uid)

      // go to the login page and bring the user back to this page after successful login and if the user is a sys admin
/*
      let goToUrl: string = '/login';
      if (this._router.url !== '/') goToUrl += '?h=' + encodeURIComponent(this._router.url);
//      this._router.navigateByUrl(goToUrl);
      window.location.replace(goToUrl);
*/
    }
    else {

      // TODO: the following if/else construct doesn't work yet because of a wrong implementation from the knora side
      // at the moment (2017-07-19) everyone is allowed to see the system page ...
      /*
      if (this.userProfile.isSystemUser) {
        // the user is a sys admin and has the right to see and to do something
      }
      else {
        // access is still denied
        this._router.navigateByUrl('/denied');
      }
      */

    }

    this.isLoading = false;

  }

}
