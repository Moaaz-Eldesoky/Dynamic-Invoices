import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMark]',
  standalone: true,
})
export class MarkDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
