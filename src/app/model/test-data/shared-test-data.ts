import {Project, User} from '../webapi/knora';
import {Group} from '../webapi/knora/admin';

export const imagesProject: Project = <Project>{
    'id': 'http://rdfh.ch/projects/00FF',
    'shortname': 'images',
    'shortcode': '00FF',
    'longname': 'Image Collection Demo',
    'description': 'A demo project of a collection of images',
    'ontologies': [{
        'ontologyIri': 'http://www.knora.org/ontology/00FF/images',
        'ontologyName': 'images'
    }],
    'institution': null,
    'logo': null,
    'status': true,
    'selfjoin': false,
    'keywords': 'images, collection'
};


export const imagesReviewerGroup: Group = <Group>{
    'id': 'http://data.knora.org/groups/images-reviewer',
    'name': 'Image reviewer',
    'description': 'A group for image reviewers.',
    'project': imagesProject,
    'status': true,
    'selfjoin': false
};

export const multiUser: User = <User>{
    'id': 'http://data.knora.org/users/multiuser',
    'email': 'multi.user@example.com',
    'password': null,
    'token': null,
    'givenName': 'Multi',
    'familyName': 'User',
    'isActiveUser': true,
    'status': true,
    'lang': 'de',
    'groups': [imagesReviewerGroup],
    'projects': [imagesProject],
    'sessionId': null,
    'isSystemUser': false,
    'permissions': {
        'groupsPerProject': {
            'http://data.knora.org/projects/77275339': [
                'http://www.knora.org/ontology/knora-base#ProjectMember',
                'http://www.knora.org/ontology/knora-base#ProjectAdmin'
            ]
        },
        'administrativePermissionsPerProject': {
            'http://data.knora.org/projects/images': [{
                'name': 'ProjectAdminAllPermission',
                'additionalInformation': null,
                'v1Code': null
            }, {
                'name': 'ProjectResourceCreateAllPermission',
                'additionalInformation': null,
                'v1Code': null
            }]
        }
    }
};
