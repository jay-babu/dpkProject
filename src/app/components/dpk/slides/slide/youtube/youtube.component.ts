import { Component, OnInit } from '@angular/core';
import { YoutubeService } from './youtube.service';
import { AudioControlService } from '../../../../audio-component/audio-control.service';

@Component({
    selector: 'app-youtube',
    templateUrl: './youtube.component.html',
    styleUrls: [ './youtube.component.css' ]
})
export class YoutubeComponent implements OnInit {

    constructor(public youtubeService: YoutubeService, private audioControlService: AudioControlService) {
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
        this.audioControlService.toggleAudio();
        event.target.setLoop(true);
    }

    width() {
        return window.innerWidth - 150;
    }

    height() {
        return (window.innerWidth - 150) * (946 / 1680);
    }
}
