import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SingerViewComponent } from './singer-view.component';
import { LottieAnimatedAudioFabComponent } from './lottie-animated-audio-fab/lottie-animated-audio-fab.component';
import { OptionsFabModule } from '../slides/options-fab/options-fab.module';
import { AudioModule } from '../../audio-component/audio.module';
import { LottieModule } from 'ngx-lottie';
import { MatButtonModule } from '@angular/material/button';

const singerViewRoutes: Routes = [
    { path: ':dpk/:name', component: SingerViewComponent }
];

@NgModule({
    declarations: [
        SingerViewComponent,
        LottieAnimatedAudioFabComponent,
    ],
    imports: [
        AudioModule,
        CommonModule,
        OptionsFabModule,
        RouterModule.forChild(singerViewRoutes),
        LottieModule,
        MatButtonModule,
    ]
})
export class SingerViewModule {
}
