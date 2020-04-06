import { Component, OnInit } from '@angular/core';
import { YoutubeService } from './youtube.service';

@Component({
    selector: 'app-youtube',
    templateUrl: './youtube.component.html',
    styleUrls: [ './youtube.component.css' ]
})
export class YoutubeComponent implements OnInit {

    player: YT.Player;

    constructor(public youtubeService: YoutubeService) {
    }

    ngOnInit(): void {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        this.youtubeService.paused$.subscribe(paused => {
            if (this.player) {
                if (!paused) {
                    this.player.playVideo();
                } else {
                    this.player.pauseVideo();
                }
            }
        })
    }


    start(event: YT.PlayerEvent) {
        this.player = event.target;
        this.player.mute();
    }

    width() {
        return window.innerWidth - 150;
    }

    height() {
        return (window.innerWidth - 150) * (946 / 1680);
    }

    ready(ytState: YT.OnStateChangeEvent) {
        if (ytState.data === -1) {
            ytState.target.playVideo();
        } else if (ytState.data === 0) {
            this.youtubeService.randomVideoId();
        }
    }
}
