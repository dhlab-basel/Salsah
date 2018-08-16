import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleComponent } from './user-role.component';
import { AppModule } from '../../../../../app.module';
import { ProjectsService } from '../../../../../model/services/projects.service';
import { GroupsService } from '../../../../../model/services/groups.service';

describe('UserRoleComponent', () => {
    let component: UserRoleComponent;
    let fixture: ComponentFixture<UserRoleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [
                ProjectsService,
                GroupsService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
