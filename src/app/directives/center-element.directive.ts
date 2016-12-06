import {Directive, ElementRef, Renderer, HostListener, NgZone} from '@angular/core';

@Directive({
    selector: '[salsahCenterElement]'
})
export class CenterElementDirective {


    constructor(private el: ElementRef, private renderer: Renderer, ngZone: NgZone) {
        window.onresize = (e) => {
            ngZone.run(() => {
                this.centering();
            });
        };
        window.onload = (e) => {
            ngZone.run(() => {
                this.centering();
            });
        };

    }


    private centering() {
        let posTopVal: number = Math.round(((window.innerHeight - this.el.nativeElement.offsetHeight) / 2)); //5 * 3));
        let posLeftVal: number = Math.round(((window.innerWidth - this.el.nativeElement.offsetWidth) / 2 ));

        let posTop: string = Math.max(75, posTopVal) + 'px';
        let posLeft: string = Math.max(0, posLeftVal) + 'px';

        this.renderer.setElementStyle(this.el.nativeElement, 'top', posTop);
        this.renderer.setElementStyle(this.el.nativeElement, 'left', posLeft);
    }
}

