import {Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
    selector: '[salsahResizeGrid]'
})
export class ResizeGridDirective {

    @Input() cols?: number = 3;

    colWidth: number = 208;

    gutterSize: number = 9;

    maxWidth: number = 940;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < this.maxWidth) {
            this.cols = 2;
            if (event.target.innerWidth < ( 2 * this.colWidth )) {
                this.cols = 1;
            }
        } else {
            // calc size
            this.cols = Math.floor(event.target.innerWidth / (this.colWidth + this.gutterSize));
        }
        this._renderer.setAttribute(this._ele.nativeElement, 'cols', '' + this.cols);
    }

    constructor(private _renderer: Renderer2,
                private _ele: ElementRef) {

    }

}
