import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

declare var MathJax: {
    Hub: {
        Queue: (param: Object[]) => void;
    }
};

/**
 * This directive makes MathJax re-render the page after an update (mathematical notation was inserted).
 */
@Directive({selector: '[mathJax]'})
export class MathJaxDirective implements OnInit {
    @Input("mathJax") private value: string = "";
    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        //console.log("MathJaxJDirective");
        this.el.nativeElement.innerHTML = this.value;
        // http://docs.mathjax.org/en/latest/advanced/typeset.html#typeset-math
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
    }
}
