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
import {ReadStillImageFileValue, ReadGeomValue} from "../../../model/webapi/knora/v2/read-property-item";
import {ReadResource} from "../../../model/webapi/knora/v2/read-resource";
import {Point2D, RegionGeometry} from "../../../model/webapi/knora/v2/read-property-item";
import {AppConfig} from "../../../app.config"

// This component needs the openseadragon library itself, as well as the openseadragon plugin openseadragon-svg-overlay
// Both libraries are installed via package.json, and loaded globally via the script tag in .angular-cli.json

// OpenSeadragon does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular-cli.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare var OpenSeadragon: any;


/**
 * This component creates a OpenSeadragon viewer instance.
 * Accepts an array of ReadResource containing (among other resources) ReadStillImageFileValues to be rendered.
 * The viewer will not render ReadStillImageFileValues with isPreview == true
 * @class
 * @member {ReadResource[]} resources - resources containing (among other resources) the StillImageFileValues and incoming regions to be rendered. (Use as angular @Input data binding property.)
 */
@Component({
    selector: 'salsah-still-image-osdviewer',
    templateUrl: './still-image-osdviewer.component.html',
    styleUrls: ['./still-image-osdviewer.component.scss']
})
export class StillImageOSDViewerComponent implements OnInit {

    @Input() resources: ReadResource[] = [];

    private viewer;

