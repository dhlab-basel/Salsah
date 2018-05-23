import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressIndicatorComponent } from './progress-indicator.component';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';

describe('ProgressIndicatorComponent', () => {
  let component: ProgressIndicatorComponent;
  let fixture: ComponentFixture<ProgressIndicatorComponent>;

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
    fixture = TestBed.createComponent(ProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});