import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';

import {ImageRegion, StillImageOSDViewerComponent, StillImageRepresentation} from './still-image-osdviewer.component';
import {ReadStillImageFileValue} from "../../../model/webapi/knora/v2/read-property-item";
import {ReadResource} from "../../../model/webapi/knora/v2/read-resource";
import {ReadResourcesSequence} from "../../../model/webapi/knora/v2/read-resources-sequence";
import {ConvertJSONLD} from "../../../model/webapi/knora/v2/convert-jsonld";

// create test input data

let stillImageFullSize: ReadStillImageFileValue = new ReadStillImageFileValue(
    'http://data.knora.org/22cf0ce68901/reps/dd4b1264ff02',
    'http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue',
    'incunabula_0000001722.jp2',
    'http://localhost:1024/knora',
    'http://localhost:1024/knora/incunabula_0000001722.jp2/full/3428,5061/0/default.jpg',
    3428,
    5061,
    false
);

let stillImagePreview: ReadStillImageFileValue = new ReadStillImageFileValue(
    'http://data.knora.org/22cf0ce68901/reps/dd4b1264ff02',
    'http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue',
    'incunabula_0000001722.jp2',
    'http://localhost:1024/knora',
    'http://localhost:1024/knora/incunabula_0000001722.jpg/full/86,128/0/default.jpg',
    86,
    128,
    true
);

let testRegionRectangle: ReadResource = createTestRegionRectangle();
let testRegionPolygon: ReadResource = createTestRegionPolygon();
let testRegionCircle: ReadResource = createTestRegionCircle();
let testRegionMulti: ReadResource = createTestRegionMulti();

let images: StillImageRepresentation[] = [
    new StillImageRepresentation(stillImageFullSize, [new ImageRegion(testRegionRectangle), new ImageRegion(testRegionPolygon), new ImageRegion(testRegionCircle), new ImageRegion(testRegionMulti)])
];

// define and create host component

@Component({
    template: `
        <salsah-still-image-osdviewer [images]="resourcesHost" [imageRangeStart]="0" [imageRangeEnd]="0" [imageChangeInterval]="1">
        </salsah-still-image-osdviewer>`
})
class TestHostComponent {
    resourcesHost: StillImageRepresentation[] = [];
    @ViewChild(StillImageOSDViewerComponent) osdViewerComp: StillImageOSDViewerComponent;
}

// tests

describe('StillImageOSDViewerComponent', () => {
    let component: StillImageOSDViewerComponent;
    let host: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StillImageOSDViewerComponent, TestHostComponent],
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

    // atm StillImageOSDViewerComponent has not many public methods or members.
    // to be able to still test state of StillImageOSDViewerComponent we use the following technique for the first couple of tests:
    // test private methods, members with: component["method"](param), or compomnent["member"]
    // this prevents TS compiler from restricting access, while still checking type safety.

    it('should have initialized viewer after resources change', () => {
        host.resourcesHost = images;
        fixture.detectChanges();
        expect(component["viewer"]).toBeTruthy();
    });

    it('should have OpenSeadragon.Viewer.isVisible() == true after resources change', () => {
        host.resourcesHost = images;
        fixture.detectChanges();
        expect(component["viewer"].isVisible()).toBeTruthy();
    });

    it('should have 1 image loaded after resources change with 1 full size image and 1 (ignored) preview image', () => {
        host.resourcesHost = images;
        fixture.detectChanges();
        component["viewer"].addHandler('open', function (args) {
            expect(component["viewer"].world.getItemCount()).toEqual(1);
        })
        component["viewer"].addHandler('open-failed', function (args) {
            expect(component["viewer"].world.getItemCount()).toEqual(0);
        })
    });

    it('should have 5 test regions loaded (rect, circle, poylgon, circle_from_multiregion, rect_from_multiregion)', () => {
        host.resourcesHost = images;
        fixture.detectChanges();
        let overlay = component["viewer"].svgOverlay();
        expect(overlay.node().childElementCount).toEqual(5);
    });

});

// utility functions

