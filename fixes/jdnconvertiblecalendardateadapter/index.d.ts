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

import {NgModule} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DATE_LOCALE_PROVIDER} from '@angular/material';
import {MAT_JDN_DATE_FORMATS} from 'jdnconvertiblecalendardateadapter/dist/JDNConvertibleCalendar-date-formats';
import {JDNConvertibleCalendarDateAdapter} from 'jdnconvertiblecalendardateadapter';

@NgModule({
    providers: [
        MAT_DATE_LOCALE_PROVIDER,
        {provide: DateAdapter, useClass: JDNConvertibleCalendarDateAdapter, deps: [MAT_DATE_LOCALE]}
    ]
})
export declare class JDNConvertibleCalendarDateAdapterModule {
}

@NgModule({
    imports: [JDNConvertibleCalendarDateAdapterModule],
    providers: [{provide: MAT_DATE_FORMATS, useValue: MAT_JDN_DATE_FORMATS}],
})
export declare class MatJDNConvertibleCalendarDateAdapterModule {
}
export { JDNConvertibleCalendarDateAdapter } from './JDNConvertibleCalendarDateAdapter';
