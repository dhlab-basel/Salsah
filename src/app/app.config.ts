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

export class AppConfig {
    public static get API_ENDPOINT(): string { return 'http://localhost:3333/v1'; }
    public static get MEDIA_SERVER(): string { return 'http://localhost:1024/knora'; }

    public static TextValue: string = "http://www.knora.org/ontology/knora-base#TextValue";
    public static IntValue: string = "http://www.knora.org/ontology/knora-base#IntValue";
    public static BooleanValue: string = "http://www.knora.org/ontology/knora-base#BooleanValue";
    public static UriValue: string = "http://www.knora.org/ontology/knora-base#UriValue";
    public static DecimalValue: string = "http://www.knora.org/ontology/knora-base#DecimalValue";
    public static DateValue: string = "http://www.knora.org/ontology/knora-base#DateValue";
    public static ColorValue: string = "http://www.knora.org/ontology/knora-base#ColorValue";
    public static GeomValue: string = "http://www.knora.org/ontology/knora-base#GeomValue";
    public static ListValue: string = "http://www.knora.org/ontology/knora-base#ListValue";
    public static IntervalValue: string = "http://www.knora.org/ontology/knora-base#IntervalValue";
    public static LinkValue: string = "http://www.knora.org/ontology/knora-base#LinkValue";
    public static GeonameValue: string = "http://www.knora.org/ontology/knora-base#GeonameValue";
    public static FileValue: string = "http://www.knora.org/ontology/knora-base#FileValue";
    public static AudioFileValue: string = "http://www.knora.org/ontology/knora-base#AudioFileValue";
    public static DDDFileValue: string = "http://www.knora.org/ontology/knora-base#DDDFileValue";
    public static DocumentFileValue: string = "http://www.knora.org/ontology/knora-base#DocumentFileValue";
    public static StillImageFileValue: string = "http://www.knora.org/ontology/knora-base#StillImageFileValue";
    public static MovingImageFileValue: string = "http://www.knora.org/ontology/knora-base#MovingImageFileValue";
    public static TextFileValue: string = "http://www.knora.org/ontology/knora-base#TextFileValue";
}
