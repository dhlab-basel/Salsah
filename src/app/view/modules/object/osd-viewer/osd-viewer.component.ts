import {Component, OnInit, Input, OnChanges, SimpleChange, ElementRef, OnDestroy} from '@angular/core';
import {Resource} from '../../../../model/webapi/knora/';

declare let OpenSeadragon: any;

@Component({
    selector: 'salsah-osd-viewer',
    templateUrl: './osd-viewer.component.html',
    styleUrls: ['./osd-viewer.component.scss']
})
export class OsdViewerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() resource: Resource = new Resource();

    private viewer;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        // viewer initialisation is done on first run of ngOnChanges
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['resource'].isFirstChange()) {
            this.setupViewer();
        }
        this.openImage();
    }

    ngOnDestroy() {
        this.viewer.destroy();
        this.viewer = null;
    }

    private setupViewer() {
        let viewerContainer = this.elementRef.nativeElement.firstChild;
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

    private openImage() {
        let sipiBasePath = this.extractBasePath(this.resource.resinfo.locdata.path);
        let width = this.resource.resinfo.locdata.nx;
        let height = this.resource.resinfo.locdata.ny;

        let tileSources = [{
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
        }];

        this.viewer.open(tileSources);
    }

    private extractBasePath(iiifPath: string): string {
        for (let i = 0; i < 4; i++) {
            let lastIndex = iiifPath.lastIndexOf('/');
            iiifPath = iiifPath.substring(0, lastIndex);
        }
        return iiifPath;
    }

}
