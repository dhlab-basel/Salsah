/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideoObjectComponent } from './video-object.component';

describe('VideoObjectComponent', () => {
  let component: VideoObjectComponent;
  let fixture: ComponentFixture<VideoObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
