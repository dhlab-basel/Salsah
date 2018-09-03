import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BeolService} from '../../../model/services/beol.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SearchService} from '../../../model/services/search.service';
import {ConvertJSONLD} from '../../../model/webapi/knora/v2/convert-jsonld';
import {ApiServiceResult} from '../../../model/services/api-service-result';
import {ReadResourcesSequence} from '../../../model/webapi/knora/v2/read-resources-sequence';
import {
    ReadLinkValue,
    ReadStillImageFileValue,
    ReadTextValueAsHtml
} from '../../../model/webapi/knora/v2/read-property-item';
import {
    ImageRegion, StillImageOSDViewerComponent,
    StillImageRepresentation
} from '../../properties/still-image-osdviewer/still-image-osdviewer.component';
import {AppConfig} from '../../../app.config';
import {ReadResource} from '../../../model/webapi/knora/v2/read-resource';
import {OntologyInformation} from '../../../model/services/ontologycache.service';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'salsah-meditationes',
    templateUrl: './meditationes.component.html',
    styleUrls: ['./meditationes.component.scss']
})
export class MeditationesComponent implements OnInit {

    @ViewChild('OSDViewer') osdViewer: StillImageOSDViewerComponent;

    private meditatioManuscriptIri = "http://data.knora.org/HSmk8KWbQjy6YCqnBrwYgA";

    private seqnum: number;

    private maxSeqnum: number;

    page: ReadResource;
    regions: ImageRegion[] = [];

    transcription: ReadTextValueAsHtml;

    ontologyInfo: OntologyInformation;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _beolService: BeolService,
                private _searchService: SearchService) {

    }

    previousPage() {

        if (this.seqnum > 1) {

            this.page = undefined;
            this.transcription = undefined;

            this.seqnum--;

            this._router.navigate(['/meditationes/', this.seqnum]);
        }
    }
    nextPage() {

        if (this.seqnum < this.maxSeqnum) {

            this.page = undefined;
            this.transcription = undefined;

            this.seqnum++;

            this._router.navigate(['/meditationes/', this.seqnum]);

        }
    }

    ngOnInit() {

        // determine the max seqnum for meditatio Manuscript
        let query = `PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#partOf> <${this.meditatioManuscriptIri}> .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            ?mainRes a <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#page> .
            
            
            ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#partOf> <http://data.knora.org/HSmk8KWbQjy6YCqnBrwYgA> .
            <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#partOf> knora-api:objectType <http://api.knora.org/ontology/knora-api/simple/v2#Resource> .
            <http://data.knora.org/HSmk8KWbQjy6YCqnBrwYgA> a <http://api.knora.org/ontology/knora-api/simple/v2#Resource> .
                   
        }
        
        OFFSET 0
        `;

        this._route.params.subscribe((params: Params) => {

            // this callback will be executed for each navigate (previous/next page)

            this.seqnum = parseInt(params['seqnum']);

            if (this.maxSeqnum === undefined) {

                this._searchService.doExtendedSearchCountQuery(query).subscribe(
                    (result: ApiServiceResult) => {
                        let promises = jsonld.promises;
                        // compact JSON-LD using an empty context: expands all Iris
                        let promise = promises.compact(result.body, {});

                        promise.then((compacted) => {

                            this.maxSeqnum = compacted[AppConfig.schemaNumberOfItems];

                            this.getMeditatio();

                        }, function (err) {
                            console.log('JSONLD of count query request could not be expanded:' + err);
                        });
                    });

            } else {
                this.getMeditatio();
            }

        });
    }

    getMeditatio() {

            this.regions = [];

            // create a query that gets the regions and transcriptions for the given page
            const query: string = this._beolService.getRegionsWithTranscriptionsForPage( this.meditatioManuscriptIri, this.seqnum, 0);

            this._searchService.doExtendedSearch(query).subscribe(
                (result: ApiServiceResult) => {

                    let promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        let resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        if (resourceSeq.numberOfResources == 1) {

                            const pageTmp = resourceSeq.resources[0];

                            // if there are regions, display them along with their transcriptions

                            if (pageTmp.properties[AppConfig.hasStillImageFileValue] !== undefined && pageTmp.properties[AppConfig.hasIncomingLink] !== undefined) { // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                                // resource has StillImageFileValues that are directly attached to it (properties) and incoming regions

                                let fileValues: ReadStillImageFileValue[] = pageTmp.properties[AppConfig.hasStillImageFileValue] as ReadStillImageFileValue[];
                                let imagesToDisplay: ReadStillImageFileValue[] = fileValues.filter((image) => {
                                    return !image.isPreview;
                                });

                                // collect regions
                                for (let incomingRegionLinkValue of pageTmp.properties[AppConfig.hasIncomingLink]) {

                                    // the link value contains the region
                                    let linkValue: ReadLinkValue = incomingRegionLinkValue as ReadLinkValue;

                                    let region = linkValue.referredResource;

                                    this.regions.push(new ImageRegion(region));

                                }

                                let stillImage = new StillImageRepresentation(imagesToDisplay[0], this.regions);

                                pageTmp.stillImageRepresentationsToDisplay = [stillImage];

                                this.page = pageTmp;

                                // console.log(pageTmp);

                            } else {
                                console.log('no image or incoming regions found for ' + this.seqnum);
                            }

                        }


                    }, function (err) {
                        console.log('JSONLD of full resource request could not be expanded:' + err);
                    });


                }
            );

    }

    handleRegionHover(regionIri) {
        // console.log(regionIri);

        // get region
        const hoveredReg = this.regions.filter(
            (region) => {
                return region.regionResource.id == regionIri
            });

        if (hoveredReg.length == 1) {
            const transcriptionLinkValue = hoveredReg[0].regionResource.properties[AppConfig.hasIncomingLink][0] as ReadLinkValue;

            const transcription: ReadTextValueAsHtml = transcriptionLinkValue.referredResource.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasText'][0] as ReadTextValueAsHtml;

            this.transcription = transcription;
        } else {
            console.log("transcription not found for region " + regionIri);
        }

    }

}
