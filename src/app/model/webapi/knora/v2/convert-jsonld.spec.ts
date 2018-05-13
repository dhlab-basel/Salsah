import {async} from '@angular/core/testing';
import {ConvertJSONLD} from './convert-jsonld';
import {ReadResourcesSequence} from './read-resources-sequence';
import {ReadResource} from './read-resource';
import {
    ReadBooleanValue, ReadColorValue, ReadDateValue, ReadDecimalValue, ReadIntegerValue, ReadIntervalValue,
    ReadLinkValue, ReadListValue,
    ReadTextValueAsString, ReadTextValueAsXml, ReadUriValue
} from './read-property-item';
import {ReadProperties} from './read-properties';

describe('ConvertJSONLD', () => {

    it('parse a JSON-LD document representing letter 176-O', async(() => {

        const jsonld = require('jsonld');

        const EulerLetter: any = require('../../../test-data/resources/EulerLetter_176-O.json');

        const promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const promise = promises.compact(EulerLetter, {});

        promise.then((compacted) => {

            const receivedResource: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

            expect(receivedResource.numberOfResources).toEqual(1);

            const expectedProps: ReadProperties = {
                'http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate': [
                    new ReadDateValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/w3ZlkuU2T0-0DMrvW8HLJA',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate',
                        'GREGORIAN',
                        1756,
                        1756,
                        'CE',
                        'CE',
                        1,
                        1,
                        3,
                        3
                    )],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue': [
                    new ReadLinkValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/-dzjDkhPRzy-9q0v7QtI7w',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue',
                        'http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q',
                        new ReadResource(
                            'http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q',
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                            'Leonhard Euler',
                            [],
                            [],
                            [],
                            [],
                            {}
                        )
                    )
                ],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue': [
                    new ReadLinkValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/gkdrd8ZXQhucrNLXIf2-qw',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue',
                        'http://rdfh.ch/biblio/Yv2elBDtSMqoJeKRcxsW8A',
                        new ReadResource(
                            'http://rdfh.ch/biblio/Yv2elBDtSMqoJeKRcxsW8A',
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                            'Christian Goldbach',
                            [],
                            [],
                            [],
                            [],
                            {}
                        )
                    )
                ],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject': [
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/JpGklfqZSxuu7VI1zIyucw',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/other_quadratic_forms',
                        'Other quadratic forms'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/SiEBL-EASQSNeFBprbjY3A',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/berlin_academy',
                        'Berlin Academy'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/H4IZDQ1eS2WBrMhZRX-vkA',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/other_professional_tasks',
                        'Other professional tasks'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/MdjXlOTNRfqYKEWNIh6kfg',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/errands',
                        'Errands'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/rfao0tqnQTiYyLdlJrNF6w',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/book_trade_orders',
                        'Book trade, orders'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/_fCIiKjzRYqjXkEhykto5A',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/johann_albrecht_euler',
                        'Johann Albrecht Euler'
                    )
                ],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage': [
                    new ReadTextValueAsString(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/ilKXhfZnS9uAYDNQzi6m8Q',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage',
                        'German'
                    )
                ]
            };

            const EulerLetterResourceExpected = new ReadResource(
                'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w',
                'http://0.0.0.0:3333/ontology/0801/beol/v2#letter',
                'L176-O',
                [],
                [],
                [],
                [],
                expectedProps
            );

            expect(receivedResource.resources[0].id).toEqual(EulerLetterResourceExpected.id);

            expect(receivedResource.resources[0].type).toEqual(EulerLetterResourceExpected.type);

            expect(receivedResource.resources[0].label).toEqual(EulerLetterResourceExpected.label);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage']);

        });
    }));


    it('parse a JSON-LD document representing a thing', async(() => {

        const jsonld = require('jsonld');

        const thing: any = require('../../../test-data/resources/Testthing.json');

        const promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const promise = promises.compact(thing, {});

        promise.then((compacted) => {

            const receivedResource: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

            expect(receivedResource.numberOfResources).toEqual(1);

            const expectedProps: ReadProperties = {
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean': [
                    new ReadBooleanValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/SHyBHDSJQzmeJ83xBTQhJg',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean',
                        true
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor': [
                    new ReadColorValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/37QzGaODRo6EKBpf6wxxkQ',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor',
                        '#ff3333'
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate': [
                    new ReadDateValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/t6JTHLl1T62_VPajklqx4Q',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate',
                        'GREGORIAN',
                        2018,
                        2018,
                        'CE',
                        'CE',
                        5,
                        5,
                        13,
                        13
                    )],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal': [
                    new ReadDecimalValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/Av5U1FocTVCSoDEmPR0_aQ',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal',
                        1.5
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger': [
                    new ReadIntegerValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/uiHvmZZGR8i0O1djKN7PVQ',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger',
                        1
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval': [
                    new ReadIntervalValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/S2jMJ4YlSkyWe0eSQD4jdw',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval',
                        0,
                        60
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem': [
                    new ReadListValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/PzE7-PtEQwmZxFeDXhIu3Q',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem',
                        'http://rdfh.ch/lists/0001/treeList01',
                        'Tree list node 01'
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherListItem': [
                    new ReadListValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/BE-SUkXzT36D8qcZSO1Vbg',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherListItem',
                        'http://rdfh.ch/lists/0001/otherTreeList01',
                        'Other Tree list node 01'
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue': [
                    new ReadLinkValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/C6n-Kup6TtiaKsqt9csXhw',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue',
                        'http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ',
                        new ReadResource(
                            'http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ',
                            'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing',
                            'Sierra',
                            [],
                            [],
                            [],
                            [],
                            {}
                        )
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext': [
                    new ReadTextValueAsXml(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/wt_W_BzQS9SSWs77wVrWsA',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext',
                        '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text><p>test with <strong>markup</strong></p></text>',
                        'http://rdfh.ch/standoff/mappings/StandardMapping'
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText': [
                    new ReadTextValueAsString(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/h9RegL8FQ0C51mhrKmr3pQ',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText',
                        'test'
                    )
                ],
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri': [
                    new ReadUriValue(
                        'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A/values/Zbf2EGAyR7OQtx7B8JxhzQ',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri',
                        'http://www.google.ch'
                    )
                ]

            };

            const ThingResourceExpected = new ReadResource(
                'http://rdfh.ch/0001/_DQcFdsiTRGXr6S1Sfs38A',
                'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing',
                'testding',
                [],
                [],
                [],
                [],
                expectedProps
            );

            expect(receivedResource.resources[0]).toEqual(ThingResourceExpected);

        });
    }));

});
