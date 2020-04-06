import { Component, Input, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationDirection, AnimationItem } from 'lottie-web';
import { AVControlService } from '../../../audio-component/a-v-control.service';

@Component({
    selector: 'app-lottie-animated-audio-fab',
    templateUrl: './lottie-animated-audio-fab.component.html',
    styleUrls: [ './lottie-animated-audio-fab.component.css' ]
})
export class LottieAnimatedAudioFabComponent implements OnInit {

    @Input() time: number;

    options: AnimationOptions = {
        path: './assets/playPause.json',
        autoplay: false,
        loop: true,
        rendererSettings: {
            viewBoxSize: '100 700 880 10',
        }
    };

    direction: AnimationDirection = -1;

    animation: AnimationItem;

    constructor(private audioControlService: AVControlService) {
    }

    ngOnInit(): void {
    }

    animationCreated(animationItem: AnimationItem) {
        this.animation = animationItem;
    }

    seekPosition(time: number) {
        this.audioControlService.seekTime(time);
    }
}
