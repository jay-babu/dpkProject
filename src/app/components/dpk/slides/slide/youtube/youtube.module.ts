import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeComponent } from './youtube.component';
import { YoutubeService } from './youtube.service';


@NgModule({
    declarations: [ YoutubeComponent, ],
    imports: [
        CommonModule
    ],
    providers: [
        YoutubeService,
    ]
})
export class YoutubeModule {
}
