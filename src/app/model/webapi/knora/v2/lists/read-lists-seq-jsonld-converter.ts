
import {AppConfig} from '../../../../../app.config';
import {ListInfo} from './list-info';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld');

export module ReadListSequenceJsonLDConverter {


    export function toListInfos(jsonLDObject: Object): ListInfo[] {

        if (Array.isArray(jsonLDObject[AppConfig.schemaItemListElement])) {
            // an array of resources

        } else {
            // a single list info

        }

        return [];
    }

}
