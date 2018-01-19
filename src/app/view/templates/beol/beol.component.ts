import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BeolService} from "../../../model/services/beol.service";

class Correspondence {

    constructor(readonly name1: string, readonly gnd1: string, readonly name2: string, readonly gnd2: string) {

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

    ngOnInit() {
    }

    /**
     * Collection of correspondences the user can select from.
     */
    correspondences = [
        new Correspondence("Leonhard Euler 1707-1783", "(DE-588)118531379", "Christian Goldbach 1690-1764", "(DE-588)118696149"),
        new Correspondence("Johann I Bernoulli 1667-1748", "(DE-588)118509969", "Johann Jakob Scheuchzer 1672-1733", "(DE-588)118607308"),
        new Correspondence("Johann I Bernoulli 1667-1748", "(DE-588)118509969", "Johannes Scheuchzer 1667-1748", "(DE-588)120379260"),
        new Correspondence("Johann I Bernoulli 1667-1748", "(DE-588)118509969", "Christian Wolff 1679-1754", "(DE-588)118634771")
    ];


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
