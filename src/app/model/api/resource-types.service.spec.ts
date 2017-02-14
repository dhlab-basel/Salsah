/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourceTypesService } from './resource-types.service';

describe('ResourceTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceTypesService]
    });
  });

  it('should ...', inject([ResourceTypesService], (service: ResourceTypesService) => {
    expect(service).toBeTruthy();
  }));
});
