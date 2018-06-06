import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {AppConstants} from "../../../app.constants";

/**
 * This directive renders a GND/IAF or a VIAF identifier as a link to the respective resolver.
 */
@Directive({
  selector: '[gnd]'
})
export class GndDirective {
    @Input('gnd') private gnd: string = ''; // the GND identifier to be rendered

    constructor(private el: ElementRef) {

    }

    ngOnInit() {

        if (this.gnd.length < 30) {

            if (this.gnd.indexOf(AppConstants.GNDPrefix) == 0) {
                // GND/IAF identifier
                this.el.nativeElement.innerHTML = `<a href="${AppConstants.GNDResolver + this.gnd.replace(AppConstants.GNDPrefix, "")}" target="_blank">${this.gnd}</a>`;
            } else if (this.gnd.indexOf(AppConstants.VIAFPrefix) == 0) {
                // VIAF identifier
                this.el.nativeElement.innerHTML = `<a href="${AppConstants.VIAFResolver + this.gnd.replace(AppConstants.VIAFPrefix, "")}" target="_blank">${this.gnd}</a>`;
            } else {
                // no identifier, leave unchanged
                this.el.nativeElement.innerHTML = this.gnd;
            }

        } else {
            // no identifier, leave unchanged
            this.el.nativeElement.innerHTML = this.gnd;
        }

    }


}
