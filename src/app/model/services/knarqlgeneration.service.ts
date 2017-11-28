import {Injectable} from '@angular/core';
import {PropertyWithValue} from "../../view/modules/search/extended-search/select-property/select-property.component";
import {Utils} from "../../utils";
import {AppConfig} from "../../app.config";

/**
 * Handles the generation of KnarQL queries.
 */
@Injectable()
export class KnarqlgenerationService {

    constructor() {
    }

    // map of complex knora-api value types to simple ones
    typeConversionComplexToSimple = {
        [AppConfig.IntValue]: AppConfig.xsdInteger, // use computed property name: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer
        [AppConfig.DecimalValue]: AppConfig.xsdDecimal,
        [AppConfig.BooleanValue]: AppConfig.xsdBoolean,
        [AppConfig.TextValue]: AppConfig.xsdString,
        [AppConfig.DateValue]: AppConfig.dateSimple,
        [AppConfig.IntervalValue]: AppConfig.intervalSimple,
        [AppConfig.GeomValue]: AppConfig.geomSimple,
        [AppConfig.ColorValue]: AppConfig.colorSimple,
        [AppConfig.GeonameValue]: AppConfig.geonameSimple
    };


    /**
     * Generates a KnarQL query from the provided arguments.
     *
     * @param {PropertyWithValue[]} properties the properties specified by the user.
     * @param {string} mainResourceClassOption the class of the main resource, if specified.
     * @returns {string} a KnarQL query string.
     */
    createKnarQLQuery(properties: PropertyWithValue[], mainResourceClassOption?: string): string {

        let mainResourceClass = '';

        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = `?mainRes a <${Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption)}> .`;
        }

        // statements to be returned in query results
        let returnStatements = [];

        // loop over given properties and create statements and Filters and type annotations from them
        let props: string[] = properties.map(
            (propWithVal: PropertyWithValue, index: number) => {

                let propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);

                let propValue = `?propVal${index}`;

                // generate statement
                let statement: string = `?mainRes <${propIriSimple}> ${propValue} .`;

                // TODO: check if statement should be returned returned in results
                returnStatements.push(statement);

                let simpleType;
                if (!propWithVal.property.isLinkProperty) {
                    simpleType = this.typeConversionComplexToSimple[propWithVal.property.objectType];
                } else {
                    simpleType = AppConfig.resourceSimple;
                }

                // type annotations
                let propTypeAnnotation = `<${propIriSimple}> knora-api:objectType <${simpleType}> .`;
                let propValueAnnotation = `${propValue} a <${simpleType}> .`;

                // generate filter if comparison operator is not Exists
                let filter: string = '';

                if (propWithVal.valueLiteral.comparisonOperator.getClassName() != 'Exists') {
                    filter = `FILTER(${propValue} ${propWithVal.valueLiteral.comparisonOperator.type} ${propWithVal.valueLiteral.valueLiteral.toSparql()})`;
                }

                return `${statement}
                ${filter}
                ${propTypeAnnotation}
                ${propValueAnnotation}
                `;

            }
        );

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
            
        }`;


        return knarqlTemplate;

    }

}
