/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {PropertiesService} from './properties.service';
import {Http} from "@angular/http";
// import {HttpModule} from "@angular/http/src";

describe('PropertiesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PropertiesService,
                {provide: Http}
            ],
            imports: []
        });
    });

    it('should ...', inject([PropertiesService], (service: PropertiesService) => {
        expect(service).toBeTruthy();
    }));
});
