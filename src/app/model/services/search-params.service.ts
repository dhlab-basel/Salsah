import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {PropertyWithValue} from "../../view/modules/search/extended-search/select-property/select-property.component";


/**
 * Represents teh parameters of an extended search.
 */
export class ExtendedSearchParams {

    /**
     *
     * @param {PropertyWithValue[]} properties the specification of the properties.
     * @param {string} resourceClass the resource class to restrict the search to, if set.
     */
    constructor(public readonly properties: PropertyWithValue[], public readonly resourceClass?: string) {

    }

}



@Injectable()
/**
 * Temporarily stores the parameters of an extended search.
 */
export class SearchParamsService {

    // init empty params
    private searchParamsMessage = new BehaviorSubject<ExtendedSearchParams>(new ExtendedSearchParams([]));
    currentSearchParams = this.searchParamsMessage.asObservable();

    constructor() {
    }

    /**
     * Update the parameters of an extended seacrh.
     *
     * @param {ExtendedSearchParams} searchParams
     */
    changeSearchParamsMsg(searchParams: ExtendedSearchParams) {
        this.searchParamsMessage.next(searchParams);
    }


}
