import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';

export class OpenElementService{
    show:Subject<boolean> = new Subject();
}
