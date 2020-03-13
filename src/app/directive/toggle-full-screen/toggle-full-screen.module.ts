import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleFullScreenDirective } from './toggle-full-screen.directive';


@NgModule({
    declarations: [ ToggleFullScreenDirective ],
    imports: [ CommonModule, ],
    exports: [ ToggleFullScreenDirective ],
})
export class ToggleFullScreenModule {
}
