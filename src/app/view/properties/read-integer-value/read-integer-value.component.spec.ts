import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {AppMaterialModule} from '../../../app-material-module';
import { ReadIntegerValueComponent } from './read-integer-value.component';

describe('ReadIntegerValueComponent', () => {
  let component: ReadIntegerValueComponent;
  let fixture: ComponentFixture<ReadIntegerValueComponent>;

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
    fixture = TestBed.createComponent(ReadIntegerValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
