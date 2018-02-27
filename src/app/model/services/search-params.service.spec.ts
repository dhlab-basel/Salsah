import { TestBed, inject } from '@angular/core/testing';

import { SearchParamsService } from './search-params.service';

describe('SearchParamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchParamsService]
    });
  });

  it('should be created', inject([SearchParamsService], (service: SearchParamsService) => {
    expect(service).toBeTruthy();
  }));
});
