import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { StillImageOSDViewerComponent } from './still-image-osdviewer.component';
import { ReadStillImageFileValue } from "../../../model/webapi/knora/v2/read-property-item";

// create test input data

let stillImageFullSize: ReadStillImageFileValue = new ReadStillImageFileValue(
    "http://data.knora.org/22cf0ce68901/reps/dd4b1264ff02",
    "http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue",
    "incunabula_0000001722.jp2",
    "http://localhost:1024/knora",
    "http://localhost:1024/knora/incunabula_0000001722.jp2/full/3428,5061/0/default.jpg",
    3428,
    5061,
    false
);

let stillImagePreview: ReadStillImageFileValue = new ReadStillImageFileValue(
    "http://data.knora.org/22cf0ce68901/reps/dd4b1264ff02",
    "http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue",
    "incunabula_0000001722.jp2",
    "http://localhost:1024/knora",
    "http://localhost:1024/knora/incunabula_0000001722.jpg/full/86,128/0/default.jpg",
    86,
    128,
    true
);

// define and create host component

@Component({
  template: `<salsah-still-image-osdviewer
              [fileValues]="fileValuesHost" [ignorePreviews]="ignorePreviewsHost">
             </salsah-still-image-osdviewer>`
})
class TestHostComponent {
  fileValuesHost: ReadStillImageFileValue[] = [];
  ignorePreviewsHost : boolean = true;
  @ViewChild(StillImageOSDViewerComponent) osdViewerComp: StillImageOSDViewerComponent;
}

// tests

describe('StillImageOSDViewerComponent', () => {
  let component: StillImageOSDViewerComponent;
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StillImageOSDViewerComponent, TestHostComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.componentInstance.osdViewerComp;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // atm StillImageOSDViewerComponent has no public methods or members except ngOnInit, ngOnChanges, etc
  // to be able to test state of StillImageOSDViewerComponent we use the following technique:
  // test private methods, members with: component["method"](param), or compomnent["member"]
  // this prevents TS compiler from restricting access, while still checking type safety.

  it('should have initialized viewer after fileValues change', () => {
    host.fileValuesHost = [ stillImageFullSize ];
    fixture.detectChanges();
    expect(component["viewer"]).toBeTruthy();
  });

  it('should have OpenSeadragon.Viewer.isVisible() == true after fileValues change', () => {
    host.fileValuesHost = [ stillImageFullSize ];
    fixture.detectChanges();
    expect(component["viewer"].isVisible()).toBeTruthy();
  });

  it('should have 1 image after fileValues = [fullSizeImg, previewImg] with ignorePreviews = true', () => {
    host.ignorePreviewsHost = true;
    host.fileValuesHost = [ stillImageFullSize, stillImagePreview ];
    fixture.detectChanges();
    component["viewer"].addHandler('open', function (args) {
      expect(component["viewer"].world.getItemCount()).toEqual(1);
    })
    component["viewer"].addHandler('open-failed', function (args) {
      expect(component["viewer"].world.getItemCount()).toEqual(0);
    })
  });

  it('should have 2 image after fileValues = [fullSizeImg, previewImg] with ignorePreviews = false', () => {
    host.ignorePreviewsHost = false;
    host.fileValuesHost = [ stillImageFullSize, stillImagePreview ];
    fixture.detectChanges();
    component["viewer"].addHandler('open', function (args) {
      expect(component["viewer"].world.getItemCount()).toEqual(2);
    })
    component["viewer"].addHandler('open-failed', function (args) {
      expect(component["viewer"].world.getItemCount()).toEqual(0);
    })
  });

});
