import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectTeamComponent} from './project-team.component';
import {ProjectsService} from '../../../../model/services/projects.service';
import {UsersService} from '../../../../model/services/users.service';
import {Project} from '../../../../model/webapi/knora/';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, ResponseOptions} from '@angular/http';

describe('ProjectTeamComponent', () => {
    let component: ProjectTeamComponent;
    let fixture: ComponentFixture<ProjectTeamComponent>;

    const testProject: Project = <Project>{
        'ontologies': [
            'http://www.knora.org/ontology/00FF/images'
        ],
        'shortname': 'images',
        'description': 'A demo project of a collection of images',
        'institution': null,
        'shortcode': '00FF',
        'logo': null,
        'id': 'http://rdfh.ch/projects/00FF',
        'status': true,
        'selfjoin': false,
        'keywords': 'images, collection',
        'longname': 'Image Collection Demo'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ProjectsService,
                UsersService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        })
            .compileComponents();
    }));

    // Mock localStorage
    beforeEach(() => {
        let store = {};

        spyOn(sessionStorage, 'getItem').and.callFake((key: string): String => {
            return store[key] || null;
        });
        spyOn(sessionStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string): string => {
            return store[key] = <any>value;
        });
        spyOn(sessionStorage, 'clear').and.callFake(() => {
            store = {};
        });
    });

    beforeEach(() => {

        sessionStorage.setItem('currentProject', JSON.stringify(testProject));

        fixture = TestBed.createComponent(ProjectTeamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', async(inject(
        [ProjectsService, MockBackend], (service, mockBackend) => {

            const mockProjectsJson = {'projects': [{'shortname': 'biblio', 'description': 'Bibliography', 'institution': null, 'logo': null, 'dataNamedGraph': 'http://www.knora.org/data/biblio', 'id': 'http://data.knora.org/projects/DczxPs-sR6aZN91qV92ZmQ', 'status': true, 'selfjoin': false, 'keywords': null, 'longname': 'Bibliography', 'ontologyNamedGraph': 'http://www.knora.org/ontology/biblio'}, {'shortname': 'beol', 'description': 'Bernoulli-Euler Online', 'institution': null, 'logo': null, 'dataNamedGraph': 'http://www.knora.org/data/beol', 'id': 'http://data.knora.org/projects/yTerZGyxjZVqFMNNKXCDPF', 'status': true, 'selfjoin': false, 'keywords': null, 'longname': 'Bernoulli-Euler Online', 'ontologyNamedGraph': 'http://www.knora.org/ontology/beol'}, {'shortname': 'incunabula', 'description': '<p>Das interdisziplinÃ¤re Forschungsprojekt "<b><em>Die Bilderfolgen der Basler FrÃ¼hdrucke: SpÃ¤tmittelalterliche Didaxe als Bild-Text-LektÃ¼re</em></b>" verbindet eine umfassende kunstwissenschaftliche Analyse der BezÃ¼ge zwischen den Bildern und Texten in den illustrierten Basler Inkunabeln mit der Digitalisierung der BestÃ¤nde der UniversitÃ¤tsbibliothek und der Entwicklung einer elektronischen Edition in der Form einer neuartigen Web-0.2-Applikation.\n</p>\n<p>Das Projekt wird durchgefÃ¼hrt vom <a href="http://kunsthist.unibas.ch">Kunsthistorischen Seminar</a> der UniversitÃ¤t Basel (Prof. B. Schellewald) und dem <a href="http://www.dhlab.unibas.ch">Digital Humanities Lab</a> der UniversitÃ¤t Basel (PD Dr. L. Rosenthaler).\n</p>\n<p>\nDas KernstÃ¼ck der digitalen Edition besteht aus rund zwanzig reich bebilderten FrÃ¼hdrucken aus vier verschiedenen Basler Offizinen. Viele davon sind bereits vor 1500 in mehreren Ausgaben erschienen, einige fast gleichzeitig auf Deutsch und Lateinisch. Es handelt sich um eine ausserordentlich vielfÃ¤ltige Produktion; neben dem Heilsspiegel finden sich ein Roman, die Melusine, die Reisebeschreibungen des Jean de Mandeville, einige Gebets- und ErbauungsbÃ¼chlein, theologische Schriften, Fastenpredigten, die Leben der Heiligen Fridolin und Meinrad, das berÃ¼hmte Narrenschiff sowie die Exempelsammlung des Ritters vom Thurn.\n</p>\nDie Internetpublikation macht das digitalisierte Korpus dieser FrÃ¼hdrucke durch die MÃ¶glichkeiten nichtlinearer VerknÃ¼pfung und Kommentierung der Bilder und Texte, fÃ¼r die wissenschaftliche Edition sowie fÃ¼r die Erforschung der Bilder und Texte nutzbar machen. Auch kÃ¶nnen bereits bestehende und entstehende Online-Editionen damit verknÃ¼pft werden , wodurch die Nutzung von Datenbanken anderer Institutionen im Hinblick auf unser Corpus optimiert wird.\n</p>', 'institution': null, 'logo': 'incunabula_logo.png', 'dataNamedGraph': 'http://www.knora.org/data/incunabula', 'id': 'http://data.knora.org/projects/77275339', 'status': true, 'selfjoin': false, 'keywords': 'Basler FrÃ¼hdrucke, Inkunabel, Narrenschiff, Wiegendrucke, Sebastian Brant, Bilderfolgen, early print, incunabula, ship of fools, Kunsthistorischs Seminar UniversitÃ¤t Basel, Late Middle Ages, Letterpress Printing, Basel, Contectualisation of images', 'longname': 'Bilderfolgen Basler FrÃ¼hdrucke', 'ontologyNamedGraph': 'http://www.knora.org/ontology/incunabula'}, {'shortname': 'anything', 'description': 'Anything Project', 'institution': null, 'logo': null, 'dataNamedGraph': 'http://www.knora.org/data/anything', 'id': 'http://data.knora.org/projects/anything', 'status': true, 'selfjoin': false, 'keywords': null, 'longname': 'Anything Project', 'ontologyNamedGraph': 'http://www.knora.org/ontology/anything'}, {'shortname': 'SystemProject', 'description': 'Knora System Project', 'institution': null, 'logo': null, 'dataNamedGraph': '-', 'id': 'http://www.knora.org/ontology/knora-base#SystemProject', 'status': true, 'selfjoin': false, 'keywords': null, 'longname': 'Knora System Project', 'ontologyNamedGraph': 'http://www.knora.org/ontology/knora-base'}, {'shortname': 'dokubib', 'description': 'Dokubib', 'institution': null, 'logo': null, 'dataNamedGraph': 'http://www.knora.org/data/dokubib', 'id': 'http://data.knora.org/projects/b83b99ca01', 'status': false, 'selfjoin': false, 'keywords': null, 'longname': 'Dokubib', 'ontologyNamedGraph': 'http://www.knora.org/ontology/dokubib'}, {'shortname': 'images', 'description': 'A demo project of a collection of images', 'institution': null, 'logo': null, 'dataNamedGraph': 'http://www.knora.org/data/images', 'id': 'http://data.knora.org/projects/images', 'status': true, 'selfjoin': false, 'keywords': 'images, collection', 'longname': 'Image Collection Demo', 'ontologyNamedGraph': 'http://www.knora.org/ontology/images'}], 'status': 0};

            mockBackend.connections.subscribe(c => {
                // TODO: understand why this is not failing
                expect(c.request.url).toBe('v1/projects/shouldfail');
                c.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockProjectsJson) })));
            });

            expect(component).toBeTruthy();
        })));

    it('should get the project data', () => {
        expect<any>(sessionStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect(component).toBeTruthy();
    });
});
