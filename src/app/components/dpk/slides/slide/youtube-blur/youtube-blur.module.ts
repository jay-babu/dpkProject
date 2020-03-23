import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeBlurComponent } from './youtube-blur.component';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
    declarations: [
        YoutubeBlurComponent,
    ],
    exports: [
        YoutubeBlurComponent
    ],
    imports: [
        CommonModule,
        YouTubePlayerModule
    ]
})
export class YoutubeBlurModule {
}
