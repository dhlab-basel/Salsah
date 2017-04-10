/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from './api.service';

import {Session, UserProfile} from '../webapi/knora';


function getDocument(): any {
    return document;
}

@Injectable()
export class SessionService extends ApiService {

    getSession(): Observable<any> {
        return this.httpGet('/session');
    }


    /**
     * returns if the session is valid or not;
     *
     * @param session
     * @param deny
     * @returns {boolean}
     */
    checkSession(session: Session, deny = false): any {

        let activeSession: boolean;
        if (session.status === 0) { //} && session.userProfile.userData.isActiveUser) {
            // the session is valid and a user is authenticated by the api server
            // get the local stored profile of the user and compare it with the session values
            let userProfile: UserProfile = JSON.parse(localStorage.getItem('ownProfile'));

            if (userProfile === null) {
                // the ownProfile (logged in user data) is not set locally or seems to be wrong
                // we have to create it now; normally it will be set by the login process
                localStorage.setItem('ownProfile', JSON.stringify(session.userProfile));
            }
            else {
                if (userProfile.userData.user_id !== session.userProfile.userData.user_id) {
                    localStorage.setItem('ownProfile', JSON.stringify(session.userProfile));
                }
            }
            // the session is valid and the user profile is stored in the local storage
            activeSession = true;
//            console.log('session service; checkSession = ' + activeSession);
        }
        else {
            // the session is not valid!
            // remove the local stored user profile and return false
            console.log('The session is not valid');
            localStorage.removeItem('ownProfile');
            getDocument().cookie = "sid=;expires=-1";
            getDocument().cookie = "KnoraAuthentication=;expires=-1";
            if(deny === true) this.goToLogin();
            activeSession = false;
//            console.log('session service; checkSession = ' + activeSession);
        }

        return activeSession;
    }

    /**
     *
     * @param deny (access to the page) if true: go to the login page
     * @returns {Authenticate}
     */
    checkAuth(deny = false): any {
        /*
         let user: User = JSON.parse(localStorage.getItem('ownProfile'));
         let session: Session = new Session();




         if(session.status === 0) {

         // proof if the user's profile in local storage (ownProfile) has the same values
         if(user !== null && session.userProfile.userData === user.userProfile.userData ) {
         // session and userData are correct and the same! everything is fine
         return true;
         }
         else {

         }
         }
         else {
         // there's no authenticated user; the session is not valid
         // remove the local storage item called 'ownProfile' if exists
         localStorage.removeItem('ownProfile');
         return false;

         }




         if (user === null && deny === true) {
         this.goToLogin();
         }
         else {
         //            return user;
         }
         */
    }


    goToLogin(): any {
        let goToUrl: string = '/login';

//        if (this._router.url !== '/') goToUrl += '?h=' + encodeURIComponent(this._router.url);

        window.location.replace(goToUrl);
    }

}
