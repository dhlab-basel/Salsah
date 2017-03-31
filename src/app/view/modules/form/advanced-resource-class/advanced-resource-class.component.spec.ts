import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedResourceClassComponent } from './advanced-resource-class.component';

describe('AdvancedResourceClassComponent', () => {
  let component: AdvancedResourceClassComponent;
  let fixture: ComponentFixture<AdvancedResourceClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedResourceClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedResourceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
