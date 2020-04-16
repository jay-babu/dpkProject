import { Component, OnInit } from '@angular/core'
import { AnimationOptions } from 'ngx-lottie'
import { AnimationDirection, AnimationItem } from 'lottie-web'
import { AvControlService } from '../../../audio-component/av-control.service'

@Component({
    selector: 'app-lottie-audio-fab',
    templateUrl: './lottie-audio-fab.component.html',
    styleUrls: ['./lottie-audio-fab.component.css'],
})
export class LottieAudioFabComponent implements OnInit {
    options: AnimationOptions = {
        path: './assets/playPause.json',
        autoplay: false,
        loop: false,
        rendererSettings: {
            viewBoxSize: '10 555 1080 500',
        },
    }

    direction: AnimationDirection = -1

    animation: AnimationItem

    constructor(public audioControlService: AvControlService) {}

    ngOnInit(): void {}

    animationCreated(animationItem: AnimationItem) {
        this.animation = animationItem
    }

    playPaused() {
        if (this.direction === 1) this.direction = -1
        else this.direction = 1
        this.animation.setDirection(this.direction)
        this.animation.play()

        this.audioControlService.toggleAudio()
    }
}
