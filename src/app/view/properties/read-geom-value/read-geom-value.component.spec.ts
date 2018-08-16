import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadGeomValueComponent } from './read-geom-value.component';

describe('ReadGeomValueComponent', () => {
  let component: ReadGeomValueComponent;
  let fixture: ComponentFixture<ReadGeomValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadGeomValueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadGeomValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
