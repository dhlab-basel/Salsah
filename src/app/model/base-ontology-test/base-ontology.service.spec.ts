/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseOntologyService } from './base-ontology.service';

describe('BaseOntologyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseOntologyService]
    });
  });

  it('should ...', inject([BaseOntologyService], (service: BaseOntologyService) => {
    expect(service).toBeTruthy();
  }));
});
