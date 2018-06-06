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

import {ReadResourcesSequence} from './read-resources-sequence';
import {ReadResource} from './read-resource';
import {ReadProperties} from './read-properties';
import {
    ReadBooleanValue,
    ReadColorValue,
    ReadDateValue,
    ReadDecimalValue,
    ReadGeomValue,
    ReadIntegerValue, ReadIntervalValue,
    ReadLinkValue, ReadListValue,
    ReadPropertyItem,
    ReadStillImageFileValue, ReadTextFileValue,
    ReadTextValueAsHtml,
    ReadTextValueAsString,
    ReadTextValueAsXml, ReadUriValue,
    ReferredResourcesByStandoffLink
} from './read-property-item';
import {AppConstants} from '../../../../app.constants';
import {Utils} from '../../../../utils';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld');

export module ConvertJSONLD {

    /**
     * Construct a [[ReadResource]] from JSON-LD.
     *
     * @param resourceJSONLD an object describing the resource and its properties.
     * @param properties    a [[ReadProperties]] describing the resource's properties. if any.
     * @returns a [[ReadResource]]
     */
    function constructReadResource(resourceJSONLD: Object): ReadResource {

        const properties: ReadProperties = constructReadProperties(resourceJSONLD);

        return new ReadResource(
            resourceJSONLD['@id'],
            resourceJSONLD['@type'],
            resourceJSONLD[AppConstants.RdfsLabel],
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
            case AppConstants.TextValue:
                // a text value might be given as plain string, html or xml.
                let textValue: ReadPropertyItem;

                if (propValue[AppConstants.valueAsString] !== undefined) {
                    textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[AppConstants.valueAsString]);
                } else if (propValue[AppConstants.textValueAsHtml] !== undefined) {

                    const referredResources: ReferredResourcesByStandoffLink = {};

                    // check for standoff links and include referred resources, if any
                    // when the user interacts with a standoff link, further information about the referred resource can be shown
                    for (const standoffLink of standoffLinkValues) {
                        const referredRes: ReadResource = standoffLink.referredResource;
                        referredResources[referredRes.id] = referredRes;
                    }

                    textValue = new ReadTextValueAsHtml(propValue['@id'], propIri, propValue[AppConstants.textValueAsHtml], referredResources);
                } else if (propValue[AppConstants.textValueAsXml] !== undefined && propValue[AppConstants.textValueHasMapping] !== undefined) {
                    textValue = new ReadTextValueAsXml(propValue['@id'], propIri, propValue[AppConstants.textValueAsXml], propValue[AppConstants.textValueHasMapping]);
                } else {
                    // expected text value members not defined
                    console.log('ERROR: Invalid text value: ' + JSON.stringify(propValue))
                }

                valueSpecificProp = textValue;
                break;

            case AppConstants.DateValue:
                const dateValue = new ReadDateValue(propValue['@id'],
                    propIri,
                    propValue[AppConstants.dateValueHasCalendar],
                    propValue[AppConstants.dateValueHasStartYear],
                    propValue[AppConstants.dateValueHasEndYear],
                    propValue[AppConstants.dateValueHasStartEra],
                    propValue[AppConstants.dateValueHasEndEra],
                    propValue[AppConstants.dateValueHasStartMonth],
                    propValue[AppConstants.dateValueHasEndMonth],
                    propValue[AppConstants.dateValueHasStartDay],
                    propValue[AppConstants.dateValueHasEndDay]);

                valueSpecificProp = dateValue;
                break;

            case AppConstants.LinkValue:

                let linkValue: ReadLinkValue;

                // check if the referred resource is given as an object or just as an IRI
                if (propValue[AppConstants.linkValueHasTarget] !== undefined) {
                    // linkValueHasTarget contains the object

                    const referredResource: ReadResource = constructReadResource(propValue[AppConstants.linkValueHasTarget]);

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                } else if (propValue[AppConstants.linkValueHasTargetIri] !== undefined) {
                    // linkValueHasTargetIri contains the resource's Iri

                    const referredResourceIri = propValue[AppConstants.linkValueHasTargetIri]['@id'];

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                } else if (propValue[AppConstants.linkValueHasSource] !== undefined) {
                    // linkValueHasSource contains the object

                    const incomingResource: ReadResource = constructReadResource(propValue[AppConstants.linkValueHasSource]);

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                } else if (propValue[AppConstants.linkValueHasSourceIri] !== undefined) {
                    // linkValueHasSourceIri contains the resource's Iri

                    const incomingResourceIri = propValue[AppConstants.linkValueHasSourceIri]['@id'];

                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                }

                valueSpecificProp = linkValue;
                break;

            case AppConstants.IntValue:

                const intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[AppConstants.integerValueAsInteger]);
                valueSpecificProp = intValue;

