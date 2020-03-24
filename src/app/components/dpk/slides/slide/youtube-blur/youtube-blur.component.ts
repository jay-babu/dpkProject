import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
    selector: 'app-youtube-blur',
    templateUrl: './youtube-blur.component.html',
    styleUrls: [ './youtube-blur.component.css' ]
})
export class YoutubeBlurComponent implements OnInit {

    constructor(public youtubeService: YoutubeService) {
    }

    ngOnInit(): void {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }

    start(event: YT.PlayerEvent) {
        event.target.mute();
        event.target.playVideo();
        event.target.setLoop(true);
    }

    width() {
        return window.innerWidth * 1.1;
    }

    height() {
        return window.innerHeight * 1.1;
    }
}
