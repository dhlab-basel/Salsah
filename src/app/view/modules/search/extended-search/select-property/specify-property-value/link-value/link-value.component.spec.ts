import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkValueComponent } from './link-value.component';

describe('LinkValueComponent', () => {
  let component: LinkValueComponent;
  let fixture: ComponentFixture<LinkValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
