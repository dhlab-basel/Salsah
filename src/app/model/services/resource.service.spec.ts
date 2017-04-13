/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourceService } from './resource.service';
import {Http} from "@angular/http";
// import {HttpModule} from "@angular/http/src";

describe('ResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          ResourceService,
          {provide: Http}
      ],
      imports: []
    });
  });

  it('should ...', inject([ResourceService], (service: ResourceService) => {
    expect(service).toBeTruthy();
  }));
});
