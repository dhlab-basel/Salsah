import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";


/**
 * Represents teh parameters of an extended search.
 */
export class ExtendedSearchParams {

    /**
     *
     * @param generateKnarQL a function the generates KnarQL.
     *                       The function is expected to take the offset
     *                       as a parameter and return a KnarQL query string.
     */
    constructor(public generateKnarQL: (offset: number) => string) {

    }

}



@Injectable()
/**
 * Temporarily stores the parameters of an extended search.
 */
export class SearchParamsService {

    // init with a dummy function
    private searchParamsMessage = new BehaviorSubject<ExtendedSearchParams>(new ExtendedSearchParams((offset: number) => ''));
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
