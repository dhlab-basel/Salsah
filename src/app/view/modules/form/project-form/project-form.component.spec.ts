import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';
import { ProjectFormComponent } from './project-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { LoginComponent } from '../../../login/login.component';

describe('ProjectFormComponent', () => {
    let component: ProjectFormComponent;
    let fixture: ComponentFixture<ProjectFormComponent>;
    // const projectForm: FormGroup = component.form;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule,
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [FormBuilder]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', inject([FormBuilder], (fb: FormBuilder) => {
        this.form = fb.group({
            shortname: new FormControl(),
            longname: new FormControl(),
            shortcode: new FormControl(),
            description: new FormControl(),
            institution: new FormControl(),
            logo: new FormControl(),
            id: new FormControl(),
            status: new FormControl(),
            selfjoin: new FormControl(),
            keywords: new FormControl(),
        });
        expect(component).toBeTruthy();
    }));
});
