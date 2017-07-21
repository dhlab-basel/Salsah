import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {UserProfileDialogComponent} from './user-profile-dialog.component';
import {MD_DIALOG_DATA} from '@angular/material';

describe('UserProfileDialogComponent', () => {
    let component: UserProfileDialogComponent;
    let fixture: ComponentFixture<UserProfileDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule
            ],
            providers: [
                {provide: MD_DIALOG_DATA, useValue: {}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
