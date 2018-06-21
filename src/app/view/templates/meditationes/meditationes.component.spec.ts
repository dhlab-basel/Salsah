import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationesComponent } from './meditationes.component';

describe('MeditationesComponent', () => {
  let component: MeditationesComponent;
  let fixture: ComponentFixture<MeditationesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditationesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditationesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
