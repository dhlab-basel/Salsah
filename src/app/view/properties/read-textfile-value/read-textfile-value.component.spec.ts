import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTextfileValueComponent } from './read-textfile-value.component';

describe('ReadTextfileValueComponent', () => {
  let component: ReadTextfileValueComponent;
  let fixture: ComponentFixture<ReadTextfileValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadTextfileValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTextfileValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
