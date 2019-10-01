import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {

  constructor(ref: Renderer,element :ElementRef) {
    ref.setElementStyle(element.nativeElement,'backgroundColor','#e2e2e2');
   }

}
