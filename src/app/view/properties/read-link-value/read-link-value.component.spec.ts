import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../app.module';
import { AppMaterialModule } from '../../../app-material-module';
import { ReadLinkValueComponent } from './read-link-value.component';

describe('ReadLinkValueComponent', () => {
  let component: ReadLinkValueComponent;
  let fixture: ComponentFixture<ReadLinkValueComponent>;

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
    fixture = TestBed.createComponent(ReadLinkValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
