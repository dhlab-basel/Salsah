import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'salsah-developer-hint',
  templateUrl: './developer-hint.component.html',
  styleUrls: ['./developer-hint.component.scss']
})
export class DeveloperHintComponent implements OnInit {

  @Input('message') message: any;

  constructor() { }

  ngOnInit() {
  }

}
