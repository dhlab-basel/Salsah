import { Directive } from '@angular/core';

@Directive({
  selector: '[salsahOverlay]'
})
export class OverlayDirective {

  constructor() {
      console.log('login overlay works');
  }

}
