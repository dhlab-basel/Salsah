/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import {Component, Input, OnInit, OnChanges, SimpleChange, ElementRef} from '@angular/core';
import {ReadStillImageFileValue} from '../../../model/webapi/knora/v2/read-property-item';

// OpenSeadragon does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular-cli.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare var OpenSeadragon: any;

/**
 * This component creates a OpenSeadragon viewer instance.
 * Accepts an array of ReadStillImageFileValues to be rendered.
 * @class
 * @member {ReadStillImageFileValue[]} fileValues - fileValues to be rendered. (Use as angular @Input data binding property.)
 * @member {boolean} ignorePreviews - controls if entries in fileValues with isPreview==true should be ignored or not. (Use as angular @Input data binding property.)
 */
@Component({
    selector: 'salsah-still-image-osdviewer',
    templateUrl: './still-image-osdviewer.component.html',
    styleUrls: ['./still-image-osdviewer.component.scss']
})
export class StillImageOSDViewerComponent implements OnInit {

    @Input() fileValues: ReadStillImageFileValue[] = [];
    @Input() ignorePreviews: boolean = true;

    private viewer;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        // initialisation is done on first run of ngOnChanges
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['fileValues'].isFirstChange()) {
            this.setupViewer();
        }
        this.openImages();
    }

    ngOnDestroy() {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = null;
        }
    }

    private setupViewer(): void {
        let viewerContainer = this.elementRef.nativeElement.getElementsByClassName('osdViewerContainer')[0];
        let osdOptions = {
            element: viewerContainer,
            prefixUrl: 'assets/icons/openseadragon/'
        };
        this.viewer = new OpenSeadragon.Viewer(osdOptions);
        this.viewer.addHandler('full-screen', function (args) {
            if (args.fullScreen) {
                viewerContainer.classList.add('fullscreen');
            } else {
                viewerContainer.classList.remove('fullscreen');
            }
        })
    }

    private openImages(): void {
        let imagesToDisplay = this.getImagesToDisplay();
        let tileSources = [];
        for (let i in imagesToDisplay) {
            // construct IIIF tileSource configuration according to
            // http://iiif.io/api/image/2.1/#technical-properties
            // see also http://iiif.io/api/image/2.0/#a-implementation-notes
            let sipiBasePath = imagesToDisplay[i].imageServerIIIFBaseURL + '/' + imagesToDisplay[i].imageFilename;
            let width = imagesToDisplay[i].dimX;
            let height = imagesToDisplay[i].dimY;
            tileSources[i] = {
                'tileSource': {
                    '@context': 'http://iiif.io/api/image/2/context.json',
                    '@id': sipiBasePath,
                    'height': height,
                    'width': width,
                    'profile': ['http://iiif.io/api/image/2/level2.json'],
                    'protocol': 'http://iiif.io/api/image',
                    'tiles': [{
                        'scaleFactors': [1, 2, 4, 8, 16, 32],
                        'width': 1024
                    }]
                },
                'x': i,
                'y': 0
            };
        }
        this.viewer.open(tileSources);
    }

    // If this.ignorePreviews == true:
    //  returns a shallow copy of the this.fileValues array, omitting all entries with entry.isPreview == true.
    // else:
    //  returns the this.fileValues array itself
    private getImagesToDisplay(): ReadStillImageFileValue[] {
        if (this.ignorePreviews) {
            return this.fileValues.filter((image) => {
                return !image.isPreview;
            });
        } else {
            return this.fileValues;
        }
    }
}
