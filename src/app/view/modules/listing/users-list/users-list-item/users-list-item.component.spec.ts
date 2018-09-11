import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListItemComponent } from './users-list-item.component';
import { AppModule } from '../../../../../app.module';
import { AppRoutingModule } from '../../../../../app-routing.module';

describe('UsersListItemComponent', () => {
  let component: UsersListItemComponent;
  let fixture: ComponentFixture<UsersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        AppRoutingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
