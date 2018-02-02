import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {AppConfig} from "../../../app.config";

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

            if (this.gnd.indexOf(AppConfig.GNDPrefix) == 0) {
                // GND/IAF identifier
                this.el.nativeElement.innerHTML = `<a href="${AppConfig.GNDResolver + this.gnd.replace(AppConfig.GNDPrefix, "")}" target="_blank">${this.gnd}</a>`;
            } else if (this.gnd.indexOf(AppConfig.VIAFPrefix) == 0) {
                // VIAF identifier
                this.el.nativeElement.innerHTML = `<a href="${AppConfig.VIAFResolver + this.gnd.replace(AppConfig.VIAFPrefix, "")}" target="_blank">${this.gnd}</a>`;
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
