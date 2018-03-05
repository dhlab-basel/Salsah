import {async, inject, TestBed} from '@angular/core/testing';

import {BeolService} from './beol.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

describe('BeolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpModule,
            HttpClientModule
        ],
        providers: [BeolService]
    });
  });


    xit('nothing tested', async(inject(
        [BeolService], (service) => {
            expect(service).toBeDefined();
        }))
    );

});
