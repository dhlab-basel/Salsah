/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import {ProjectsListComponent} from "../modules/listing/projects-list/projects-list.component";
import {ApiErrorComponent} from "../modules/error/api-error/api-error.component";
import {ProgressIndicatorComponent} from "../modules/other/progress-indicator/progress-indicator.component";
import {AppMaterialModule} from "../../app-material.module";
import {Router, RouterModule} from "@angular/router";
import {ProjectsService} from "../../model/services/projects.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          DashboardComponent,
          ProjectsListComponent,
          ApiErrorComponent,
          ProgressIndicatorComponent
      ],
      imports: [
          AppMaterialModule,
          RouterModule,
          RouterTestingModule
      ],
        providers: [
            {provide: Router},
            {provide: ProjectsService}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should modify', () => {
    expect(component).toBeTruthy();
  });
});
