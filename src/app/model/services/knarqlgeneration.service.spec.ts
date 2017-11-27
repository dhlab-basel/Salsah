import { TestBed, inject } from '@angular/core/testing';

import { KnarqlgenerationService } from './knarqlgeneration.service';

describe('KnarqlgenerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnarqlgenerationService]
    });
  });

  it('should be created', inject([KnarqlgenerationService], (service: KnarqlgenerationService) => {
    expect(service).toBeTruthy();
  }));
});
