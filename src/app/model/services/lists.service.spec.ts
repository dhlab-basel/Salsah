import { TestBed, inject } from '@angular/core/testing';

import { ListsService } from './lists.service';

describe('ListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListsService]
    });
  });

  it('should be created', inject([ListsService], (service: ListsService) => {
    expect(service).toBeTruthy();
  }));
});
