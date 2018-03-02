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
    constructor(readonly name: string, readonly gnd: string) {
    }
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

        const Leonhard_Euler = new Correspondent("Leonhard Euler", "(DE-588)118531379");

        const Christian_Goldbach = new Correspondent("Christian Goldbach", "(DE-588)118696149");

        const Daniel_I_Bernoulli = new Correspondent("Daniel I Bernoulli", "(DE-588)118656503");

        const Johann_I_Bernoulli = new Correspondent("Johann I Bernoulli", "(DE-588)118509969");

        const Johannes_Scheuchzer = new Correspondent("Johannes Scheuchzer", "(DE-588)120379260");

        const Johann_Jakob_Scheuchzer = new Correspondent("Johann Jakob Scheuchzer", "(DE-588)118607308");

        const John_Arnold = new Correspondent("John Arnold", "(DE-588)1141832453");

        const Christian_Wolf = new Correspondent("Christian Wolff", "(DE-588)118634771");

        const Johann_Frick = new Correspondent("Johann Frick", "(DE-588)123393094");

        const Henri_Basnage_de_Beauval = new Correspondent("Henri Basnage de Beauval", "(DE-588)12053827X");

        const Christoph_Battier = new Correspondent("Christoph Battier", "(DE-588)141546573");

        const Georg_Bernhard_Bilfinger = new Correspondent("Georg Bernhard Bilfinger", "(DE-588)118663208");

        const Johann_Wendel_Bilfinger = new Correspondent("Johann Wendel Bilfinger", "(DE-588)104171057");

        const Pierre_Bouguer = new Correspondent("Pierre Bouguer", "(DE-588)117622974");

        const Marc_Michel_Bousquet = new Correspondent("Marc Michel Bousquet","(DE-588)136952968");

        const William_Burnet = new Correspondent("William Burnet", "(DE-588)104185643");

        const Johann_Buxtorf = new Correspondent("Johann Buxtorf", "(DE-588)12068943X");

        const George_Cheyne = new Correspondent("George Cheyne","(DE-588)117659606");

        const Alexis_Claude_Clairaut = new Correspondent("Alexis Claude Clairaut","(DE-588)11852092X");

        const Jean_Pierre_de_Crousaz = new Correspondent("Jean Pierre de Crousaz","(DE-588)100097413");

        /**
         * Collection of correspondences the user can select from.
         */
        this.correspondenceGroups = [
            new CorrespondenceGroup(Leonhard_Euler, [new Correspondence(Leonhard_Euler, Christian_Goldbach)], true),
            new CorrespondenceGroup(Leonhard_Euler, [new Correspondence(Leonhard_Euler, Christian_Goldbach)], false),
            new CorrespondenceGroup(Daniel_I_Bernoulli, [new Correspondence(Daniel_I_Bernoulli, Johannes_Scheuchzer)], false),
            new CorrespondenceGroup(Johann_I_Bernoulli,
                [
                    new Correspondence(Johann_I_Bernoulli, John_Arnold),
                    new Correspondence(Johann_I_Bernoulli, Henri_Basnage_de_Beauval),
                    new Correspondence(Johann_I_Bernoulli, Christoph_Battier),
                    new Correspondence(Johann_I_Bernoulli, Georg_Bernhard_Bilfinger),
                    new Correspondence(Johann_I_Bernoulli, Johann_Wendel_Bilfinger),
                    new Correspondence(Johann_I_Bernoulli, Pierre_Bouguer),
                    new Correspondence(Johann_I_Bernoulli, Marc_Michel_Bousquet),
                    new Correspondence(Johann_I_Bernoulli, William_Burnet),
                    new Correspondence(Johann_I_Bernoulli, Johann_Buxtorf),
                    new Correspondence(Johann_I_Bernoulli, George_Cheyne),
                    new Correspondence(Johann_I_Bernoulli, Alexis_Claude_Clairaut),
                    new Correspondence(Johann_I_Bernoulli, Jean_Pierre_de_Crousaz),
                    new Correspondence(Johann_I_Bernoulli, Johann_Jakob_Scheuchzer),
                    new Correspondence(Johann_I_Bernoulli, Johannes_Scheuchzer),
                    new Correspondence(Johann_I_Bernoulli, Christian_Wolf),
                    new Correspondence(Johann_I_Bernoulli, Johann_Frick)
                ],
                false)
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
