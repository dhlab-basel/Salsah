import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceObjectComponent } from './resource-object.component';

describe('ResourceObjectComponent', () => {
  let component: ResourceObjectComponent;
  let fixture: ComponentFixture<ResourceObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
