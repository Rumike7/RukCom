import {Directive, ElementRef, HostListener} from '@angular/core';
@Directive({
    selector: '[appUploadButton]'
})

export class UploadButtonDirective {
    
    constructor(private el:ElementRef) {
        this.el.nativeElement.style.backgroundColor = 'red';
    }
    @HostListener('click')
    onClick() {
        
    }

}