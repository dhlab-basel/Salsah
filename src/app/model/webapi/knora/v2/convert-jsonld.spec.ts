import {async} from '@angular/core/testing';
import {ConvertJSONLD} from './convert-jsonld';
import {ReadResourcesSequence} from './read-resources-sequence';
import {ReadResource} from './read-resource';
import {
    ReadBooleanValue, ReadColorValue, ReadDateValue, ReadDecimalValue, ReadIntegerValue, ReadIntervalValue,
    ReadLinkValue, ReadListValue, ReadTextValueAsHtml,
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
                ],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#hasText': [
                    new ReadTextValueAsHtml(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/GJQB9IHYTl2RhG4g4ru0YA',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasText',
                        '<div>\n   <div id=\"transcription\">\n      \n      <p>Hochwohlgebohrner Herr</p>\n      \n      <p>Hochgeehrtester Herr <em>Etats</em> Rath\n      </p>\n      \n      <p>Bey dem Antritt dieses neuen Jahrs lege ich zuvorderst meinen herzlichsten Wunsch\n         für das beständige Wohlseyn Eur. Hochwohlgeb. ab, und empfehle mich dabey gehorsamst\n         sammt den meinigen zu Dero fortdaurenden Wohlgewogenheit<span class=\"math\">\\(\\,.\\,\\)</span> Zugleich statte ich auch Eur. Hochwohlgeb. meine verpflichtetste Danksagung ab für\n         den gütigen Antheil welchen Dieselben an unserem Zustand zu nehmen belieben und habe\n         das Vergnügen Eur. Hochwohlgeb. zu berichten, daß&nbsp;S[ein]<span class=\"math\">\\(\\,{}^{\\text{e}}\\,\\)</span> Königl[iche] <em>Majestät<a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/DhgjcrRhRfunaSt77-bUxg\"></a></em> bey dem Anfang dieses Jahrs Dero Pathen unsern ältesten Sohn mit einer jährlichen\n         Besoldung von <a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/bP1CO3j3TCOUHYdQqKw9pA\"></a><span class=\"math\">\\(\\,200\\,\\)</span> Rthl. begnadiget.<a class=\"salsah-link\" href=\"http://rdfh.ch/0801/beol/spy5H95GTV2RElphXFPbbw\"><sup>1</sup></a></p>\n      \n      <p>Ich habe nun schon eine geraume Zeit so viel andere Geschäfte gehabt daß&nbsp;ich an <em>numeri</em>sche <em>Theoremata</em>, dergleichen ich Eur. Hochwohlgeb. das letste mal vorzulegen die Ehre gehabt, nicht\n         habe denken können. Die <em>Partes Matheseos applicatae</em> nehmen mir die meiste Zeit weg, wo es immer mehr zu untersuchen gibt, je mehr man\n         damit umgeht.<a class=\"salsah-link\" href=\"http://rdfh.ch/0801/beol/KvfXRPkXTziMYMVYSz9tBg\"><sup>2</sup></a></p>\n      \n      <p>Weil nun mein Kopf mit so viel anderen Sachen angefüllet ist, so mag das wohl die\n         Ursache seyn, daß&nbsp;ich mich in das von Eur. Hochwohlgeb. <em>communicir</em>te und nach der Hand verbesserte <em>Theorema</em> nicht finden kan. Vielleicht haben Eur. Hochwohlgeb. vergessen noch eine wesentliche\n         <em>Condition</em> hinzuzusetzen.<a class=\"salsah-link\" href=\"http://rdfh.ch/0801/beol/FJCOlKBdRtW8caqnN4A3Vw\"><sup>3</sup></a></p>\n      \n      <p>Das <em>Theorema</em> war: <em>Si sit</em><span class=\"math\">\\(\\,aa+bb=P^{2}+eQ^{2}\\,\\)</span><em>erit etiam</em></p>\n      \n      <p>\n         <span class=\"math\">\\(\\,a^{2}+\\left(\\left(2e+1\\right)b-eP-eQ\\right)^{2}=M^{2}+eN^{2}\\text{;}\\,\\)</span>\n         \n      </p>\n      \n      <p>weil ich den Grund desselben nicht einsehen konnte, so habe ich die Richtigkeit desselben\n         durch <em>Exempel</em> erforschen wollen.\n      </p>\n      \n      <p>I. Da <span class=\"math\">\\(\\,1^{2}+4^{2}=17=3^{2}+2\\cdot 2^{2}\\,\\)</span>, so ist <span class=\"math\">\\(\\,a=1\\,\\)</span>, <span class=\"math\">\\(\\,b=4\\,\\)</span>, <span class=\"math\">\\(\\,P=3\\,\\)</span>, <span class=\"math\">\\(\\,Q=2\\,\\)</span> und <span class=\"math\">\\(\\,e=2\\,\\)</span>, allso müste seyn\n      </p>\n      \n      <p>\n         <span class=\"math\">\\(\\,1^{2}+\\left(5\\cdot 4-2\\cdot 3-2\\cdot 2\\right)^{2}=1^{2}+10^{2}=101=M^{2}+2N^{2}\\,\\)</span>\n         \n      </p>\n      \n      <p>welches unmöglich ist.</p>\n      \n      <p>II. Da <span class=\"math\">\\(\\,9^{2}+4^{2}=97=7^{2}+3\\cdot 4^{2}\\,\\)</span>, so ist <span class=\"math\">\\(\\,a=9\\,\\)</span>; <span class=\"math\">\\(\\,b=4\\,\\)</span>; <span class=\"math\">\\(\\,P=7\\,\\)</span>; <span class=\"math\">\\(\\,Q=4\\,\\)</span> und <span class=\"math\">\\(\\,e=3\\,\\)</span>, allso müsste seyn\n      </p>\n      \n      <p>\n         <span class=\"math\">\\(\\,9^{2}+\\left(7\\cdot 4-3\\cdot 7-3\\cdot 4\\right)^{2}=9^{2}+5^{2}=106=M^{2}+3N^{2}\\,\\)</span>\n         \n      </p>\n      \n      <p>welches ebenfalls unmöglich ist.</p>\n      \n      <p>Da ich nun nicht einmal ein <em>Exempel</em> finden kan, welches einträfe, so schliesse ich daraus, daß&nbsp;eine gewisse Bedingung\n         in den Zahlen <span class=\"math\">\\(\\,a\\,\\)</span>, <span class=\"math\">\\(\\,b\\,\\)</span>, <span class=\"math\">\\(\\,P\\,\\)</span> und <span class=\"math\">\\(\\,Q\\,\\)</span> müsse weggelassen seyn, welche ich aber nicht ausfündig machen kan.<a class=\"salsah-link\" href=\"http://rdfh.ch/0801/beol/kZeMXLrQTQONISqizXtf5g\"><sup>4</sup></a></p>\n      \n      <p>Ich habe dem H. <em>Spener<a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/Z_-TT-8_QNSRv-O7dKCW0w\"></a></em> zu wissen gethan, daß&nbsp;Eur. Hochwohlgeb. die Rechnung für die überschickten Bücher\n         verlangen; bekomme ich dieselbe vor Schliessung dieses Briefs, wie ich ihm habe sagen\n         lassen, so werde ich sie beylegen.<a class=\"salsah-link\" href=\"http://rdfh.ch/0801/beol/08Y_rCK5QM-gvchjtixomw\"><sup>5</sup></a></p>\n      \n      <p>Sonsten da er nicht alle verlangte Bücher gehabt, so werde ich inskünftige dergleichen\n         <em>Commission</em>en dem <em>M.<span class=\"math\">\\(\\,{}^{\\text{r}}\\,\\)</span>Neaulme<a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/FsJNrctNTMuwJPCX-7OTVg\"></a></em>, welcher weit <em>activer</em> ist und alles schaffen kan, auftragen. Wegen des Werks: <em>La Clef du Cabinet des Princes<a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/up0Q0ZzPSLaULC2tlTs1sA\"></a><a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/sAImr-uGRBGpsdBdoI6XCw\"></a></em> füge hier die Antwort des <em>M.<span class=\"math\">\\(\\,{}^{\\text{r}}\\,\\)</span>de Bourdeaux<a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/vR3fWAXxRqShBZvWKVA9tA\"></a></em> bey.<a class=\"salsah-link\" href=\"http://rdfh.ch/0801/beol/nRO3f9ENSsqTH8S0Z1uO9w\"><sup>6</sup></a></p>\n      \n      <p>Sollte dasselbe vor der Ankunft einer <em>Resolution</em> von Eur. Hochwohlgeb. schon verkauft worden seyn, so hat sich <em>M.<span class=\"math\">\\(\\,{}^{\\text{r}}\\,\\)</span></em><em>Neaulme<a class=\"salsah-link\" href=\"http://rdfh.ch/biblio/FsJNrctNTMuwJPCX-7OTVg\"></a></em> anheischig gemacht, dasselbe auch zu liefern.\n      </p>\n      \n      <p>Ich habe die Ehre mit der schuldigsten Hochachtung zu verharren</p>\n      \n      <p>Eur. Hochwohlgebohrnen</p>\n      \n      <p>gehorsamster Diener</p>\n      \n      <p>\n         <em>L. Euler</em>\n         \n      </p>\n      \n      <p><em>Berlin</em> den 3<span class=\"math\">\\(\\,{}^{\\text{ten}}\\,\\)</span><em>Januarii</em></p>\n      \n      <p>1756.</p>\n      \n      <p>\n         <sub>Berlin, January 3rd, 1756</sub>\n         \n      </p>\n      \n      <p>\n         <sub>Original, 1 fol. – RGADA, f. 181, n. 1413, č. V, fol. 123rv</sub>\n         \n      </p>\n      \n      <p>\n         <sub>Published: <em>Correspondance</em> (1843), t. I, p. 636–637; <em>Euler-Goldbach</em> (1965), p. 385–386</sub>\n         \n      </p>\n      \n   </div>\n   <div id=\"references\">\n      <ol></ol>\n   </div>\n</div>',
                        {
                            'http://rdfh.ch/0801/beol/08Y_rCK5QM-gvchjtixomw': new ReadResource(
                                'http://rdfh.ch/0801/beol/08Y_rCK5QM-gvchjtixomw',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#endnote',
                                'L176 note-5',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/0801/beol/FJCOlKBdRtW8caqnN4A3Vw': new ReadResource(
                                'http://rdfh.ch/0801/beol/FJCOlKBdRtW8caqnN4A3Vw',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#endnote',
                                'L176 note-3',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/0801/beol/KvfXRPkXTziMYMVYSz9tBg': new ReadResource(
                                'http://rdfh.ch/0801/beol/KvfXRPkXTziMYMVYSz9tBg',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#endnote',
                                'L176 note-2',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/0801/beol/kZeMXLrQTQONISqizXtf5g': new ReadResource(
                                'http://rdfh.ch/0801/beol/kZeMXLrQTQONISqizXtf5g',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#endnote',
                                'L176 note-4',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/0801/beol/nRO3f9ENSsqTH8S0Z1uO9w': new ReadResource(
                                'http://rdfh.ch/0801/beol/nRO3f9ENSsqTH8S0Z1uO9w',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#endnote',
                                'L176 note-6',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/0801/beol/spy5H95GTV2RElphXFPbbw': new ReadResource(
                                'http://rdfh.ch/0801/beol/spy5H95GTV2RElphXFPbbw',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#endnote',
                                'L176 note-1',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/biblio/DhgjcrRhRfunaSt77-bUxg': new ReadResource(
                                'http://rdfh.ch/biblio/DhgjcrRhRfunaSt77-bUxg',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                                'Friedrich II.',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/biblio/FsJNrctNTMuwJPCX-7OTVg': new ReadResource(
                                'http://rdfh.ch/biblio/FsJNrctNTMuwJPCX-7OTVg',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                                'Jean Neaulme',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/biblio/Z_-TT-8_QNSRv-O7dKCW0w': new ReadResource(
                                'http://rdfh.ch/biblio/Z_-TT-8_QNSRv-O7dKCW0w',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                                'Johann Carl (the Elder) Spener',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/biblio/bP1CO3j3TCOUHYdQqKw9pA': new ReadResource(
                                'http://rdfh.ch/biblio/bP1CO3j3TCOUHYdQqKw9pA',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                                'Johann Albrecht Euler',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/biblio/sAImr-uGRBGpsdBdoI6XCw': new ReadResource(
                                'http://rdfh.ch/biblio/sAImr-uGRBGpsdBdoI6XCw',
                                'http://0.0.0.0:3333/ontology/0802/biblio/v2#Book',
                                'jordanclbhae',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/biblio/up0Q0ZzPSLaULC2tlTs1sA': new ReadResource(
                                'http://rdfh.ch/biblio/up0Q0ZzPSLaULC2tlTs1sA',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                                'Claude Jordan',
                                [],
                                [],
                                [],
                                [],
                                {}
                            ),
                            'http://rdfh.ch/biblio/vR3fWAXxRqShBZvWKVA9tA': new ReadResource(
                                'http://rdfh.ch/biblio/vR3fWAXxRqShBZvWKVA9tA',
                                'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                                'Etienne de Bourdeaux',
                                [],
                                [],
                                [],
                                [],
                                {}
                            )
                        },
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

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasText']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasText']);

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

    it('parse a JSON-LD document representing a list of resources', async(() => {

        const jsonld = require('jsonld');

        const resultsForEuler: any = require('../../../test-data/resources/SearchResultEuler.json');

        const promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const promise = promises.compact(resultsForEuler, {});

        promise.then((compacted) => {

            const receivedResource: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

            expect(receivedResource.numberOfResources).toEqual(25);

            expect(receivedResource.resources.length).toEqual(25);

        });
    }));

    it('parse a JSON-LD document representing a book with incoming pages containing the source as a value object', async(() => {

        const jsonld = require('jsonld');

        const resultsForBookWithIncomingLink: any = require('../../../test-data/resources/BookWithIncomingPages.json');

        const promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const promise = promises.compact(resultsForBookWithIncomingLink, {});

        promise.then((compacted) => {

            const receivedResource: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

            expect(receivedResource.numberOfResources).toEqual(1);

            const expectedProps: ReadProperties = {
                'http://0.0.0.0:3333/ontology/0803/incunabula/v2#title': [
                    new ReadTextValueAsString(
                        'http://rdfh.ch/8be1b7cf7103/values/463b6498b70d',
                        'http://0.0.0.0:3333/ontology/0803/incunabula/v2#title',
                        '[Das] Narrenschiff (lat.)'
                    ),
                    new ReadTextValueAsString(
                        'http://rdfh.ch/8be1b7cf7103/values/0965b7d1b70d',
                        'http://0.0.0.0:3333/ontology/0803/incunabula/v2#title',
                        'Stultifera navis (...)'
                    )
                ],
                'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink': [
                    new ReadLinkValue(
                        'http://rdfh.ch/50e7460a7203/values/8bdc04c8-b765-44c8-adb3-5ab536dcd051',
                        'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink',
                        'http://rdfh.ch/50e7460a7203',
                        new ReadResource(
                            'http://rdfh.ch/50e7460a7203',
                            'http://0.0.0.0:3333/ontology/0803/incunabula/v2#page',
                            'vorderer Spiegel',
                            [],
                            [],
                            [],
                            [],
                            {
                                'http://0.0.0.0:3333/ontology/0803/incunabula/v2#partOfValue': [
                                    new ReadLinkValue(
                                        'http://rdfh.ch/50e7460a7203/values/8bdc04c8-b765-44c8-adb3-5ab536dcd051',
                                        'http://0.0.0.0:3333/ontology/0803/incunabula/v2#partOfValue',
                                        'http://rdfh.ch/8be1b7cf7103'
                                    )
                                ]
                            }
                        )
                    )
                ]
            };

            const BookResourceWithIncomingExpected = new ReadResource(
                'http://rdfh.ch/8be1b7cf7103',
                'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book',
                '[Das] Narrenschiff (lat.)',
                [],
                [],
                [],
                [],
                expectedProps
            );

            expect(receivedResource.resources[0]).toEqual(BookResourceWithIncomingExpected);

        });
    }));

    it('parse a JSON-LD document representing a book with incoming pages referring to the source via its Iri', async(() => {

        const jsonld = require('jsonld');

        const resultsForBookWithIncomingLink: any = require('../../../test-data/resources/BookWithIncomingPages2.json');

        const promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const promise = promises.compact(resultsForBookWithIncomingLink, {});

        promise.then((compacted) => {

            const receivedResource: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

            expect(receivedResource.numberOfResources).toEqual(1);

            const expectedProps: ReadProperties = {
                'http://0.0.0.0:3333/ontology/0803/incunabula/v2#title': [
                    new ReadTextValueAsString(
                        'http://rdfh.ch/8be1b7cf7103/values/463b6498b70d',
                        'http://0.0.0.0:3333/ontology/0803/incunabula/v2#title',
                        '[Das] Narrenschiff (lat.)'
                    ),
                    new ReadTextValueAsString(
                        'http://rdfh.ch/8be1b7cf7103/values/0965b7d1b70d',
                        'http://0.0.0.0:3333/ontology/0803/incunabula/v2#title',
                        'Stultifera navis (...)'
                    )
                ],
                'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink': [
                    new ReadLinkValue(
                        'http://rdfh.ch/50e7460a7203/values/8bdc04c8-b765-44c8-adb3-5ab536dcd051',
                        'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink',
                        'http://rdfh.ch/50e7460a7203'
                    )
                ]
            };

            const BookResourceWithIncomingExpected = new ReadResource(
                'http://rdfh.ch/8be1b7cf7103',
                'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book',
                '[Das] Narrenschiff (lat.)',
                [],
                [],
                [],
                [],
                expectedProps
            );

            expect(receivedResource.resources[0]).toEqual(BookResourceWithIncomingExpected);

        });
    }));



});
