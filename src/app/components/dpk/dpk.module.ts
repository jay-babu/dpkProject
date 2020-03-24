import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AudioControlService } from '../audio-component/audio-control.service';
import { SlideService } from '../../services/slide.service';

const dpkRoutes: Routes = [
    // { path: 'pdf/:dpk/:name', component: PdfSlideComponent, },
    { path: 'slideShow', loadChildren: () => import('./slides/slides.module').then(m => m.SlidesModule), },
    { path: 'singerView', loadChildren: () => import('./singer-view/singer-view.module').then(m => m.SingerViewModule), },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(dpkRoutes),
    ],
    providers: [
        AudioControlService,
        SlideService,
    ]
})

export class DpkModule {
}
