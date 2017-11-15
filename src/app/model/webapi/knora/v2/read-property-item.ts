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
import {OntologyInformation} from "../../../services/ontologycache.service";

/**
 * An abstract interface representing any value object.
 */
export interface ReadPropertyItem {

    /**
     * The value object's Iri.
     */
    readonly id: string;

    /**
     * The value object's type.
     */
    readonly type:string;

    /**
     * The property pointing to the value object.
     */
    readonly propIri:string;

    /**
     * Gets the value object's value.
     *
     * @returns {string}
     */
    getContent:() => string;

    /**
     * Gets the class name of the class that implements this interface.
     *
     * @returns {string}
     */
    getClassName:() => string;
}

/**
 * Represents a text value object without markup (mere character string).
 */
export class ReadTextValueAsString implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly str:string) {

    }

    readonly type = AppConfig.TextValue;

    getContent(): string {
        return this.str;
    };

    getClassName(): string {
        return this.constructor.name;
    }
}

/**
 * Represents resources referred to by standoff links.
 */
export class ReferredResourcesByStandoffLink {
    [index: string]: ReadResource;
}

/**
 * Represents a text value object with markup that has been turned into HTML.
 */
export class ReadTextValueAsHtml implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly html:string, readonly referredResources: ReferredResourcesByStandoffLink) {

    }

    readonly type = AppConfig.TextValue;

    getContent(): string {
        return this.html;
    };

    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    getReferredResourceInfo(resourceIri: string, ontologyInfo: OntologyInformation) {
        if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {

            let resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);

            return this.referredResources[resourceIri].label + ` (${resClassLabel})`;
        } else {
            return "no information found about referred resource (target of standoff link)"
        }
    }

    getClassName():string {
        return this.constructor.name;
    }

}

/**
 * Represents a text value object with markup as XML.
 */
export class ReadTextValueAsXml implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly xml:string, readonly mappingIri:string) {

    }

    readonly type = AppConfig.TextValue;

    getContent(): string {

        // return XML als plain text
        return this.xml;
    };

    getClassName(): string {
        return this.constructor.name;
    }

}

/**
 * Represents a date value object.
 */
export class ReadDateValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly calendar:string, readonly startYear:number, readonly endYear:number, readonly startMonth?:number, readonly endMonth?:number, readonly startDay?:number, readonly endDay?:number) {

    }

    readonly type = AppConfig.DateValue;

    private separator = "-";

    getContent(): string {
        // consider precision

        let startDate:string;

        if (this.startMonth === undefined) {
            // year precision
            startDate = this.startYear.toString();
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
            endDate = this.endYear.toString();
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

    getClassName():string {
        return this.constructor.name;
    }
}

/**
 * Represents a link value object (reification).
 */
export class ReadLinkValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly referredResourceIri: string, readonly referredResource?: ReadResource) {

    }

    readonly type = AppConfig.LinkValue;

    getContent():string {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        } else {
            // TODO: try to find information about the resource identified by the given Iri
            return this.referredResourceIri;
        }
    };

    getReferredResourceInfo(ontologyInfo: OntologyInformation) {
        if (this.referredResource !== undefined) {

            let resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);

            return this.referredResource.label + ` (${resClassLabel})`;
        } else {
            return this.referredResourceIri;
        }
    }

    getClassName():string {
        return this.constructor.name;
    }
}

/**
 * Represents an integer value object.
 */
export class ReadIntegerValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly integer:number) {

    }

    readonly type = AppConfig.IntValue;

    getContent():string {
        return this.integer.toString();
    };

    getClassName():string {
        return this.constructor.name;
    }

}

/**
 * Represents a decimal value object.
 */
export class ReadDecimalValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly decimal:number) {

    }

    readonly type = AppConfig.DecimalValue;

    getContent():string {
        return this.decimal.toString();
    };

    getClassName():string {
        return this.constructor.name;
    }
}

/**
 * Represents a still image value object.
 */
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

    getContent(): string {
        return this.makeIIIFUrl(4);
    };

    getClassName():string {
        return this.constructor.name;
    }
}

/**
 * Represents a color value object.
 */
export class ReadColorValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri, readonly colorHex:string) {

    }

    readonly type = AppConfig.ColorValue;

    getContent(): string {
        return this.colorHex;
    };

    getClassName():string {
        return this.constructor.name;
    }
}

/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
export class Point2D {
  constructor(public x: number, public y: number) {}
}

/**
 * Represents a geometry value parsed from JSON.
 */
export class RegionGeometry {
  constructor(public status: string,
              public lineColor: string,
              public lineWidth: number,
              public points: Point2D[],
              public type: string,
              public radius?: Point2D
            ) {}
}

/**
 * Represents a geometry value object.
 */
export class ReadGeomValue implements ReadPropertyItem {

    constructor(readonly id:string, readonly propIri: string, readonly geometryString:string) {

      let geometryJSON = JSON.parse(geometryString);

      let points: Point2D[] = [];
      for (let point of geometryJSON.points) {
        points.push(new Point2D(point.x, point.y));
      }

      let radius = undefined;
      if (geometryJSON.radius) {
        radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
      }

      this.geometry = new RegionGeometry(
        geometryJSON.status,
        geometryJSON.lineColor,
        geometryJSON.lineWidth,
        points,
        geometryJSON.type,
        radius
      );

    }

    readonly geometry: RegionGeometry;

    readonly type = AppConfig.GeomValue;

    getContent(): string {
        return this.geometryString;
    };

    getClassName():string {
        return this.constructor.name;
    }
}

/**
 * Represents a URI value object.
 */
export class ReadUriValue implements ReadPropertyItem {

    constructor(readonly id: string, readonly propIri: string, readonly uri: string) {

    }

    readonly type = AppConfig.UriValue;

    getContent(): string {
        return `<a href="${this.uri}" target="_blank">${this.uri}</a>`;
    };

    getClassName():string {
        return this.constructor.name;
    }

}

/**
 * Represents a Boolean value object.
 */
export class ReadBooleanValue implements ReadPropertyItem {

    constructor(readonly id: string, readonly propIri: string, readonly bool: boolean) {

    }

    readonly type = AppConfig.BooleanValue;

    getContent(): string {
        return String(this.bool);
    }

    getClassName():string {
        return this.constructor.name;
    }

}

/**
 * Represents an interval value object.
 */
export class ReadIntervalValue implements ReadPropertyItem {

    constructor(readonly id: string, readonly propIri: string, readonly intervalStart: number, readonly intervalEnd: number) {

    }

    readonly type = AppConfig.IntervalValue;

    getContent(): string {
        return String(this.intervalStart) + "-" + String(this.intervalEnd);
    }

    getClassName():string {
        return this.constructor.name;
    }

}

/**
 * Represents an interval value object.
 */
export class ReadListValue implements ReadPropertyItem {

    constructor(readonly id: string, readonly propIri: string, readonly listNodeIri: string) {

    }

    readonly type = AppConfig.ListValue;

    getContent(): string {
        return this.listNodeIri;
    }

    getClassName():string {
        return this.constructor.name;
    }

}
