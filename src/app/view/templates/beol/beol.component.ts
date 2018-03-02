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

        // TODO Jean Boecler

        // TODO Brandenburgische Sozietät

        // TODO const Gerog_Faeh = new Correspondent("Georg Faeh","");

        const Robert_Falconer = new Correspondent("Robert Falconer", "(DE-588)1141833808");

        const Michelangelo_Fardella = new Correspondent("Michelangelo Fardella", "(DE-588)119291967");

        const Bernard_le_Bouyer_Bovier_de_Fontenelle = new Correspondent("Bernard le Bouyer Bovier de Fontenelle", "(DE-588)118639056");

        const Du_Fresne = new Correspondent("Du Fresne", "(DE-588)1142274934");

        const Amedee_Francois_Frezier = new Correspondent("Amedee Francois Frezier", "(DE-588)117537373");

        const S_J_Vitus_Friesl = new Correspondent("S J Friesl","(DE-588)10012786X");

        const Johann_Caspar_Funck = new Correspondent("Johann Caspar Funck", "(DE-588)143843133");

        const Johannes_Gessner = new Correspondent("Johannes Gessner","(DE-588)119331136");

        const Nicasius_Grammatici = new Correspondent("Nicasius_Grammatici", "(DE-588)100108296");

        const Jean_Paul_Gua_de_Malves = new Correspondent("Jean Paul Gua de Malves", "(DE-588)117572535");

        const Edmond_Halley = new Correspondent("Edmond Halley","(DE-588)118720066");

        // TODO Peter Hammer

        const German_Hermann = new Correspondent("German Hermann","(DE-588)1048628825");

        const Jacob_Hermann = new Correspondent("Jacob Hermann","(DE-588)119112450");

        const Jacob_Christoph_Iselin = new Correspondent("Jacob Christoph Iselin","(DE-588)117205508");

        const Adam_Meson_Isink = new Correspondent("Adam Meson Isink","(DE-588)1141836106");

        const Johann_Theodor_Jablonski = new Correspondent("Johann Theodor Jablonski","(DE-588)120517892");

        const Christian_Kortholt = new Correspondent("Christian Kortholt","(DE-588)116341815");

        const Jacques_L_Enfant = new Correspondent("Jacques L Enfant","(DE-588)117636290");

        const Daniel_Le_Clerc = new Correspondent("Daniel Le Clerc","(DE-588)116850841");

        const Johann_Wilhelm_Theodor_Leichner = new Correspondent("Johann Wilhelm Theodor Leichner","(DE-588)1052878059");

        const Henry_Leslie = new Correspondent("Henry Leslie","(DE-588)1141836866");

        const Johann_Georg_Liebknecht = new Correspondent("Johann Georg Liebknecht","(DE-588)116997052");

        const Pierre_Louis_Moreau_de_Maupertuis = new Correspondent("Pierre Louis Moreau de Maupertuis", "(DE-588)118731998");

        const Johann_Burckhard_Mencke = new Correspondent("Johann Burckhard Mencke", "(DE-588)118783181");

        const Johann_Rudolf_Mieg = new Correspondent("Johann Rudolf Mieg","(DE-588)104138556");

        const Pierre_Remond_de_Montmort = new Correspondent("Pierre_Remond_de_Montmort", "(DE-588)117601020");

        const Giovanni_Battista_Morgagni = new Correspondent("Giovanni Battista Morgagni","(DE-588)104265264");

        const Johann_Joosten_van_Musschenbroek = new Correspondent("Johann Joosten van Musschenbroek", "(DE-588)1089913966");

        const Theodor_Muykens = new Correspondent("Theodor Muykens","(DE-588)128862130");

        const Gerhard_Noodt = new Correspondent("Gerhard Noodt","(DE-588)118869361");

        const Louis_Leon_Payot_Comte_de_Onsembray = new Correspondent("Louis Leon Payot Comte de Onsembray","(DE-588)117679879");

        const Jean_Frederic_Osterwald = new Correspondent("Jean Frederic Osterwald","(DE-588)12364433X");

        const Jean_Rodolphe_Osterwald = new Correspondent("Jean Rodolphe Osterwald", "(DE-588)104243236");

        const Domenico_Passionei = new Correspondent("Domenico Passionei","(DE-588)116052546");

        const Leopold_Gottlieb_Graf_von_Pergen = new Correspondent("Leopold Gottlieb Graf von Pergen","(DE-588)114183734X");

        const Christoph_Pflug = new Correspondent("Christoph Pflug", "(DE-588)1142279391");

        const Giovanni_Poleni = new Correspondent("Giovanni Poleni", "(DE-588)11887733X");

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
                    new Correspondence(Johann_I_Bernoulli, Robert_Falconer),
                    new Correspondence(Johann_I_Bernoulli, Michelangelo_Fardella),
                    new Correspondence(Johann_I_Bernoulli, Bernard_le_Bouyer_Bovier_de_Fontenelle),
                    new Correspondence(Johann_I_Bernoulli, Du_Fresne),
                    new Correspondence(Johann_I_Bernoulli, Amedee_Francois_Frezier),
                    new Correspondence(Johann_I_Bernoulli, Johann_Frick), // TODO: 0000-00-00_Bernoulli_Johann_I-Frick_Johannes has no date and does not show up!
                    new Correspondence(Johann_I_Bernoulli, S_J_Vitus_Friesl),
                    new Correspondence(Johann_I_Bernoulli, Johann_Caspar_Funck),
                    new Correspondence(Johann_I_Bernoulli, Johannes_Gessner),
                    new Correspondence(Johann_I_Bernoulli, Christian_Goldbach),
                    new Correspondence(Johann_I_Bernoulli, Nicasius_Grammatici),
                    new Correspondence(Johann_I_Bernoulli, Jean_Paul_Gua_de_Malves),
                    new Correspondence(Johann_I_Bernoulli, Edmond_Halley),
                    new Correspondence(Johann_I_Bernoulli, German_Hermann),
                    new Correspondence(Johann_I_Bernoulli, Jacob_Hermann),
                    new Correspondence(Johann_I_Bernoulli, Jacob_Christoph_Iselin),
                    new Correspondence(Johann_I_Bernoulli, Adam_Meson_Isink),
                    new Correspondence(Johann_I_Bernoulli, Johann_Theodor_Jablonski),
                    new Correspondence(Johann_I_Bernoulli, Christian_Kortholt),
                    new Correspondence(Johann_I_Bernoulli, Jacques_L_Enfant),
                    new Correspondence(Johann_I_Bernoulli, Daniel_Le_Clerc),
                    new Correspondence(Johann_I_Bernoulli, Johann_Wilhelm_Theodor_Leichner),
                    new Correspondence(Johann_I_Bernoulli, Henry_Leslie),
                    new Correspondence(Johann_I_Bernoulli, Johann_Georg_Liebknecht),
                    new Correspondence(Johann_I_Bernoulli, Pierre_Louis_Moreau_de_Maupertuis),
                    new Correspondence(Johann_I_Bernoulli, Johann_Burckhard_Mencke),
                    new Correspondence(Johann_I_Bernoulli, Johann_Rudolf_Mieg),
                    new Correspondence(Johann_I_Bernoulli, Pierre_Remond_de_Montmort),
                    new Correspondence(Johann_I_Bernoulli, Giovanni_Battista_Morgagni),
                    new Correspondence(Johann_I_Bernoulli, Johann_Joosten_van_Musschenbroek),
                    new Correspondence(Johann_I_Bernoulli, Theodor_Muykens),
                    new Correspondence(Johann_I_Bernoulli, Gerhard_Noodt),
                    new Correspondence(Johann_I_Bernoulli, Louis_Leon_Payot_Comte_de_Onsembray),
                    new Correspondence(Johann_I_Bernoulli, Jean_Frederic_Osterwald),
                    new Correspondence(Johann_I_Bernoulli, Jean_Rodolphe_Osterwald),
                    new Correspondence(Johann_I_Bernoulli, Domenico_Passionei),
                    new Correspondence(Johann_I_Bernoulli, Leopold_Gottlieb_Graf_von_Pergen),
                    new Correspondence(Johann_I_Bernoulli, Christoph_Pflug),
                    new Correspondence(Johann_I_Bernoulli, Giovanni_Poleni),

                    new Correspondence(Johann_I_Bernoulli, Johann_Jakob_Scheuchzer),
                    new Correspondence(Johann_I_Bernoulli, Johannes_Scheuchzer),
                    new Correspondence(Johann_I_Bernoulli, Christian_Wolf),

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
