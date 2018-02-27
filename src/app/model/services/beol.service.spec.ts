import { TestBed, inject } from '@angular/core/testing';

import { BeolService } from './beol.service';

describe('BeolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeolService]
    });
  });

  it('should be created', inject([BeolService], (service: BeolService) => {
    expect(service).toBeTruthy();
  }));
});
