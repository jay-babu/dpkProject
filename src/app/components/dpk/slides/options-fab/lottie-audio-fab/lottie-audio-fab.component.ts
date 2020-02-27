import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationDirection, AnimationItem } from 'lottie-web';
import { AudioControlService } from '../../../../audio-component/audio-control.service';

@Component({
    selector: 'app-lottie-audio-fab',
    templateUrl: './lottie-audio-fab.component.html',
    styleUrls: [ './lottie-audio-fab.component.css' ]
})
export class LottieAudioFabComponent implements OnInit {

    options: AnimationOptions = {
        path: './assets/animation.json',
        autoplay: false,
        loop: false,
    };

    direction: AnimationDirection = -1;

    animation: AnimationItem;

    constructor(public audioControlService: AudioControlService) {
    }

    ngOnInit(): void {
    }

    animationCreated(animationItem: AnimationItem) {
        this.animation = animationItem;
    }

    toggle() {
        if (this.direction === 1) this.direction = -1;
        else this.direction = 1;
        this.animation.setDirection(this.direction);
        this.animation.play();

        this.audioControlService.toggleAudio();
    }

}