function createTestRegionRectangle() {
    let testRegionRect_compacted_json = `
        {
          "@type":"http://schema.org/ItemList",
          "http://schema.org/itemListElement":{
            "@id":"http://data.knora.org/b6b64a62b006",
            "@type":"http://api.knora.org/ontology/knora-api/v2#Region",
            "http://api.knora.org/ontology/knora-api/v2#hasColor":{
              "@id":"http://data.knora.org/b6b64a62b006/values/8da571610f27",
              "@type":"http://api.knora.org/ontology/knora-api/v2#ColorValue",
              "http://api.knora.org/ontology/knora-api/v2#colorValueAsColor":"#ff3333"
            },
            "http://api.knora.org/ontology/knora-api/v2#hasComment":{
              "@id":"http://data.knora.org/b6b64a62b006/values/0752cbee0e27",
              "@type":"http://api.knora.org/ontology/knora-api/v2#TextValue",
              "http://api.knora.org/ontology/knora-api/v2#valueAsString":"Derselbe Holzschnitt wird auf Seite c5v verwendet."
            },
            "http://api.knora.org/ontology/knora-api/v2#hasGeometry":{
              "@id":"http://data.knora.org/b6b64a62b006/values/ca7b1e280f27",
              "@type":"http://api.knora.org/ontology/knora-api/v2#GeomValue",
              "http://api.knora.org/ontology/knora-api/v2#geometryValueAsGeometry":
                "{\\\"status\\\":\\\"active\\\",\\\"lineColor\\\":\\\"#ff3333\\\",\\\"lineWidth\\\":2,\\\"points\\\":[{\\\"x\\\":0.0989010989010989,\\\"y\\\":0.18055555555555555},{\\\"x\\\":0.7252747252747253,\\\"y\\\":0.7245370370370371}],\\\"type\\\":\\\"rectangle\\\"}"
            },
            "http://api.knora.org/ontology/knora-api/v2#isRegionOfValue":{
              "@id":"http://data.knora.org/b6b64a62b006/values/d2893190-53ae-452f-adca-e8a0c68c4df6",
              "@type":"http://api.knora.org/ontology/knora-api/v2#LinkValue",
              "http://api.knora.org/ontology/knora-api/v2#linkValueHasTarget":{
                "@id":"http://data.knora.org/9d626dc76c03",
                "@type":"http://api.knora.org/ontology/incunabula/v2#page",
                "http://schema.org/name":"u1r"
              }
            },
            "http://schema.org/name":"Derselbe Holzschnitt wird auf Seite c5v verwendet."
          },
          "http://schema.org/numberOfItems":1
        }
      `;
    let testRegionRect_compacted = JSON.parse(testRegionRect_compacted_json);
    let testRegionRect_resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(testRegionRect_compacted);
    return testRegionRect_resources.resources[0];
}

