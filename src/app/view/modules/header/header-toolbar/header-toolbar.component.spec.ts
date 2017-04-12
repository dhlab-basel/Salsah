/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderToolbarComponent } from './header-toolbar.component';
import {GravatarDirective} from "../../other/gravatar.directive";
import {SessionService} from "../../../../model/services/session.service";

describe('HeaderToolbarComponent', () => {
  let component: HeaderToolbarComponent;
  let fixture: ComponentFixture<HeaderToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          HeaderToolbarComponent
      ],
        imports: [],
        providers: [
            SessionService
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should modify', () => {
    expect(component).toBeTruthy();
  });
});
