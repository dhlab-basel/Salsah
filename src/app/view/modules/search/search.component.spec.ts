/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchComponent } from './search.component';
import {FormsModule} from "@angular/forms";
import {ExtendedSearchComponent} from "./extended-search/extended-search.component";
import {SimpleSearchComponent} from "./simple-search/simple-search.component";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          SearchComponent,
          SimpleSearchComponent,
          ExtendedSearchComponent
      ],
        imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should modify', () => {
    expect(component).toBeTruthy();
  });
});