function createTestRegionPolygon() {
    let testRegionPolygon_compacted_json = `
        {
          "@type":"http://schema.org/ItemList",
          "http://schema.org/itemListElement":{
            "@id":"http://data.knora.org/f1b0bb27b006",
            "@type":"http://api.knora.org/ontology/knora-api/v2#Region",
            "http://api.knora.org/ontology/knora-api/v2#hasColor":{
              "@id":"http://data.knora.org/f1b0bb27b006/values/bed4d1420e27",
              "@type":"http://api.knora.org/ontology/knora-api/v2#ColorValue",
              "http://api.knora.org/ontology/knora-api/v2#colorValueAsColor":"#ff3333"
            },
            "http://api.knora.org/ontology/knora-api/v2#hasComment":{
              "@id":"http://data.knora.org/f1b0bb27b006/values/38812bd00d27",
              "@type":"http://api.knora.org/ontology/knora-api/v2#TextValue",
              "http://api.knora.org/ontology/knora-api/v2#valueAsString":"Derselbe Holzschnitt wird auf Seite u1r verwendet."
            },
            "http://api.knora.org/ontology/knora-api/v2#hasGeometry":{
              "@id":"http://data.knora.org/f1b0bb27b006/values/fbaa7e090e27",
              "@type":"http://api.knora.org/ontology/knora-api/v2#GeomValue",
              "http://api.knora.org/ontology/knora-api/v2#geometryValueAsGeometry":
                "{\\\"status\\\":\\\"active\\\",\\\"lineColor\\\":\\\"#ff3333\\\",\\\"lineWidth\\\":2,\\\"points\\\":[{\\\"x\\\":0.17532467532467533,\\\"y\\\":0.18049792531120332},{\\\"x\\\":0.8051948051948052,\\\"y\\\":0.17012448132780084},{\\\"x\\\":0.8311688311688312,\\\"y\\\":0.7261410788381742},{\\\"x\\\":0.19480519480519481,\\\"y\\\":0.7323651452282157},{\\\"x\\\":0.17857142857142858,\\\"y\\\":0.17842323651452283},{\\\"x\\\":0.18506493506493507,\\\"y\\\":0.1825726141078838},{\\\"x\\\":0.17857142857142858,\\\"y\\\":0.1825726141078838}],\\\"type\\\":\\\"polygon\\\"}"
            },
            "http://api.knora.org/ontology/knora-api/v2#isRegionOfValue":{
              "@id":"http://data.knora.org/f1b0bb27b006/values/f8b6da78-fba7-43ff-b7ce-d2de0e12ae16",
              "@type":"http://api.knora.org/ontology/knora-api/v2#LinkValue",
              "http://api.knora.org/ontology/knora-api/v2#linkValueHasTarget":{
                "@id":"http://data.knora.org/3a757e9e3003",
                "@type":"http://api.knora.org/ontology/incunabula/v2#page",
                "http://schema.org/name":"c5v"
              }
            },
            "http://schema.org/name":"Derselbe Holzschnitt wird auf Seite u1r verwendet."
          },
          "http://schema.org/numberOfItems":1
        }
      `;
    let testRegionPolygon_compacted = JSON.parse(testRegionPolygon_compacted_json);
    let testRegionPolygon_resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(testRegionPolygon_compacted);
    return testRegionPolygon_resources.resources[0];
}

function createTestRegionCircle() {
    let testRegionCircle_compacted_json = `
        {
          "@type":"http://schema.org/ItemList",
          "http://schema.org/itemListElement":{
            "@id":"http://data.knora.org/2357e0d64407",
            "@type":"http://api.knora.org/ontology/knora-api/v2#Region",
            "http://api.knora.org/ontology/knora-api/v2#hasColor":{
              "@id":"http://data.knora.org/2357e0d64407/values/65579b06ee2a",
              "@type":"http://api.knora.org/ontology/knora-api/v2#ColorValue",
              "http://api.knora.org/ontology/knora-api/v2#colorValueAsColor":"#3333ff"
            },
            "http://api.knora.org/ontology/knora-api/v2#hasComment":{
              "@id":"http://data.knora.org/2357e0d64407/values/df03f593ed2a",
              "@type":"http://api.knora.org/ontology/knora-api/v2#TextValue",
              "http://api.knora.org/ontology/knora-api/v2#valueAsString":"Kolorierung in Rot"
            },"http://api.knora.org/ontology/knora-api/v2#hasGeometry":{
              "@id":"http://data.knora.org/2357e0d64407/values/a22d48cded2a",
              "@type":"http://api.knora.org/ontology/knora-api/v2#GeomValue",
              "http://api.knora.org/ontology/knora-api/v2#geometryValueAsGeometry":
                "{\\\"status\\\":\\\"active\\\",\\\"lineColor\\\":\\\"#3333ff\\\",\\\"lineWidth\\\":2,\\\"points\\\":[{\\\"x\\\":0.3400735294117647,\\\"y\\\":0.45376078914919854}],\\\"type\\\":\\\"circle\\\",\\\"radius\\\":{\\\"x\\\":0.04595588235294118,\\\"y\\\":0.03082614056720101},\\\"original_index\\\":1}"
            },
            "http://api.knora.org/ontology/knora-api/v2#isRegionOfValue":{
              "@id":"http://data.knora.org/2357e0d64407/values/74b82006-d4b2-4e06-8ca4-585753f49415",
              "@type":"http://api.knora.org/ontology/knora-api/v2#LinkValue",
              "http://api.knora.org/ontology/knora-api/v2#linkValueHasTarget":{
                "@id":"http://data.knora.org/1a01fe39e701",
                "@type":"http://api.knora.org/ontology/incunabula/v2#page",
                "http://schema.org/name":"o6r"
              }
            },
            "http://schema.org/name":"Kolorierung in Rot"
          },
          "http://schema.org/numberOfItems":1
        }
      `;
    let testRegionCircle_compacted = JSON.parse(testRegionCircle_compacted_json);
    let testRegionCircle_resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(testRegionCircle_compacted);
    return testRegionCircle_resources.resources[0];
}

