import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {ReadTextValueAsHtml} from '../../../model/webapi/knora/v2/read-property-item';
import {OntologyInformation} from '../../../model/services/ontologycache.service';
import {AppConfig} from "../../../app.config";
import {ResourceObjectComponent} from "../object/resource-object/resource-object.component";

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
    @Input('mathJax') private html: string = ''; // the HTML to be inserted
    @Input('valueObject') private valueObject: ReadTextValueAsHtml;
    @Input('ontologyInfo') private ontologyInfo: OntologyInformation;

    constructor(private el: ElementRef, private dialog: MdDialog, private snackBar: MdSnackBar) {
    }

    /**
     * Bind a click event to standoff links that shows the referred resource in a dialog box.
     *
     * @param event the event fired on an element inserted by this directive.
     * @returns {boolean} a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('click', ['$event'])
    onClick(event) {
        // console.log(event);

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (event.toElement.nodeName.toLowerCase() == 'a' && event.toElement.className.toLowerCase().indexOf(AppConfig.SalsahLink) >= 0) {

            let config = new MdDialogConfig();
            config.height = '60%';
            config.width = '60%';

            let dialogRef = this.dialog.open(ResourceObjectComponent, config);
            // https://stackoverflow.com/questions/40648252/angular2-material-mddialog-pass-in-variable
            dialogRef.componentInstance.iri = event.toElement.href;

            // preventDefault (propagation)
            return false;
        } else if (event.toElement.nodeName.toLowerCase() == 'a') {
            // open link in a new window
            window.open(event.toElement.href, '_blank');
            return false;
        } else {
            // prevent propagation
            return false;
        }

    }

    /**
     * Bind a mouseover event to the inserted elements.
     *
     * @param event the event fired on an element inserted by this directive.
     * @returns {boolean} a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('mouseover', ['$event'])
    onMouseEnter(event) {
        //console.log("mouseover " + this.valueType);

        //console.log(this.ontologyInfo);

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (event.toElement.nodeName.toLowerCase() == 'a' && event.toElement.className.toLowerCase().indexOf(AppConfig.SalsahLink) >= 0) {
            // console.log("mouseenter: internal link to: " + event.toElement.href);

            let referredResourceIri = event.toElement.href;

            let resInfo = this.valueObject.getReferredResourceInfo(referredResourceIri, this.ontologyInfo);

            let config = new MdSnackBarConfig();
            config.duration = 2500;

            this.snackBar.open(resInfo, undefined, config);

            // preventDefault (propagation)
            return false;
        } else {
            // do not prevent propagation
            return true;
        }

    }

    ngOnInit() {
        // console.log("mathjax directive");

        this.el.nativeElement.innerHTML = this.html;

        // http://docs.mathjax.org/en/latest/advanced/typeset.html#typeset-math
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.el.nativeElement]);

    }

}
