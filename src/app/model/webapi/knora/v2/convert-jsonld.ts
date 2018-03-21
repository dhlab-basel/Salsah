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

import {ReadResourcesSequence} from "./read-resources-sequence";
import {ReadResource} from "./read-resource";
import {ReadProperties} from "./read-properties";
import {
    ReadBooleanValue,
    ReadColorValue,
    ReadDateValue,
    ReadDecimalValue,
    ReadGeomValue,
    ReadIntegerValue, ReadIntervalValue,
    ReadLinkValue, ReadListValue,
    ReadPropertyItem,
    ReadStillImageFileValue,
    ReadTextValueAsHtml,
    ReadTextValueAsString,
    ReadTextValueAsXml, ReadUriValue,
    ReferredResourcesByStandoffLink
} from "./read-property-item";
import {AppConfig} from "../../../../app.config";
import {Utils} from "../../../../utils";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

export module ConvertJSONLD {

    /**
     * Construct a [[ReadResource]] from JSON-LD.
     *
     * @param resourceJSONLD an object describing the resource and its properties.
     * @param properties    a [[ReadProperties]] describing the resource's properties. if any.
     * @returns a [[ReadResource]]
     */
    function constructReadResource(resourceJSONLD: Object): ReadResource {

        let properties: ReadProperties = constructReadProperties(resourceJSONLD);

        return new ReadResource(
            resourceJSONLD['@id'],
            resourceJSONLD['@type'],
            resourceJSONLD[AppConfig.schemaName],
            [],
            [],
            [],
            [],
            properties
    );
    }

    /**
     * Constructs a [[ReadPropertyItem]] from JSON-LD.
     *
     * @param propValue the value serialized as JSON-LD.
     * @param propIri the Iri of the property.
     * @param standoffLinkValues standoffLinkValues of the resource.
     * @returns a [[ReadPropertyItem]] or `undefined` in case the value could not be processed correctly.
     */
    function createValueSpecificProp(propValue: Object, propIri: string, standoffLinkValues: ReadLinkValue[]): ReadPropertyItem | undefined {

        // convert a JSON-LD property value to a `ReadPropertyItem`

        let valueSpecificProp: ReadPropertyItem;

        // check for the property's value type
        switch (propValue['@type']) {
            case AppConfig.TextValue:
                // a text value might be given as plain string, html or xml.
                let textValue: ReadPropertyItem;

                if (propValue[AppConfig.valueAsString] !== undefined) {
                    textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[AppConfig.valueAsString]);
                } else if (propValue[AppConfig.textValueAsHtml] !== undefined) {

                    let referredResources: ReferredResourcesByStandoffLink = {};

                    // check for standoff links and include referred resources, if any
                    // when the user interacts with a standoff link, further information about the referred resource can be shown
                    for (let standoffLink of standoffLinkValues) {
                        let referredRes: ReadResource = standoffLink.referredResource;
                        referredResources[referredRes.id] = referredRes;
                    }

                    textValue = new ReadTextValueAsHtml(propValue['@id'], propIri, propValue[AppConfig.textValueAsHtml], referredResources);
                } else if (propValue[AppConfig.textValueAsXml] !== undefined && propValue[AppConfig.textValueHasMapping] !== undefined) {
                    textValue = new ReadTextValueAsXml(propValue['@id'], propIri, propValue[AppConfig.textValueAsXml], propValue[AppConfig.textValueHasMapping]);
                } else {
                    // expected text value members not defined
                    console.log("ERROR: Invalid text value: " + JSON.stringify(propValue))
                }

                valueSpecificProp = textValue;
                break;

            case AppConfig.DateValue:
                let dateValue = new ReadDateValue(propValue['@id'],
                    propIri,
                    propValue[AppConfig.dateValueHasCalendar],
                    propValue[AppConfig.dateValueHasStartYear],
                    propValue[AppConfig.dateValueHasEndYear],
                    propValue[AppConfig.dateValueHasStartEra],
                    propValue[AppConfig.dateValueHasEndEra],
                    propValue[AppConfig.dateValueHasStartMonth],
                    propValue[AppConfig.dateValueHasEndMonth],
                    propValue[AppConfig.dateValueHasStartDay],
                    propValue[AppConfig.dateValueHasEndDay]);

                valueSpecificProp = dateValue;
                break;

            case AppConfig.LinkValue:

                let linkValue: ReadLinkValue;

                // check if the referred resource is given as an object or just as an IRI
                if (propValue[AppConfig.linkValueHasTarget] !== undefined) {
                    // linkValueHasTarget contains the object

                    let referredResource: ReadResource = constructReadResource(propValue[AppConfig.linkValueHasTarget]);

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                } else if (propValue[AppConfig.linkValueHasTargetIri] !== undefined) {
                    // linkValueHasTargetIri contains the resource's Iri

                    let referredResourceIri = propValue[AppConfig.linkValueHasTargetIri];

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                } else if (propValue[AppConfig.linkValueHasSource] !== undefined) {
                    // linkValueHasSource contains the object

                    let incomingResource: ReadResource = constructReadResource(propValue[AppConfig.linkValueHasSource]);

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                } else if (propValue[AppConfig.linkValueHasSourceIri] !== undefined) {
                    // linkValueHasSourceIri contains the resource's Iri

                    let incomingResourceIri = propValue[AppConfig.linkValueHasSourceIri];

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                }

                valueSpecificProp = linkValue;
                break;

            case AppConfig.IntValue:

                let intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[AppConfig.integerValueAsInteger]);
                valueSpecificProp = intValue;

