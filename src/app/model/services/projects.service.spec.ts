import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {ProjectsService} from './projects.service';

describe('ProjectsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                ProjectsService
            ]
        });
    });

    it('should ...', inject([ProjectsService], (service: ProjectsService) => {
        expect(service).toBeTruthy();
    }));
});
