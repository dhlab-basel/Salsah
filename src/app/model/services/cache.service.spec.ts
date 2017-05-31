import { TestBed, inject } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
  });

  it('should ...', inject([CacheService], (service: CacheService) => {
    expect(service).toBeTruthy();
  }));
});
