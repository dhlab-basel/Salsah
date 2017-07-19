import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUsersComponent } from './system-users.component';

describe('SystemUsersComponent', () => {
  let component: SystemUsersComponent;
  let fixture: ComponentFixture<SystemUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
