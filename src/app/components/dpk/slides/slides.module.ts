import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SlidesComponent } from './slides.component';
import { SlideComponent } from './slide/slide.component';
import { OptionsFabModule } from '../options-fab/options-fab.module';
import { AudioModule } from '../../audio-component/audio.module';

const slidesRoute: Routes = [
    { path: ':dpk/:name', component: SlidesComponent },
];

@NgModule({
    declarations: [
        SlidesComponent,
        SlideComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(slidesRoute),
        OptionsFabModule,
        AudioModule,
    ]
})
export class SlidesModule {
}