    constructor(private elementRef: ElementRef) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes["resources"] && changes["resources"].isFirstChange()) {
            this.setupViewer();
        }
        if (changes["resources"]) {
            this.openImages();
            this.renderRegions();
        }
    }

    ngOnInit() {
        // initialisation is done on first run of ngOnChanges
    }

    ngOnDestroy() {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = null;
        }
    }

    /**
     * Renders all ReadStillImageFileValues to be found in this.resources.
     * ReadStillImageFileValues with isPreview == true will not be rendered.
     * (Although this.resources is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
     * Use this method if additional ReadStillImageFileValues were added to this.resources after creation/assignment of the this.resources array.)
     */
    updateImages() {
        if (!this.viewer) {
            this.setupViewer();
        }
        this.openImages();
    }

    /**
     * Renders all Regions to be found in the 'incomingRegions' property of the resources in this.resources.
     * (Although this.resources is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
     * Use this method if additional regions were added to the resources.incomingRegions array of the resources in this.resources after creation/assignment of the this.resources array.)
     */
    updateRegions() {
        if (!this.viewer) {
            this.setupViewer();
        }
        this.renderRegions();
    }

    /**
     * Initializes the OpenSeadragon viewer
     */
    private setupViewer(): void {
        let viewerContainer = this.elementRef.nativeElement.getElementsByClassName("osdViewerContainer")[0];
        let osdOptions = {
            element: viewerContainer,
            prefixUrl: "assets/icons/openseadragon/"
        };
        this.viewer = new OpenSeadragon.Viewer(osdOptions);
        this.viewer.addHandler('full-screen', function (args) {
            if (args.fullScreen) {
                viewerContainer.classList.add("fullscreen");
            } else {
                viewerContainer.classList.remove("fullscreen");
            }
        });
        this.viewer.addHandler('resize', function (args) {
            args.eventSource.svgOverlay().resize();
        });
    }

    /**
     * Prepare tile sources from the given sequence of [[ReadStillImageFileValue]].
     *
     * @param {ReadStillImageFileValue[]} imagesToDisplay the given file values to de displayed.
     * @returns {Array} the tile sources to be passed to OSD viewer.
     */
    private static prepareTileSourcesFromFileValues(imagesToDisplay: ReadStillImageFileValue[]): Object[] {
        let imageXOffset = 0;
        let tileSources = [];

        for (let image of imagesToDisplay) {
            let sipiBasePath = image.imageServerIIIFBaseURL + "/" + image.imageFilename;
            let width = image.dimX;
            let height = image.dimY;

            // construct OpenSeadragon tileSources according to https://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#open
            tileSources.push({
                // construct IIIF tileSource configuration according to
                // http://iiif.io/api/image/2.1/#technical-properties
                // see also http://iiif.io/api/image/2.0/#a-implementation-notes
                "tileSource": {
                    "@context": "http://iiif.io/api/image/2/context.json",
                    "@id": sipiBasePath,
                    "height": height,
                    "width": width,
                    "profile": ["http://iiif.io/api/image/2/level2.json"],
                    "protocol": "http://iiif.io/api/image",
                    "tiles": [{
                        "scaleFactors": [1, 2, 4, 8, 16, 32],
                        "width": 1024
                    }]
                },
                "x": imageXOffset,
                "y": 0
            });

            imageXOffset++;
        }

        return tileSources;
    }

    /**
     * Adds all (non-preview) images in this.resources to the viewer.
     * Images are positioned in a horizontal row next to each other.
     */
    private openImages(): void {
        // imageXOffset controls the x coordinate of the left side of each image in the OpenSeadragon viewport coordinate system.
        // The first image has its left side at x = 0, and all images are scaled to have a width of 1 in viewport coordinates.
        // see also: https://openseadragon.github.io/examples/viewport-coordinates/
        let tileSources = [];
        for (let resource of this.resources) {
            if (resource.properties[AppConfig.hasStillImageFileValue] !== undefined) {
                // resource has StillImageFileValues

                let fileValues: ReadStillImageFileValue[] = resource.properties[AppConfig.hasStillImageFileValue] as ReadStillImageFileValue[];
                let imagesToDisplay: ReadStillImageFileValue[] = fileValues.filter((image) => {
                    return !image.isPreview;
                });
                tileSources = StillImageOSDViewerComponent.prepareTileSourcesFromFileValues(imagesToDisplay);

            } else if (resource.incomingStillImageRepresentations.length > 0) {
                // there are StillImageRepresentations pointing to this resource

                // collect file values
                let imagesToDisplay: ReadStillImageFileValue[] = resource.incomingStillImageRepresentations.map(
                    (stillImageRes: ReadResource) => {
                        let fileValues = stillImageRes.properties[AppConfig.hasStillImageFileValue] as ReadStillImageFileValue[];
                        let imagesToDisplay = fileValues.filter((image) => {
                            return !image.isPreview;
                        });

                        return imagesToDisplay;
                    }
                ).reduce(function (prev, curr) {
                    // transform ReadStillImageFileValue[][] to ReadStillImageFileValue[]
                    return prev.concat(curr);
                });

                tileSources = StillImageOSDViewerComponent.prepareTileSourcesFromFileValues(imagesToDisplay);

            }
        }

        this.viewer.clearOverlays();
        this.viewer.open(tileSources);
    }

    /**
     * Adds a ROI-overlay to the viewer for every region of every (non-preview) image in this.resources
     */
    private renderRegions(): void {
        this.viewer.clearOverlays();

        let imageXOffset = 0; // see documentation in this.openImages() for the usage of imageXOffset
        for (let resource of this.resources) {
            if (resource.properties[AppConfig.hasStillImageFileValue] !== undefined) {
                let fileValues = resource.properties[AppConfig.hasStillImageFileValue] as ReadStillImageFileValue[]; // TODO: do we have to check for subproperties of hasStillImageFileValue?
                let imagesToDisplay = fileValues.filter((image) => {
                    return !image.isPreview;
                });

                // TODO: how to deal with subclasses of knora-base:Region? -> use the ontology responder (support for subclasses required)
                let incomingRegions = resource.incomingRegions.filter((resource) => {
                    return resource.type == AppConfig.Region
                });

                for (let image of imagesToDisplay) {
                    let aspectRatio = (image.dimY / image.dimX);

                    for (let region of incomingRegions) {
                        let geometries = region.properties[AppConfig.hasGeometry] as ReadGeomValue[];
                        for (let geometryValue of geometries) {
                            let geometry = geometryValue.geometry;
                            this.createSVGOverlay(geometry, aspectRatio, imageXOffset, region.label);
                        }
                    }

                    imageXOffset++;
                }
            }
        }
    }

    /**
     * Creates and adds a ROI-overlay to the viewer
     * @param {RegionGeometry} geometry - the geometry describing the ROI
     * @param {number} aspectRatio -  the aspectRatio (h/w) of the image on which the geometry should be placed
     * @param {number} xOffset -  the x-offset in Openseadragon viewport coordinates of the image on which the geometry should be placed
     * @param {string} toolTip -  the tooltip which should be displayed on mousehover of the svg element
     */
    private createSVGOverlay(geometry: RegionGeometry, aspectRatio: number, xOffset: number, toolTip: string): void {
        let lineColor = geometry.lineColor;
        let lineWidth = geometry.lineWidth;

        let svgElement;
        switch (geometry.type) {
            case "rectangle":
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');  // yes, we render rectangles as svg polygon elements
                this.addSVGAttributesRectangle(svgElement, geometry, aspectRatio, xOffset);
                break;
            case "polygon":
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                this.addSVGAttributesPolygon(svgElement, geometry, aspectRatio, xOffset);
                break;
            case "circle":
                svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                this.addSVGAttributesCircle(svgElement, geometry, aspectRatio, xOffset);
                break;
            default:
                console.log("ERROR: StillImageOSDViewerComponent.createSVGOverlay: unknown geometryType: " + geometry.type);
                return;
        }
        svgElement.id = "roi-svgoverlay-" + Math.random() * 10000;
        svgElement.setAttribute("class", "roi-svgoverlay");
        svgElement.setAttribute("style", "stroke: " + lineColor + "; stroke-width: " + lineWidth + "px;");

        let svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        svgTitle.textContent = toolTip;

        let svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        svgGroup.appendChild(svgTitle);
        svgGroup.appendChild(svgElement);

        let overlay = this.viewer.svgOverlay();
        overlay.node().appendChild(svgGroup);
    }

    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'rectangle' to a SVGElement
     * @param {SVGElement} svgElement - an SVGElement (should have type 'polygon' (sic))
     * @param {RegionGeometry} geometry - the geometry describing the rectangle
     * @param {number} aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param {number} xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    private addSVGAttributesRectangle(svgElement: SVGElement, geometry: RegionGeometry, aspectRatio: number, xOffset: number): void {
        let pointA = geometry.points[0];
        let pointB = geometry.points[1];

        // geometry.points contains two diagonally opposed corners of the rectangle, but the order of the corners is arbitrary.
        // We therefore construct the upperleft (UL), lowerright (LR), upperright (UR) and lowerleft (LL) positions of the corners with min and max operations.
        let positionUL = new Point2D(Math.min(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        let positionLR = new Point2D(Math.max(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
        let positionUR = new Point2D(Math.max(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        let positionLL = new Point2D(Math.min(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));

        let points = [positionUL, positionUR, positionLR, positionLL];
        let viewCoordPoints = this.image2ViewPortCoords(points, aspectRatio, xOffset);
        let pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
        svgElement.setAttribute("points", pointsString);
    }

    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'polygon' to a SVGElement
     * @param {SVGElement} svgElement - an SVGElement (should have type 'polygon')
     * @param {RegionGeometry} geometry - the geometry describing the polygon
     * @param {number} aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param {number} xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    private addSVGAttributesPolygon(svgElement: SVGElement, geometry: RegionGeometry, aspectRatio: number, xOffset: number): void {
        let viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
        let pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
        svgElement.setAttribute("points", pointsString);
    }

    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'circle' to a SVGElement
     * @param {SVGElement} svgElement - an SVGElement (should have type 'circle')
     * @param {RegionGeometry} geometry - the geometry describing the circle
     * @param {number} aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param {number} xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    private addSVGAttributesCircle(svgElement: SVGElement, geometry: RegionGeometry, aspectRatio: number, xOffset: number): void {
        let viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
        let cx = String(viewCoordPoints[0].x);
        let cy = String(viewCoordPoints[0].y);
        // geometry.radius contains not the radius itself, but the coordinates of a (arbitrary) point on the circle.
        // We therefore have to calculate the length of the vector geometry.radius to get the actual radius. -> sqrt(x^2 + y^2)
        // Since geometry.radius has its y coordinate scaled to the height of the image,
        // we need to multiply it with the aspectRatio to get to the scale used by Openseadragon, analoguous to this.image2ViewPortCoords()
        let radius = String(Math.sqrt(geometry.radius.x * geometry.radius.x + aspectRatio * aspectRatio * geometry.radius.y * geometry.radius.y));
        svgElement.setAttribute("cx", cx);
        svgElement.setAttribute("cy", cy);
        svgElement.setAttribute("r", radius);
    }

    /**
     * Maps a Point2D[] with coordinates relative to an image to a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
     * see also: https://openseadragon.github.io/examples/viewport-coordinates/
     * @param {Point2D[]} points - an array of points in coordinate system relative to an image
     * @param {number} aspectRatio - the aspectRatio (h/w) of the image
     * @param {number} xOffset - the x-offset in viewport coordinates of the image
     * @returns {Point2D[]} - a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
     */
    private image2ViewPortCoords(points: Point2D[], aspectRatio: number, xOffset: number): Point2D[] {
        return points.map((point) => {
            return new Point2D(point.x + xOffset, point.y * aspectRatio)
        });
    }

    /**
     * Returns a string in the format expected by the 'points' attribute of a SVGElement
     * @param {Point2D[]} points - an array of points to be serialized to a string
     * @returns {string} - the points serialized to a string in the format expected by the 'points' attribute of a SVGElement
     */
    private createSVGPolygonPointsAttribute(points: Point2D[]): string {
        let pointsString = "";
        for (let i in points) {
            pointsString += points[i].x;
            pointsString += ",";
            pointsString += points[i].y;
            pointsString += " ";
        }
        return pointsString;
    }
}
