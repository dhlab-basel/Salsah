import {async, inject, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {ApiService} from './api.service';
import {ProjectsService} from './projects.service';
import {environment} from '../../../environments/environment';
import {StoreService} from './store.service';
import {HttpClientModule} from '@angular/common/http';
import {ApiServiceError} from './api-service-error';
import {Project, ProjectResponse} from '../webapi/knora';
import {
    anythingProject,
    anythingProjectResponseJson,
    imagesProject,
    imagesProjectResponseJson, incunabulaProject,
    incunabulaProjectResponseJson,
    projectsResponseJson,
    projectsTestData
} from '../test-data/shared-test-data';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {ProjectsResponse} from '../webapi/knora/admin';

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


    fit('should parse projects-response', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: ProjectsResponse = jsonConvert.deserializeObject(projectsResponseJson, ProjectsResponse);

        expect(result).toBeTruthy();
    });

    fit('should parse project-response (images)', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: ProjectResponse = jsonConvert.deserializeObject(imagesProjectResponseJson, ProjectResponse);

        expect(result).toBeTruthy();
    });

    fit('should parse project-response (incunabula)', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: ProjectResponse = jsonConvert.deserializeObject(incunabulaProjectResponseJson, ProjectResponse);

        expect(result).toBeTruthy();
    });

    fit('should parse project-response (anything)', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: ProjectResponse = jsonConvert.deserializeObject(anythingProjectResponseJson, ProjectResponse);

        expect(result).toBeTruthy();
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
                            expect(projects).toEqual(projectsTestData);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));


        fit('#getProjectByIri should return project (images) [it]', async(inject(
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

        fit('#getProjectByIri should return project (incunabula) [it]', async(inject(
            [ProjectsService], (service) => {

                expect(service).toBeDefined();

                service.getProjectByIri('http://rdfh.ch/projects/77275339')
                    .subscribe(
                        (project: Project) => {
                            // console.log('project: ' + JSON.stringify(project));
                            expect(project).toEqual(incunabulaProject);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));

        fit('#getProjectByIri should return project (anything) [it]', async(inject(
            [ProjectsService], (service) => {

                expect(service).toBeDefined();

                service.getProjectByIri('http://rdfh.ch/projects/anything')
                    .subscribe(
                        (project: Project) => {
                            // console.log('project: ' + JSON.stringify(project));
                            expect(project).toEqual(anythingProject);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));

        fit('#getProjectByShortname should return project (images) [it]', async(inject(
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


        fit('#getProjectByShortcode should return project (images) [it]', async(inject(
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
