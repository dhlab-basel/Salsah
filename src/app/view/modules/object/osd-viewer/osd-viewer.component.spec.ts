import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsdViewerComponent } from './osd-viewer.component';
import {AppModule} from "../../../../app.module";
import {AppMaterialModule} from "../../../../app-material-module";
import {AppRoutingModule} from "../../../../app-routing.module";

describe('OsdViewerComponent', () => {
  let component: OsdViewerComponent;
  let fixture: ComponentFixture<OsdViewerComponent>;

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
    fixture = TestBed.createComponent(OsdViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
