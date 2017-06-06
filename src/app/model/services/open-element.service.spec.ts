import { TestBed, inject } from '@angular/core/testing';

import { OpenElementService } from './open-element.service';

describe('OpenElementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenElementService]
    });
  });

  it('should be created', inject([OpenElementService], (service: OpenElementService) => {
    expect(service).toBeTruthy();
  }));
});
