import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormComponent } from './list-form.component';
import {AppModule} from '../../../../app.module';
import {ListsService} from '../../../../model/services/lists.service';
import {ProjectsService} from '../../../../model/services/projects.service';

describe('ListFormComponent', () => {
  let component: ListFormComponent;
  let fixture: ComponentFixture<ListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            AppModule
        ],
        providers: [
            ListsService,
            ProjectsService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
