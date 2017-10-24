import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OntologyInformation} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";

@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    result: ReadResourcesSequence = new ReadResourcesSequence([], 0);
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`

    constructor(private _route: ActivatedRoute,
                private _router: Router) {
    }

    ngOnInit() {

    }

    performExtendedSearch() {

        // TODO: Create this Sparql from a GUI-form
        /*let sparql = `
            PREFIX beol: <http://0.0.0.0:3333/ontology/beol/simple/v2#>
            PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

            CONSTRUCT {
                ?letter knora-api:isMainResource true .

                ?letter beol:creationDate ?date .

            } WHERE {
                ?letter a knora-api:Resource .
                ?letter a beol:letter .

                ?letter beol:creationDate ?date .
                beol:creationDate knora-api:objectType knora-api:Date .

                ?date a knora-api:Date .

                # Scheuchzer, Johann Jacob 1672-1733
                ?letter ?linkingProp1  <http://rdfh.ch/beol/ZkJcQg9yTmyMY_J6nnubxA> .
                ?linkingProp1 knora-api:objectType knora-api:Resource .
                FILTER(?linkingProp1 = beol:hasAuthor || ?linkingProp1 = beol:hasRecipient )

                <http://rdfh.ch/beol/ZkJcQg9yTmyMY_J6nnubxA> a knora-api:Resource .

                # Hermann, Jacob 1678-1733
                ?letter ?linkingProp2 <http://rdfh.ch/beol/_yblAQMwT2un_xN7UaVWrg> .
                ?linkingProp2 knora-api:objectType knora-api:Resource .

                FILTER(?linkingProp2 = beol:hasAuthor || ?linkingProp2 = beol:hasRecipient )

                <http://rdfh.ch/beol/_yblAQMwT2un_xN7UaVWrg> a knora-api:Resource .
            } ORDER BY ?date
        `;


        this._router.navigate(['/search/extended/' + encodeURIComponent(sparql)], {relativeTo: this._route});*/
    }

}
