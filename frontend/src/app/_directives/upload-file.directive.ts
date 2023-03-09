import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appUploadFile]'
})

export class UploadFileDirective {
    element: any;
    constructor(private el:ElementRef) {
        this.element=this.el.nativeElement;
    }
    @HostListener('change')
    onChange($event:any) {
        console.log("file changed");
        this.element.onFileSelected($event);
    }

    @HostListener('click')
    onClick() {
        console.log("file clicked");
    }


}