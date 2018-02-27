import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BeolService} from "../../../model/services/beol.service";

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

    correspondences: Correspondence[];

    ngOnInit() {

        let LeonhardEuler = new Correspondent("Leonhard Euler 1707-1783", "(DE-588)118531379");

        let ChristianGoldbach = new Correspondent("Christian Goldbach 1690-1764", "(DE-588)118696149");

        let Johann_I_Bernoulli = new Correspondent("Johann I Bernoulli 1667-1748", "(DE-588)118509969");

        let Johann_Frick = new Correspondent("Johann Frick 1670-1739", "(DE-588)123393094");

        /**
         * Collection of correspondences the user can select from.
         */
        this.correspondences = [
            new Correspondence(LeonhardEuler, ChristianGoldbach),
            new Correspondence(Johann_I_Bernoulli, new Correspondent("Johann Jakob Scheuchzer 1672-1733", "(DE-588)118607308")),
            new Correspondence(Johann_I_Bernoulli, new Correspondent("Johannes Scheuchzer 1667-1748", "(DE-588)120379260")),
            new Correspondence(Johann_I_Bernoulli, new Correspondent("Christian Wolff 1679-1754", "(DE-588)118634771")),
            new Correspondence(Johann_I_Bernoulli, Johann_Frick)
        ];

    }


    /**
     * Generate KnarQL query to search for the correspondence between two persons.
     */
    searchForCorrespondence(gnd1: string, gnd2: string) {

        const knarql: string = this._beol.searchForCorrespondence(gnd1, gnd2);

        this.showCorrespondenceBetweenPersons(knarql);
    }

    /**
     * Show a correspondence between two persons.
     */
    private showCorrespondenceBetweenPersons(knarql: string) {

        this._router.navigate(['/search/extended/' + encodeURIComponent(knarql)], {relativeTo: this._route});
    }


}
