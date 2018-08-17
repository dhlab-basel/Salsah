import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadListValueComponent } from './read-list-value.component';
import { AppModule } from '../../../app.module';
import { AppRoutingModule } from '../../../app-routing.module';

describe('ReadListValueComponent', () => {
  let component: ReadListValueComponent;
  let fixture: ComponentFixture<ReadListValueComponent>;

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
    fixture = TestBed.createComponent(ReadListValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
