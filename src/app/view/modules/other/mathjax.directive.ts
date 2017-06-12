import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {AppConfig} from "../../../app.config";

declare var MathJax: {
    Hub: {
        Queue: (param: Object[]) => void;
    }
};

/**
 * This directive makes MathJax re-render the inserted HTML in case it is a TextValue (mathematical notation may have been inserted).
 */
@Directive({selector: '[mathJax]'})
export class MathJaxDirective implements OnInit {
    @Input("mathJax") private html: string = ""; // the HTML to be inserted
    constructor(private el: ElementRef) {
    }

    /**
     * Bind a click event to the inserted inserted elements.
     *
     * @param event the event fired on an element inserted by this directive.
     * @returns {boolean} a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('click', ['$event']) onClick(event) {
        //console.log("click");

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (event.toElement.nodeName.toLowerCase() == 'a' && event.toElement.className.toLowerCase() == "internal_link") {
            console.log("click: internal link to: " + event.toElement.href);

            // preventDefault (propagation)
            return false;
        } else {
            // do not prevent propagation
            return true;
        }

    }

    /**
     * Bind a mouseover event to the inserted elements.
     *
     * @param event the event fired on an element inserted by this directive.
     * @returns {boolean} a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('mouseover', ['$event']) onMouseEnter(event) {
        //console.log("mouseover " + this.valueType);

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (event.toElement.nodeName.toLowerCase() == 'a' && event.toElement.className.toLowerCase() == "internal_link") {
            // console.log("mouseenter: internal link to: " + event.toElement.href);

            // preventDefault (propagation)
            return false;
        } else {
            // do not prevent propagation
            return true;
        }

    }

    ngOnInit() {
        console.log("mathjax directive");

        this.el.nativeElement.innerHTML = this.html;

        // http://docs.mathjax.org/en/latest/advanced/typeset.html#typeset-math
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);

    }

}
