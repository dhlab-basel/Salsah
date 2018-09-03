import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationesComponent } from './meditationes.component';
import {StillImageOSDViewerComponent} from '../../properties/still-image-osdviewer/still-image-osdviewer.component';
import {OntologyInformation} from '../../../model/services/ontologycache.service';
import {AppModule} from '../../../app.module';

describe('MeditationesComponent', () => {
  let component: MeditationesComponent;
  let fixture: ComponentFixture<MeditationesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ AppModule ],
        declarations: [],

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
