import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

/**
 * Drag'n'Drop directive
 */
@Directive({
    selector: '[salsahDnd]'
})
export class DndDirective {

    @Input() private allowed_extensions: Array<string> = [];
    @Output() private filesChangeEmitter: EventEmitter<File[]> = new EventEmitter();
    @Output() private filesInvalidEmitter: EventEmitter<File[]> = new EventEmitter();
    @HostBinding('style.background') private background = '#eee';

    constructor() {
    }

    @HostListener('dragover', ['$event'])
    public onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
    }

    @HostListener('drop', ['$event'])
    public onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
        let files = evt.dataTransfer.files;
        let valid_files: Array<File> = [];
        let invalid_files: Array<File> = [];
        if (files.length > 0) {
            for(let file of files) {
                let ext = file.name.split('.')[file.name.split('.').length - 1];
                if (this.allowed_extensions.lastIndexOf(ext) != -1) {
                    valid_files.push(file);
                } else {
                    invalid_files.push(file);
                }
            }

            this.filesChangeEmitter.emit(valid_files);
            this.filesInvalidEmitter.emit(invalid_files);
        }
    }


}
