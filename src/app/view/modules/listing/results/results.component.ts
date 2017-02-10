import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../../../model/api/search.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Search} from "../../../../model/classes/search";

@Component({
    selector: 'salsah-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    isLoading: boolean = true;

    results: Search = new Search();
    errorMessage: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _searchService: SearchService
    ) {
    }

    ngOnInit() {

        this._activatedRoute.params.forEach((params: Params) => {
            let query = params['q'];


            this._searchService.doSearch(query)
                .subscribe(
                    (data: Search) => {
                        this.results = data;
                        console.log(this.results);
                        this.isLoading = false;
                    },
                    error => {
                        this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                        this.isLoading = false;
                    }
                );

        });


    }

}
