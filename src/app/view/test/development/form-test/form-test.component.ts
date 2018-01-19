import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salsah-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent implements OnInit {

    user: string = 'http://rdfh.ch/users/superuser';
    project: string = 'http://rdfh.ch/projects/b83b99ca01';

  constructor() { }

  ngOnInit() {
  }

}
