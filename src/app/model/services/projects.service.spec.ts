import {async, inject, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {ApiService} from './api.service';
import {ProjectsService} from './projects.service';
import {environment} from '../../../environments/environment';
import {StoreService} from './store.service';
import {HttpClientModule} from '@angular/common/http';
import {ApiServiceError} from './api-service-error';
import {Project, ProjectResponse, User, UsersResponse} from '../webapi/knora/admin';
import {imagesProject} from '../test-data/shared-test-data';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';

fdescribe('ProjectsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule
            ],
            providers: [
                ApiService,
                ProjectsService,
                StoreService
            ]
        });
    });

    fit('should be created', async(inject(
        [ProjectsService], (service) => {
            expect(service).toBeDefined();
        }))
    );


    fit('should parse project-response', () => {

        const json: any = {'project': {'ontologies': [{'ontologyIri': 'http://www.knora.org/ontology/00FF/images', 'ontologyName': 'images'}], 'shortname': 'images', 'description': 'A demo project of a collection of images', 'institution': 'http://rdfh.ch/institutions/dhlab-basel', 'shortcode': '00FF', 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': 'images, collection', 'longname': 'Image Collection Demo'}};

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: User[] = jsonConvert.deserializeObject(json, ProjectResponse);

        // console.log('users: ', result);
    });


    if (environment.type === 'integration') {

        fit('should load test data [it]', async(inject(
            [StoreService], (service) => {

                expect(service).toBeDefined();

                service.resetTriplestoreContent([])
                    .subscribe(
                        (result: string) => {
                            expect(result).toBe('success');
                        });

            })), 300000);


        fit('#getAllProjects should return all projects [it]', async(inject(
            [ProjectsService], (service) => {

                expect(service).toBeDefined();

                service.getAllProjects()
                    .subscribe(
                        (projects: Project[]) => {
                            // console.log('projects: ' + JSON.stringify(projects));
                            expect(projects.length).toBe(8);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));


        fit('#getProjectByIri should return project [it]', async(inject(
            [ProjectsService], (service) => {

                expect(service).toBeDefined();

                service.getProjectByIri('http://rdfh.ch/projects/00FF')
                    .subscribe(
                        (project: Project) => {
                            // console.log('project: ' + JSON.stringify(project));
                            expect(project).toEqual(imagesProject);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));


        fit('#getProjectByShortname should return project [it]', async(inject(
            [ProjectsService], (service) => {

                expect(service).toBeDefined();

                service.getProjectByShortname('images')
                    .subscribe(
                        (project: Project) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(project).toEqual(imagesProject);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));


        fit('#getProjectByShortcode should return project [it]', async(inject(
            [ProjectsService], (service) => {

                expect(service).toBeDefined();

                service.getProjectByShortcode('00FF')
                    .subscribe(
                        (project: Project) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(project).toEqual(imagesProject);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));



    } else {
        xit('integration tests skipped. run  "ng test --env=it".');
    }


});
