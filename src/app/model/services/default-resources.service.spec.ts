import { TestBed, inject } from '@angular/core/testing';

import { DefaultResourcesService } from './default-resources.service';
import {AppModule} from "../../app.module";
import {AppRoutingModule} from "../../app-routing.module";
import {ApiService} from "./api.service";

describe('DefaultResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            AppModule,
            AppRoutingModule
        ],
        providers: [
            ApiService,
            DefaultResourcesService
        ]
    });
  });

  it('should be created', inject([DefaultResourcesService], (service: DefaultResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
