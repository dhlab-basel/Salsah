import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemComponent } from './system.component';
import {AppModule} from '../../../app.module';
import {AppMaterialModule} from '../../../app-material-module';
import {AppRoutingModule} from '../../../app-routing.module';

describe('SystemComponent', () => {
  let component: SystemComponent;
  let fixture: ComponentFixture<SystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        AppMaterialModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
