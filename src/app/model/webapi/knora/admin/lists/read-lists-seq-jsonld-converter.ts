
import {AppConfig} from '../../../../../app.config';
import {ListChildNodeV2, ListNodeV2, ListRootNodeV2} from './list-node-v2';
import {StringV2} from '../../v2/shared/strings';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld');

export class ListConstants {
    public static KnoraBase: string = 'http://www.knora.org/ontology/knora-base#';
    public static ListNode: string = ListConstants.KnoraBase + 'ListNode';
}

export module ReadListSequenceJsonLDConverter {




    export function toListNodes(jsonldString: any): ListNodeV2[] {

        let listInfos: Array<ListNodeV2> = [];

        const promises = jsonld.promises;

        // compact JSON-LD using an empty context: expands all Iris
        const promise = promises.compact(jsonldString, {});

        promise.then(
            function (compacted) {

                listInfos = this.readListsSequenceReader(compacted)

        }, function (err) {
                console.error('JSONLD could not be expanded:' + err);
        };

        return listInfos;
    }

    function readListsSequenceReader(jsonLDObject: Object): ListNodeV2[] {

        const result: Array<ListNodeV2> = [];

        if (Array.isArray(jsonLDObject[AppConfig.schemaItemListElement])) {
            // an array of list info
            for (const maybeListRootNode of jsonLDObject[AppConfig.schemaItemListElement]) {
                result.push(this.listRootNodeReader(maybeListRootNode));
            }
        } else {
            // a single list info
            const maybeListRootNode = jsonLDObject[AppConfig.schemaItemListElement];
            result.push(this.listRootNodeReader(maybeListRootNode))
        }

        return result;
    }

    function listRootNodeReader(jsonObject: Object): ListRootNodeV2 {

        try {

            if (jsonObject['@type'] === ListConstants.ListNode) {
                throw new TypeError('');
            }










        } catch (e) {
            if (e instanceof TypeError) {
                console.error('Could not parse ListRootNodeV2: wrong type.', e);
            }
        }

    }

    function listChildNodeReader(jsonObject: Object): ListChildNodeV2 {

    }

    function stringV2Reader(value: string | object): StringV2 {
        if (typeof value === 'object') {
            return new StringV2(value['@value'], value['@lang'])
        } else {
            return new StringV2(value)
        }
    }

}
