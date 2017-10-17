import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {OntologyService} from './ontology.service';

describe('OntologyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                OntologyService
            ]
        });
    });

    it('should be created', inject([OntologyService], (service: OntologyService) => {
        expect(service).toBeTruthy();
    }));
});
