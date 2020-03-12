import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule as faModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle as fasQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        faModule,
    ]
})
export class FontAwesomeModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(fasQuestionCircle);
    }
}
