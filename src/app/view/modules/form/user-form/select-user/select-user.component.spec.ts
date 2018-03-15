import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserComponent } from './select-user.component';
import {AppModule} from '../../../../../app.module';
import {UsersService} from '../../../../../model/services/users.service';

describe('SelectUserComponent', () => {
  let component: SelectUserComponent;
  let fixture: ComponentFixture<SelectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            AppModule
        ],
        providers: [
            UsersService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
