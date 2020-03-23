import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeComponent } from './youtube.component';
import { YoutubeService } from './youtube.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeBlurModule } from '../youtube-blur/youtube-blur.module';


@NgModule({
    declarations: [
        YoutubeComponent,
    ],
    imports: [
        CommonModule,
        YouTubePlayerModule,
        YoutubeBlurModule,
    ],
    exports: [
        YoutubeComponent,
    ],
    providers: [
        YoutubeService,
    ]
})
export class YoutubeModule {
}
