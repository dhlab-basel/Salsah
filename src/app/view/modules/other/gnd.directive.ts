import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { KnoraConstants } from '@knora/core';

/**
 * This directive renders a GND/IAF or a VIAF identifier as a link to the respective resolver.
 */
@Directive({
    selector: '[gnd]'
})
export class GndDirective implements OnInit {
    @Input('gnd') private gnd: string = ''; // the GND identifier to be rendered

    constructor(private el: ElementRef) {

    }

    ngOnInit() {

        if (this.gnd.length < 30) {

            if (this.gnd.indexOf(KnoraConstants.GNDPrefix) === 0) {
                // GND/IAF identifier
                this.el.nativeElement.innerHTML = `<a href="${KnoraConstants.GNDResolver + this.gnd.replace(KnoraConstants.GNDPrefix, '')}" target="_blank">${this.gnd}</a>`;
            } else if (this.gnd.indexOf(KnoraConstants.VIAFPrefix) === 0) {
                // VIAF identifier
                this.el.nativeElement.innerHTML = `<a href="${KnoraConstants.VIAFResolver + this.gnd.replace(KnoraConstants.VIAFPrefix, '')}" target="_blank">${this.gnd}</a>`;
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
