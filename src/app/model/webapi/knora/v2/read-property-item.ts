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

import {AppConfig} from "../../../../app.config";
import {ReadResource} from "./read-resource";
import {escape} from "querystring";

export interface ReadPropertyItem {

    readonly id: string;

    readonly type:string;

    readonly propIri:string;

    toHtml:() => string;
}

export class ReadTextValueAsString implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly str:string) {

    }

    readonly type = AppConfig.TextValue;

    public toHtml = function(): string {

        return this.str;
    };

}


export class ReadTextValueAsHtml implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly html:string) {

    }

    readonly type = AppConfig.TextValue;

    public toHtml = function(): string {
        return this.html;
    };

}

export class ReadTextValueAsXml implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly xml:string, readonly mappingIri:string) {

    }

    readonly type = AppConfig.TextValue;

    public toHtml = function(): string {

        // return XML als plain text (escape markup)
        return escape(this.xml);
    };

}

export class ReadDateValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly calendar:string, readonly startYear:number, readonly endYear:number, readonly startMonth?:number, readonly endMonth?:number, readonly startDay?:number, readonly endDay?:number) {

    }

    readonly type = AppConfig.DateValue;

    private separator = "-";

    public toHtml = function(): string {
        // consider precision

        let startDate:string;

        if (this.startMonth === undefined) {
            // year precision
            startDate = this.startYear;
        } else if (this.startDay === undefined) {
            // month precision
            startDate = this.startYear + this.separator + this.startMonth
        } else {
            // day precision
            startDate = this.startYear + this.separator + this.startMonth + this.separator + this.startDay;
        }

        let endDate:string;

        if (this.endMonth === undefined) {
            // year precision
            endDate = this.endYear;
        } else if (this.endDay === undefined) {
            // month precision
            endDate = this.endYear + this.separator + this.endMonth
        } else {
            // day precision
            endDate = this.endYear + this.separator + this.endMonth + this.separator + this.endDay;
        }

        if (startDate == endDate) {
            return this.calendar + ":" + startDate
        } else {
            return this.calendar + ":" + startDate + this.separator + endDate;
        }
    };
}

export class ReadLinkValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly referredResourceIri: string, readonly referredResource?: ReadResource) {

    }

    readonly type = AppConfig.LinkValue;

    public toHtml = function():string {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        } else {
            // TODO: try to find information about the resource identified by the given Iri
            return this.referredResourceIri;
        }
    }

}

export class ReadIntegerValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly integer:number) {

    }

    readonly type = AppConfig.IntValue;

    public toHtml = function():string {
        return this.integer;
    }


}

export class ReadDecimalValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly decimal:number) {

    }

    readonly type = AppConfig.DecimalValue;

    public toHtml = function():string {
        return this.decimal;
    }


}

export class ReadStillImageFileValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly imageFilename:string, readonly imageServerIIIFBaseURL:string, readonly imagePath: string, readonly dimX:number, readonly dimY:number, isPreview?: boolean) {

        this.isPreview = isPreview === undefined ? false : isPreview;

    }

    readonly type = AppConfig.StillImageFileValue;

    readonly isPreview: boolean;

    private makeIIIFUrl = function(reduceFactor:number):string {

        if (this.isPreview) {
            return this.imagePath;
        } else {
            let percentage = Math.floor(100 / reduceFactor);

            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;

            return this.imageServerIIIFBaseURL + "/" + this.imageFilename + "/full/pct:" + percentage.toString() + "/0/default.jpg";
        }

    };

    public toHtml = function(): string {
        return '<img src="' + this.makeIIIFUrl(4) + '"/>';
    }

}
