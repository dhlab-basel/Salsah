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

    public static KnoraBase: string = 'http://www.knora.org/ontology/knora-base';

    public static SystemProject: string = AppConfig.KnoraBase + '#SystemProject';
    public static SystemAdminGroup: string = AppConfig.KnoraBase + '#SystemAdmin';
    public static ProjectAdminGroup: string = AppConfig.KnoraBase + '#ProjectAdmin';
    public static ProjectMemberGroup: string = AppConfig.KnoraBase + '#ProjectMember';

    public static KnoraApi: string = 'http://api.knora.org/ontology/knora-api';

    public static PathSeparator = '#';

    public static KnoraApiV2WithValueObjectPath: string =  AppConfig.KnoraApi + '/v2' + AppConfig.PathSeparator;

    public static hasOntologies = AppConfig.KnoraApiV2WithValueObjectPath + 'hasOntologies';
    public static hasOntologiesWithClasses = AppConfig.KnoraApiV2WithValueObjectPath + 'hasOntologiesWithClasses';

    public static hasClasses: string = AppConfig.KnoraApiV2WithValueObjectPath + 'hasClasses';

    public static hasProperties: string = AppConfig.KnoraApiV2WithValueObjectPath + 'hasProperties';

    public static isEditable: string = AppConfig.KnoraApiV2WithValueObjectPath + 'isEditable';
    public static isLinkProperty: string = AppConfig.KnoraApiV2WithValueObjectPath + 'isLinkProperty';
    public static isLinkValueProperty: string = AppConfig.KnoraApiV2WithValueObjectPath + 'isLinkValueProperty';


    public static ResourceIcon: string = AppConfig.KnoraApiV2WithValueObjectPath + 'resourceIcon';

    public static OwlOnProperty: string = 'http://www.w3.org/2002/07/owl#onProperty';
    public static OwlMaxCardinality: string = 'http://www.w3.org/2002/07/owl#maxCardinality';
    public static OwlMinCardinality: string = 'http://www.w3.org/2002/07/owl#minCardinality';
    public static OwlCardinality: string = 'http://www.w3.org/2002/07/owl#cardinality';
    public static ObjectType = AppConfig.KnoraApiV2WithValueObjectPath + 'objectType';
    public static OwlRestriction = 'http://www.w3.org/2002/07/owl#Restriction';

    public static creationDate = AppConfig.KnoraApiV2WithValueObjectPath + 'creationDate';
    public static hasPermissions = AppConfig.KnoraApiV2WithValueObjectPath + 'hasPermissions';

    public static Region = AppConfig.KnoraApiV2WithValueObjectPath + 'Region';

    public static TextValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'TextValue';
    public static IntValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'IntValue';
    public static BooleanValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'BooleanValue';
    public static UriValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'UriValue';
    public static DecimalValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'DecimalValue';
    public static DateValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'DateValue';
    public static ColorValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'ColorValue';
    public static GeomValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'GeomValue';
    public static ListValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'ListValue';
    public static IntervalValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'IntervalValue';
    public static LinkValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'LinkValue';
    public static GeonameValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'GeonameValue';
    public static FileValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'FileValue';
    public static AudioFileValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'AudioFileValue';
    public static DDDFileValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'DDDFileValue';
    public static DocumentFileValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'DocumentFileValue';
    public static StillImageFileValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'StillImageFileValue';
    public static MovingImageFileValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'MovingImageFileValue';
    public static TextFileValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'TextFileValue';

    public static ReadTextValueAsHtml: string = 'ReadTextValueAsHtml';
    public static ReadTextValueAsString: string = 'ReadTextValueAsString';
    public static ReadTextValueAsXml: string = 'ReadTextValueAsXml';
    public static ReadDateValue: string = 'ReadDateValue';
    public static ReadLinkValue: string = 'ReadLinkValue';
    public static ReadIntegerValue: string = 'ReadIntegerValue';
    public static ReadDecimalValue: string = 'ReadDecimalValue';
    public static ReadStillImageFileValue: string = 'ReadStillImageFileValue';
    public static ReadGeomValue: string = 'ReadGeomValue';
    public static ReadColorValue: string = 'ReadColorValue';
    public static ReadUriValue: string = 'ReadUriValue';
    public static ReadBooleanValue: string = 'ReadBooleanValue';
    public static ReadIntervalValue: string = 'ReadIntervalValue';
    public static ReadListValue: string = 'ReadListValue';

    public static valueAsString: string = AppConfig.KnoraApiV2WithValueObjectPath + 'valueAsString';

    public static textValueAsHtml: string = AppConfig.KnoraApiV2WithValueObjectPath + 'textValueAsHtml';
    public static textValueAsXml: string = AppConfig.KnoraApiV2WithValueObjectPath + 'textValueAsXml';
    public static textValueHasMapping: string = AppConfig.KnoraApiV2WithValueObjectPath + 'textValueHasMapping';

    public static hasStandoffLinkToValue: string = AppConfig.KnoraApiV2WithValueObjectPath + 'hasStandoffLinkToValue';

    public static dateValueHasStartYear: string = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasStartYear';
    public static dateValueHasEndYear: string = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasEndYear';
    public static dateValueHasStartEra: string = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasStartEra';
    public static dateValueHasEndEra: string = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasEndEra';
    public static dateValueHasStartMonth = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasStartMonth';
    public static dateValueHasEndMonth = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasEndMonth';
    public static dateValueHasStartDay = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasStartDay';
    public static dateValueHasEndDay = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasEndDay';
    public static dateValueHasCalendar = AppConfig.KnoraApiV2WithValueObjectPath + 'dateValueHasCalendar';

    public static linkValueHasTarget = AppConfig.KnoraApiV2WithValueObjectPath + 'linkValueHasTarget';
    public static linkValueHasTargetIri = AppConfig.KnoraApiV2WithValueObjectPath + 'linkValueHasTargetIri';

    public static integerValueAsInteger = AppConfig.KnoraApiV2WithValueObjectPath + 'intValueAsInt';

    public static decimalValueAsDecimal = AppConfig.KnoraApiV2WithValueObjectPath + 'decimalValueAsDecimal';

    public static fileValueAsUrl = AppConfig.KnoraApiV2WithValueObjectPath + 'fileValueAsUrl';
    public static fileValueIsPreview = AppConfig.KnoraApiV2WithValueObjectPath + 'fileValueIsPreview';
    public static fileValueHasFilename = AppConfig.KnoraApiV2WithValueObjectPath + 'fileValueHasFilename';

    public static hasStillImageFileValue = AppConfig.KnoraApiV2WithValueObjectPath + 'hasStillImageFileValue';

    public static stillImageFileValueHasDimX = AppConfig.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimX';
    public static stillImageFileValueHasDimY = AppConfig.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimY';
    public static stillImageFileValueHasIIIFBaseUrl = AppConfig.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasIIIFBaseUrl';

    public static colorValueAsColor = AppConfig.KnoraApiV2WithValueObjectPath + 'colorValueAsColor';
    public static geometryValueAsGeometry = AppConfig.KnoraApiV2WithValueObjectPath + 'geometryValueAsGeometry';
    public static uriValueAsUri = AppConfig.KnoraApiV2WithValueObjectPath + 'uriValueAsUri';
    public static booleanValueAsBoolean = AppConfig.KnoraApiV2WithValueObjectPath + 'booleanValueAsBoolean';

    public static intervalValueHasStart = AppConfig.KnoraApiV2WithValueObjectPath + 'intervalValueHasStart';
    public static intervalValueHasEnd = AppConfig.KnoraApiV2WithValueObjectPath + 'intervalValueHasEnd';

    public static hierarchicalListValueAsListNode = AppConfig.KnoraApiV2WithValueObjectPath + 'hierarchicalListValueAsListNode';

    public static hasGeometry = AppConfig.KnoraApiV2WithValueObjectPath + 'hasGeometry';

    public static schemaName = 'http://schema.org/name';
    public static schemaNumberOfItems = 'http://schema.org/numberOfItems';
    public static schemaItemListElement = 'http://schema.org/itemListElement';

    public static RdfsLabel = 'http://www.w3.org/2000/01/rdf-schema#label';
    public static RdfsComment = 'http://www.w3.org/2000/01/rdf-schema#comment';
    public static RdfsSubclassOf = 'http://www.w3.org/2000/01/rdf-schema#subClassOf';
    public static subPropertyOf: string = 'http://www.w3.org/2000/01/rdf-schema#subPropertyOf';

    public static SalsahLink = 'salsah-link';

    public static EqualsComparisonOperator = "=";
    public static EqualsComparisonLabel = "Equals";

    public static NotEqualsComparisonOperator = "!=";
    public static NotEqualsComparisonLabel = "Not_Equals";

    public static GreaterThanComparisonOperator = ">";
    public static GreaterThanComparisonLabel = "Greater_Than";

    public static GreaterThanEqualsComparisonOperator = ">";
    public static GreaterThanEqualsComparisonLabel = "Greater_Than";

    public static LessThanComparisonOperator = "<=";
    public static LessThanComparisonLabel = "Less_Than_Equals";

    public static LessThanEqualsComparisonOperator = "<=";
    public static LessThanQualsComparisonLabel = "Less_Than_Equals";

    public static ExistsComparisonOperator = "E";
    public static ExistsComparisonLabel = "Exists";

    public static GNDPrefix = "(DE-588)";
    public static GNDResolver = "http://d-nb.info/gnd/";

    public static VIAFPrefix = "(VIAF)";
    public static VIAFResolver = "https://viaf.org/viaf/";

}
