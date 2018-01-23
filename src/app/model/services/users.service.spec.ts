import {Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {ApiService} from './api.service';
import {UsersService} from './users.service';


fdescribe('UsersService', () => {

    let service: UsersService;

    fit('should return all users', () => {

        service = new UsersService(new ApiService());
        expect(service).toBeTruthy();

        if (environment.type === 'integration') {

            const users = service.getAllUsers();

            expect(service.getAllUsers()).toBe()

        }

    });
});
