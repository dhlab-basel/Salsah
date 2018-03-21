import {Injectable} from '@angular/core';
import {PropertyWithValue} from "../../view/modules/search/extended-search/select-property/select-property.component";
import {Utils} from "../../utils";
import {AppConfig} from "../../app.config";
import {ExtendedSearchParams, SearchParamsService} from "./search-params.service";

/**
 * Represents an error that occurred when generating KnarQL.
 */
class KnarqlGenerationError extends Error {

    constructor(msg: string) {
        super(msg);
    }
}

/**
 * Handles the generation of KnarQL queries.
 */
@Injectable()
export class KnarqlgenerationService {

    constructor(private _searchParamsService: SearchParamsService) {
    }

    // map of complex knora-api value types to simple ones
    private typeConversionComplexToSimple = {
        [AppConfig.IntValue]: AppConfig.xsdInteger, // use computed property name: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer
        [AppConfig.DecimalValue]: AppConfig.xsdDecimal,
        [AppConfig.BooleanValue]: AppConfig.xsdBoolean,
        [AppConfig.TextValue]: AppConfig.xsdString,
        [AppConfig.DateValue]: AppConfig.dateSimple,
        [AppConfig.IntervalValue]: AppConfig.intervalSimple,
        [AppConfig.GeomValue]: AppConfig.geomSimple,
        [AppConfig.ColorValue]: AppConfig.colorSimple,
        [AppConfig.GeonameValue]: AppConfig.geonameSimple,
        [AppConfig.UriValue]: AppConfig.xsdUri,
        [AppConfig.StillImageFileValue]: AppConfig.fileSimple,
        [AppConfig.FileValue]: AppConfig.fileSimple,
        [AppConfig.MovingImageFileValue]: AppConfig.fileSimple,
        [AppConfig.DDDFileValue]: AppConfig.fileSimple,
        [AppConfig.AudioFileValue]: AppConfig.fileSimple,
        [AppConfig.DocumentFileValue]: AppConfig.fileSimple,
        [AppConfig.TextFileValue]: AppConfig.fileSimple,
        [AppConfig.ListValue]: AppConfig.xsdString
    };

    /**
     * Converts a complex type Iri to a simple type Iri.
     *
     * @param {string} complexType the Iri of a value type (knora-api complex).
     * @returns {string} the corresponding Iri of the simple type (knora-api simple).
     */
    private convertComplexTypeToSimpleType(complexType: string): string {

        const simpleType: string = this.typeConversionComplexToSimple[complexType];

        if (simpleType !== undefined) {
            return simpleType;
        } else {
            throw new KnarqlGenerationError(`complex type ${complexType} could not be converted to simple type.`);
        }

    }


    /**
     * Generates a KnarQL query from the provided arguments.
     *
     * @param {PropertyWithValue[]} properties the properties specified by the user.
     * @param {string} mainResourceClassOption the class of the main resource, if specified.
     * @param offset the offset to be used (nth page of results).
     * @returns {string} a KnarQL query string.
     */
    createKnarQLQuery(properties: PropertyWithValue[], mainResourceClassOption?: string, offset: number = 0): string {

        // class restriction for the resource searched for
        let mainResourceClass = '';

        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = `?mainRes a <${Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption)}> .`;
        }

        // criteria for the order by statement
        const orderByCriteria = [];

        // statements to be returned in query results
        let returnStatements = [];

        // loop over given properties and create statements and Filters and type annotations from them
        let props: string[] = properties.map(
            (propWithVal: PropertyWithValue, index: number) => {

                let propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);

                let simpleType;
                if (!propWithVal.property.isLinkProperty) {
                    simpleType = this.convertComplexTypeToSimpleType(propWithVal.property.objectType);
                } else {
                    simpleType = AppConfig.resourceSimple;
                }

                // represents the object of a statement
                let propValue;
                if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() == 'Exists') {
                    // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                    // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                    propValue = `?propVal${index}`;
                } else {
                    // it is a linking property and the comparison operator is not Exists, use its IRI
                    propValue = propWithVal.valueLiteral.value.toSparql();
                }

                // generate statement
                let statement: string = `?mainRes <${propIriSimple}> ${propValue} .`;

                // type annotations
                let propTypeAnnotation = `<${propIriSimple}> knora-api:objectType <${simpleType}> .`;
                let propValueAnnotation = `${propValue} a <${simpleType}> .`;

                // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
                if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() == 'NotEquals') {
                    // do not include statement in results, because the query checks for the absence of this statement
                    statement = `FILTER NOT EXISTS {
                        ${statement}
                        ${propTypeAnnotation}
                        ${propValueAnnotation}
                    }`;
                } else {
                    // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                    returnStatements.push(statement);
                    statement = `
                        ${statement}
                        ${propTypeAnnotation}
                        ${propValueAnnotation}
                    `;
                }

                // generate filter if comparison operator is not Exists
                let filter: string = '';
                // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
                if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() != 'Exists') {

                    if (propWithVal.valueLiteral.comparisonOperator.getClassName() == 'Like') {
                        // use regex function for LIKE
                        filter = `FILTER regex(${propValue}, ${propWithVal.valueLiteral.value.toSparql()}, "i")`;
                    } else if (propWithVal.valueLiteral.comparisonOperator.getClassName() == 'Match') {
                        // use contains function for LIKE
                        filter = `FILTER contains(${propValue}, ${propWithVal.valueLiteral.value.toSparql()})`;
                    } else {
                        filter = `FILTER(${propValue} ${propWithVal.valueLiteral.comparisonOperator.type} ${propWithVal.valueLiteral.value.toSparql()})`;
                    }
                }

                // check if current value is a sort criterion
                if (propWithVal.isSortCriterion) orderByCriteria.push(propValue);

                return `${statement}
                ${filter}
                `;

            });

        let orderByStatement = '';

        if (orderByCriteria.length > 0) {
            orderByStatement = `
            ORDER BY ${orderByCriteria.join(' ')} 
            `;
        }

        // template of the KnarQL query with dynamic components
        let knarqlTemplate = `    
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ${returnStatements.join('\n')}
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            ${mainResourceClass}
            
            ${props.join('')}
            
        }
        ${orderByStatement}`;

        // offset component of the KnarQL query
        let offsetTemplate = `
        OFFSET ${offset}
        `;

        // function that generates the same KnarQL query with the given offset
        let generateKnarQLWithCustomOffset = (localOffset: number): string => {
            let offsetCustomTemplate = `
            OFFSET ${localOffset}
            `;

            return knarqlTemplate + offsetCustomTemplate;
        };

        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateKnarQLWithCustomOffset));
        }

        // console.log(knarqlTemplate + offsetTemplate);

        return knarqlTemplate + offsetTemplate;

    }

}
