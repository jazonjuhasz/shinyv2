import { Directive, ElementRef, HostListener, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appMatCardElevation]'
})
export class MatCardElevation implements OnChanges {

    @Input()
    defaultElevation = 2;

    @Input()
    raisedElevation = 8;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
        this.setElevation(this.defaultElevation);
    }

    ngOnChanges(_changes: SimpleChanges) {
        this.setElevation(this.defaultElevation);
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.setElevation(this.raisedElevation);
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.setElevation(this.defaultElevation);
    }

    setElevation(amount: number) {
        const elevationPrefix = 'mat-elevation-z';
        const classesToRemove = Array.from((this.element.nativeElement as HTMLElement).classList)
            .filter(c => c.startsWith(elevationPrefix));
        classesToRemove.forEach((c) => {
            this.renderer.removeClass(this.element.nativeElement, c);
        });
        const newClass = `${elevationPrefix}${amount}`;
        this.renderer.addClass(this.element.nativeElement, newClass);
    }
}