                break;

            case AppConstants.DecimalValue:

                // a decimal value is represented as a string in order to preserve its precision
                const decVal: number = parseFloat(propValue[AppConstants.decimalValueAsDecimal]);

                const decimalValue = new ReadDecimalValue(propValue['@id'], propIri, decVal);
                valueSpecificProp = decimalValue;

                break;

            case AppConstants.StillImageFileValue:

                const stillImageFileValue: ReadStillImageFileValue = new ReadStillImageFileValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConstants.fileValueHasFilename],
                    propValue[AppConstants.stillImageFileValueHasIIIFBaseUrl],
                    propValue[AppConstants.fileValueAsUrl],
                    propValue[AppConstants.stillImageFileValueHasDimX],
                    propValue[AppConstants.stillImageFileValueHasDimY],
                    propValue[AppConstants.fileValueIsPreview] // optional (may be undefined)
                );

                valueSpecificProp = stillImageFileValue;

                break;

            case AppConstants.TextFileValue:

                const textFileValue = new ReadTextFileValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConstants.fileValueHasFilename],
                    propValue[AppConstants.fileValueAsUrl]
                );

                valueSpecificProp = textFileValue;

                break;

            case AppConstants.ColorValue:

                const readColorValue: ReadColorValue = new ReadColorValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConstants.colorValueAsColor]
                );

                valueSpecificProp = readColorValue;

                break;

            case AppConstants.GeomValue:

                const readGeomValue: ReadGeomValue = new ReadGeomValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConstants.geometryValueAsGeometry]
                );

                valueSpecificProp = readGeomValue;

                break;

            case AppConstants.UriValue:

                const uriValue: ReadUriValue = new ReadUriValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConstants.uriValueAsUri]
                );

                valueSpecificProp = uriValue;

                break;

            case AppConstants.BooleanValue:

                const boolValue: ReadBooleanValue = new ReadBooleanValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConstants.booleanValueAsBoolean]
                );

                valueSpecificProp = boolValue;

                break;


            case AppConstants.IntervalValue:

                // represented as strings to preserve precision
                const intStart = parseFloat(propValue[AppConstants.intervalValueHasStart]);
                const intEnd = parseFloat(propValue[AppConstants.intervalValueHasEnd]);

                const intervalValue: ReadIntervalValue = new ReadIntervalValue(
                    propValue['@id'],
                    propIri,
                    intStart,
                    intEnd
                );

                valueSpecificProp = intervalValue;

                break;

            case AppConstants.ListValue:

                const listValue: ReadListValue = new ReadListValue(
                    propValue['@id'],
                    propIri,
                    propValue[AppConstants.listValueAsListNode]['@id'],
                    propValue[AppConstants.listValueAsListNodeLabel]
                );

                valueSpecificProp = listValue;

                break;

            default:
                // unsupported value type
                console.log('ERROR: value type not implemented yet: ' + propValue['@type']);
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
        const standoffLinkValuesJSONLD: Object = resourceJSONLD[AppConstants.hasStandoffLinkToValue];

        // to be populated with standoff link values
        const standoffLinkValues: ReadLinkValue[] = [];

        // convert each standoff link value JSONLD object to a ReadLinkValue
        // in order populate the collection with all the standoff link values
        if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
            for (const standoffLinkJSONLD of standoffLinkValuesJSONLD) {
                const standoffVal: ReadLinkValue = createValueSpecificProp(standoffLinkJSONLD, AppConstants.hasStandoffLinkToValue, []) as ReadLinkValue;

                standoffLinkValues.push(standoffVal)
            }
        } else if (standoffLinkValuesJSONLD !== undefined) {
            const standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, AppConstants.hasStandoffLinkToValue, []) as ReadLinkValue;

            standoffLinkValues.push(standoffVal);
        }

        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(propName => propName != '@id' && propName != '@type' && propName != AppConstants.RdfsLabel);

        const properties: ReadProperties = {};

        // iterate over all the given property names
        for (const propName of propNames) {

            const propValues: Array<ReadPropertyItem> = [];

            // either an array of values or just one value is given
            if (Array.isArray(resourceJSONLD[propName])) {
                // array of values

                // for each property name, an array of property values is given, iterate over it
                for (const propValue of resourceJSONLD[propName]) {

                    // convert a JSON-LD property value to a `ReadPropertyItem`
                    const valueSpecificProp: ReadPropertyItem = createValueSpecificProp(propValue, propName, standoffLinkValues);

                    // if it is undefined, the value could not be constructed correctly
                    // add the property value to the array of property values
                    if (valueSpecificProp !== undefined) { propValues.push(valueSpecificProp); }

                }
            } else {
                // only one value

                const valueSpecificProp: ReadPropertyItem = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);

                // if it is undefined, the value could not be constructed correctly
                // add the property value to the array of property values
                if (valueSpecificProp !== undefined) { propValues.push(valueSpecificProp); }
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

        const resources: Array<ReadResource> = [];
        let numberOfResources: number;
        const resourcesGraph = resourcesResponseJSONLD['@graph'];

        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            numberOfResources = resourcesGraph.length;

            for (const resourceJSONLD of resourcesGraph) {

                const resource: ReadResource = constructReadResource(resourceJSONLD);

                // add the resource to the resources array
                resources.push(resource);
            }
        } else {
            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                numberOfResources = 0;
            } else {

                // only one resource
                numberOfResources = 1;

                const resource: ReadResource = constructReadResource(resourcesResponseJSONLD);

                // add the resource to the resources array
                resources.push(resource);
            }
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
        propNames = propNames.filter(propName => propName != '@id' && propName != '@type' && propName != AppConstants.RdfsLabel);

        const referredResourceClasses = [];

        for (const prop of propNames) {

            // several values given for this property
            if (Array.isArray(resourceJSONLD[prop])) {

                for (const referredRes of resourceJSONLD[prop]) {

                    // if the property is a LinkValue and it contains an embedded resource, get its type
                    if (referredRes['@type'] == AppConstants.LinkValue && referredRes[AppConstants.linkValueHasTarget] !== undefined) {

                        // target resource is represented
                        referredResourceClasses.push(referredRes[AppConstants.linkValueHasTarget]['@type']);
                    } else if (referredRes['@type'] == AppConstants.LinkValue && referredRes[AppConstants.linkValueHasSource] !== undefined) {
                        // source resource is represented
                        referredResourceClasses.push(referredRes[AppConstants.linkValueHasSource]['@type']);
                    }

                }
            } else {
                // only one value given for this property

                // if the property is a LinkValue and it contains an embedded resource, get its type
                if (resourceJSONLD[prop]['@type'] == AppConstants.LinkValue && resourceJSONLD[prop][AppConstants.linkValueHasTarget] !== undefined) {

                    // target resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][AppConstants.linkValueHasTarget]['@type']);
                } else if (resourceJSONLD[prop]['@type'] == AppConstants.LinkValue && resourceJSONLD[prop][AppConstants.linkValueHasSource] !== undefined) {
                    // source resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][AppConstants.linkValueHasSource]['@type']);
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

        const resourcesGraph = resourcesResponseJSONLD['@graph'];
        let resourceClasses: Array<string> = [];

        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources

            for (const resourceJSONLD of resourcesGraph) {
                // get class of the current resource
                resourceClasses.push(resourceJSONLD['@type']);

                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourceJSONLD);

                resourceClasses = resourceClasses.concat(referredResourceClasses);

            }

        } else {
            // only one resource

            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                return [];
            } else {
                resourceClasses.push(resourcesResponseJSONLD['@type']);

                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourcesResponseJSONLD);

                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }

        // filter out duplicates
        return resourceClasses.filter(Utils.filterOutDuplicates);

    }

}
