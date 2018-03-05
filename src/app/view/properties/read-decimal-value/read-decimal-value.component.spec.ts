import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {AppMaterialModule} from '../../../app-material-module';
import { ReadDecimalValueComponent } from './read-decimal-value.component';

describe('ReadDecimalValueComponent', () => {
  let component: ReadDecimalValueComponent;
  let fixture: ComponentFixture<ReadDecimalValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            AppModule,
            AppMaterialModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDecimalValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
