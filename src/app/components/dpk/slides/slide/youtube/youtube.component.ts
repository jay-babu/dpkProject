import { Component, OnInit } from '@angular/core';
import { YoutubeService } from './youtube.service';

@Component({
    selector: 'app-youtube',
    templateUrl: './youtube.component.html',
    styleUrls: [ './youtube.component.css' ]
})
export class YoutubeComponent implements OnInit {

    constructor(public youtubeService: YoutubeService) {
    }

    ngOnInit(): void {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }


    muted(event: YT.PlayerEvent) {
        event.target.mute();
        event.target.playVideo();
        event.target.setLoop(true);
    }

    width() {
        return window.innerWidth;
    }

    height() {
        return window.innerWidth * (946 / 1680);
    }
}
