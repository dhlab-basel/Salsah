import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpModule} from "@angular/http";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
