import { Directive, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';

@Directive({
    selector: '[appToggleFullScreen]'
})
export class ToggleFullScreenDirective {

    constructor() {
    }

    @HostListener('click') onClick() {
        if (screenfull.isEnabled) {
            screenfull.toggle()
        }
    }

    @HostListener('document:keyup.escape', [ '$event' ]) onEscape() {
        // @ts-ignore
        screenfull.exit();
    }

}