function createTestRegionMulti() {
    let testRegionMulti_compacted_json = `
       {
         "@type": "http://schema.org/ItemList",
         "http://schema.org/itemListElement": {
           "@id": "http://data.knora.org/29c5b0b65732",
           "@type": "http://api.knora.org/ontology/knora-api/v2#Region",
           "http://api.knora.org/ontology/knora-api/v2#hasColor": {
             "@id": "http://data.knora.org/29c5b0b65732/values/e4a0f250326101",
             "@type": "http://api.knora.org/ontology/knora-api/v2#ColorValue",
             "http://api.knora.org/ontology/knora-api/v2#colorValueAsColor": "#ff3333"
           },
           "http://api.knora.org/ontology/knora-api/v2#hasComment": {
             "@id": "http://data.knora.org/29c5b0b65732/values/9b23f9a4316101",
             "@type": "http://api.knora.org/ontology/knora-api/v2#TextValue",
             "http://api.knora.org/ontology/knora-api/v2#valueAsString": "TESTREGION JUNI"
           },
           "http://api.knora.org/ontology/knora-api/v2#hasGeometry": [
             {
               "@id": "http://data.knora.org/29c5b0b65732/values/5e4d4cde316101",
               "@type": "http://api.knora.org/ontology/knora-api/v2#GeomValue",
               "http://api.knora.org/ontology/knora-api/v2#geometryValueAsGeometry": "{\\\"status\\\":\\\"active\\\",\\\"lineColor\\\":\\\"#ff3333\\\",\\\"lineWidth\\\":2,\\\"points\\\":[{\\\"x\\\":0.5305232558139537,\\\"y\\\":0.3126142595978062}],\\\"type\\\":\\\"circle\\\",\\\"radius\\\":{\\\"x\\\":0.18023255813953487,\\\"y\\\":0.08957952468007313},\\\"original_index\\\":0}"
             },
             {
               "@id": "http://data.knora.org/29c5b0b65732/values/21779f17326101",
               "@type": "http://api.knora.org/ontology/knora-api/v2#GeomValue",
               "http://api.knora.org/ontology/knora-api/v2#geometryValueAsGeometry": "{\\\"status\\\":\\\"active\\\",\\\"lineColor\\\":\\\"#ff3333\\\",\\\"lineWidth\\\":2,\\\"points\\\":[{\\\"x\\\":0.17296511627906977,\\\"y\\\":0.08226691042047532},{\\\"x\\\":0.7122093023255814,\\\"y\\\":0.16544789762340037}],\\\"type\\\":\\\"rectangle\\\",\\\"original_index\\\":1}"
             }
           ],
           "http://api.knora.org/ontology/knora-api/v2#isRegionOfValue": {
             "@id": "http://data.knora.org/29c5b0b65732/values/d9ebd265-f4c5-4a5d-8943-06e97942c555",
             "@type": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
             "http://api.knora.org/ontology/knora-api/v2#linkValueHasTarget": {
               "@id": "http://data.knora.org/9ee8aa313503",
               "@type": "http://api.knora.org/ontology/incunabula/v2#page",
               "http://schema.org/name": "d7v"
             }
           },
           "http://schema.org/name": "TESTREGION JUNI"
         },
         "http://schema.org/numberOfItems": 1
       }
       `;
    let testRegionMulti_compacted = JSON.parse(testRegionMulti_compacted_json);
    let testRegionMulti_resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(testRegionMulti_compacted);
    return testRegionMulti_resources.resources[0];
}