                break;

            case AppConfig.DecimalValue:

                let decimalValue = new ReadDecimalValue(propValue['@id'], propIri, propValue[AppConfig.decimalValueAsDecimal]);
                valueSpecificProp = decimalValue;

                break;

            case AppConfig.StillImageFileValue:

                let stillImageFileValue: ReadStillImageFileValue = new ReadStillImageFileValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConfig.fileValueHasFilename],
                    propValue[AppConfig.stillImageFileValueHasIIIFBaseUrl],
                    propValue[AppConfig.fileValueAsUrl],
                    propValue[AppConfig.stillImageFileValueHasDimX],
                    propValue[AppConfig.stillImageFileValueHasDimY],
                    propValue[AppConfig.fileValueIsPreview] // optional (may be undefined)
                );

                valueSpecificProp = stillImageFileValue;

                break;

            case AppConfig.ColorValue:

                let readColorValue: ReadColorValue = new ReadColorValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConfig.colorValueAsColor]
                );

                valueSpecificProp = readColorValue;

                break;

            case AppConfig.GeomValue:

                let readGeomValue: ReadGeomValue = new ReadGeomValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConfig.geometryValueAsGeometry]
                );

                valueSpecificProp = readGeomValue;

                break;

            case AppConfig.UriValue:

                let uriValue: ReadUriValue = new ReadUriValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConfig.uriValueAsUri]
                );

                valueSpecificProp = uriValue;

                break;

            case AppConfig.BooleanValue:

                let boolValue: ReadBooleanValue = new ReadBooleanValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConfig.booleanValueAsBoolean]
                );

                valueSpecificProp = boolValue;

                break;


            case AppConfig.IntervalValue:

                let intervalValue: ReadIntervalValue = new ReadIntervalValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConfig.intervalValueHasStart],
                    propValue[AppConfig.intervalValueHasEnd]
                );

                valueSpecificProp = intervalValue;

                break;

            case AppConfig.ListValue:

                let listValue: ReadListValue = new ReadListValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConfig.listValueAsListNode],
                    propValue[AppConfig.listValueAsListNodeLabel]
                );

                valueSpecificProp = listValue;

                break;

            default:
                // unsupported value type
                console.log("ERROR: value type not implemented yet: " + propValue['@type']);
                break;
        }

        return valueSpecificProp;

    }

    /**
     * Construct a [[ReadProperties]] from JSON-LD.
     *
     * @param resourceJSONLD an object describing the resource and its properties.
     * @param standoffLinksValues standoff link values of the resource.
     * @returns a [[ReadProperties]].
     */
    function constructReadProperties(resourceJSONLD: Object): ReadProperties {

        // JSONLD representing standoff link values
        let standoffLinkValuesJSONLD: Object = resourceJSONLD[AppConfig.hasStandoffLinkToValue];

        // to be populated with standoff link values
        let standoffLinkValues: ReadLinkValue[] = [];

        // convert each standoff link value JSONLD object to a ReadLinkValue
        // in order populate the collection with all the standoff link values
        if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
            for (let standoffLinkJSONLD of standoffLinkValuesJSONLD) {
                let standoffVal: ReadLinkValue = createValueSpecificProp(standoffLinkJSONLD, AppConfig.hasStandoffLinkToValue, []) as ReadLinkValue;

                standoffLinkValues.push(standoffVal)
            }
        } else if (standoffLinkValuesJSONLD !== undefined) {
            let standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, AppConfig.hasStandoffLinkToValue, []) as ReadLinkValue;

            standoffLinkValues.push(standoffVal);
        }

        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(propName => propName != '@id' && propName != '@type' && propName != AppConfig.schemaName);

        let properties: ReadProperties = {};

        // iterate over all the given property names
        for (let propName of propNames) {

            let propValues: Array<ReadPropertyItem> = [];

            // either an array of values or just one value is given
            if (Array.isArray(resourceJSONLD[propName])) {
                // array of values

                // for each property name, an array of property values is given, iterate over it
                for (let propValue of resourceJSONLD[propName]) {

                    // convert a JSON-LD property value to a `ReadPropertyItem`
                    let valueSpecificProp: ReadPropertyItem = createValueSpecificProp(propValue, propName, standoffLinkValues);

                    // if it is undefined, the value could not be constructed correctly
                    // add the property value to the array of property values
                    if (valueSpecificProp !== undefined) propValues.push(valueSpecificProp);

                }
            } else {
                // only one value

                let valueSpecificProp: ReadPropertyItem = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);

                // if it is undefined, the value could not be constructed correctly
                // add the property value to the array of property values
                if (valueSpecificProp !== undefined) propValues.push(valueSpecificProp);
            }

            // add the property to the properties object
            properties[propName] = propValues;

        }

        return properties;
    }

    /**
     * Turns an API response in JSON-LD representing a sequence of resources into a [[ReadResourcesSequence]].
     *
     * @param resourcesResponseJSONLD   a sequence of resources, represented as a JSON-LD object.
     * @returns {ReadResourcesSequence} a [[ReadResourcesSequence]].
     */
    export function createReadResourcesSequenceFromJsonLD(resourcesResponseJSONLD: Object): ReadResourcesSequence {

        let resources: Array<ReadResource> = [];
        let numberOfResources: number = resourcesResponseJSONLD[AppConfig.schemaNumberOfItems];

        // either an array of resources or just one resource is given
        if (Array.isArray(resourcesResponseJSONLD[AppConfig.schemaItemListElement])) {
            // an array of resources

            for (let resourceJSONLD of resourcesResponseJSONLD[AppConfig.schemaItemListElement]) {

                let resource: ReadResource = constructReadResource(resourceJSONLD);

                // add the resource to the resources array
                resources.push(resource);
            }
        } else {
            // only one resource

            let resource: ReadResource = constructReadResource(resourcesResponseJSONLD[AppConfig.schemaItemListElement]);

            // add the resource to the resources array
            resources.push(resource);

        }

        return new ReadResourcesSequence(resources, numberOfResources);

    }

    /**
     * Collects all the classes of referred resources from a given resource (from its linking properties).
     *
     * @param {Object} resourceJSONLD JSON-LD describing one resource.
     * @return an Array of resource class Iris (including duplicates).
     */
    function getReferredResourceClasses(resourceJSONLD: Object): string[] {

        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(propName => propName != '@id' && propName != '@type' && propName != AppConfig.schemaName);

        let referredResourceClasses = [];

        for (let prop of propNames) {

            // several values given for this property
            if (Array.isArray(resourceJSONLD[prop])) {

                for (let referredRes of resourceJSONLD[prop]) {

                    // if the property is a LinkValue and it contains an embedded resource, get its type
                    if (referredRes['@type'] == AppConfig.LinkValue && referredRes[AppConfig.linkValueHasTarget] !== undefined) {

                        // target resource is represented
                        referredResourceClasses.push(referredRes[AppConfig.linkValueHasTarget]['@type']);
                    } else if (referredRes['@type'] == AppConfig.LinkValue && referredRes[AppConfig.linkValueHasSource] !== undefined) {
                        // source resource is represented
                        referredResourceClasses.push(referredRes[AppConfig.linkValueHasSource]['@type']);
                    }

                }
            } else {
                // only one value given for this property

                // if the property is a LinkValue and it contains an embedded resource, get its type
                if (resourceJSONLD[prop]['@type'] == AppConfig.LinkValue && resourceJSONLD[prop][AppConfig.linkValueHasTarget] !== undefined) {

                    // target resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][AppConfig.linkValueHasTarget]['@type']);
                } else if (resourceJSONLD[prop]['@type'] == AppConfig.LinkValue && resourceJSONLD[prop][AppConfig.linkValueHasSource] !== undefined) {
                    // source resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][AppConfig.linkValueHasSource]['@type']);
                }
            }

        }

        return referredResourceClasses;

    }

    /**
     * Gets the resource classes (types) from a JSON-LD representing a sequence of resources.
     *
     * @param resourcesResponseJSONLD a sequence of resources, represented as a JSON-LD object.
     * @returns {Array<String>} the resource class Iris (without duplicates).
     */
    export function getResourceClassesFromJsonLD(resourcesResponseJSONLD: Object): string[] {

        if (Array.isArray(resourcesResponseJSONLD[AppConfig.schemaItemListElement])) {
            // an array of resources

            let resourceClasses: Array<string> = [];

            // collect all resource classes
            for (let res of resourcesResponseJSONLD[AppConfig.schemaItemListElement]) {
                // get class of the current resource
                resourceClasses.push(res["@type"]);

                // get the classes of referred resources
                let referredResourceClasses = getReferredResourceClasses(res);

                resourceClasses = resourceClasses.concat(referredResourceClasses);

            }

            // filter out duplicates
            return resourceClasses.filter(Utils.filterOutDuplicates);

        } else {

            let resourceClasses: Array<string> = [];

            let res = resourcesResponseJSONLD[AppConfig.schemaItemListElement];

            // only one resource
            resourceClasses.push(res["@type"]);

            // get the classes of referred resources
            let referredResourceClasses = getReferredResourceClasses(res);

            resourceClasses = resourceClasses.concat(referredResourceClasses);

            // filter out duplicates
            return resourceClasses.filter(Utils.filterOutDuplicates);
        }
    }

}
