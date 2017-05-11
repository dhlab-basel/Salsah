import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salsah-access-denied',
  templateUrl: 'access-denied.component.html',
  styleUrls: ['access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  goto: any = {
    root: '/',
    login: '/login',
    lastpage: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
