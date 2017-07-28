import { TestBed, inject } from '@angular/core/testing';

import { IncomingService } from './incoming.service';

describe('IncomingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncomingService]
    });
  });

  it('should be created', inject([IncomingService], (service: IncomingService) => {
    expect(service).toBeTruthy();
  }));
});
