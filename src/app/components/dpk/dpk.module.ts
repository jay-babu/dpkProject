import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PdfSlideComponent } from './pdf-slide/pdf-slide.component';
import { SlidesComponent } from './slides/slides.component';
import { SingerViewComponent } from './singer-view/singer-view.component';
import { SlideComponent } from './slides/slide/slide.component';
import { OptionsComponent } from './slides/options/options.component';
import { OptionsFabComponent } from './slides/options-fab/options-fab.component';
import { AudioComponent } from '../audio-component/audio.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioControlService } from '../audio-component/audio-control.service';
import { SlideService } from '../../services/slide.service';
import { DriveAPIService } from '../../services/drive-api.service';
import { LottieModule } from 'ngx-lottie';
import { LottieAudioFabComponent } from './slides/options-fab/lottie-audio-fab/lottie-audio-fab.component';
import { LottieLangFabComponent } from './slides/options-fab/lottie-lang-fab/lottie-lang-fab.component';
import { LottieAnimatedAudioFabComponent } from './singer-view/lottie-animated-audio-fab/lottie-animated-audio-fab.component';

const dpkRoutes: Routes = [
    { path: 'pdf/:dpk/:name', component: PdfSlideComponent, },
    { path: 'slideShow/:dpk/:name', component: SlidesComponent, },
    { path: 'singerView/:dpk/:name', component: SingerViewComponent, },
];

@NgModule({
    declarations: [
        PdfSlideComponent,
        SlidesComponent,
        SingerViewComponent,
        SlideComponent,
        OptionsComponent,
        OptionsFabComponent,
        AudioComponent,
        LottieAudioFabComponent,
        LottieLangFabComponent,
        LottieAnimatedAudioFabComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(dpkRoutes),
        AngularMaterialModule,
        ReactiveFormsModule,
        LottieModule,
    ],
    providers: [
        AudioControlService,
        DriveAPIService,
        SlideService,
    ]
})

export class DpkModule {
}
