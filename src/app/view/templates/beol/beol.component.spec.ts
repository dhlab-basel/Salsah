import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeolComponent } from './beol.component';
import { AppModule } from '../../../app.module';

describe('BeolComponent', () => {
  let component: BeolComponent;
  let fixture: ComponentFixture<BeolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
