import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BeolService} from "../../../model/services/beol.service";

class Book {

    constructor(readonly title: string, readonly isbn: string) {

    }

}

/**
 * Represents a correspondent.
 */
class Correspondent {

    /**
     * Represents a person that took part in a correspondence.
     *
     * @param {string} name the name of the person.
     * @param {string} gnd the GND/IAF identifier of the person.
     */
    constructor(readonly name: string, readonly gnd: string) {}
}

class CorrespondenceGroup {

    constructor(readonly mainCorrespondent: Correspondent, readonly correspondences: Correspondence[], readonly noTranslations: boolean) {

    }

}

/**
 * Represents a correspondence between two persons.
 * A correspondence consists of all the letters exchanged between two persons (they are either the author or recipient).
 */
class Correspondence {

    constructor(readonly correspondent1: Correspondent, readonly correspondent2: Correspondent) {

}

}

@Component({
    selector: 'salsah-beol',
    templateUrl: './beol.component.html',
    styleUrls: ['./beol.component.scss']
})
export class BeolComponent implements OnInit {

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _beol: BeolService) {
    }

    books: Book[];

    correspondenceGroups: CorrespondenceGroup[];

    ngOnInit() {

        this.books = [new Book("LEOO IVA.IV", "978-3-0348-0880-4")];

        let LeonhardEuler = new Correspondent("Leonhard Euler", "(DE-588)118531379");

        let ChristianGoldbach = new Correspondent("Christian Goldbach", "(DE-588)118696149");

        let Johann_I_Bernoulli = new Correspondent("Johann I Bernoulli", "(DE-588)118509969");

        let Johann_Frick = new Correspondent("Johann Frick", "(DE-588)123393094");

        /**
         * Collection of correspondences the user can select from.
         */
        this.correspondenceGroups = [
            new CorrespondenceGroup(LeonhardEuler, [new Correspondence(LeonhardEuler, ChristianGoldbach)], true),
            new CorrespondenceGroup(LeonhardEuler, [new Correspondence(LeonhardEuler, ChristianGoldbach)], false),
            new CorrespondenceGroup(Johann_I_Bernoulli, [new Correspondence(Johann_I_Bernoulli, new Correspondent("John Arnold", "(DE-588)1141832453")), new Correspondence(Johann_I_Bernoulli, new Correspondent("Johann Jakob Scheuchzer", "(DE-588)118607308")), new Correspondence(Johann_I_Bernoulli, new Correspondent("Johannes Scheuchzer", "(DE-588)120379260")), new Correspondence(Johann_I_Bernoulli, new Correspondent("Christian Wolff", "(DE-588)118634771")), new Correspondence(Johann_I_Bernoulli, Johann_Frick)], false)
        ];

    }

    searchForBook(isbn: string) {

        const knarql: string = this._beol.searchForBook(isbn);

        this.submitQuery(knarql);
    }

    /**
     * Generate KnarQL query to search for the correspondence between two persons.
     *
     * @param {string} gnd1 GND of the first correspondent.
     * @param {string} gnd2 GND of the second correspondent.
     * @param {boolean} noTranslations indicates if translations should be excluded.
     */
    searchForCorrespondence(gnd1: string, gnd2: string, noTranslations: boolean) {

        const knarql: string = this._beol.searchForCorrespondence(gnd1, gnd2, noTranslations, 0);

        this.submitQuery(knarql);
    }

    /**
     * Show a correspondence between two persons.
     *
     * @param {string} knarql the KnarQL query to be executed.
     */
    private submitQuery(knarql: string) {

        this._router.navigate(['/search/extended/' + encodeURIComponent(knarql)], {relativeTo: this._route});
    }


}
