import { TestBed, inject } from '@angular/core/testing';

import { SearchDataService } from './search-data.service';

describe('SearchDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchDataService]
    });
  });

  it('should be created', inject([SearchDataService], (service: SearchDataService) => {
    expect(service).toBeTruthy();
  }));
});
