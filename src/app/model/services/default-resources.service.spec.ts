import { TestBed, inject } from '@angular/core/testing';

import { DefaultResourcesService } from './default-resources.service';

describe('DefaultResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultResourcesService]
    });
  });

  it('should be created', inject([DefaultResourcesService], (service: DefaultResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
