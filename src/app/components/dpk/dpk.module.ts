import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SlidesComponent } from './slides/slides.component';
import { SlideComponent } from './slides/slide/slide.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioControlService } from '../audio-component/audio-control.service';
import { SlideService } from '../../services/slide.service';
import { DriveAPIService } from '../../services/drive-api.service';
import { LottieModule } from 'ngx-lottie';
import { ToggleFullScreenDirective } from '../../directive/toggle-full-screen.directive';
import { TutorialModule } from '../tutorial/tutorial.module';
import { AudioModule } from '../audio-component/audio.module';
import { OptionsFabModule } from './slides/options-fab/options-fab.module';

const dpkRoutes: Routes = [
    // { path: 'pdf/:dpk/:name', component: PdfSlideComponent, },
    { path: 'slideShow/:dpk/:name', component: SlidesComponent, },
    { path: 'singerView', loadChildren: () => import('./singer-view/singer-view.module').then(m => m.SingerViewModule), },
];

@NgModule({
    declarations: [
        SlidesComponent,
        SlideComponent,
        ToggleFullScreenDirective,
    ],
    imports: [
        AudioModule,
        CommonModule,
        RouterModule.forChild(dpkRoutes),
        AngularMaterialModule,
        ReactiveFormsModule,
        LottieModule,
        TutorialModule,
        OptionsFabModule,
    ],
    providers: [
        AudioControlService,
        DriveAPIService,
        SlideService,
    ]
})

export class DpkModule {
}
