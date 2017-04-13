/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourceTypesService } from './resource-types.service';
import {HttpModule} from "@angular/http";

describe('ResourceTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceTypesService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([ResourceTypesService], (service: ResourceTypesService) => {
    expect(service).toBeTruthy();
  }));
});
