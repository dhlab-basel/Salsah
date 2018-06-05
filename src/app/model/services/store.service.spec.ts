import {async, inject, TestBed} from '@angular/core/testing';
import {StoreService} from './store.service';
import {HttpClientModule} from '@angular/common/http';


describe('StoreService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                StoreService
            ]
        });
    });

    it('should be created', async(inject(
        [StoreService], (service) => {
            expect(service).toBeDefined();
        }))
    );


    it('#resetTriplestoreContent should load test data [it]', async(inject(
        [StoreService], (service) => {

            expect(service).toBeDefined();

            service.resetTriplestoreContent([])
                .subscribe(
                    (result: string) => {
                        expect(result).toBe('success');
                });

        })), 300000);

});
