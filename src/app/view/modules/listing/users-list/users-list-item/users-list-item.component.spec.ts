import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListItemComponent } from './users-list-item.component';

describe('UsersListItemComponent', () => {
  let component: UsersListItemComponent;
  let fixture: ComponentFixture<UsersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
