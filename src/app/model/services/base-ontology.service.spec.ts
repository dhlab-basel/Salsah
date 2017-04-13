import { TestBed, inject } from '@angular/core/testing';

import { BaseOntologyService } from './base-ontology.service';
import {HttpModule} from "@angular/http";

describe('BaseOntologyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseOntologyService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([BaseOntologyService], (service: BaseOntologyService) => {
    expect(service).toBeTruthy();
  }));
});
