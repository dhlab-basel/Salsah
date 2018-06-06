/*
 * Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
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
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {IAppConfig} from './app-config.model';

@Injectable()
export class AppConfig {

    static settings: IAppConfig;

    constructor(private http: HttpClient) { }

    loadAppConfig() {
        console.log('AppSettings ...');
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return this.http.get(jsonFile)
            .toPromise()
            .then(data => {
                AppConfig.settings = <IAppConfig>data;
            });
    }
}
