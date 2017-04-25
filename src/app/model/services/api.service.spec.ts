import {TestBed, async, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {ApiService} from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            AppModule
        ],
        providers: [
            ApiService
        ]

    });
  });

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
