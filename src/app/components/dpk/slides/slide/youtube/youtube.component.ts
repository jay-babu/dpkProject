import { Component, OnInit } from '@angular/core';
import { YoutubeService } from './youtube.service';

@Component({
    selector: 'app-youtube',
    templateUrl: './youtube.component.html',
    styleUrls: [ './youtube.component.css' ]
})
export class YoutubeComponent implements OnInit {

    videoId: string;

    constructor(public youtubeService: YoutubeService) {
    }

    ngOnInit(): void {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        this.youtubeService.youtubeId$.subscribe(videoId => this.videoId = videoId);
    }


    muted(event: YT.PlayerEvent) {
        event.target.mute();
    }

    width() {
        return 320 * 3;
    }

    height() {
        return 180 * 3;
    }

}
