import {Group, Project, User} from '../webapi/knora/admin';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';

const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

const imagesProjectJson: any = {
    'id': 'http://rdfh.ch/projects/00FF',
    'shortname': 'images',
    'shortcode': '00FF',
    'longname': 'Image Collection Demo',
    'description': 'A demo project of a collection of images',
    'ontologies': [{
        'ontologyIri': 'http://www.knora.org/ontology/00FF/images',
        'ontologyName': 'images'
    }],
    'institution': 'http://rdfh.ch/institutions/dhlab-basel',
    'status': true,
    'selfjoin': false,
    'keywords': 'images, collection'
};
export const imagesProject: Project = jsonConvert.deserializeObject(imagesProjectJson, Project);


const incunabulaProjectJson: any = {'ontologies': [{'ontologyIri': 'http://www.knora.org/ontology/incunabula', 'ontologyName': 'incunabula'}], 'shortname': 'incunabula', 'description': '<p>Das interdisziplinäre Forschungsprojekt "<b><em>Die Bilderfolgen der Basler Frühdrucke: Spätmittelalterliche Didaxe als Bild-Text-Lektüre</em></b>" verbindet eine umfassende kunstwissenschaftliche Analyse der Bezüge zwischen den Bildern und Texten in den illustrierten Basler Inkunabeln mit der Digitalisierung der Bestände der Universitätsbibliothek und der Entwicklung einer elektronischen Edition in der Form einer neuartigen Web-0.2-Applikation.\n</p>\n<p>Das Projekt wird durchgeführt vom <a href="http://kunsthist.unibas.ch">Kunsthistorischen Seminar</a> der Universität Basel (Prof. B. Schellewald) und dem <a href="http://www.dhlab.unibas.ch">Digital Humanities Lab</a> der Universität Basel (PD Dr. L. Rosenthaler).\n</p>\n<p>\nDas Kernstück der digitalen Edition besteht aus rund zwanzig reich bebilderten Frühdrucken aus vier verschiedenen Basler Offizinen. Viele davon sind bereits vor 1500 in mehreren Ausgaben erschienen, einige fast gleichzeitig auf Deutsch und Lateinisch. Es handelt sich um eine ausserordentlich vielfältige Produktion; neben dem Heilsspiegel finden sich ein Roman, die Melusine,  die Reisebeschreibungen des Jean de Mandeville, einige Gebets- und Erbauungsbüchlein, theologische Schriften, Fastenpredigten, die Leben der Heiligen Fridolin und Meinrad, das berühmte Narrenschiff  sowie die Exempelsammlung des Ritters vom Thurn.\n</p>\nDie Internetpublikation macht das digitalisierte Korpus dieser Frühdrucke  durch die Möglichkeiten nichtlinearer Verknüpfung und Kommentierung der Bilder und Texte, für die wissenschaftliche Edition sowie für die Erforschung der Bilder und Texte nutzbar machen. Auch können bereits bestehende und entstehende Online-Editionen damit verknüpft  werden , wodurch die Nutzung von Datenbanken anderer Institutionen im Hinblick auf unser Corpus optimiert wird.\n</p>', 'logo': 'incunabula_logo.png', 'id': 'http://rdfh.ch/projects/77275339', 'status': true, 'selfjoin': false, 'keywords': 'Basler Frühdrucke, Inkunabel, Narrenschiff, Wiegendrucke, Sebastian Brant, Bilderfolgen, early print, incunabula, ship of fools, Kunsthistorischs Seminar Universität Basel, Late Middle Ages, Letterpress Printing, Basel, Contectualisation of images', 'longname': 'Bilderfolgen Basler Frühdrucke'}
export const incunabulaProject: Project = jsonConvert.deserializeObject(incunabulaProjectJson, Project);

const anythingProjectJson: any = {'ontologies': [{'ontologyIri': 'http://www.knora.org/ontology/anything', 'ontologyName': 'anything'}], 'shortname': 'anything', 'description': 'Anything Project', 'id': 'http://rdfh.ch/projects/anything', 'status': true, 'selfjoin': false, 'longname': 'Anything Project'}
export const anythingProject: Project = jsonConvert.deserializeObject(anythingProjectJson, Project);

const imagesReviewerGroupJson: Group = <Group>{
    'id': 'http://rdfh.ch/groups/00FF/images-reviewer',
    'name': 'Image reviewer',
    'description': 'A group for image reviewers.',
    'project': imagesProjectJson,
    'status': true,
    'selfjoin': false
};
export const imagesReviewerGroup: Group = jsonConvert.deserializeObject(imagesReviewerGroupJson, Group);


const multiUserJson: any = {
    'id': 'http://rdfh.ch/users/multiuser',
    'email': 'multi.user@example.com',
    'givenName': 'Multi',
    'familyName': 'User',
    'isActiveUser': true,
    'status': true,
    'lang': 'de',
    'groups': [imagesReviewerGroupJson],
    'projects': [imagesProjectJson, incunabulaProjectJson, anythingProjectJson],
    'permissions': {
        'groupsPerProject': {
            'http://rdfh.ch/projects/77275339': [
                'http://www.knora.org/ontology/knora-base#ProjectMember',
                'http://www.knora.org/ontology/knora-base#ProjectAdmin'
            ],
            'http://rdfh.ch/projects/00FF': [
                'http://rdfh.ch/groups/00FF/images-reviewer',
                'http://www.knora.org/ontology/knora-base#ProjectMember',
                'http://www.knora.org/ontology/knora-base#ProjectAdmin'
            ],
            'http://rdfh.ch/projects/anything': [
                'http://www.knora.org/ontology/knora-base#ProjectMember',
                'http://www.knora.org/ontology/knora-base#ProjectAdmin'
            ]
        },
        'administrativePermissionsPerProject': {
            'http://rdfh.ch/projects/77275339': [{'name': 'ProjectAdminAllPermission'}, {'name': 'ProjectResourceCreateAllPermission'}],
            'http://rdfh.ch/projects/00FF': [{'name': 'ProjectAdminAllPermission'}, {'name': 'ProjectResourceCreateAllPermission'}],
            'http://rdfh.ch/projects/anything': [{'name': 'ProjectAdminAllPermission'}, {'name': 'ProjectResourceCreateAllPermission'}]
        }
    }
};
export const multiUser: User = jsonConvert.deserializeObject(multiUserJson, User);


