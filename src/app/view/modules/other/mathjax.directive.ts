import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {ReadTextValueAsHtml} from '../../../model/webapi/knora/v2/read-property-item';
import {OntologyInformation} from '../../../model/services/ontologycache.service';
import {AppConfig} from '../../../app.config';
import {ObjectDialogComponent} from '../dialog/object-dialog/object-dialog.component';

declare var MathJax: {
    Hub: {
        Queue: (param: () => void) => void;
        Typeset: (param: object) => void;
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
    @Input('bindEvents') private bindEvents: Boolean; // indicates if click and mouseover events have to be bound

    constructor(private el: ElementRef, private dialog: MatDialog, private snackBar: MatSnackBar) {
    }

    /**
     * Binds a click event to standoff links that shows the referred resource in a dialog box.
     *
     * @param event the event fired on an element inserted by this directive.
     * @returns {boolean} a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('click', ['$event'])
    onClick(event) {

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (this.bindEvents && event.target.nodeName.toLowerCase() === 'a' && event.target.className.toLowerCase().indexOf(AppConfig.SalsahLink) >= 0) {

            const config: MatDialogConfig = ObjectDialogComponent.createConfiguration(event.target.href);

            this.dialog.open(ObjectDialogComponent, config);

            // preventDefault (propagation)
            return false;
        } else if (event.target.parentElement.nodeName.toLowerCase() === 'a' && event.target.parentElement.className.toLowerCase().indexOf(AppConfig.SalsahLink) >= 0) {

            const config: MatDialogConfig = ObjectDialogComponent.createConfiguration(event.target.parentElement.href);

            config.panelClass = 'resizable';

            this.dialog.open(ObjectDialogComponent, config);

            // preventDefault (propagation)
            return false;

        } else if (this.bindEvents && event.target.nodeName.toLowerCase() === 'a') {
            // open link in a new window
            window.open(event.target.href, '_blank');
            return false;
        } else {
            // prevent propagation
            return false;
        }

    }

    /**
     * Binds a mouseover event to the inserted elements.
     *
     * @param event the event fired on an element inserted by this directive.
     * @returns {boolean} a Boolean indicating if event propagation should be stopped.
     */
    @HostListener('mouseover', ['$event'])
    onMouseEnter(event) {

        // check if it a TextValue and is an internal link to a Knora resource (standoff link)
        if (this.bindEvents && event.target.nodeName.toLowerCase() === 'a' && event.target.className.toLowerCase().indexOf(AppConfig.SalsahLink) >= 0) {
            // console.log("mouseenter: internal link to: " + event.target.href);

            let referredResourceIri = event.target.href;

            let resInfo = this.valueObject.getReferredResourceInfo(referredResourceIri, this.ontologyInfo);

            let config = new MatSnackBarConfig();
            config.duration = 2500;

            this.snackBar.open(resInfo, undefined, config);

            // preventDefault (propagation)
            return false;
        } else {
            // prevent propagation
            return false;
        }

    }

    ngOnInit() {
        // console.log(this.bindEvents);

        this.el.nativeElement.innerHTML = this.html;

        // http://docs.mathjax.org/en/latest/advanced/typeset.html#typeset-math
        MathJax.Hub.Queue(() => {
            MathJax.Hub.Typeset(this.el.nativeElement);
        });

    }

}
