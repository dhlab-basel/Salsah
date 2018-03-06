import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'salsah-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

    @Input() listIri: string;

  constructor() { }

  ngOnInit() {
  }

}
